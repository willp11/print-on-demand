import type { NextPage } from 'next';
import Head from 'next/head';
import Slideshow from '../components/landing/slideshow';
import Categories from '../components/landing/categories';
import About from '../components/landing/about';

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>Print On Demand</title>
            </Head>
            <Slideshow />
            <About />
            <Categories />
        </>
    )
}

export default Home
