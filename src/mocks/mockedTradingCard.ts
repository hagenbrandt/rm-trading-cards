import { CharacterJSON } from '../types';

export const mockedTradingCard: CharacterJSON = {
  __typename: 'Character',
  id: '/1',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  name: 'Rick Sanchez',
};

export const mockedTradingCards: CharacterJSON[] = [
  mockedTradingCard,
  {
    __typename: 'Character',
    id: '2',
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
    name: 'Morty Smith',
  },
];
