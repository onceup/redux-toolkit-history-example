import { PropsWithChildren } from 'react';

export interface ButtonProps extends PropsWithChildren {
  isDisabled?: boolean;
  onClick: () => void;
}
