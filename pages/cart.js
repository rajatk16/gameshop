import Head from 'next/head';
import { FaShoppingCart } from 'react-icons/fa';

import styles from '../styles/Cart.module.css';

import { Table } from '../components';
import { useCartState } from '../context';

const columns = [
  {
    columnId: 'title',
    Header: 'Product Name'
  },
  {
    columnId: 'price',
    Header: 'Price Per Item'
  },
  {
    columnId: 'total',
    Header: 'Item Total'
  },
  {
    columnId: 'quantity',
    Header: 'Quantity'
  },
  {
    columnId: 'actions',
    Header: ""
  }
];

const Cart = () => {
  const { cart, checkout } = useCartState();
  
  const data = cart.map(item => {
    return {
      ...item,
      total: item.price * item.quantity
    }
  })

  return (
    <div className={styles.container}>
      <Head>
        <title>
          Cart - Gameshop
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <FaShoppingCart /> Cart
        </h1>

        <Table className={styles.table} data={data} columns={columns} />
        <div  className={styles.checkout}>
          <button className={styles.button} onClick={checkout}>
            Checkout
          </button>
        </div>
      </main>
    </div>
  )
}

export default Cart