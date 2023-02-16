import React from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import Replies from '../components/Replies';
import MainTweet from '../components/MainTweet';
import useOneTweet from '../hooks/useOneTweet';
import GoBackHeader from '../components/GoBackHeader';
import TweetItem from '../components/TweetItem';
import useReplies from '../hooks/useReplies';
import Spinner from '../components/Loaders/Spinner';
import { TweetObj } from '../interfaces/TweetObj';
import useWindowTitle from '../hooks/useWindowTitle';
import LikeByPopup from '../components/LikeByPopup';

const TweetPage = () => {
  const params = useParams();
  const [tweet] = useOneTweet(params.tweet!);
  const [fetchedReplies, repliesLoading, setReplies] = useReplies(
    params.tweet!
  );

  useWindowTitle(
    tweet &&
      !repliesLoading &&
      `${tweet.USER_DISPLAY} on ${import.meta.env.VITE_APP_NAME}: "${
        tweet.text
      }" `
  );

  const replies = fetchedReplies as unknown as TweetObj[];

  return (
    <>
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

      <Routes>
        <Route path='likes' element={<LikeByPopup />} />
      </Routes>
    </>
  );
};

export default TweetPage;
