import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Main from '@/components/Main';
import { Titan_One, Merriweather, Caveat } from '@next/font/google'

const titanOne = Titan_One({ subsets: ['latin'], weight: ['400'], variable: '--font-family-titan-one' })
const caveat = Caveat({ subsets: ['latin'], weight: ['700'], variable: '--font-family-caveat' })

export default function Home() {
  return (
    <>
      <Head>
        <title>Forecast it</title>
        <meta name="description" content="guaranteed to outperform groundhogs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Main className={`layout-flex-column ${titanOne.variable} ${caveat.variable}`}>
        <div className="sky">
          <h1 className="home-title titan-one">
            Forecast it<span className="asterisk">*</span>
          </h1>
          <i className="home-subtitle">
            *guaranteed to outperform groundhogs
          </i>
        </div>

        <svg
          className="horizon"
          preserveAspectRatio="none"
          height="100px"
          width="100%"
          viewBox="0 5 10 5"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="
              M 0,10
              Q 5,0,10,10
            "
          />
        </svg>

        <div className="earth">

          <form
            action="/forecast"
            className="card variant-brown address-form"
            method="get"
          >
            <label htmlFor="zip_code">Enter your zip code</label>
            <input type="text" name="zip_code" pattern="[0-9]{5}"></input>
            <button type="submit">Forecast</button>
          </form>

        </div>
      </Main>
    </>
  )
}
