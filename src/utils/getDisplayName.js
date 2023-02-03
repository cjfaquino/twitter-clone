import { getAuth } from 'firebase/auth';

// Returns the signed-in user's display name.

const getDisplayName = () => getAuth().currentUser.displayName;

export default getDisplayName;
