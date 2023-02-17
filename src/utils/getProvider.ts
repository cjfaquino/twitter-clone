import { GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';

export default (providerName: string) => {
  let provider;
  switch (providerName) {
    case 'google.com':
      provider = new GoogleAuthProvider();
      break;

    case 'github.com':
      provider = new GithubAuthProvider();
      break;

    default:
      throw Error('No provider');
  }

  return provider;
};
