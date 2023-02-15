// Delete a Message from the UI.
const deleteTweetFromDOM = (id: string) => {
  const div = document.getElementById(id);
  // If an element for that message exists we delete it.
  if (div) {
    // will remove the tweet container
    div.parentNode!.removeChild(div);
  }
};

export default deleteTweetFromDOM;
