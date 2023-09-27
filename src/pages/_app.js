import Header from '@/components/Header/Header'
import 'bootstrap/dist/css/bootstrap.css';
import '@/styles/globals.css'
import Head from 'next/head';

export default function App({ Component, pageProps }) {

  return <>
    <Head>
      <title>Braille Translator</title>
      <meta name="description" content="Braille Translator" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/icon-192x192.png" />
    </Head>
    <Header name={pageProps.session?pageProps.session.name:null} />
    <Component {...pageProps} />
  </>
}
