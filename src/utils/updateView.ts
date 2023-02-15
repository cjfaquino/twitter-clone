import { TweetObj } from '../interfaces/TweetObj';
import increaseViewCount from './increaseViewCount';

const updateView = async (tweetObj: TweetObj) => {
  const viewsDOM = document.querySelector(
    `div.main-tweet-item-stats > span.views > span.views-number`
  )!;
  await increaseViewCount(tweetObj);
  viewsDOM.textContent = (Number(viewsDOM.textContent) + 1).toString();
};

export default updateView;
