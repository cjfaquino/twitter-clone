export default function findDuplicatesByField(
  array1: any[],
  array2: any[],
  field: string
) {
  return array1.filter((item) => array2.find((t) => t[field] === item[field]));
}
