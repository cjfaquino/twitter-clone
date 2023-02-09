export default function firebaseErrorMessage(errorCode: string) {
  let message;

  switch (errorCode) {
    case 'auth/popup-closed-by-user':
      message = 'Popup closed by user';
      break;

    case 'auth/credential-already-in-use':
      message = 'An account with these credentials already exists';
      break;

    case 'auth/invalid-password':
      message = 'The provided email/password is invalid';
      break;

    case 'auth/wrong-password':
      message = 'The provided email/password is invalid';
      break;

    case 'auth/user-not-found':
      message = 'The user does not exist';
      break;

    case 'auth/account-exists-with-different-credential':
      message = 'The user exists with different credentials';
      break;

    default:
      message = 'Something went wrong. Please try again.';
      console.log(errorCode);
      break;
  }

  return message;
}
