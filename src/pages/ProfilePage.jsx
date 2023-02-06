import React from 'react';
import PropTypes from 'prop-types';
import { useParams, Routes, Route, NavLink } from 'react-router-dom';
import GoBackHeader from '../components/GoBackHeader';
import ProfileLarge from '../components/ProfileLarge';
import useFindByUsername from '../hooks/useFindByUsername';
import ProfileFeed from '../components/ProfileFeed';

const ProfilePage = ({ currentUser, userProfile }) => {
  const params = useParams();
  const targetUser = useFindByUsername(params.username);

  return (
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
  );
};

ProfilePage.propTypes = {
  currentUser: PropTypes.shape({}),
  userProfile: PropTypes.shape({}),
};

ProfilePage.defaultProps = {
  currentUser: null,
  userProfile: null,
};

export default ProfilePage;
