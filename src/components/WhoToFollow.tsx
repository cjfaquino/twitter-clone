import React from 'react';
import useRandomUsers from '../hooks/useRandomUsers';
import { UserProfile } from '../interfaces/UserProfile';
import ListOfUsers from './ListOfUsers';
import Spinner from './Spinner';

const WhoToFollow = () => {
  const [users, usersLoading] = useRandomUsers() as [UserProfile[], boolean];

  return (
    <div id='who-to-follow'>
      {!usersLoading ? (
        <>
          <h3>Who To Follow</h3>
          <ListOfUsers users={users} compact />
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default WhoToFollow;
