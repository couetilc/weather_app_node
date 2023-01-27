import { FormEvent, useCallback } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import cardStyles from '@/styles/Card.module.css'
import Main from '@/components/Main';
import clsx from 'clsx';
import titanOne from '@/fonts/TitanOneRegular';
import caveat from '@/fonts/CaveatBold';

export default function Home() {

  const router = useRouter();

  const onSubmitForecast = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (e.target instanceof HTMLFormElement) {
      const searchParams = new URLSearchParams();
      for (let [key, value] of new FormData(e.target)) {
        searchParams.append(key, String(value));
      }
      const url = new URL(e.target.action, window.location.href);
      url.search = searchParams.toString();
      router.push(url.pathname + url.search + url.hash);
    }
  }, [router]);

  return (
    <>
      <Head>
        <title>Forecast it</title>
        <meta name="description" content="guaranteed to outperform groundhogs" />
      </Head>
      <Main
        className={clsx(
          titanOne.variable,
          caveat.variable,
          styles.layout,
        )}
      >
        <div className={styles.sky}>
          <h1 className={styles.title}>
            Forecast it<span className={styles.asterisk}>*</span>
          </h1>
          <i className={styles.subtitle}>
            *guaranteed to outperform groundhogs
          </i>
        </div>

        <svg
          className={styles.horizon}
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

        <div className={styles.earth}>

          <form
            onSubmit={onSubmitForecast}
            action="/forecast"
            method="get"
            className={clsx(
              cardStyles.card,
              cardStyles['variant-brown'],
              styles['address-form']
            )}
          >
            <label htmlFor="zip_code">
              Enter your zip code
            </label>
            <input
              type="text"
              name="zip_code"
              pattern="[0-9]{5}"
            />
            <button type="submit">
              Forecast
            </button>
          </form>

        </div>
      </Main>
    </>
  )
}
