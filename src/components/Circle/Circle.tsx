import { FC } from 'react';
import { StateProps } from './types';
import './styles.css';

const Circle: FC<StateProps> = ({ value }) => {
  return (
    <>
      <div className='circle'>
        <div className='circle__data'>{value}</div>
      </div>
    </>
  );
};

export default Circle;
