// src/components/ui/NavLink/NavLink.js
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface NavLinkProps {
	href: string;
	children: ReactNode;
}

const NavLink = ({ href = '', children }: NavLinkProps) => {
	const pathname = usePathname();
	const isActive = pathname === href;

	return (
		<Link
			href={href}
			className={`text-indigo-600 hover:text-indigo-800 ${isActive ? 'font-bold' : ''}`}
		>
			{children}
		</Link>
	);
};

export default NavLink;
