import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import isUserSignedIn from '../utils/isUserSignedIn';
import followUser from '../utils/follows/followUser';
import unfollowUser from '../utils/follows/unfollowUser';
import checkAlreadyFollowing from '../utils/follows/checkAlreadyFollowing';
import eventFollow from '../events/eventFollow';
import { UserProfile } from '../interfaces/UserProfile';
import getUserUid from '../utils/getUserUid';

export default function useFollowStatus(
  userProfile: UserProfile
): [
  boolean | undefined | null,
  (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>,
  React.Dispatch<React.SetStateAction<boolean | undefined | null>>
] {
  const [followed, setFollowed] = useState<boolean | undefined | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    eventFollow(userProfile.id);
  }, [followed]);

  const updateFollow = () => {
    // don't update when user hasn't loaded
    if (!userProfile.doneLoading) return;

    // don't update state if current user
    if (userProfile.id === getUserUid()) return;

    checkAlreadyFollowing(userProfile.id).then((res) => setFollowed(res));
  };

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
    } else {
      // unfollow
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
