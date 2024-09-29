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
import { Home, BarChart2, Layers, CheckSquare, Flag, Users, Bell, Link, Settings, LogOut, Menu } from 'lucide-react';

const menuItems = [
	{ icon: Home, label: 'Home', items: ['Dashboard', 'Projects', 'Team'] },
	{ icon: BarChart2, label: 'Analytics', items: ['Overview', 'Reports', 'Insights'] },
	{ icon: Layers, label: 'Assets', items: ['Files', 'Images', 'Videos'] },
	{ icon: CheckSquare, label: 'Tasks', items: ['My Tasks', 'Shared', 'Projects'] },
	{ icon: Flag, label: 'Campaigns', items: ['Active', 'Drafts', 'Completed'] },
	{ icon: Users, label: 'Team', items: ['Members', 'Invites', 'Groups'] },
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
	const [activeItem, setActiveItem] = useState('Settings');
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
						<Avatar className="w-10 h-10">
							<AvatarImage
								src="/placeholder-user.jpg"
								alt="Olivia Rhye"
							/>
							<AvatarFallback>OR</AvatarFallback>
						</Avatar>
					</div>
				</div>

				{/* Menu items column */}
				<div className="w-56 bg-purple-700 p-4 flex flex-col">
					<h2 className="text-xl font-bold mb-4">{activeItem}</h2>
					<nav className="space-y-2 flex-grow">
						{activeItem === 'Settings'
							? settingsItems.map((item) => (
									<Button
										key={item.label}
										variant="ghost"
										className="w-full justify-start text-white hover:bg-purple-600"
									>
										<item.icon className="mr-2 h-4 w-4" />
										{item.label}
										{item.badge && (
											<Badge
												variant="secondary"
												className="ml-auto"
											>
												{item.badge}
											</Badge>
										)}
									</Button>
							  ))
							: menuItems
									.find((item) => item.label === activeItem)
									?.items.map((subItem) => (
										<Button
											key={subItem}
											variant="ghost"
											className="w-full justify-start text-white hover:bg-purple-600"
										>
											{subItem}
										</Button>
									))}
					</nav>
					<div className="mt-auto pt-4">
						<div className="flex items-center space-x-3">
							<div className="flex-1 min-w-0">
								<p className="text-sm font-medium truncate">Olivia Rhye</p>
								<p className="text-xs text-purple-300 truncate">olivia@untitledui.com</p>
							</div>
							<Button
								variant="ghost"
								size="icon"
								className="text-white hover:bg-purple-600"
							>
								<LogOut className="h-4 w-4" />
							</Button>
						</div>
					</div>
				</div>
			</div>

			{/* Main content */}
			<div className="flex-1 overflow-auto p-4">{children}</div>
		</div>
	);
}
