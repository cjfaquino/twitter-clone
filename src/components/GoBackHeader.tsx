import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TargetUser } from '../interfaces/TargetUser';

interface IProps {
  targetUser: TargetUser;
}

const GoBackHeader = ({ targetUser }: IProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <header className='goback' onClick={handleClick} aria-hidden>
      <div className='goback-text'>
        {targetUser.doneLoading
          ? `← ${targetUser.userProfile.displayName}`
          : `← Tweet`}
      </div>
    </header>
  );
};

export default GoBackHeader;
