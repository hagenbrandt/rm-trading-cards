import { GetStaticProps } from 'next';
import { gql } from '@apollo/client';
import { getApolloClient } from '../src/utils';
import { CharacterJSON } from '@/types';
import TradingCardList from '../src/components/TradingCardList';
import Layout from '../src/layout/Layout';
import { apiUri } from '../src/constants';

type HomeProps = {
  characters: CharacterJSON[];
};

export default function Home({ characters }: HomeProps) {
  return (
    <Layout home>
      <TradingCardList cards={characters} />
    </Layout>
  );
}

export const renderCharacterList = (characters: CharacterJSON[]) => {
  if (!characters.length) {
    return <p>Sorry no characters found</p>;
  }

  return (
    <ul>
      {characters.map((character, index) => (
        <li key={`${character.name}-${index}`}>{character.name}</li>
      ))}
    </ul>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const client = getApolloClient(apiUri);

  if (client) {
    const { data } = await client.query({
      query: gql`
        query {
          characters {
            results {
              id
              image
              name
            }
          }
        }
      `,
    });

    return {
      props: {
        characters: data.characters.results,
      },
    };
  }

  return {
    props: {
      characters: [],
    },
  };
};
