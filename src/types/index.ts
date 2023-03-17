export type CharacterJSON = {
  __typename: string;
  id: string;
  image: string;
  name: string;
};

export type HeadlineTypes = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type ID = {
  id: string;
};

export type Image = {
  url: string;
  width: number;
  height: number;
};
