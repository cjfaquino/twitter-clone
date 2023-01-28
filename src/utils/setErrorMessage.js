const setErrorMessage = (cssSelector, text) => {
  const error = document.querySelector(cssSelector);
  error.textContent = text;
};

export default setErrorMessage;
