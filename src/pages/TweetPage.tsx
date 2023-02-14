import React from 'react';
import { useParams } from 'react-router-dom';
import Replies from '../components/Replies';
import MainTweet from '../components/MainTweet';
import useOneTweet from '../hooks/useOneTweet';
import GoBackHeader from '../components/GoBackHeader';
import TweetItem from '../components/TweetItem';
import useReplies from '../hooks/useReplies';
import Spinner from '../components/Loaders/Spinner';
import { TweetObj } from '../interfaces/TweetObj';

const TweetPage = () => {
  const params = useParams();
  const [tweet] = useOneTweet(params.tweet!);
  const [fetchedReplies, repliesLoading, setReplies] = useReplies(
    params.tweet!
  );

  const replies = fetchedReplies as unknown as TweetObj[];

  return (
    <div id='tweet-page'>
      <GoBackHeader />

      {tweet && !repliesLoading ? (
        <>
          {tweet.aReplyTo && (
            <div className='replying-to-tweet-item'>
              <TweetItem tweetObj={tweet.aReplyTo} />
            </div>
          )}
          <MainTweet tweetObj={tweet} fetchedReplies={replies} />
          <Replies
            fetchedReplies={replies}
            setReplies={setReplies}
            tweetObj={tweet}
          />
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default TweetPage;
