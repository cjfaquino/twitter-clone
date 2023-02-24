import CustomError from '../classes/CustomError';
import validateDisplayName from './validateDisplayName';
import validatePic from './validatePic';

interface IArgs {
  bio: string;
  displayName: string;
  backdropImg: File;
  profileImg: File;
  website: string;
  location: string;
}

export default ({
  bio,
  displayName,
  backdropImg,
  profileImg,
  website,
  location,
}: IArgs) => {
  const bioLength = bio.length <= 160;
  const locationLength = location.length <= 30;
  const websiteLength = website.length <= 100;

  if (!bioLength) throw new CustomError('too long', 'Bio Error');
  if (!locationLength) throw new CustomError('too long', 'Location Error');
  if (!websiteLength) throw new CustomError('too long', 'Website Error');

  const validity =
    validatePic(profileImg) &&
    validatePic(backdropImg) &&
    validateDisplayName(displayName) &&
    bioLength &&
    locationLength &&
    websiteLength;

  return validity;
};
