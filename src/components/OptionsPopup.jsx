import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import ThreeDots from './ThreeDots';
import checkMatchingUser from '../utils/checkMatchingUser';
import isUserSignedIn from '../utils/isUserSignedIn';

const OptionsPopup = ({
  toggleOptionsPopup,
  showOptionsPopup,
  handleDelete,
  userID,
}) => {
  const navigate = useNavigate();

  return (
    <div className='dots-container'>
      <ThreeDots onClick={toggleOptionsPopup} />
      {showOptionsPopup && (
        <>
          <div className='options-popup popup'>
            {isUserSignedIn() ? (
              <button type='button' className='btn-options-follow'>
                Follow
              </button>
            ) : (
              <button
                type='button'
                onClick={() => navigate('/login')}
                className='btn-options-login'
              >
                Login
              </button>
            )}

            {checkMatchingUser(userID) && (
              <button
                className='btn-delete-tweet'
                type='button'
                onClick={handleDelete}
              >
                Delete
              </button>
            )}
          </div>
          <div
            className='options-background'
            onClick={toggleOptionsPopup}
            aria-hidden='true'
          />
        </>
      )}
    </div>
  );
};

OptionsPopup.propTypes = {
  toggleOptionsPopup: PropTypes.func.isRequired,
  showOptionsPopup: PropTypes.bool.isRequired,
  handleDelete: PropTypes.func.isRequired,
  userID: PropTypes.string,
};

OptionsPopup.defaultProps = {
  userID: '',
};

export default OptionsPopup;
