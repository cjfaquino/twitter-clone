import { TweetObj } from '../interfaces/TweetObj';
import fancyNumbers from './fancyNumbers';
import increaseViewCount from './increaseViewCount';

const updateView = async (tweetObj: TweetObj) => {
  const viewsDOM = document.querySelector(
    `div.main-tweet-item-stats > span.views > span.views-number`
  )!;
  await increaseViewCount(tweetObj);
  viewsDOM.textContent = fancyNumbers(tweetObj.views + 1);
};

export default updateView;
