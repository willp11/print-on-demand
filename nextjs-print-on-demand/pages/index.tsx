import type { NextPage } from 'next';
import Head from 'next/head';
import Slideshow from '../components/slideshow';

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>Print On Demand</title>
            </Head>
            <Slideshow />
        </>
    )
}

export default Home
