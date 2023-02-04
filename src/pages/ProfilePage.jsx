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

  const styleNavLink = ({ isActive }) => ({
    borderColor: isActive ? 'var(--theme-color)' : 'black',
    color: isActive ? 'white' : 'grey',
  });

  return (
    <div id='profile'>
      <GoBackHeader targetUser={targetUser} />
      <ProfileLarge
        currentUser={currentUser}
        userProfile={userProfile}
        targetUser={targetUser}
      />
      {targetUser.userProfile && (
        <div className='profile-filter-buttons'>
          <NavLink
            end
            to={`/${targetUser.userProfile.userName}`}
            style={styleNavLink}
          >
            Tweets
          </NavLink>
          <NavLink
            to={`/${targetUser.userProfile.userName}/with_replies`}
            style={styleNavLink}
          >
            Tweets & replies
          </NavLink>
          <NavLink
            to={`/${targetUser.userProfile.userName}/likes`}
            style={styleNavLink}
          >
            Likes
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
