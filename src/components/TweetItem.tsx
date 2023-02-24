import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { faComment, faHeart } from '@fortawesome/free-regular-svg-icons';
import {
  faArrowUpFromBracket,
  faChartSimple,
  faRetweet,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import deleteTweet from '../utils/tweets/deleteTweet';
import OptionsPopup from './OptionsPopup';
import useToggle from '../hooks/useToggle';
import getTimeString from '../utils/formatters/getTimeString';
import checkMatchingUser from '../utils/user/checkMatchingUser';
import deleteTweetFromDOM from '../utils/tweets/deleteTweetFromDOM';
import useReplies from '../hooks/useReplies';
import checkAlreadyLiked from '../utils/likes/checkAlreadyLiked';
import undoLike from '../utils/likes/undoLike';
import likeTweet from '../utils/likes/likeTweet';
import isUserSignedIn from '../utils/user/isUserSignedIn';
import FormattedText from './FormattedText';
import useFindByUsername from '../hooks/useFindByUsername';
import { TweetObj } from '../interfaces/TweetObj';
import checkUserAlreadyReplied from '../utils/tweets/checkUserAlreadyReplied';
import ProfileContext from '../context/ProfileContext';
import { UserProfile } from '../interfaces/UserProfile';
import TweetItemButton from './TweetItemButton';
import checkAlreadyRetweeted from '../utils/retweets/checkAlreadyRetweeted';
import retweet from '../utils/retweets/retweet';
import getUpdatedTweetByID from '../utils/tweets/getUpdatedTweetByID';
import getUpdatedUserByID from '../utils/user/getUpdatedUserByID';

interface IProps {
  tweetObj: TweetObj;
}

const TweetItem = ({ tweetObj }: IProps) => {
  const [likes, setLikes] = useState(tweetObj.likes);
  const [retweets, setRetweets] = useState(tweetObj.retweets);
  const targetUser = useFindByUsername(
    (tweetObj.aRetweetOf && tweetObj.aRetweetOf.USER_NAME) || tweetObj.USER_NAME
  );
  const [showOptionsPopup, toggleOptionsPopup] = useToggle(false);
  const [replies, repliesLoading] = useReplies(tweetObj.id);
  const [retwt, setRetwt] = useState<TweetObj | null>(null);
  const [retweeter, setRetweeter] = useState<UserProfile | null>(null);
  const userProfile: UserProfile = useContext(ProfileContext);
  const navigate = useNavigate();

  const getContents = () => {
    let obj;

    if (retwt) {
      obj = tweetObj.aRetweetOf;
    } else {
      obj = tweetObj;
    }
    return obj;
  };

  const {
    views,
    text,
    imgURL,
    timestamp,
    USER_ID,
    id: TWEET_ID,
  } = getContents()!;

  const customClass = 'tweet';
  const retweeterID = tweetObj.USER_ID;

  if (tweetObj.aRetweetOf && retwt === null) {
    getUpdatedTweetByID(tweetObj.aRetweetOf.id).then((data) => {
      const twt = data as TweetObj;
      setRetwt(twt);
      setLikes(twt.likes);
      setRetweets(twt.retweets);
    });

    getUpdatedUserByID(retweeterID).then((data) =>
      setRetweeter(data as UserProfile)
    );
  }

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

    // prevent errors when svg, path is selected
    if (element.tagName === 'svg' || element.tagName === 'path') return;
    const targetName = element.className;

    // conditions
    const toUser = ['profile-link'];
    const toTweetPage = [
      'info',
      'right-half',
      'left-half',
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

  const handleRetweet = async () => {
    if (!isUserSignedIn()) return navigate('/login');

    if (checkAlreadyRetweeted(TWEET_ID, userProfile)) {
      // already retweeted

      setRetweets((prev) => prev - 1);
    } else {
      // not yet retweeted
      await retweet(tweetObj);
      setRetweets((prev) => prev + 1);
    }
    return undefined;
  };

  if (TWEET_ID.startsWith('null')) {
    // prevent app from crashing when trying to load a tweet that doesn't exist
    return null;
  }

  const handleShare = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget as HTMLElement;
    const btnText = btn.querySelector('.extra-btn-text')!;

    // show link is copied
    btn.classList.add('copied');
    btnText.textContent = 'copied';

    // copy link to tweet page and write to clipboard
    const linkText = `${window.location.origin}/${targetUser.userProfile.userName}/tweet/${TWEET_ID}`;
    navigator.clipboard.writeText(linkText);
  };

  return (
    <div
      className={`${customClass}-item`}
      id={`${customClass}-${TWEET_ID}`}
      onClick={navToPage}
      aria-hidden
    >
      {targetUser.doneLoading && !repliesLoading && (
        <>
          <section className={`${customClass}-item-left-half`}>
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
          </section>

          <section className={`${customClass}-item-right-half`}>
            {retweeter && (
              <div className='retweeter-info grey'>
                <span>
                  <FontAwesomeIcon icon={faRetweet} />
                </span>
                {`${retweeter.displayName} Retweeted`}
              </div>
            )}

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
            {tweetObj.aReplyTo && !tweetObj.aReplyTo.id.startsWith('null') && (
              <div className='replying-to-info'>
                {'Replying to '}
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
            <div className={`${customClass}-item-buttons`}>
              <TweetItemButton
                className={`btn-replies grey ${
                  checkUserAlreadyReplied(replies as TweetObj[])
                    ? 'replied'
                    : ''
                }`}
                handleClick={() =>
                  navigate(
                    `/${targetUser.userProfile.userName}/tweet/${TWEET_ID}`
                  )
                }
                color='blue'
                icon={faComment}
                type='replies'
                number={replies.length}
              />

              <TweetItemButton
                className='btn-retweets grey'
                handleClick={handleRetweet}
                disabled={tweetObj.USER_ID === userProfile.id}
                color='green'
                icon={faRetweet}
                type='retweets'
                number={retweets}
              />

              <TweetItemButton
                className={`btn-likes grey ${
                  checkAlreadyLiked(TWEET_ID, userProfile) ? 'liked' : ''
                }`}
                handleClick={handleLike}
                color='red'
                icon={faHeart}
                type='likes'
                number={likes}
              />

              <TweetItemButton
                className='btn-views grey'
                color='blue'
                icon={faChartSimple}
                type='views'
                number={views}
              />

              <TweetItemButton
                className='btn-shares grey'
                handleClick={handleShare}
                color='blue'
                icon={faArrowUpFromBracket}
                type='copy link'
              />
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default TweetItem;
