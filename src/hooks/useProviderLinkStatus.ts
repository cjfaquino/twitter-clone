import { User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import checkOnlyLinkedProviders from '../utils/auth/checkOnlyLinkedProvider';
import linkWithProvider from '../utils/auth/linkWithProvider';
import setErrorMessage from '../utils/setErrorMessage';
import unlinkProvider from '../utils/auth/unlinkProvider';

export default function useProviderLinkStatus(
  currentUser: User | null,
  providerName: string
): [
  boolean | null,
  React.MouseEventHandler<HTMLButtonElement>,
  React.Dispatch<React.SetStateAction<boolean | null>>
] {
  const [link, setLink] = useState<boolean | null>(null);

  const checkLinkedProviders = () =>
    currentUser &&
    currentUser.providerData.some((item) => item.providerId === providerName);

  const updateLink = () => {
    const result = checkLinkedProviders();
    setLink(result);
  };

  const handleLink = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btnText = (e.target as HTMLElement).textContent!;

    // clear error
    setErrorMessage('.link-accounts .error', '');

    // link new provider
    if (btnText.includes('Link')) return linkWithProvider(providerName);

    // if the only provider linked
    if (
      btnText.includes('Unlink') &&
      checkOnlyLinkedProviders(currentUser, providerName)
    ) {
      return setErrorMessage(
        '.link-accounts .error',
        'Please set up another way to login before unlinking the only provider'
      );
    }

    // unlink provider
    if (btnText.includes('Unlink')) {
      return unlinkProvider(providerName);
    }

    return undefined;
  };

  useEffect(() => {
    updateLink();

    document.addEventListener(`${providerName} link changed`, updateLink);
    return () => {
      document.removeEventListener(`${providerName} link changed`, updateLink);
    };
  }, [currentUser]);

  return [link, handleLink, setLink];
}
