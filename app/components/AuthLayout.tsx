'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
	Home,
	BarChart2,
	ChartLine,
	Settings,
	LogOut,
	Menu,
	SquarePen,
	User,
	CreditCard,
	HelpCircle,
	Bell,
} from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const menuItems = [
	{
		icon: Home,
		label: 'Home',
		items: [
			{ title: 'Dashboard', url: '/dashboard' },
			{ title: 'My Documents', url: '/my-documents' },
		],
	},
	{
		icon: SquarePen,
		label: 'Create Documents',
		items: [
			{ title: 'CV', url: '/cv' },
			{ title: 'Cover Letter', url: '/cover-letter' },
			{ title: 'Teaching Philosophy', url: '/teaching-philosophy' },
			{ title: 'Research Statement', url: '/research-statement' },
			{ title: 'Diversity Statement', url: '/diversity-statement' },
			{ title: 'Document History', url: '/document-history' },
		],
	},
	{
		icon: ChartLine,
		label: 'Analytics',
		items: [
			{ title: 'Job Matcher', url: '/job-matcher' },
			{ title: 'CV Analyzer', url: '/cv-analyzer' },
		],
	},
];

export default function AuthLayout({ children }: { children: React.ReactNode }) {
	const [activeItem, setActiveItem] = useState('Home');
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	return (
		<div className="flex h-screen bg-gray-50">
			{/* Hamburger menu for small screens */}
			<Button
				variant="ghost"
				size="icon"
				className="fixed top-4 left-4 z-50 lg:hidden"
				onClick={() => setIsSidebarOpen(!isSidebarOpen)}
			>
				<Menu className="h-6 w-6" />
			</Button>

			{/* Sidebar */}
			<div
				className={cn(
					'fixed inset-y-0 left-0 z-40 flex bg-purple-700 text-white transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0',
					isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
				)}
			>
				{/* Icon column */}
				<div className="w-[72px] flex flex-col items-center py-4 bg-purple-800">
					<div className="w-12 h-12 bg-white rounded-xl mb-8 flex items-center justify-center">
						<div className="w-8 h-8 bg-purple-600 rounded-lg"></div>
					</div>
					{menuItems.map((item) => (
						<Button
							key={item.label}
							variant="ghost"
							size="icon"
							className={cn('mb-4 text-white hover:bg-purple-700', activeItem === item.label && 'bg-purple-700')}
							onClick={() => setActiveItem(item.label)}
						>
							<item.icon className="h-5 w-5" />
						</Button>
					))}
					<div className="mt-auto flex flex-col items-center">
						<Separator className="w-8 bg-purple-600 mb-6" />
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Avatar className="w-10 h-10 cursor-pointer">
									<AvatarImage
										src="/placeholder-user.jpg"
										alt="User"
									/>
									<AvatarFallback className="text-purple-800">U</AvatarFallback>
								</Avatar>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								className="w-56 ml-5"
								align="start"
								side="top"
								forceMount
								sideOffset={-40}
								alignOffset={100}
							>
								<DropdownMenuLabel className="font-normal">
									<div className="flex flex-col space-y-1">
										<p className="text-sm font-medium leading-none">User Name</p>
										<p className="text-xs leading-none text-muted-foreground">user@example.com</p>
									</div>
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem>
									<User className="mr-2 h-4 w-4" />
									<span>Profile</span>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<CreditCard className="mr-2 h-4 w-4" />
									<span>Billing</span>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Settings className="mr-2 h-4 w-4" />
									<span>Settings</span>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Bell className="mr-2 h-4 w-4" />
									<span>Notifications</span>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<HelpCircle className="mr-2 h-4 w-4" />
									<span>Help & Support</span>
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem>
									<LogOut className="mr-2 h-4 w-4" />
									<span>Log out</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>

				{/* Menu items column */}
				<div className="w-56 bg-gray-50 p-4 flex flex-col border-r-[1px] border-gray-200">
					<h2 className="text-xl font-bold mb-4 text-gray-700">{activeItem}</h2>
					<nav className="space-y-2 flex-grow">
						{menuItems
							.find((item) => item.label === activeItem)
							?.items.map((subItem) => (
								<Link
									key={subItem.title}
									href={subItem.url}
									passHref
								>
									<Button
										variant="ghost"
										className="w-full justify-start text-gray-700 hover:bg-gray-200"
									>
										{subItem.title}
									</Button>
								</Link>
							))}
					</nav>
				</div>
			</div>

			{/* Main content */}
			<div className="flex-1 overflow-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24">{children}</div>
		</div>
	);
}
