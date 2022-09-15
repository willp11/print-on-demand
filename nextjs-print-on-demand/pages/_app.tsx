import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/layout';
import { CartProvider } from '../hooks/useCart';
import { MessageProvider } from '../hooks/useMessage';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <CartProvider>
            <MessageProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </MessageProvider>
        </CartProvider>
    )
}

export default MyApp
