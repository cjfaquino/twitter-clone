import React from 'react';
import PropTypes from 'prop-types';
import ProfileSmall from './ProfileSmall';

const ListOfUsers = ({ users }) => (
  <>
    {users.map((usr) => (
      <ProfileSmall key={`profile-small-${usr.id}`} userProfile={usr} />
    ))}
  </>
);

ListOfUsers.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default ListOfUsers;
