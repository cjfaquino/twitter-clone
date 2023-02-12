export default function findDuplicatesByField(
  array1: any[],
  array2: any[],
  field: string,
  field2?: string
) {
  return array1.filter((item) =>
    array2.find((t) => t[field2 || field] === item[field])
  );
}
