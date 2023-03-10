import Link from 'next/link';
import styles from '../../styles/components/Header.module.css';

type HeaderProps = {
  isHome?: boolean;
};

const Header = ({ isHome }: HeaderProps) => (
  <header className={styles.header}>
    {isHome && (
      <Link href='/'>
        <a>Home</a>
      </Link>
    )}
    <Link href='/'>
      <a className={styles.header__title}>Rick and Morty</a>
    </Link>
  </header>
);

export default Header;
