import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut } from 'lucide-react';

export const Header: React.FC = () => (
	<header className="bg-white shadow-sm py-4 px-6">
		<div className="max-w-7xl mx-auto flex justify-between items-center">
			<h1 className="text-2xl font-bold text-[#006D77]">Lumina</h1>
			<div className="flex items-center space-x-4">
				<Avatar>
					<AvatarImage
						src="/placeholder.svg?height=32&width=32"
						alt="User avatar"
					/>
					<AvatarFallback>U</AvatarFallback>
				</Avatar>
				<Button
					variant="ghost"
					size="sm"
				>
					<LogOut className="mr-2 h-4 w-4" />
					Logout
				</Button>
			</div>
		</div>
	</header>
);
