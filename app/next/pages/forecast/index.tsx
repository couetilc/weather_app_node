import Head from 'next/head';
import Main from '@/components/Main';
import { useRouter } from 'next/router'
import Link from 'next/link';

export default function Forecast() {
  const { query } = useRouter();
  return (
    <>
      <Head>
        <title>Forecast {query.zip_code}</title>
        <meta name="description" content={`weather forecast for zip code ${query.zip_code}`} />
      </Head>
      <header>
        <nav><Link href="/">Forecast it</Link></nav>
      </header>
      <Main>
      </Main>
    </>
  );
};
