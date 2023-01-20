const getTimeString = (timestamp, format) => {
  if (!format) {
    return timestamp.toDate
      ? timestamp.toDate().toLocaleString()
      : new Date().toLocaleString();
  }
  if (format === 'localeDate') {
    return timestamp.toDate
      ? timestamp.toDate().toLocaleDateString()
      : new Date().toLocaleDateString();
  }
  return '';
};

export default getTimeString;
