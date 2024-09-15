import React from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps {
	children: React.ReactNode;
	className?: string;
	padding?: 'none' | 'sm' | 'md' | 'lg';
	paddingX?: 'none' | 'sm' | 'md' | 'lg';
	paddingY?: 'none' | 'sm' | 'md' | 'lg';
}

const paddingClasses = {
	none: '',
	sm: 'p-2',
	md: 'p-4',
	lg: 'p-6',
};

const paddingXClasses = {
	none: '',
	sm: 'px-2',
	md: 'px-4',
	lg: 'px-6',
};

const paddingYClasses = {
	none: '',
	sm: 'py-2',
	md: 'py-4',
	lg: 'py-6',
};

export const Container: React.FC<ContainerProps> = ({ children, className, padding = 'none', paddingX = 'none', paddingY = 'none' }) => {
	return <div className={cn(paddingClasses[padding], paddingXClasses[paddingX], paddingYClasses[paddingY], className)}>{children}</div>;
};
