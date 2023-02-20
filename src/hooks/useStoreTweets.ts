import { useEffect } from 'react';
import { TweetObj } from '../interfaces/TweetObj';

export default (
  tweets: TweetObj[],
  setState: React.Dispatch<React.SetStateAction<TweetObj[]>>
) => {
  useEffect(() => {
    setState(tweets);

    return () => {
      setState(tweets);
    };
  }, [tweets]);
};
