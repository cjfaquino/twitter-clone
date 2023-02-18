import { User } from 'firebase/auth';
import React from 'react';

const AccountStats = ({ currentUser }: { currentUser: User | null }) => (
  <section className='account-stats'>
    <div>
      <span>Created at: </span>{' '}
      <span>
        {currentUser &&
          currentUser.metadata &&
          new Date(currentUser.metadata.creationTime!).toLocaleString()}
      </span>
    </div>
    <div>
      <span>Last login at: </span>{' '}
      <span>
        {currentUser &&
          currentUser.metadata &&
          new Date(currentUser.metadata.lastSignInTime!).toLocaleString()}
      </span>
    </div>
  </section>
);

export default AccountStats;
