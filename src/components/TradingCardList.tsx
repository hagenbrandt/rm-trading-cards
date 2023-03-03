import { HeadlineTypes } from '../types';
import TradingCard from './TradingCard';
import styles from '../../styles/components/TradingCardList.module.css';
import { CharacterJSON } from '../types';

type CardsListProps = {
  cards: Omit<CharacterJSON, '__typename'>[];
  preLinkParam?: string;
  headlineType?: HeadlineTypes;
};

const CardsList = ({ cards, preLinkParam, headlineType }: CardsListProps) => {
  return (
    <ul className={styles.list}>
      {cards.map((item, index) => {
        return (
          <TradingCard
            title={{
              headlineText: item.name,
              headlineType: headlineType ?? 'h2',
            }}
            image={{ url: item.image, width: 300, height: 300 }}
            id={item.id}
            preLinkParam={preLinkParam}
            key={index}
          />
        );
      })}
    </ul>
  );
};

export default CardsList;
