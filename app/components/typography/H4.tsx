import React from 'react';
import { cn } from '@/lib/utils';

interface H4Props extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  className?: string;
}

export const H4: React.FC<H4Props> = ({ children, className, ...props }) => {
  return (
    <h4 
      className={cn(
        "text-xl font-semibold text-gray-700 mb-2",
        className
      )}
      {...props}
    >
      {children}
    </h4>
  );
};