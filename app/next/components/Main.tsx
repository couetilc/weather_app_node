import { ReactNode } from 'react';
import { Merriweather } from '@next/font/google'

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-family-merriweather'
});

function Main(props: { className: string, children: ReactNode }) {
  return (
    <main className={`${props.className} ${merriweather.variable}`}>
      {props.children}
    </main>
  );
}

export default Main;
