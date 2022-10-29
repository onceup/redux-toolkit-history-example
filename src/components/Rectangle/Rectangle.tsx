import { FC } from 'react';
import { RecangleProps } from './types';
import './styles.css';

const Rectangle: FC<RecangleProps> = ({ className, children }) => {
  return <div className={`${className} rectangle`}>{children}</div>;
};

export default Rectangle;
