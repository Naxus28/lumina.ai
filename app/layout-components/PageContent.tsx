import React from 'react';
import { cn } from '@/lib/utils';

interface PageContentProps {
	children: React.ReactNode;
	className?: string;
}

export const PageContent: React.FC<PageContentProps> = ({ children, className }) => {
	return (
		<div className={cn('flex-1 overflow-auto px-4 sm:px-6 md:px-12 lg:px-12 xl:px-24', className)}>{children}</div>
	);
};
