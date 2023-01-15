// Delete a Message from the UI.
const deleteTweetFromDOM = (id) => {
  const div = document.getElementById(id);
  // If an element for that message exists we delete it.
  if (div) {
    div.parentNode.removeChild(div);
  }
};

export default deleteTweetFromDOM;
