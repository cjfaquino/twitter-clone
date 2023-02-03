import React from 'react';
import PropTypes from 'prop-types';
import useTweets from '../hooks/useTweets';
import TweetItem from './TweetItem';

const ProfileFeed = ({ filter, targetUser }) => {
  const [userTweets] = useTweets(
    filter,
    targetUser.userProfile && targetUser.userProfile.id
  );

  return (
    <>
      {userTweets.map((twt) => (
        <TweetItem key={`tweet-${twt.id}`} tweetObj={twt} />
      ))}
    </>
  );
};

ProfileFeed.propTypes = {
  filter: PropTypes.string.isRequired,
  targetUser: PropTypes.shape({
    userProfile: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

ProfileFeed.defaultProps = {
  targetUser: null,
};

export default ProfileFeed;
