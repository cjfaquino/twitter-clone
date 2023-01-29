import React from 'react';
import PropTypes from 'prop-types';
import GoBackHeader from '../components/GoBackHeader';
import ProfileLarge from '../components/ProfileLarge';

function ProfilePage({ currentUser, userProfile }) {
  return (
    <div id='profile'>
      <GoBackHeader currentUser={currentUser} />
      <ProfileLarge currentUser={currentUser} userProfile={userProfile} />
    </div>
  );
}

ProfilePage.propTypes = {
  currentUser: PropTypes.shape({}),
  userProfile: PropTypes.shape({}),
};

ProfilePage.defaultProps = {
  currentUser: null,
  userProfile: null,
};

export default ProfilePage;
