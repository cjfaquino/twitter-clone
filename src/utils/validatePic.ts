import CustomError from '../classes/CustomError';

export default (img: File) => {
  const smallSize = img.size <= 1024 * 1024 * 5;
  const type = img.type === 'image/jpeg' || img.type === 'image/webp';

  let errorMessage: string;

  if (!smallSize) errorMessage = 'the image was too large';
  if (!type) errorMessage = 'will only take jpeg or webp images';

  const validity = smallSize && type;
  if (!validity) throw new CustomError(errorMessage!, 'Pic Error');

  return validity;
};
