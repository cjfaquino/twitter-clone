import React, { useEffect } from 'react';
import {
  useParams,
  Routes,
  Route,
  NavLink,
  useNavigate,
} from 'react-router-dom';
import { User } from 'firebase/auth';
import GoBackHeader from '../components/GoBackHeader';
import ProfileLarge from '../components/ProfileLarge';
import useFindByUsername from '../hooks/useFindByUsername';
import ProfileFeed from '../components/ProfileFeed';
import { UserProfile } from '../interfaces/UserProfile';
import Spinner from '../components/Loaders/Spinner';

interface IProps {
  currentUser: User | null;
  userProfile: UserProfile;
}

const ProfilePage = ({ currentUser, userProfile }: IProps) => {
  const params = useParams();
  const navigate = useNavigate();
  const targetUser = useFindByUsername(params.username!);

  useEffect(() => {
    // has not finished signup
    // navigate to finish
    if (userProfile.id === 'no-id' && userProfile.doneLoading) {
      navigate('/signup/continue');
    }
  }, [userProfile]);

  return targetUser.doneLoading ? (
    <div id='profile'>
      <GoBackHeader targetUser={targetUser} />
      <ProfileLarge
        currentUser={currentUser}
        userProfile={userProfile}
        targetUser={targetUser}
      />

      {targetUser.userProfile && (
        <div className='filter-buttons-container'>
          <NavLink
            end
            to={`/${targetUser.userProfile.userName}`}
            className='styled-filter-link'
          >
            <span>Tweets</span>
          </NavLink>
          <NavLink
            to={`/${targetUser.userProfile.userName}/with_replies`}
            className='styled-filter-link'
          >
            <span>Tweets & replies</span>
          </NavLink>
          <NavLink
            to={`/${targetUser.userProfile.userName}/likes`}
            className='styled-filter-link'
          >
            <span>Likes</span>
          </NavLink>
        </div>
      )}
      <Routes>
        <Route
          path=''
          element={<ProfileFeed filter='user tweets' targetUser={targetUser} />}
        />
        <Route
          path='with_replies'
          element={
            <ProfileFeed filter='user tweets&replies' targetUser={targetUser} />
          }
        />
        <Route
          path='likes'
          element={<ProfileFeed filter='user likes' targetUser={targetUser} />}
        />
      </Routes>
    </div>
  ) : (
    <Spinner />
  );
};

export default ProfilePage;
