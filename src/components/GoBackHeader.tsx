import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TargetUser } from '../interfaces/TargetUser';

interface IProps {
  targetUser?: TargetUser;
}

const defaultProps = {
  targetUser: {},
};

const GoBackHeader = ({ targetUser }: IProps & typeof defaultProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <header className='goback' onClick={handleClick} aria-hidden>
      <div className='goback-text'>
        {targetUser && targetUser.doneLoading
          ? `← ${targetUser.userProfile.displayName}`
          : `← Tweet`}
      </div>
    </header>
  );
};

GoBackHeader.defaultProps = defaultProps;

export default GoBackHeader;
