import clsx from 'clsx';
import {FC, ReactNode, useState} from 'react';
import Icon from './Icon';

interface CollapseProps {
  title: ReactNode;
  className?: string;
}

const Collapse: FC<CollapseProps> = ({children, className, title}) => {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <div className={clsx(className, 'overflow-hidden')}>
      <div
        className="cursor-pointer flex items-center"
        onClick={() => setCollapsed((c) => !c)}>
        <div className="flex-1">{title}</div>
        <aside className="flex-shrink-0">
          <Icon
            type="down"
            className={clsx('transition duration-300 h-4 w-4 md:h-6 md:w-6 fill-gray-600', {
              'rotate-180': !collapsed,
            })}
          />
        </aside>
      </div>
      <div
        className={clsx('', {
          hidden: collapsed,
        })}>
        {children}
      </div>
    </div>
  );
};

export default Collapse;
