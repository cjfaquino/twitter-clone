export default function getTagsFromTextArray(text: string[]): string[] {
  const filtered = text.filter((word) => word.startsWith('#'));
  const lowered = filtered.map((word) => word.toLowerCase());
  return [...new Set(lowered)];
}
