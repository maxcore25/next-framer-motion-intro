import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/Home.module.css';
import Link from 'next/link';

const defaultEndpoint = 'https://rickandmortyapi.com/api/character';

export async function getServerSideProps({ query }) {
  const { id } = query;
  const res = await fetch(`${defaultEndpoint}/${id}`);
  const data = await res.json();
  return {
    props: { data },
  };
}

export default function CharacterPage({ data }) {
  console.log('character data', data);

  return (
    <div className={styles.container}>
      <Head>
        <title>{data.name}</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>{data.name}</h1>

        <div className='profile'>
          <Image src={data.image} width={400} height={400} alt={data.name} />

          <div className='profile-details'>
            <h2>Character Details</h2>
            <ul>
              <li>
                <strong>Name:</strong> {data.name}
              </li>
              <li>
                <strong>Status:</strong> {data.status}
              </li>
              <li>
                <strong>Gender:</strong> {data.gender}
              </li>
              <li>
                <strong>Species:</strong> {data.species}
              </li>
              <li>
                <strong>Location:</strong> {data.location?.name}
              </li>
              <li>
                <strong>Originally From:</strong> {data.origin?.name}
              </li>
            </ul>
          </div>
        </div>
        <div className='back-btn-container'>
          <Link href='/'>
            <a className='back-btn'>Back To All Characters</a>
          </Link>
        </div>
      </main>
    </div>
  );
}
