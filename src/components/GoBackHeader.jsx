import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function GoBackHeader({ userProfile }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <header className='goback' onClick={handleClick} aria-hidden>
      <div className='goback-text'>
        {userProfile ? `← ${userProfile.displayName}` : `← Tweet`}
      </div>
    </header>
  );
}

GoBackHeader.propTypes = {
  userProfile: PropTypes.shape({
    displayName: PropTypes.string,
  }),
};

GoBackHeader.defaultProps = {
  userProfile: null,
};

export default GoBackHeader;
