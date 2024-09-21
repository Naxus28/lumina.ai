import React from 'react';
import { cn } from '@/lib/utils';

interface H2Props extends React.HTMLAttributes<HTMLHeadingElement> {
	children: React.ReactNode;
	className?: string;
}

export const H2: React.FC<H2Props> = ({ children, className, ...props }) => {
	return (
		<h2
			className={cn('text-5xl font-bold text-center mb-4 text-gray-700', className)}
			{...props}
		>
			{children}
		</h2>
	);
};
