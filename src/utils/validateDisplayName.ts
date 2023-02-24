import DisplayName from '../classes/DisplayName';
import DisplayNameError from '../classes/DisplayNameError';

export default (name: string) => {
  const long = name.length <= DisplayName.max;
  const short = name.length >= DisplayName.min;

  let errorMessage: string;
  if (!long) errorMessage = 'too long';
  if (!short) errorMessage = 'too short';

  const validity = long && short;
  if (!validity) throw new DisplayNameError(errorMessage!);

  return validity;
};
