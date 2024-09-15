import React from 'react';
import { cn } from '@/lib/utils';

interface H1Props extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  className?: string;
}

export const H1: React.FC<H1Props> = ({ children, className, ...props }) => {
  return (
    <h1 
      className={cn(
        "text-4xl font-bold text-gray-900 mb-4",
        className
      )}
      {...props}
    >
      {children}
    </h1>
  );
};