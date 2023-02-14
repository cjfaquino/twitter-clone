import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firebase-config';

export default async (storageFilePath: string, file: File): Promise<string> => {
  try {
    // upload img to firebase cloud storage
    const newImageRef = ref(storage, storageFilePath);
    await uploadBytesResumable(newImageRef, file);

    // get public URL for new file
    const publicURL = await getDownloadURL(newImageRef);

    return publicURL;
  } catch (error) {
    console.log(error);
    return '';
  }
};
