import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Container } from '@/app/layout-components/Container';
import { H2 } from '@/app/components/typography';
import { InfoTooltip } from '@/app/components/InfoTooltip';
import { cn } from '@/lib/utils';

interface TeachingStyleProps {
	teachingStyle: string;
	handleInputChange: (value: string) => void;
}

const teachingStyles = ['Lecture-based', 'Discussion-oriented', 'Hands-on / Practical', 'Blended / Hybrid'];

export const TeachingStyle: React.FC<TeachingStyleProps> = ({ teachingStyle, handleInputChange }) => (
	<Container>
		<H2 className="text-lg">Teaching Style</H2>
		<div className="space-y-2">
			<Label>
				Primary Teaching Style*
				<InfoTooltip content="Select the teaching style that best describes your overall approach." />
			</Label>
			<RadioGroup
				onValueChange={handleInputChange}
				value={teachingStyle}
				required
			>
				{teachingStyles.map((style, index) => (
					<div
						key={style}
						className="flex items-center space-x-2"
					>
						<RadioGroupItem
							value={style.toLowerCase()}
							id={`r${index + 1}`}
							className={cn('border-gray-300 text-purple-600 focus:ring-purple-500', 'bg-gray-200 hover:bg-gray-300')}
						/>
						<Label
							htmlFor={`r${index + 1}`}
							className="text-gray-600"
						>
							{style}
						</Label>
					</div>
				))}
			</RadioGroup>
		</div>
	</Container>
);
