import checkAlreadyFollowing from './checkAlreadyFollowing';
import unfollowUser from './unfollowUser';
import followUser from './followUser';

export default async function updateFollow(
  cssSelector,
  targetUserProfile,
  userProfile
) {
  const followBtnDOM = document.querySelector(`#${cssSelector} .btn-follow`);
  followBtnDOM.disabled = true;
  if (await checkAlreadyFollowing(targetUserProfile.id)) {
    await unfollowUser(targetUserProfile, userProfile);
    followBtnDOM.textContent = 'Follow';
  } else {
    await followUser(userProfile, targetUserProfile);
    followBtnDOM.textContent = 'Unfollow';
  }
  followBtnDOM.disabled = false;
}
