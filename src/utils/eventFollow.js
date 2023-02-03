const eventFollow = (userID) => {
  const event = new Event(`change follow for ${userID}`);
  document.dispatchEvent(event);
};

export default eventFollow;
