const eventFollow = (userID: string) => {
  const event = new Event(`change follow for ${userID}`);
  document.dispatchEvent(event);
};

export default eventFollow;
