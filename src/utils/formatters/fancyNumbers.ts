export default (number?: number, returnZero?: boolean): string => {
  if (number === undefined || (!returnZero && number < 1)) return '';
  if (returnZero && number < 1) return '0';

  const formatted = new Intl.NumberFormat(undefined, {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(number);

  return formatted;
};
