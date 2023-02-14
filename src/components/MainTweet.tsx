import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart } from '@fortawesome/free-regular-svg-icons';
import {
  faArrowUpFromBracket,
  faRetweet,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import deleteTweet from '../utils/deleteTweet';
import useToggle from '../hooks/useToggle';
import getTimeString from '../utils/getTimeString';
import updateView from '../utils/updateView';
import checkMatchingUser from '../utils/checkMatchingUser';
import getUserUid from '../utils/getUserUid';
import likeTweet from '../utils/likeTweet';
import undoLike from '../utils/undoLike';
import checkAlreadyLiked from '../utils/checkAlreadyLiked';
import isUserSignedIn from '../utils/isUserSignedIn';
import OptionsPopup from './OptionsPopup';
import FormattedText from './FormattedText';
import useFindByUsername from '../hooks/useFindByUsername';
import { TweetObj } from '../interfaces/TweetObj';
import checkUserAlreadyReplied from '../utils/checkUserAlreadyReplied';

interface IProps {
  tweetObj: TweetObj;
  fetchedReplies: TweetObj[];
}

const MainTweet = ({ tweetObj, fetchedReplies }: IProps) => {
  const navigate = useNavigate();
  const params = useParams();
  const targetUser = useFindByUsername(params.username!);
  const [showOptionsPopup, toggleOptionsPopup] = useToggle(false);
  const [likes, setLikes] = useState<number>(0);
  const tweetRef = useRef(null);
  const likesRef = useRef(null);

  const customClass = 'main-tweet';

  useEffect(() => {
    const updateLikes = async () => {
      if (await checkAlreadyLiked(tweetObj.id)) {
        likesRef.current.classList.add('liked');
      } else {
        likesRef.current.classList.remove('liked');
      }
    };

    if (tweetObj) {
      setLikes(tweetObj.likes);

      updateLikes();
      document.addEventListener('auth state changed', updateLikes);
    }

    return () => {
      document.removeEventListener('auth state changed', updateLikes);
    };
  }, [tweetObj]);

  useEffect(() => {
    if (!tweetObj) return undefined;

    // increase view after small delay
    const timeoutId = setTimeout(() => {
      updateView(tweetObj);
    }, 500);

    // dynamically scroll past .replying-to-tweet-item on load
    if (tweetObj.aReplyTo) {
      const replyingTo = tweetRef.current.parentNode.querySelector(
        '.replying-to-tweet-item'
      );
      window.scrollTo(0, replyingTo.clientHeight);
    }

    return () => {
      // clean timeout on quick rerenders
      clearTimeout(timeoutId);
      // reset scroll when navigating
      window.scrollTo(0, 0);
    };
  }, [tweetObj]);

  if (!tweetObj) return <div id={`${customClass}-container`} />;

  const {
    views,
    retweets,
    text: textArr,
    timestamp,
    USER_ICON,
    USER_NAME,
    USER_DISPLAY,
    id: TWEET_ID,
  } = tweetObj;

  const handleDelete = async () => {
    if (checkMatchingUser(getUserUid())) {
      await deleteTweet(tweetObj);
      navigate('/');
    }
  };

  const handleLike = async () => {
    if (!isUserSignedIn()) return navigate('/login');

    if (likesRef.current && (await checkAlreadyLiked(TWEET_ID))) {
      // already liked
      await undoLike(TWEET_ID);
      setLikes((prev) => prev - 1);
      likesRef.current.classList.remove('liked');
    } else {
      // not yet liked
      await likeTweet(tweetObj);
      setLikes((prev) => prev + 1);
      likesRef.current.classList.add('liked');
    }

    return undefined;
  };

  const navToPage = async (e: React.MouseEvent<HTMLDivElement>) => {
    const targetName = (e.target as HTMLElement).className;
    // conditions
    if (targetName.includes('profile-link')) {
      // go to user page
      navigate(`/${USER_NAME}`);
    }
  };

  return (
    <div
      id={`${customClass}-container`}
      onClick={navToPage}
      aria-hidden
      ref={tweetRef}
    >
      <div id={TWEET_ID} className={`${customClass}-item`}>
        <div className={`${customClass}-item-user`}>
          <div
            className={`${customClass}-item-img-container img-container profile-link`}
          >
            <img src={USER_ICON} alt={USER_NAME} className='profile-link' />
          </div>
          <div className={`${customClass}-item-right-half`}>
            <div className={`${customClass}-item-info`}>
              <div className={`${customClass}-item-display profile-link`}>
                {USER_DISPLAY}
              </div>
              <div
                className={`${customClass}-item-name profile-link grey username`}
              >
                @{USER_NAME}
              </div>
            </div>
          </div>
          <OptionsPopup
            handleDelete={handleDelete}
            toggleOptionsPopup={toggleOptionsPopup}
            showOptionsPopup={showOptionsPopup}
            targetUser={targetUser}
          />
        </div>
        {tweetObj.aReplyTo && (
          <div className='replying-to-info'>
            Replying to{' '}
            <span className='profile-link username'>
              @{tweetObj.aReplyTo.USER_NAME}
            </span>
          </div>
        )}
        <FormattedText
          textArr={textArr}
          itemID={TWEET_ID}
          customClass={customClass}
        />

        <div
          className={`${customClass}-item-time grey`}
          title={getTimeString(timestamp)}
        >
          {getTimeString(timestamp)}{' '}
        </div>
        <div className={`${customClass}-item-stats`}>
          <span className='views grey'>
            <span className='views-number'>{views}</span> Views
          </span>
          <span className='retweets grey'>
            <span className='retweets-number'>{retweets}</span> Retweets
          </span>
          <span className='likes grey'>
            <span className='likes-number'>{likes}</span> Likes
          </span>
        </div>
        <div className={`${customClass}-item-buttons`}>
          <button
            type='button'
            className={`btn-replies grey ${
              checkUserAlreadyReplied(fetchedReplies) ? 'replied' : ''
            }`}
          >
            <span className='btn-blue'>
              <FontAwesomeIcon icon={faComment} />
            </span>
          </button>
          <button type='button' className='btn-retweets grey'>
            <span className='btn-green'>
              <FontAwesomeIcon icon={faRetweet} />
            </span>
          </button>
          <button
            type='button'
            className='btn-likes grey'
            onClick={handleLike}
            ref={likesRef}
          >
            <span className='btn-red'>
              <FontAwesomeIcon icon={faHeart} />
            </span>
          </button>
          <button type='button' className='btn-shares grey'>
            <span className='btn-blue'>
              <FontAwesomeIcon icon={faArrowUpFromBracket} />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainTweet;
