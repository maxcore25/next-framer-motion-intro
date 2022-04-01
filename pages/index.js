import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { useEffect } from 'react';
import styles from '../styles/Home.module.css';

const defaultEndpoint = 'https://rickandmortyapi.com/api/character';

export async function getServerSideProps(context) {
  const res = await fetch(defaultEndpoint);
  const data = await res.json();
  return {
    props: { data },
  };
}

export default function Home({ data }) {
  console.log(data);
  const { info, results: defaultResults = [] } = data;
  const [results, setResults] = useState(defaultResults);
  const [page, setPage] = useState({
    ...info,
    current: defaultEndpoint,
  });
  const { current } = page;

  useEffect(() => {
    if (current === defaultEndpoint) return;

    async function request() {
      const res = await fetch(current);
      const nextData = await res.json();

      setPage({
        ...current,
        ...nextData.info,
      });

      if (!nextData.info?.prev) {
        setResults(nextData.results);
        return;
      }

      setResults(prev => {
        return [...prev, ...nextData.results];
      });
    }

    request();
  }, [current]);

  function handleLoadMore() {
    setPage(prev => {
      return {
        ...prev,
        current: page?.next,
      };
    });
  }

  function handleOnSubmitSearch(e) {
    e.preventDefault();

    const { currentTarget = {} } = e;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Rick And Morty Wiki</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Wubba Lubba Dub Dub</h1>

        <p className={styles.description}>Rick And Morty Wiki</p>

        <form className='search' onSubmit={handleOnSubmitSearch}>
          <input name='query' type='search' />
          <button>Search</button>
        </form>

        <div className={styles.grid}>
          {results.map(result => (
            <a
              key={result.id}
              href='https://nextjs.org/docs'
              className={styles.card}>
              <Image
                src={result.image}
                width={200}
                height={200}
                alt={result.name}
              />
              <h3>{result.name}</h3>
            </a>
          ))}
        </div>

        <div>
          <button onClick={handleLoadMore}>Load More</button>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'>
          Powered by{' '}
          <span className={styles.logo}>
            <Image src='/vercel.svg' alt='Vercel Logo' width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
