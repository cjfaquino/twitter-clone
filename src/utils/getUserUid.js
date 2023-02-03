import { getAuth } from 'firebase/auth';

// Returns the signed-in user's display name.

const getUserUid = async () => {
  const cUser = JSON.parse(localStorage.getItem('firebaseUser'));

  return cUser ? cUser.uid : getAuth().currentUser.uid;
};

export default getUserUid;
