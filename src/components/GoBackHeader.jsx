import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function GoBackHeader({ currentUser }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <header className='goback' onClick={handleClick} aria-hidden>
      <div className='goback-text'>
        {currentUser ? `← ${currentUser.displayName}` : `← Tweet`}
      </div>
    </header>
  );
}

GoBackHeader.propTypes = {
  currentUser: PropTypes.shape({
    displayName: PropTypes.string,
  }),
};

GoBackHeader.defaultProps = {
  currentUser: null,
};

export default GoBackHeader;
