import { FC } from 'react';
import { BadgeProps } from './types';
import './styles.css';

const Badge: FC<BadgeProps> = ({ children, className }) => {
  return <div className={`${className} badge`}>{children}</div>;
};

export default Badge;
