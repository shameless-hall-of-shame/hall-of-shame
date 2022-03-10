import type {FC} from 'react';

const Layout: FC = ({children}) => {
  return (
    <>
      <main>{children}</main>
    </>
  );
};

export default Layout;
