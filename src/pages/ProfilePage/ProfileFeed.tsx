import React from 'react';
import useTweets from '../../hooks/useTweets';
import ListOfTweets from '../../components/ListOfTweets';
import { TargetUser } from '../../interfaces/TargetUser';
import Spinner from '../../components/Loaders/Spinner';
import { TweetObj } from '../../interfaces/TweetObj';
import useStoreTweets from '../../hooks/useStoreTweets';

interface IProps {
  filter: string;
  targetUser: TargetUser;
  tweets: TweetObj[];
  setTweets: React.Dispatch<React.SetStateAction<TweetObj[]>>;
}

const ProfileFeed = ({ filter, targetUser, tweets, setTweets }: IProps) => {
  const [fetchedTweets, tweetsLoading] = useTweets(
    filter,
    targetUser.userProfile && targetUser.userProfile.id
  );

  useStoreTweets(fetchedTweets, setTweets);

  return tweetsLoading ? (
    <Spinner />
  ) : (
    <ListOfTweets tweets={tweets} customClass='profile-tweets' />
  );
};

export default ProfileFeed;
