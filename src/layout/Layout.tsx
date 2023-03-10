import Header from '../components/Header';
import Head from 'next/head';
import styles from '../../styles/pages/Layout.module.css';

type LayoutProps = {
  children: React.ReactNode;
  home?: boolean;
};

const Layout = ({ children, home }: LayoutProps) => (
  <>
    <Head>
      <title>{siteTitle}</title>
      <meta name='description' content={siteDescription} />
      <link rel='icon' href='../icons/favicon.ico' />
    </Head>
    <Header isHome={home} />
    <main className={styles.main}>{children}</main>
    <footer className={styles.footer}></footer>
  </>
);

export const siteTitle = 'Rick and Morty - Trading Cards';
export const siteDescription =
  'An app to collect and play with cards from Rick and Morty';

export default Layout;
