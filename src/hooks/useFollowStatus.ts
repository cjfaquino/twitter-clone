import { useState, useEffect, SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import isUserSignedIn from '../utils/isUserSignedIn';
import followUser from '../utils/followUser';
import unfollowUser from '../utils/unfollowUser';
import checkAlreadyFollowing from '../utils/checkAlreadyFollowing';
import eventFollow from '../events/eventFollow';
import { UserProfile } from '../interfaces/UserProfile';

export default function useFollowStatus(userProfile: UserProfile) {
  const [followed, setFollowed] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    eventFollow(userProfile.id);
  }, [followed]);

  const updateFollow = () =>
    checkAlreadyFollowing(userProfile.id).then(setFollowed);

  const handleFollow = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const currentUserProfileObj = JSON.parse(
      localStorage.getItem('userProfile') || 'id: ""'
    );
    const element = e.target as HTMLElement;
    const btnText = element.textContent;

    if (!isUserSignedIn()) {
      return navigate('/login');
    }

    if (btnText === 'Follow') {
      await followUser(currentUserProfileObj, userProfile);
      setFollowed(true);
    }

    if (btnText === 'Unfollow') {
      await unfollowUser(userProfile);
      setFollowed(false);
    }

    return eventFollow(userProfile.id);
  };

  useEffect(() => {
    // set initial follow status
    if (isUserSignedIn()) {
      updateFollow();
    }

    document.addEventListener(
      `change follow for ${userProfile.id}`,
      updateFollow
    );

    document.addEventListener('auth state changed', updateFollow);

    return () => {
      document.removeEventListener(
        `change follow for ${userProfile.id}`,
        updateFollow
      );
      document.removeEventListener('auth state changed', updateFollow);
    };
  }, [userProfile]);

  return [followed, handleFollow, setFollowed];
}
