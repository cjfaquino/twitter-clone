export default function getTagsFromTextArray(text: string[]): string {
  const filtered = text.filter((word) => word.startsWith('#'));

  const cleaned = filtered.map((word) => word.toLowerCase().replace(/#/, ''));

  return [...new Set(cleaned)].toString();
}
