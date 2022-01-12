import '../styles/globals.css';
import { Nav } from '../components';
import { Provider as CartProvider } from '../context';

function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <Nav />
      <Component {...pageProps} />
    </CartProvider>
  )
}

export default MyApp
