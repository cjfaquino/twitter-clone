import { auth } from '../firebase-config';

// Returns the signed-in user's display name.

const getDisplayName = () => auth.currentUser && auth.currentUser!.displayName;

export default getDisplayName;
