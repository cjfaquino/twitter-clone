import React from 'react';

const defaultProps = {
  onClick: null,
};

const ThreeDots = ({
  onClick,
}: {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
} & typeof defaultProps) => (
  <div className='more-options' onClick={onClick} aria-hidden>
    <div className='dots' />
    <div className='dots' />
    <div className='dots' />
  </div>
);

ThreeDots.defaultProps = defaultProps;

export default ThreeDots;
