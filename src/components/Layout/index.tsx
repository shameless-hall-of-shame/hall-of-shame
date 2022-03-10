import type {FC} from 'react';
import Navbar from './Navbar';

const Layout: FC = ({children}) => {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <footer className="bg-gray-100 text-gray-600 text-center text-link py-4 text-sm md:text-base md:py-4">
        Proudly powered by{' '}
        <a
          className="text-blue-500"
          href="https://reactjs.org/"
          target="_blank"
          rel="noreferrer noopener">
          React
        </a>{' '}
        &amp;{' '}
        <a
          className="text-blue-500"
          href="https://nextjs.org/"
          target="_blank"
          rel="noreferrer noopener">
          Next.js
        </a>{' '}
        &amp;{' '}
        <a
          className="text-blue-500"
          href="https://tailwindcss.com/"
          target="_blank"
          rel="noreferrer noopener">
          Tailwind CSS
        </a>
      </footer>
    </>
  );
};

export default Layout;
