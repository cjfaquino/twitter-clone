import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart } from '@fortawesome/free-regular-svg-icons';
import {
  faArrowUpFromBracket,
  faChartSimple,
  faRetweet,
} from '@fortawesome/free-solid-svg-icons';
import deleteTweet from '../utils/deleteTweet';
import OptionsPopup from './OptionsPopup';
import useToggle from '../hooks/useToggle';
import getTimeString from '../utils/getTimeString';
import checkMatchingUser from '../utils/checkMatchingUser';
import deleteTweetFromDOM from '../utils/deleteTweetFromDOM';
import useReplies from '../hooks/useReplies';
import checkAlreadyLiked from '../utils/checkAlreadyLiked';
import undoLike from '../utils/undoLike';
import likeTweet from '../utils/likeTweet';
import isUserSignedIn from '../utils/isUserSignedIn';
import FormattedTweetMessage from './FormattedTweetMessage';
import useFindByUsername from '../hooks/useFindByUsername';
import { TweetObj } from '../utils/Tweet';

interface IProps {
  tweetObj: TweetObj;
}

const TweetItem = ({ tweetObj }: IProps) => {
  const [likes, setLikes] = useState(tweetObj.likes);
  const targetUser = useFindByUsername(tweetObj.USER_NAME);
  const likesRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  const { views, text: textArr, timestamp, USER_ID, id: TWEET_ID } = tweetObj;

  const [showOptionsPopup, toggleOptionsPopup] = useToggle(false);
  const [, repLength] = useReplies(TWEET_ID);

  const customClass = 'tweet';

  const handleDelete = async () => {
    // delete from DB
    if (checkMatchingUser(USER_ID)) {
      await deleteTweet(tweetObj);
      deleteTweetFromDOM(`${customClass}-${TWEET_ID}`);
    }
  };

  const checkElementClicked = (targetString: string, conditions: string[]) =>
    conditions.some((el) => targetString.includes(el));

  const navToPage = async (e: React.MouseEvent<HTMLDivElement>) => {
    const element = e.target as HTMLDivElement;
    const targetName = element.className;
    // conditions
    const toUser = ['profile-link'];
    const toTweetPage = [
      'info',
      'right-half',
      'message',
      'time',
      'buttons',
      'repl',
    ];

    if (checkElementClicked(targetName, toTweetPage)) {
      // go to tweet page
      navigate(`/${targetUser.userProfile.userName}/tweet/${TWEET_ID}`);
    } else if (checkElementClicked(targetName, toUser)) {
      // go to user page
      navigate(`/${targetUser.userProfile.userName}`);
    }
  };

  const handleLike = async () => {
    if (!isUserSignedIn()) return navigate('/login');

    if (!likesRef.current) return undefined;

    if (await checkAlreadyLiked(TWEET_ID)) {
      // already liked
      await undoLike(tweetObj);
      likesRef.current.classList.remove('liked');
      setLikes((prev) => prev - 1);
    } else {
      // not yet liked
      await likeTweet(tweetObj);
      likesRef.current.classList.add('liked');
      setLikes((prev) => prev + 1);
    }

    return undefined;
  };

  const updateLikes = async () => {
    if (!likesRef.current) return;

    if (!targetUser.doneLoading) return;

    if (await checkAlreadyLiked(TWEET_ID)) {
      likesRef.current.classList.add('liked');
    } else {
      likesRef.current.classList.remove('liked');
    }
  };

  useEffect(() => {
    if (targetUser.doneLoading) {
      updateLikes();
    }
    document.addEventListener('auth state changed', updateLikes);

    return () => {
      document.removeEventListener('auth state changed', updateLikes);
    };
  }, [targetUser.doneLoading]);

  return targetUser.doneLoading ? (
    <div
      className={`${customClass}-item`}
      id={`${customClass}-${TWEET_ID}`}
      onClick={navToPage}
      aria-hidden
    >
      <div className={`${customClass}-item-left-half`}>
        <div
          className={`${customClass}-item-img-container img-container profile-link`}
        >
          <img
            src={targetUser.userProfile.photoURL}
            alt=''
            className='profile-link'
          />
        </div>
        <div className='vert-line' />
      </div>

      <div className={`${customClass}-item-right-half`}>
        <div className={`${customClass}-item-info`}>
          <div className={`${customClass}-item-display profile-link`}>
            {targetUser.userProfile.displayName}
          </div>
          <div
            className={`${customClass}-item-name profile-link grey username`}
          >
            @{targetUser.userProfile.userName}
          </div>
          <div
            className={`${customClass}-item-time grey`}
            title={getTimeString(timestamp)}
          >
            {getTimeString(timestamp, 'localeDate')}
          </div>
          <OptionsPopup
            toggleOptionsPopup={toggleOptionsPopup}
            showOptionsPopup={showOptionsPopup}
            handleDelete={handleDelete}
            targetUser={targetUser}
          />
        </div>
        {tweetObj.aReplyTo && (
          <div className='replying-to-info'>
            Replying to{' '}
            <span className='username profile-link'>
              @{tweetObj.aReplyTo.USER_NAME}
            </span>
          </div>
        )}
        <FormattedTweetMessage
          textArr={textArr}
          tweetID={TWEET_ID}
          customClass={customClass}
        />

        <div className={`${customClass}-item-buttons`}>
          <button type='button' className='btn-replies grey'>
            <span className='btn-blue'>
              <FontAwesomeIcon icon={faComment} />
            </span>{' '}
            <span className='replies-number'>{repLength > 0 && repLength}</span>
          </button>
          <button type='button' className='btn-retweets grey'>
            <span className='btn-green'>
              <FontAwesomeIcon icon={faRetweet} />
            </span>
          </button>{' '}
          <button
            type='button'
            className='btn-likes grey'
            onClick={handleLike}
            ref={likesRef}
          >
            <span className='btn-red'>
              <FontAwesomeIcon icon={faHeart} />
            </span>{' '}
            <span className='likes-number'>{likes}</span>
          </button>
          <button type='button' className='btn-views grey'>
            <span className='btn-blue'>
              <FontAwesomeIcon icon={faChartSimple} />
            </span>{' '}
            <span className='views-number'>{views}</span>
          </button>
          <button type='button' className='btn-shares grey'>
            <span className='btn-blue'>
              <FontAwesomeIcon icon={faArrowUpFromBracket} />
            </span>
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default TweetItem;
