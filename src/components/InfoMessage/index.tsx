import { ReactNode } from 'react';
import { cn } from '../../utils';

import './style.css';

interface InfoMessageProps {
  className?: string;
  type?: 'regular' | 'error';
  children?: ReactNode;
}

export const InfoMessage = ({ className, type, children }: InfoMessageProps) => (
  <div
    className={cn(
      className,
      'info-message',
      type === 'error' && 'error',
    )}>
    {children}
  </div>
);
