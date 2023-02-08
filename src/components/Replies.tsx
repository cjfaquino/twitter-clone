import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import TweetItem from './TweetItem';
import saveTweet from '../utils/saveTweet';
import useReplies from '../hooks/useReplies';
import Tweet, { TweetObj } from '../utils/Tweet';
import getDisplayName from '../utils/getDisplayName';
import getProfilePicUrl from '../utils/getProfilePicUrl';
import isUserSignedIn from '../utils/isUserSignedIn';
import ListOfTweets from './ListOfTweets';

interface IProps {
  tweetObj: TweetObj;
}

const Replies = ({ tweetObj }: IProps) => {
  const params = useParams();

  const [fetchedReplies] = useReplies(params.tweet);
  const [replyMessage, setReplyMessage] = useState('');

  const handleReplyInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReplyMessage(e.target.value);

    e.target.style.height = '5px';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleSubmitReply = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isUserSignedIn()) {
      return; // show login popup
    }

    const docID = await saveTweet(replyMessage, tweetObj);
    if (docID) {
      // send to TweetPage
      const replyObj = { id: docID, ...new Tweet(replyMessage, tweetObj) };
      fetchedReplies.push(replyObj);
      setReplyMessage('');
    } else {
      // error sending
    }
  };

  return (
    <div>
      {isUserSignedIn() && (
        <form onSubmit={handleSubmitReply} className='reply-input-container'>
          <div className='reply-input-img-container img-container'>
            <img src={getProfilePicUrl()} alt={getDisplayName()} />
          </div>
          <textarea
            rows={1}
            placeholder='Tweet your reply'
            value={replyMessage}
            onChange={handleReplyInput}
            className='reply-input'
          />
          <button type='submit' className='btn-submit-reply'>
            Reply
          </button>
        </form>
      )}
      <ListOfTweets tweets={fetchedReplies} customClass='reply' />
    </div>
  );
};

export default Replies;
