import { sendEmailVerification as sendEmail } from 'firebase/auth';
import { auth } from '../firebase-config';

export default function sendEmailVerification() {
  sendEmail(auth.currentUser!)
    .then(() => {
      // Email verification sent!
      // ...
    })
    .catch((error) => {
      console.log(error);
    });
}
