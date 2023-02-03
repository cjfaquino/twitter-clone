import React from 'react';
import PropTypes from 'prop-types';
import { useParams, Routes, Route, useNavigate } from 'react-router-dom';
import GoBackHeader from '../components/GoBackHeader';
import ProfileLarge from '../components/ProfileLarge';
import useFindByUsername from '../hooks/useFindByUsername';
import ProfileFeed from '../components/ProfileFeed';

const ProfilePage = ({ currentUser, userProfile }) => {
  const params = useParams();
  const targetUser = useFindByUsername(params.username);
  const navigate = useNavigate();

  return (
    <div id='profile'>
      <GoBackHeader targetUser={targetUser} />
      <ProfileLarge
        currentUser={currentUser}
        userProfile={userProfile}
        targetUser={targetUser}
      />
      <div className='profile-filter-buttons'>
        <button
          type='button'
          onClick={() => navigate(`/${targetUser.userProfile.userName}`)}
        >
          Tweets
        </button>
        <button
          type='button'
          onClick={() =>
            navigate(`/${targetUser.userProfile.userName}/with_replies`)
          }
        >
          Tweets & replies
        </button>
        <button type='button'>Likes</button>
      </div>
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
