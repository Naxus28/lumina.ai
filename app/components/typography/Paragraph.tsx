import React from 'react';
import { cn } from '@/lib/utils';

interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  className?: string;
}

export const Paragraph: React.FC<ParagraphProps> = ({ children, className, ...props }) => {
  return (
    <p 
      className={cn(
        "text-base text-gray-600 mb-4",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
};