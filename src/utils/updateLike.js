import likeTweet from './likeTweet';
import undoLike from './undoLike';
import checkAlreadyLiked from './checkAlreadyLiked';

const updateLike = async (tweetObj) => {
  const likesDOM = document.querySelector(`#${tweetObj.id} .likes-number`);

  if (!(await checkAlreadyLiked(tweetObj.id))) {
    // not yet liked
    await likeTweet(tweetObj);
    likesDOM.textContent = Number(likesDOM.textContent) + 1;
  } else {
    // already liked
    await undoLike(tweetObj);
    likesDOM.textContent = Number(likesDOM.textContent) - 1;
  }
};

export default updateLike;
