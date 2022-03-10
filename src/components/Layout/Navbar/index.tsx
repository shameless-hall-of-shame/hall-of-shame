import type {FC} from 'react';
import Link from 'next/link';
import NavLink from './NavLink';
const Navbar: FC = () => {
  return (
    <header className="sticky top-0 z-50">
      <div className="bg-gray-100  text-center py-1 text-sm md:text-base md:py-2 hover:underline text-blue-500">
        <a target="_blank" href="https://twitter.com/hashtag/StandWithUkraine">
          #StandWithUkraine 🇺🇦
        </a>
      </div>
      <div className="backdrop-blur-sm bg-white/80">
        <nav className="md:container mx-auto  py-3 px-4 md:p-4  justify-between">
          <div className="flex items-center space-x-10 justify-between">
            <Link href="/">
              <a className="md:text-xl">🙈 Hall of Shame</a>
            </Link>
            <ul className="text-sm md:text-base flex list-none items-center space-x-8">
              <li>
                <NavLink href="/events">事件</NavLink>
              </li>
              <li>
                <NavLink href="/persons">人物</NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
