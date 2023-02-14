import { useLayoutEffect, useState } from 'react';

export default (delayMsec: number, condition: boolean, dependency: any) => {
  const [state, setState] = useState(false);
  useLayoutEffect(() => {
    let timer: NodeJS.Timeout;
    if (condition) {
      timer = setTimeout(() => {
        setState(true);
      }, delayMsec);
    }
    return () => {
      clearInterval(timer);
      setState(false);
    };
  }, [dependency]);

  return state;
};
