import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
	id?: string;
	children: React.ReactNode;
	className?: string;
	padding?:
		| 'none'
		| 'xs'
		| 'sm'
		| 'md'
		| 'lg'
		| 'xl'
		| '2xl'
		| '3xl'
		| '4xl'
		| '5xl'
		| '6xl'
		| '7xl'
		| '8xl'
		| '9xl'
		| '10xl';
	paddingX?:
		| 'none'
		| 'xs'
		| 'sm'
		| 'md'
		| 'lg'
		| 'xl'
		| '2xl'
		| '3xl'
		| '4xl'
		| '5xl'
		| '6xl'
		| '7xl'
		| '8xl'
		| '9xl'
		| '10xl';
	paddingY?:
		| 'none'
		| 'xs'
		| 'sm'
		| 'md'
		| 'lg'
		| 'xl'
		| '2xl'
		| '3xl'
		| '4xl'
		| '5xl'
		| '6xl'
		| '7xl'
		| '8xl'
		| '9xl'
		| '10xl';
}

const paddingClasses = {
	none: '',
	xs: 'p-1',
	sm: 'p-2',
	md: 'p-4',
	lg: 'p-6',
	xl: 'p-8',
	'2xl': 'p-10',
	'3xl': 'p-12',
	'4xl': 'p-16',
	'5xl': 'p-20',
	'6xl': 'p-24',
	'7xl': 'p-28',
	'8xl': 'p-32',
	'9xl': 'p-36',
	'10xl': 'p-40',
};

const paddingXClasses = {
	none: '',
	xs: 'px-1',
	sm: 'px-2',
	md: 'px-4',
	lg: 'px-6',
	xl: 'px-8',
	'2xl': 'px-10',
	'3xl': 'px-12',
	'4xl': 'px-16',
	'5xl': 'px-20',
	'6xl': 'px-24',
	'7xl': 'px-28',
	'8xl': 'px-32',
	'9xl': 'px-36',
	'10xl': 'px-40',
};

const paddingYClasses = {
	none: '',
	xs: 'py-1',
	sm: 'py-2',
	md: 'py-4',
	lg: 'py-6',
	xl: 'py-8',
	'2xl': 'py-10',
	'3xl': 'py-12',
	'4xl': 'py-16',
	'5xl': 'py-20',
	'6xl': 'py-24',
	'7xl': 'py-28',
	'8xl': 'py-32',
	'9xl': 'py-36',
	'10xl': 'py-40',
};

export const Container = forwardRef<HTMLElement, ContainerProps>(
	({ children, className, padding = 'none', paddingX = '10xl', paddingY = '10xl', id = '', ...props }, ref) => {
		return (
			<section
				ref={ref}
				id={id}
				className={cn(
					'mx-auto',
					paddingClasses[padding],
					paddingXClasses[paddingX],
					paddingYClasses[paddingY],
					className
				)}
				{...props}
			>
				{children}
			</section>
		);
	}
);

Container.displayName = 'Container';
