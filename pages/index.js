import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';

import data from '../data.json';
import styles from '../styles/Home.module.css';
import { initCheckout } from '../utils/stripe';


const defaultCart = {
  products: {},

}

export default function Home() {
  const [cart, setCart] = useState(defaultCart);

  const cartItems = Object.keys(cart.products).map(key => {
    const product = data.find(({ productId }) => `${productId}` === `${key}`);
    return {
      ...cart.products[key],
      pricePerItem: product.price
    }
  })

  const subTotal = cartItems.reduce((acc, item) => {
    return acc + ( item.pricePerItem * item.quantity)
  }, 0)

  const totalItems = cartItems.reduce((acc, item) => {
    return acc + item.quantity
  }, 0)

  const addToCart = ({id} = {}) => {
    setCart(prevCart => {
      let cartState = {...prevCart};

      if (cartState.products[id]) {
        cartState.products[id].quantity = cartState.products[id].quantity + 1
      } else {
        cartState.products[id] = {
          id,
          quantity: 1
        }
      }

      return cartState
    })
  }

  const checkout = () => {
    initCheckout({
      lineItems: cartItems.map(item => {
        return {
          price: item.id,
          quantity: item.quantity
        }
      })
    })
  }
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

        <p className={styles.description}>
          <strong>Items:</strong> {totalItems}
          <br />
          <strong>Total Cost:</strong> {new Intl.NumberFormat("en-us", { style: 'currency', currency: "INR" }).format(subTotal)}
          <br />
          <button 
            className={styles.actions}
            onClick={checkout}
          >
            Check out
          </button>
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
                  <button 
                    className={styles.actions}
                    onClick={() => {
                      addToCart({
                        id: game.productId
                      })
                    }}
                  >
                    Add To Cart
                  </button>
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
