import { useEffect } from 'react';

const useWindowTitle = (title?: string | boolean | undefined | null) => {
  useEffect(() => {
    const app = import.meta.env.VITE_APP_NAME;
    if (title) {
      document.title = `${title} / ${app}`;
    } else {
      document.title = app;
    }

    return () => {
      document.title = app;
    };
  }, [title]);
};

export default useWindowTitle;
