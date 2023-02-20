import React from 'react';
import Tweet from '../../classes/Tweet';
import { TweetObj } from '../../interfaces/TweetObj';
import isUserSignedIn from '../../utils/user/isUserSignedIn';
import ListOfTweets from '../../components/ListOfTweets';
import TweetForm from '../../components/TweetForm';

interface IProps {
  tweetObj: TweetObj;
  fetchedReplies: TweetObj[];
  setReplies: React.Dispatch<React.SetStateAction<TweetObj[]>>;
}

const Replies = ({ tweetObj, fetchedReplies, setReplies }: IProps) => {
  // adds a temp local copy under replies
  const addToReplies = ({
    id,
    messageImg,
    messageText,
    aReplyTo,
  }: {
    id: string;
    messageImg: string;
    messageText: string;
    aReplyTo: TweetObj;
  }) => {
    const replyObj = {
      id,
      ...new Tweet({
        messageText,
        messageImg,
        aReplyTo,
      }),
    };
    setReplies((prev) => [...prev, replyObj]);
  };

  return (
    <>
      {isUserSignedIn() && (
        <TweetForm
          btnText='Reply'
          placeholder='Tweet your reply'
          successCallback={addToReplies}
          aReplyTo={tweetObj}
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
