import { ReactNode } from 'react';
import merriweather from '../../fonts/MerriweatherRegular';
import styles from './component.module.css';
import clsx from 'clsx';

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
