import {useState, useEffect} from 'react';
import type {FC} from 'react';
import {useRouter} from 'next/router';
import NextLink from 'next/link';

import clsx from 'clsx';

interface NavLinkProps {
  href: string;
}

const NavLink: FC<NavLinkProps> = ({href, children}) => {
  const {pathname} = useRouter();
  const isActive = pathname.startsWith(href);

  console.log(isActive);

  return (
    <NextLink href={href}>
      <a
        className={clsx('hover:text-blue-500', {
          'text-blue-500': isActive,
          'text-gray-800 ': !isActive,
        })}>
        {children}
      </a>
    </NextLink>
  );
};

export default NavLink;
