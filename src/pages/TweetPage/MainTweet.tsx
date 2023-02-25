import React, { useContext, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart } from '@fortawesome/free-regular-svg-icons';
import {
  faArrowUpFromBracket,
  faRetweet,
} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate, useParams } from 'react-router-dom';
import deleteTweet from '../../utils/tweets/deleteTweet';
import useToggle from '../../hooks/useToggle';
import getTimeString from '../../utils/formatters/getTimeString';
import updateView from '../../utils/tweets/updateView';
import checkMatchingUser from '../../utils/user/checkMatchingUser';
import getUserUid from '../../utils/user/getUserUid';
import likeTweet from '../../utils/likes/likeTweet';
import undoLike from '../../utils/likes/undoLike';
import checkAlreadyLiked from '../../utils/likes/checkAlreadyLiked';
import isUserSignedIn from '../../utils/user/isUserSignedIn';
import OptionsPopup from '../../components/OptionsPopup';
import FormattedText from '../../components/FormattedText';
import useFindByUsername from '../../hooks/useFindByUsername';
import { TweetObj } from '../../interfaces/TweetObj';
import checkUserAlreadyReplied from '../../utils/tweets/checkUserAlreadyReplied';
import ProfileContext from '../../context/ProfileContext';
import fancyNumbers from '../../utils/formatters/fancyNumbers';
import checkAlreadyRetweeted from '../../utils/retweets/checkAlreadyRetweeted';
import undoRetweet from '../../utils/retweets/undoRetweet';
import retweet from '../../utils/retweets/retweet';

interface IProps {
  tweetObj: TweetObj;
  fetchedReplies: TweetObj[];
}

const MainTweet = ({ tweetObj, fetchedReplies }: IProps) => {
  const navigate = useNavigate();
  const params = useParams();
  const targetUser = useFindByUsername(params.username!);
  const [showOptionsPopup, toggleOptionsPopup] = useToggle(false);
  const [likes, setLikes] = useState<number>(tweetObj.likes);
  const [retweets, setRetweets] = useState(tweetObj.retweets);
  const userProfile = useContext(ProfileContext);
  const tweetRef = useRef(null);

  const customClass = 'main-tweet';

  useEffect(() => {
    if (!tweetObj) return undefined;

    // increase view after small delay
    const timeoutId = setTimeout(() => {
      updateView(tweetObj);
    }, 500);

    // dynamically scroll past .replying-to-tweet-item on load
    if (tweetObj.aReplyTo && tweetRef.current) {
      const replyingTo = (
        tweetRef.current as HTMLElement
      ).parentNode!.querySelector('.replying-to-tweet-item')!;
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
    text,
    imgURL,
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

    if (checkAlreadyLiked(TWEET_ID, userProfile)) {
      // already liked
      await undoLike(TWEET_ID);
      setLikes((prev) => prev - 1);
    } else {
      // not yet liked
      await likeTweet(tweetObj);
      setLikes((prev) => prev + 1);
    }

    return undefined;
  };

  const handleRetweets = async () => {
    if (!isUserSignedIn()) return navigate('/login');

    if (checkAlreadyRetweeted(TWEET_ID, userProfile)) {
      // already retweeted
      // use original tweet if aRetweetOf
      // use current tweet if not
      const twtRef = (tweetObj.aRetweetOf && tweetObj.aRetweetOf) || tweetObj;
      await undoRetweet(twtRef, userProfile);
      setRetweets((prev) => prev - 1);
    } else {
      // not yet retweeted
      await retweet(tweetObj);
      setRetweets((prev) => prev + 1);
    }
    return undefined;
  };

  const handleShare = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget as HTMLElement;
    const btnText = btn.querySelector('.extra-btn-text')!;

    // copy link to tweet page and write to clipboard
    const linkText = `${window.location.origin}/${USER_NAME}/tweet/${TWEET_ID}`;
    await navigator.clipboard.writeText(linkText);

    // show link is copied
    btn.classList.add('copied');
    btnText.textContent = 'copied';
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
        {tweetObj.aReplyTo && !tweetObj.aReplyTo.id.startsWith('null') && (
          <div className='replying-to-info'>
            Replying to{' '}
            <Link
              to={`/${tweetObj.aReplyTo.USER_NAME}`}
              className='username-link'
            >
              @{tweetObj.aReplyTo.USER_NAME}
            </Link>
          </div>
        )}
        <FormattedText
          text={text}
          itemID={TWEET_ID}
          customClass={customClass}
        />
        {imgURL && (
          <div className='tweet-img-container'>
            <img src={imgURL} alt='' />
          </div>
        )}

        <div
          className={`${customClass}-item-time grey`}
          title={getTimeString(timestamp)}
        >
          {getTimeString(timestamp)}{' '}
        </div>
        <div className={`${customClass}-item-stats`}>
          <span className='views grey'>
            <span className='views-number'>{fancyNumbers(views, true)}</span>{' '}
            Views
          </span>
          <span className='retweets grey'>
            <span className='retweets-number'>
              {fancyNumbers(retweets, true)}
            </span>{' '}
            Retweets
          </span>
          <Link to='likes' className='likes grey'>
            <span className='likes-number'>{fancyNumbers(likes, true)}</span>{' '}
            Likes
          </Link>
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
          <button
            type='button'
            className={`btn-retweets grey ${
              checkAlreadyRetweeted(TWEET_ID, userProfile) ? 'retweeted' : ''
            }`}
            onClick={handleRetweets}
          >
            <span className='btn-green'>
              <FontAwesomeIcon icon={faRetweet} />
            </span>
          </button>
          <button
            type='button'
            className={`btn-likes grey ${
              checkAlreadyLiked(TWEET_ID, userProfile) ? 'liked' : ''
            }`}
            onClick={handleLike}
          >
            <span className='btn-red'>
              <FontAwesomeIcon icon={faHeart} />
            </span>
          </button>
          <button
            type='button'
            className='btn-shares grey'
            onClick={handleShare}
          >
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
