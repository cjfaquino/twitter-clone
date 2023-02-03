import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const GoBackHeader = ({ targetUser }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <header className='goback' onClick={handleClick} aria-hidden>
      <div className='goback-text'>
        {targetUser && targetUser.userProfile
          ? `← ${targetUser.userProfile.displayName}`
          : `← Tweet`}
      </div>
    </header>
  );
};

GoBackHeader.propTypes = {
  targetUser: PropTypes.shape({
    userProfile: PropTypes.shape({
      displayName: PropTypes.string,
    }),
  }),
};

GoBackHeader.defaultProps = {
  targetUser: null,
};

export default GoBackHeader;
