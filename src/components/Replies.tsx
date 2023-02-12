import React, { useState } from 'react';
import saveTweet from '../utils/saveTweet';
import Tweet from '../utils/Tweet';
import { TweetObj } from '../interfaces/TweetObj';
import getProfilePicUrl from '../utils/getProfilePicUrl';
import isUserSignedIn from '../utils/isUserSignedIn';
import ListOfTweets from './ListOfTweets';

interface IProps {
  tweetObj: TweetObj;
  fetchedReplies: TweetObj[];
  setReplies: React.Dispatch<React.SetStateAction<any[]>>;
}

const Replies = ({ tweetObj, fetchedReplies, setReplies }: IProps) => {
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
      setReplies((prev) => [...prev, replyObj]);
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
            <img src={getProfilePicUrl()} alt='current user' />
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
      {fetchedReplies && (
        <ListOfTweets
          tweets={fetchedReplies}
          customClass='reply'
          missingText='No replies yet'
        />
      )}
    </div>
  );
};

export default Replies;
