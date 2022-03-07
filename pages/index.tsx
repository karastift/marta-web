import type { NextPage } from 'next';
import Head from 'next/head';
import Spinner from 'react-spinners/HashLoader';

import { Client } from '../components/client';
import { useClientList } from '../hooks/useClientList';
import styles from '../styles/Home.module.css';

// the shell looks like marta-web2

const Home: NextPage = () => {

  const [{ data: list }, loading] = useClientList();

  return (
    <div className={styles.container}>
      <Head>
        <title>marta-web</title>
        <meta name="description" content="marta-web" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          marta-web
        </h1>

        {!loading 
        ? <div className={styles.clients}>
            {list.map((c) => {
              return c ? <Client key={c.Id} {...c}/> : undefined
            })
            }
          </div>
        : <div className={styles.spinnerWrapper}>
            <Spinner color='#e9967a' size={100}/>
          </div>
        }
      </main>
    </div>
  )
}

export default Home;
