import React from 'react';
import { cn } from '@/lib/utils';

interface SpanProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  className?: string;
}

export const Span: React.FC<SpanProps> = ({ children, className, ...props }) => {
  return (
    <span 
      className={cn(
        "text-base text-gray-600",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};