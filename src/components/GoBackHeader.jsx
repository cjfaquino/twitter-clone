import React from 'react';
import { useNavigate } from 'react-router-dom';

function GoBackHeader() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <header className='goback' onClick={handleClick} aria-hidden>
      <div className='goback-text'>{'<'} Tweet</div>
    </header>
  );
}

export default GoBackHeader;
