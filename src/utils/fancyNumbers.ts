export default (number?: number): string => {
  if (number === undefined || number < 1) return '';

  let formatted = new Intl.NumberFormat('en-us').format(number);
  const { length } = number.toString();

  if (length >= 5) {
    formatted = `${formatted.replace(',', '.').slice(0, -2)}`;
    formatted += 'K';
  }

  if (length >= 7) {
    formatted = formatted.slice(0, -5);
    formatted += 'M';
  }

  if (length >= 10) {
    formatted = formatted.slice(0, -5);
    formatted += 'B';
  }

  return formatted;
};
