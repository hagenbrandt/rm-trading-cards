import { getApolloClient, imagePreLoader } from '../../src/utils';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import ImageComponent from 'next/image';
import { apiUri } from '../../src/constants';
import { gql } from '@apollo/client';
import { ID } from '../../src/types';
import Layout from '../../src/layout/Layout';

type Character = {
  __typename: 'Character';
  name: string;
  status: string;
  species: string;
  gender: string;
  origin: ID;
  location: ID;
  image: string;
  episode: ID[];
};

const Card = (character: Character) => {
  if (!character) {
    return <></>;
  }

  return (
    <Layout>
      <Head>
        <title>{character.name}</title>
      </Head>
      <ImageComponent
        loader={imagePreLoader}
        src={character.image}
        width={400}
        height={400}
      />
      <h1>{character.name}</h1>
      <ul>
        <li>{character.status}</li>
        <li>{character.species}</li>
        <li>{character.gender}</li>
      </ul>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const client = getApolloClient(apiUri);

  if (client && params) {
    const { data }: { data: { charactersByIds: Character[] } } =
      await client.query({
        query: gql`
            query {
                charactersByIds(ids: [${params.id}]) {
                    name
                    status
                    species
                    gender
                    origin {
                        id
                    }
                    location {
                        id
                    }
                    image
                    episode {
                        id
                    }
                }
            }
      `,
      });

    return {
      props: data.charactersByIds[0],
    };
  }

  return {
    props: {},
  };
};

export default Card;
