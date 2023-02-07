export default function textToCleanedTextArray(text: string): Array<string> {
  const trimmed = text.trim(); // Trim white spaces in the beginning & end
  const cleanedArr = trimmed
    .replace(/ +/g, ' ') // Prevent more than 1 space
    .replace(/(\r?\n){3,}/g, '\n\n') // Prevent more than 2 line breaks
    .split(/(\s+|\n)/); // split into an array by space or line break for firebase searching
  return cleanedArr;
}
