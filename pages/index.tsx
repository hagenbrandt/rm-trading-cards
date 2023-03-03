import styles from './page.module.css';
import { GetStaticProps } from 'next';
import { gql } from '@apollo/client';
import { getApolloClient } from '../src/utils';

type CharacterJSON = {
  __typename: string;
  name: String;
};

type HomeProps = {
  characters: CharacterJSON[];
};

export default function Home({ characters }: HomeProps) {
  console.log('Characters: ', characters);

  return (
    <main className={styles.main}>
      <h1>Rick & Morty Character</h1>
      {renderCharacterList(characters)}
    </main>
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
  const client = getApolloClient('https://rickandmortyapi.com/graphql');

  if (client) {
    const { data } = await client.query({
      query: gql`
        query {
          characters {
            results {
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
