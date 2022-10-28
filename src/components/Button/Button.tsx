import { FC } from 'react';
import { ButtonProps } from './types';
import './styles.css';

const Button: FC<ButtonProps> = ({ isDisabled = false, onClick, children }) => {
  return (
    <button
      type='button'
      className='button'
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};

export default Button;
