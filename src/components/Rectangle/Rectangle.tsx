import { FC, PropsWithChildren } from 'react';
import './styles.css';

const Rectangle: FC<PropsWithChildren> = ({ children }) => {
  return <div className='rectangle'>{children}</div>;
};

export default Rectangle;
