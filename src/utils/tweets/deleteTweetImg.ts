import { deleteObject, ref } from 'firebase/storage';
import { storage } from '../../firebase-config';
import getUserUid from '../user/getUserUid';
import isUserSignedIn from '../user/isUserSignedIn';

export default (tweetID: string) => {
  if (!isUserSignedIn()) return;

  const imageRef = ref(
    storage,
    `/users/${getUserUid()}/tweets/${tweetID}/image`
  );

  deleteObject(imageRef)
    .then(() => {
      console.log('deleted');
    })
    .catch((er) => {
      console.log(er);
    });
};
