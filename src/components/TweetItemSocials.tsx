import { faComment, faHeart } from '@fortawesome/free-regular-svg-icons';
import {
  faArrowUpFromBracket,
  faChartSimple,
  faRetweet,
} from '@fortawesome/free-solid-svg-icons';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Tweet from '../classes/Tweet';
import TweetHandlerContext from '../context/TweetHandlerContext';
import { TargetUser } from '../interfaces/TargetUser';
import { TweetObj } from '../interfaces/TweetObj';
import { UserProfile } from '../interfaces/UserProfile';
import checkAlreadyLiked from '../utils/likes/checkAlreadyLiked';
import likeTweet from '../utils/likes/likeTweet';
import undoLike from '../utils/likes/undoLike';
import checkAlreadyRetweeted from '../utils/retweets/checkAlreadyRetweeted';
import retweet from '../utils/retweets/retweet';
import undoRetweet from '../utils/retweets/undoRetweet';
import checkUserAlreadyReplied from '../utils/tweets/checkUserAlreadyReplied';
import isUserSignedIn from '../utils/user/isUserSignedIn';
import TweetItemButton from './TweetItemButton';

interface IProps {
  customClass: string;
  tweetObj: TweetObj;
  targetUser: TargetUser;
  userProfile: UserProfile;
  replies: TweetObj[];
  likes: number;
  views: number;
  retweets: number;
  setLikes: React.Dispatch<React.SetStateAction<number>>;
  setRetweets: React.Dispatch<React.SetStateAction<number>>;
}

const TweetItemSocials = ({
  customClass,
  tweetObj,
  replies,
  userProfile,
  targetUser,
  likes,
  views,
  retweets,
  setLikes,
  setRetweets,
}: IProps) => {
  const navigate = useNavigate();
  const tweetHandler = useContext(TweetHandlerContext);

  const handleLike = async () => {
    if (!isUserSignedIn()) return navigate('/login');

    if (checkAlreadyLiked(tweetObj.id, userProfile)) {
      // already liked
      await undoLike(tweetObj.id);
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

    if (checkAlreadyRetweeted(tweetObj.id, userProfile)) {
      // already retweeted
      // use original tweet if aRetweetOf
      // use current tweet if not
      const tweetRef = (tweetObj.aRetweetOf && tweetObj.aRetweetOf) || tweetObj;
      await undoRetweet(tweetRef, userProfile);
      // remove from feed if clicked on retweet
      if (tweetObj.aRetweetOf) {
        tweetHandler.delete(tweetObj.id);
      }
      // update original tweets retweets count
      setRetweets((prev) => prev - 1);
    } else {
      // not yet retweeted
      const docID = await retweet(tweetObj);
      // add to top of feed
      const temp = new Tweet({
        messageText: '',
        messageImg: tweetObj.imgURL,
        aRetweetOf: tweetObj,
      });
      const newTwt = { id: docID, ...temp } as TweetObj;
      tweetHandler.add(newTwt);
      // update retweet count
      setRetweets((prev) => prev + 1);
    }
    return undefined;
  };

  const handleShare = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget as HTMLElement;
    const btnText = btn.querySelector('.extra-btn-text')!;

    // show link is copied
    btn.classList.add('copied');
    btnText.textContent = 'copied';

    // copy link to tweet page and write to clipboard
    const linkText = `${window.location.origin}/${targetUser.userProfile.userName}/tweet/${tweetObj.id}`;
    navigator.clipboard.writeText(linkText);
  };

  return (
    <div className={`${customClass}-item-buttons`}>
      <TweetItemButton
        className={`btn-replies grey ${
          checkUserAlreadyReplied(replies as TweetObj[]) ? 'replied' : ''
        }`}
        handleClick={() =>
          navigate(`/${targetUser.userProfile.userName}/tweet/${tweetObj.id}`)
        }
        color='blue'
        icon={faComment}
        type='replies'
        number={replies.length}
      />

      <TweetItemButton
        className={`btn-retweets grey ${
          checkAlreadyRetweeted(tweetObj.id, userProfile) ? 'retweeted' : ''
        }`}
        handleClick={handleRetweet}
        disabled={
          (!tweetObj.aRetweetOf && tweetObj.USER_ID === userProfile.id) ||
          (tweetObj.aRetweetOf! &&
            tweetObj.aRetweetOf.USER_ID === userProfile.id)
        }
        color='green'
        icon={faRetweet}
        type='retweets'
        number={retweets}
      />

      <TweetItemButton
        className={`btn-likes grey ${
          checkAlreadyLiked(tweetObj.id, userProfile) ? 'liked' : ''
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
  );
};

export default TweetItemSocials;
