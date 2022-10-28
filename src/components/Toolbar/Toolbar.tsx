import React, { FC, PropsWithChildren } from 'react';
import './styles.css';

const Toolbar: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className='toolbar'>
      {React.Children.map(children, (child) => (
        <div className='toolbar__button'>{child}</div>
      ))}
    </div>
  );
};

export default Toolbar;
