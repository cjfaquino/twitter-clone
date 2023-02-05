import { useEffect, useState } from 'react';

function useInput(intialValue = '') {
  const [value, setValue] = useState(intialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      console.log(value);
      // some function here
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [value]);

  return [value, handleChange, setValue];
}

export default useInput;
