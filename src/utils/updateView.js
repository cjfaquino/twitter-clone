import increaseViewCount from './increaseViewCount';

const updateView = async (tweetObj) => {
  const viewsDOM = document.querySelector(`#${tweetObj.id} .views-number`);
  await increaseViewCount(tweetObj);
  viewsDOM.textContent = Number(viewsDOM.textContent) + 1;
};

export default updateView;
