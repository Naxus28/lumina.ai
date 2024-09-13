import React from 'react';
import { IconWrapper } from '@/components/ui/iconWrapper';

export const StepItem: React.FC<{ icon: React.ElementType; title: string; description: string }> = ({ icon: Icon, title, description }) => (
	<div className="flex flex-col items-center text-center">
		<IconWrapper
			Icon={Icon}
			size={50}
		/>
		<h3 className="text-xl font-semibold text-gray-700 mb-2">{title}</h3>
		<p className="text-gray-900">{description}</p>
	</div>
);
