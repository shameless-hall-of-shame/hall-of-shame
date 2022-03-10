import type {FC, SVGProps} from 'react';

import icons from './icons';

import type {IconType} from './icons';

interface IconProps extends SVGProps<SVGSVGElement> {
  type: IconType;
}

const Icon: FC<IconProps> = ({type, ...passthroughProps}) => {
  const path = icons[type];
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      {...passthroughProps}>
      <path fillRule="evenodd" d={path}></path>
    </svg>
  );
};

export default Icon;

export type {IconType} from './icons';

