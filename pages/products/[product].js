import Head from 'next/head';
import Image from 'next/image';

import data from '../../data.json';
import { useCartState } from '../../context';
import styles from '../../styles/Product.module.css';

const Product = ({ product }) => { 
  const { addGame } = useCartState();
  return (
    <div className={styles.container}>
      <Head>
        <title> Buy {product.title} - Gameshop</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <div className={styles.productImage}>
          <Image 
            src={`/images/${product.id}.jpg`}
            alt="Dummy"
            width={500}
            height={700}
          />
        </div>
        <div>
          <div>
            <h1>
              {product.title}
            </h1>
          </div>
          <div>
            <h5>
              Rating: {product.rating}
            </h5>
            <h5>
              Released on: {new Date(product.release_date).toLocaleDateString()}
            </h5>
          </div>
          {product.series !== "Null" && (
            <div>
              <h4>Series: {product.series}</h4>
            </div>
          )}
          <div>
            <h4>
              Developed By: {product.developer}
            </h4>
          </div>
          <div>
            <h4>
              Published By: {product.publisher}
            </h4>
          </div>
          <div>
            <p className={styles.description}>
              {product.description}
            </p>
          </div>
          <div className={styles.lists}>
            <ul>
              {product.genres.map(genre => (
                <li key={genre} className={styles.listItem}>
                  <p>
                    {genre}
                  </p>
                </li>
              ))}
            </ul>
            <ul>
              {product.platforms.map(platform => (
                <li key={platform} className={styles.listItem}>
                  <p>
                    {platform}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className={styles.description}>
              Price: {new Intl.NumberFormat('en-us', {
                style: "currency",
                currency: "INR"
              }).format(product.price)}
            </p>
          </div>
          <div className={styles.buttons}>
            <button 
              className={styles.button}
              onClick={() => addGame(product)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export const getStaticProps = async ({ params }) => {
  const product = data.find(item => item.id === params.product)
  return {
    props: {
      product
    }
  }
}

export const getStaticPaths = async () => {
  const paths = data.map((item) => {
    return {
      params: {
        product: item.id
      }
    }
  })
  return {
    paths,
    fallback: false
  }
}

export default Product