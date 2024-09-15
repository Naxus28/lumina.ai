import React from 'react';
import { cn } from '@/lib/utils';

interface H3Props extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  className?: string;
}

export const H3: React.FC<H3Props> = ({ children, className, ...props }) => {
  return (
    <h3 
      className={cn(
        "text-2xl font-semibold text-gray-700 mb-2",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
};