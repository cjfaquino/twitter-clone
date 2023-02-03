import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import GoBackHeader from '../components/GoBackHeader';
import ProfileLarge from '../components/ProfileLarge';
import useFindByUsername from '../hooks/useFindByUsername';

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
