import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ImageLoaderProps } from 'next/image';

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

/**
 * Returns an image loader to preload images for the image component from
 * nex.js.
 * @param {ImageLoaderProps} {src, width, quality} - image data to preload an image
 */
export const imagePreLoader = ({ src, width, quality }: ImageLoaderProps) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};
