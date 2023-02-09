const eventProfileEdit = (): void => {
  const event = new Event('profile edit');
  document.dispatchEvent(event);
};

export default eventProfileEdit;
