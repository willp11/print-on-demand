import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
        <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link href="https://fonts.googleapis.com/css2?family=Audiowide&family=Blaka+Ink&family=Bungee&family=Bungee+Spice&family=Fasthand&family=Island+Moments&family=Josefin+Slab&family=Kanit&family=Kaushan+Script&family=Kolker+Brush&family=Luckiest+Guy&family=Open+Sans:wght@500&family=Orbitron&family=Pacifico&family=Rampart+One&family=Roboto&family=Rubik+Wet+Paint&family=Sacramento&family=Shalimar&family=Titan+One&family=Yellowtail&display=swap" rel="stylesheet" />
        </Head>
        <body>
            <Main />
            <NextScript />
        </body>
    </Html>
  )
}