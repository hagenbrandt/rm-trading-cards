import { ApolloClient, InMemoryCache } from '@apollo/client';

/**
 * Creates an Apollo Client to fetch data. The passed
 * uri is used to fetch data from this adress.
 * @param {string} apiUri - the uri to fetch data from
 */
export const getApolloClient = (apiUri: string) => {
  if (!apiUri.includes('http')) {
    return;
  }

  return new ApolloClient({
    uri: apiUri,
    cache: new InMemoryCache(),
  });
};
