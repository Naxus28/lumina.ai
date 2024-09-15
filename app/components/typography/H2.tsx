import React from 'react';
import { cn } from '@/lib/utils';

interface H2Props extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  className?: string;
}

export const H2: React.FC<H2Props> = ({ children, className, ...props }) => {
  return (
    <h2 
      className={cn(
        "text-3xl font-semibold text-gray-800 mb-3",
        className
      )}
      {...props}
    >
      {children}
    </h2>
  );
};