import { useState } from 'react';

function useInput(
  initialValue: string = ''
): [
  string,
  React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
  React.Dispatch<React.SetStateAction<string>>
] {
  const [value, setValue] = useState<string>(initialValue);

  const handleChange = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue((e.target as HTMLInputElement).value);
  };

  return [value, handleChange, setValue];
}

export default useInput;
