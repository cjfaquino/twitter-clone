import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MyFooter from './MyFooter/MyFooter';
import useRandomUsers from '../hooks/useRandomUsers';
import ListOfUsers from './ListOfUsers';

const MySidebar = ({ isSignedIn }) => {
  const users = useRandomUsers();

  return (
    <div id='sidebar'>
      {!isSignedIn && (
        <div className='sidebar-signup'>
          <Link to='/signup'>
            <button type='button' className='btn-sidebar-signup'>
              Sign Up
            </button>
          </Link>
        </div>
      )}
      <div id='who-to-follow'>
        <h3>Who To Follow</h3>
        <ListOfUsers users={users} />
      </div>
      <MyFooter />
    </div>
  );
};

MySidebar.propTypes = {
  isSignedIn: PropTypes.bool.isRequired,
};

export default MySidebar;
