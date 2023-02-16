import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useLikedByList from '../hooks/useLikedByList';
import ListOfUsers from './ListOfUsers';

const LikeByPopup = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [users] = useLikedByList(params.tweet!);

  const goBackToTweet = () => {
    navigate(`/${params.username}/tweet/${params.tweet}`);
  };
  return (
    <>
      <div id='popup-background' aria-hidden onClick={goBackToTweet} />
      <div id='likes-popup'>
        <header>
          <button
            type='button'
            className='btn-cancel-edit'
            onClick={goBackToTweet}
          >
            <FontAwesomeIcon icon={faClose} />
          </button>
          <h2>Liked by</h2>
        </header>
        <ListOfUsers users={users} missingText='Be the first to like this' />
      </div>
    </>
  );
};

export default LikeByPopup;
