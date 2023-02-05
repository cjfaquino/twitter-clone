import setErrorMessage from './setErrorMessage';
import checkUserNameAlreadyExists from './checkUsernameAlreadyExists';

const validateUsername = async (
  username: string,
  min: number,
  max: number
): Promise<boolean> => {
  const regex = /^[a-zA-Z][a-zA-Z0-9_]+$/;

  const minLength: boolean = username.length >= min;
  const maxLength: boolean = username.length <= max;
  const nameRegex: boolean = regex.test(username);
  const exists: boolean = await checkUserNameAlreadyExists(username);

  let errorMessage: string = '';

  if (!nameRegex) errorMessage = 'only letters, numbers, & underscores allowed';
  if (!minLength) errorMessage = `minimum of ${min} characters`;
  if (!maxLength) errorMessage = `maximum of ${max} characters`;
  if (exists) errorMessage = 'already exists';

  setErrorMessage('.verify-username', errorMessage);

  return !exists && minLength && maxLength && nameRegex;
};

export default validateUsername;
