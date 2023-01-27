import React from 'react';
import { useParams } from 'react-router-dom';
import Replies from '../components/Replies';
import MainTweet from '../components/MainTweet';
import useOneTweet from '../hooks/useOneTweet';
import GoBackHeader from '../components/GoBackHeader';
import TweetItem from '../components/TweetItem';

function TweetPage() {
  const params = useParams();
  const [tweet] = useOneTweet(params.tweet);

  return (
    <>
      <GoBackHeader />
      {tweet && tweet.data.aReplyTo && (
        <div className='replying-to-tweet-item'>
          <TweetItem tweetObj={tweet.data.aReplyTo} />
        </div>
      )}
      <MainTweet tweetObj={tweet} />
      {tweet && <Replies replies={tweet.data.replies} tweetObj={tweet} />}
    </>
  );
}

export default TweetPage;
