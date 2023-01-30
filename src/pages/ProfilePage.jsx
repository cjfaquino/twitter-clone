import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import GoBackHeader from '../components/GoBackHeader';
import ProfileLarge from '../components/ProfileLarge';
import useFindByUsername from '../hooks/useFindByUsername';

function ProfilePage({ currentUser }) {
  const params = useParams();
  const [userProfile] = useFindByUsername(params.username);

  return (
    <div id='profile'>
      <GoBackHeader userProfile={userProfile} />
      <ProfileLarge currentUser={currentUser} userProfile={userProfile} />
    </div>
  );
}

ProfilePage.propTypes = {
  currentUser: PropTypes.shape({}),
};

ProfilePage.defaultProps = {
  currentUser: null,
};

export default ProfilePage;
