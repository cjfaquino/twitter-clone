import CustomError from '../classes/CustomError';
import DisplayName from '../classes/DisplayName';

export default (name: string) => {
  const long = name.length <= DisplayName.max;
  const short = name.length >= DisplayName.min;

  let errorMessage: string;
  if (!long) errorMessage = 'too long';
  if (!short) errorMessage = 'too short';

  const validity = long && short;
  if (!validity) throw new CustomError(errorMessage!, 'DisplayName Error');

  return validity;
};
