import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useCartState } from '../context';

import data from '../data.json';
import styles from '../styles/Home.module.css';



export default function Home() {
  const { addGame } = useCartState();
  return (
    <div className={styles.container}>
      <Head>
        <title>Gameshop</title>
        <meta name="description" content="Dummy eCommerce Website that 'sells' Video Games" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Gameshop!
        </h1>

        <p className={styles.description}>
          Your one stop shop for all your video game needs!
        </p>

        <ul className={styles.grid}>
          {data.map(game => (
            <li className={styles.card} key={game.id}>
              <div>
                <Image 
                  src={`/images/${game.id}.jpg`}
                  alt={game.title}
                  width={300}
                  height={300}
                />
                <h3>{game.title}</h3>
                <div className={styles.priceRow}>
                  <h4>
                    {new Intl.NumberFormat("en-us", {
                      style: 'currency',
                      currency: "INR",
                    })
                    .format(game.price)}
                  </h4>
                  <Link
                    href={`/products/${game.id}`}
                    passHref 
                  >
                    <button className={styles.actions}>
                      View
                    </button>
                  </Link>
                </div>
                <p>{game.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}
