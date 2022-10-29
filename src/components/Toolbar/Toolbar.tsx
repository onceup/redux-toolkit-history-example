import React, { FC } from 'react';
import { ToolbarProps } from './types';
import './styles.css';

const Toolbar: FC<ToolbarProps> = ({ children, className }) => {
  return (
    <div className={`${className} toolbar`}>
      {React.Children.map(children, (child) => (
        <div className='toolbar__button'>{child}</div>
      ))}
    </div>
  );
};

export default Toolbar;
