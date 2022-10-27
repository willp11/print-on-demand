import type { NextPage } from 'next';
import Head from 'next/head';
import Slideshow from '../components/landing/slideshow';
import Categories from '../components/landing/categories';

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>Print On Demand</title>
            </Head>
            <Slideshow />
            <Categories />
        </>
    )
}

export default Home
