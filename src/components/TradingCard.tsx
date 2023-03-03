import ImageComponent from 'next/image';
import Link from 'next/link';
import { imagePreLoader } from '../utils';
import { Image } from '../types';
import Headline, { HeadlineProps } from './Headline';
import styles from '../../styles/components/TradingCard.module.css';

export type TradingCardProps = {
  title: HeadlineProps;
  image: Image;
  id: string;
  preLinkParam?: string;
};

const TradingCard = ({ image, title, id, preLinkParam }: TradingCardProps) => {
  const link = preLinkParam ? `/${preLinkParam}/${id}` : id;

  return (
    <li className={styles.card}>
      <Link href={link}>
        <a className={styles.card__link}>
          <Headline
            headlineText={title.headlineText}
            headlineType={title.headlineType}
            headlineClass={styles.card__headline}
          />
          <ImageComponent
            loader={imagePreLoader}
            src={image.url}
            width={image.width}
            height={image.height}
          />
        </a>
      </Link>
    </li>
  );
};

export default TradingCard;
