import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TargetUser } from '../interfaces/TargetUser';

interface IProps {
  targetUser?: TargetUser;
}

const defaultProps = {
  targetUser: {},
};

const GoBackHeader = ({ targetUser }: IProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!(targetUser?.userProfile && targetUser.doneLoading)) navigate(-1);

    if (targetUser?.userProfile && targetUser.doneLoading)
      navigate(`/${targetUser.userProfile.userName}`);
  };

  return (
    <header className='goback' onClick={handleClick} aria-hidden>
      <div className='goback-text'>
        {targetUser?.userProfile && targetUser.doneLoading ? (
          <section>
            <div>←</div>
            <div>
              <p className='header-display-name'>{`${targetUser.userProfile.displayName}`}</p>
              <p className='header-username grey'>{`@${targetUser.userProfile.userName}`}</p>
            </div>
          </section>
        ) : (
          `← Tweet`
        )}
      </div>
    </header>
  );
};

GoBackHeader.defaultProps = defaultProps;

export default GoBackHeader;
