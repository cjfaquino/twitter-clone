import React from 'react';

const defaultProps = {
  handleClick: null,
};

const ThreeDots = ({
  handleClick,
}: {
  handleClick?: React.MouseEventHandler<HTMLDivElement>;
}) => (
  <div className='more-options' onClick={handleClick} aria-hidden>
    <div className='dots' />
    <div className='dots' />
    <div className='dots' />
  </div>
);

ThreeDots.defaultProps = defaultProps;

export default ThreeDots;
