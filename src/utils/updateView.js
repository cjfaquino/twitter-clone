import increaseViewCount from './increaseViewCount';

const updateView = async (tweetObj) => {
  const viewsDOM = document.querySelector(
    `div.main-tweet-item-stats > span.views > span.views-number`
  );
  await increaseViewCount(tweetObj);
  viewsDOM.textContent = Number(viewsDOM.textContent) + 1;
};

export default updateView;
