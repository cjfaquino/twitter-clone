import { getAuth, sendEmailVerification as sendEmail } from 'firebase/auth';

export default function sendEmailVerification() {
  const auth = getAuth();
  sendEmail(auth.currentUser!)
    .then(() => {
      // Email verification sent!
      // ...
    })
    .catch((error) => {
      console.log(error);
    });
}
