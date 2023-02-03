import React from 'react';
import PropTypes from 'prop-types';

const ThreeDots = ({ onClick }) => (
  <div className='more-options' onClick={onClick} aria-hidden>
    <div className='dots' />
    <div className='dots' />
    <div className='dots' />
  </div>
);

ThreeDots.propTypes = {
  onClick: PropTypes.func,
};

ThreeDots.defaultProps = {
  onClick: null,
};

export default ThreeDots;
