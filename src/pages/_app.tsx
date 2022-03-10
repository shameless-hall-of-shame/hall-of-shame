import Head from 'next/head';
import type {AppProps} from 'next/app';

import Layout from '../components/Layout';

import '../styles/global.css';

function MyApp({Component, pageProps}: AppProps) {
  return (
    <Layout>
      <Head>
        <title>Hall of Shame</title>
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
