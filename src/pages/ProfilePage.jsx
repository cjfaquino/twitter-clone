import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import GoBackHeader from '../components/GoBackHeader';
import ProfileLarge from '../components/ProfileLarge';
import useFindByUsername from '../hooks/useFindByUsername';

function ProfilePage({ currentUser, userProfile }) {
  const params = useParams();
  const [targetUserProfile] = useFindByUsername(params.username);

  return (
    <div id='profile'>
      <GoBackHeader targetUserProfile={targetUserProfile} />
      <ProfileLarge
        currentUser={currentUser}
        userProfile={userProfile}
        targetUserProfile={targetUserProfile}
      />
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
