import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaShoppingCart } from 'react-icons/fa';
import { useCartState } from '../context';

import styles from '../styles/Nav.module.css';

export const Nav = () => {
  const router = useRouter();
  const {total} = useCartState();
  return (
    <nav className={styles.nav}>
      <Link href="/" passHref>
        <p className={styles.navTitle}>
          Gameshop
        </p>
      </Link>
      <div className={styles.navCart}>
        <button onClick={() => router.push('/cart')}>
          <FaShoppingCart/> {new Intl.NumberFormat("en-us", {
            style: 'currency',
            currency: "INR" }).format(total)}
        </button>
      </div>
    </nav>
  )
}