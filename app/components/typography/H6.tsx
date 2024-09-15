import React from 'react';
import { cn } from '@/lib/utils';

interface H6Props extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  className?: string;
}

export const H6: React.FC<H6Props> = ({ children, className, ...props }) => {
  return (
    <h6 
      className={cn(
        "text-base font-semibold text-gray-700 mb-2",
        className
      )}
      {...props}
    >
      {children}
    </h6>
  );
};