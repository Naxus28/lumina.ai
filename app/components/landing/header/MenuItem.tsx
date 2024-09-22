import React from 'react';
import { cn } from '@/lib/utils';

interface MenuItemProps {
	item: string;
	onClick: () => void;
	isScrolled: boolean;
	className?: string;
	liClassName?: string;
}

export const MenuItem: React.FC<MenuItemProps> = ({ item, onClick, isScrolled, className, liClassName = '' }) => (
	<li className={liClassName}>
		<a
			onClick={onClick}
			className={cn(
				isScrolled ? 'text-gray-900' : 'text-white',
				'text-[16px] font-[400] leading-6 hover:text-[#4FD1C5] cursor-pointer inline-block',
				className
			)}
		>
			{item
				.split('-')
				.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
				.join(' ')}
		</a>
	</li>
);
