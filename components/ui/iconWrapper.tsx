import React from 'react';

interface IconWrapperProps {
	Icon: React.ElementType;
	size?: number;
	iconColor?: string;
	backgroundColor?: string;
}

export const IconWrapper = ({ Icon, size = 38, iconColor = '#006D77', backgroundColor = '#E0F2F1' }: IconWrapperProps) => {
	return (
		<div
			style={{
				width: `${size}px`,
				height: `${size}px`,
				backgroundColor: backgroundColor,
				borderRadius: '50%',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				marginRight: '5px',
			}}
		>
			<Icon
				size={size * 0.55}
				color={iconColor}
			/>
		</div>
	);
};
