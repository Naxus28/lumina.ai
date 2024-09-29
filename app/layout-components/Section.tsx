import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
	id?: string;
	children: React.ReactNode;
	className?: string;
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
	bgColor?: string;
}

const paddingYClasses = {
	none: '',
	xs: 'py-4',
	sm: 'py-8',
	md: 'py-12',
	lg: 'py-16',
	xl: 'py-20',
	'2xl': 'py-24',
	'3xl': 'py-28',
	'4xl': 'py-32',
	'5xl': 'py-36',
	'6xl': 'py-40',
	'7xl': 'py-44',
	'8xl': 'py-48',
	'9xl': 'py-52',
	'10xl': 'py-56',
};

export const Section = forwardRef<HTMLElement, SectionProps>(
	({ children, className, id, paddingY = 'xl', bgColor = 'bg-white', ...props }, ref) => {
		return (
			<section
				ref={ref}
				id={id}
				className={cn(
					'px-4 sm:px-6 lg:px-8', // Default horizontal padding
					paddingYClasses[paddingY],
					bgColor,
					className // This will override any conflicting classes
				)}
				{...props}
			>
				<div className="max-w-7xl mx-auto">
					{' '}
					{/* Standard max-width container */}
					{children}
				</div>
			</section>
		);
	}
);

Section.displayName = 'Section';
