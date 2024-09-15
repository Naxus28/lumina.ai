import React from 'react';
import { cn } from '@/lib/utils';

interface H5Props extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  className?: string;
}

export const H5: React.FC<H5Props> = ({ children, className, ...props }) => {
  return (
    <h5 
      className={cn(
        "text-lg font-semibold text-gray-700 mb-2",
        className
      )}
      {...props}
    >
      {children}
    </h5>
  );
};