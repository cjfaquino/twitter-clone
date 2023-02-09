import { User } from 'firebase/auth';

export default function checkOnlyLinkedProviders(
  user: User,
  providerName: string
) {
  return (
    user &&
    user.providerData.length === 1 &&
    user.providerData.some((provider) => provider.providerId === providerName)
  );
}
