import React, { useState } from 'react';
import saveTweet from '../../utils/tweets/saveTweet';
import Tweet from '../../classes/Tweet';
import { TweetObj } from '../../interfaces/TweetObj';
import isUserSignedIn from '../../utils/user/isUserSignedIn';
import ListOfTweets from '../../components/ListOfTweets';
import TweetForm from '../../components/TweetForm';

interface IProps {
  tweetObj: TweetObj;
  fetchedReplies: TweetObj[];
  setReplies: React.Dispatch<React.SetStateAction<any[]>>;
}

const Replies = ({ tweetObj, fetchedReplies, setReplies }: IProps) => {
  const [replyMessage, setReplyMessage] = useState('');
  const [selectedImg, setSelectedImg] = useState<File | null>(null);

  const [submitting, setSubmitting] = useState(false);

  const handleSubmitReply = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    if (!isUserSignedIn()) {
      return; // show login popup
    }

    const docID = await saveTweet({
      messageText: replyMessage,
      aReplyTo: tweetObj,
      messageImgFile: selectedImg,
    });
    if (docID) {
      // send to TweetPage
      const replyObj = {
        id: docID,
        ...new Tweet({ messageText: replyMessage, aReplyTo: tweetObj }),
      };
      setReplies((prev) => [...prev, replyObj]);
      setReplyMessage('');
    } else {
      // error sending
    }
    setSubmitting(false);
  };

  return (
    <>
      {isUserSignedIn() && (
        <TweetForm
          btnText='Reply'
          placeholder='Tweet your reply'
          input={replyMessage}
          setInput={setReplyMessage}
          submitting={submitting}
          setSelectedImg={setSelectedImg}
          selectedImg={selectedImg}
          handleSubmit={handleSubmitReply}
        />
      )}
      {fetchedReplies && (
        <ListOfTweets
          tweets={fetchedReplies}
          customClass='reply'
          missingText='No replies yet'
        />
      )}
    </>
  );
};

export default Replies;
