import { getAuth } from 'firebase/auth';

// Returns the signed-in user's profile Pic URL.
// If null, use placeholder img

const getProfilePicUrl = (): string =>
  (getAuth().currentUser && getAuth().currentUser!.photoURL) ||
  'https://firebasestorage.googleapis.com/v0/b/twitter-clone-a66e7.appspot.com/o/user-icon.jpg?alt=media&token=8fbc3650-f297-4cd8-a996-a84470c488b5';

export default getProfilePicUrl;
