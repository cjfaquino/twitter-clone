const setErrorMessage = (cssSelector: string, text: string) => {
  const error = document.querySelector(cssSelector);
  error!.textContent = text;
};

export default setErrorMessage;
