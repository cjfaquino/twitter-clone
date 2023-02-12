import algoliasearch from 'algoliasearch';

const client = algoliasearch(
  'C0R5HQD0V7',
  import.meta.env.VITE_ALGOLIA_API_KEY
);

export const indexTweets = client.initIndex('tweets');
export const indexUsers = client.initIndex('users');

// index
//   .search('samsung', { attributesToRetrieve: ['name'], hitsPerPage: 10 })
//   .then(({ hits }) => console.log(hits));
