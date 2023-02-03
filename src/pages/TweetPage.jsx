import React from 'react';
import { useParams } from 'react-router-dom';
import Replies from '../components/Replies';
import MainTweet from '../components/MainTweet';
import useOneTweet from '../hooks/useOneTweet';
import GoBackHeader from '../components/GoBackHeader';
import TweetItem from '../components/TweetItem';

const TweetPage = () => {
  const params = useParams();
  const [tweet] = useOneTweet(params.tweet);

  return (
    <div id='tweet-page'>
      <GoBackHeader />
      {tweet && tweet.aReplyTo && (
        <div className='replying-to-tweet-item'>
          <TweetItem tweetObj={tweet.aReplyTo} />
        </div>
      )}
      <MainTweet tweetObj={tweet} />
      {tweet && <Replies replies={[]} tweetObj={tweet} />}
    </div>
  );
};

export default TweetPage;
