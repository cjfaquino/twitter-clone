import { useState } from 'react';

function useInput(intialValue = '') {
  const [value, setValue] = useState(intialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return [value, handleChange, setValue];
}

export default useInput;
