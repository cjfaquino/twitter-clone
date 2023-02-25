import React from 'react';

const TweetHandlerContext = React.createContext({
  add: () => {},
  delete: () => {},
} as { add: Function; delete: Function });

export default TweetHandlerContext;
