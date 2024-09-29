'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
	Home,
	BarChart2,
	ChartLine,
	Layers,
	CheckSquare,
	Flag,
	Users,
	Bell,
	Link,
	Settings,
	LogOut,
	Menu,
	SquarePen,
	User,
	CreditCard,
	HelpCircle,
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
	{ icon: Home, label: 'Home', items: ['Dashboard', 'My Documents'] },
	{
		icon: SquarePen,
		label: 'Create Documents',
		items: [
			'CV',
			'Cover Letter',
			'Teaching Philosophy',
			'Research Statement',
			'Diversity Statement',
			'Document History',
		],
	},
	{ icon: ChartLine, label: 'Analytics', items: ['AI Job Matcher Rank', 'CV Analyzer'] },
	// { icon: CheckSquare, label: 'Tasks', items: ['My Tasks', 'Shared', 'Projects'] },
	// { icon: Flag, label: 'Campaigns', items: ['Active', 'Drafts', 'Completed'] },
	// { icon: Users, label: 'Team', items: ['Members', 'Invites', 'Groups'] },
];

const settingsItems = [
	{ icon: Flag, label: 'My details' },
	{ icon: Users, label: 'Profile', badge: '10' },
	{ icon: Link, label: 'Password' },
	{ icon: Users, label: 'Team' },
	{ icon: CheckSquare, label: 'Billing' },
	{ icon: Bell, label: 'Notifications' },
	{ icon: Link, label: 'Integrations' },
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
						<Button
							variant="ghost"
							size="icon"
							className={cn('mb-6 text-white hover:bg-purple-700', activeItem === 'Settings' && 'bg-purple-700')}
							onClick={() => setActiveItem('Settings')}
						>
							<Settings className="h-5 w-5" />
						</Button>
						<Separator className="w-8 bg-purple-600 mb-6" />
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Avatar className="w-10 h-10 cursor-pointer">
									<AvatarImage
										src="/placeholder-user.jpg"
										alt="User"
									/>
									<AvatarFallback>U</AvatarFallback>
								</Avatar>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								className="w-56"
								align="end"
								forceMount
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
								<Button
									key={subItem}
									variant="ghost"
									className="w-full justify-start text-gray-700 hover:bg-purple-600"
								>
									{subItem}
								</Button>
							))}
					</nav>
				</div>
			</div>

			{/* Main content */}
			<div className="flex-1 overflow-auto p-8">{children}</div>
		</div>
	);
}
