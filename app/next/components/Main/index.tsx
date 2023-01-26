import { ReactNode } from 'react';
import { Merriweather } from '@next/font/google'
import styles from './component.module.css';
import clsx from 'clsx';

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-family-merriweather'
});

function Main(props: { className?: string, children?: ReactNode }) {
  return (
    <main
      className={clsx(
        props.className,
        styles['component-main'],
        merriweather.variable
      )}
    >
      {props.children}
    </main>
  );
}

export default Main;
