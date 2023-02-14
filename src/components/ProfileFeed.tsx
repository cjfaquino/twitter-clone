import React from 'react';
import useTweets from '../hooks/useTweets';
import ListOfTweets from './ListOfTweets';
import { TargetUser } from '../interfaces/TargetUser';
import Spinner from './Loaders/Spinner';

interface IProps {
  filter: string;
  targetUser: TargetUser;
}

const ProfileFeed = ({ filter, targetUser }: IProps) => {
  const [userTweets, , tweetsLoading] = useTweets(
    filter,
    targetUser.userProfile && targetUser.userProfile.id
  );

  return tweetsLoading ? (
    <Spinner />
  ) : (
    <ListOfTweets tweets={userTweets} customClass='profile-tweets' />
  );
};

export default ProfileFeed;
