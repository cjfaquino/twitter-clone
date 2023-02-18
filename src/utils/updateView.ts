import { doc, increment, updateDoc } from 'firebase/firestore';
import { TweetObj } from '../interfaces/TweetObj';
import fancyNumbers from './formatters/fancyNumbers';
import { db } from '../firebase-config';

const updateView = async (tweetObj: TweetObj) => {
  try {
    const viewsDOM = document.querySelector(
      `div.main-tweet-item-stats > span.views > span.views-number`
    )!;

    const tweetRef = doc(db, 'tweets', tweetObj.id);
    // increase view of tweet
    await updateDoc(tweetRef, { views: increment(1) });
    viewsDOM.textContent = fancyNumbers(tweetObj.views + 1);
  } catch (error) {
    console.log(error);
  }
};

export default updateView;
