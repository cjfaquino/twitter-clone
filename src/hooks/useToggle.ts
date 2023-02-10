import { useState, useCallback } from 'react';

export default function useToggle(
  initialState: boolean | undefined = false
): [boolean, React.MouseEventHandler] {
  const [state, setState] = useState(initialState);

  // Define and memorize toggler function in case we pass down the component,
  // This function change the boolean value to it's opposite value
  const toggle = useCallback(() => setState((prev) => !prev), []);

  return [state, toggle];
}
