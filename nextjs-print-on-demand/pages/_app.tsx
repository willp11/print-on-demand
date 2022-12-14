import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/layout';
import { CartProvider } from '../hooks/useCart';
import { MessageProvider } from '../hooks/useMessage';
import { DesignProvider } from '../hooks/useDesign';
import { UserProvider } from '../hooks/useUser';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

function MyApp({ Component, pageProps }: AppProps) {

    const router = useRouter();

    useEffect(() => {
        const handleStart = (url: string) => {
          console.log(`Loading: ${url}`)
          NProgress.start()
        }
    
        const handleStop = () => {
          NProgress.done()
        }
    
        router.events.on('routeChangeStart', handleStart)
        router.events.on('routeChangeComplete', handleStop)
        router.events.on('routeChangeError', handleStop)
    
        return () => {
          router.events.off('routeChangeStart', handleStart)
          router.events.off('routeChangeComplete', handleStop)
          router.events.off('routeChangeError', handleStop)
        }
    }, [router])

    return (
        <UserProvider>
            <CartProvider>
                <MessageProvider>
                    <DesignProvider>
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </DesignProvider>
                </MessageProvider>
            </CartProvider>
        </UserProvider>
    )
}

export default MyApp
