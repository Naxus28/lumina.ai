import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Container } from '@/app/layout-components/Container';
import { H2 } from '@/app/components/typography';
import { InfoTooltip } from '@/app/components/InfoTooltip';
import { checkboxStyle } from '@/app/styles/shared-styles';

interface TeachingStyleProps {
	selectedStyles: string[];
	handleCheckboxChange: (name: string, value: string) => void;
}

const teachingStyles = [
	'Lecture-based',
	'Discussion-oriented',
	'Hands-on / Practical',
	'Blended / Hybrid',
	'Inquiry-Based Learning',
	'Project-Based Learning',
	'Flipped Classroom',
	'Experiential Learning',
];

export const TeachingStyle: React.FC<TeachingStyleProps> = ({ selectedStyles, handleCheckboxChange }) => (
	<Container paddingX="none">
		<H2 className="text-lg">Teaching Styles</H2>
		<div className="space-y-2">
			<Label className="flex items-center">
				Primary Teaching Styles*
				<InfoTooltip content="Select the teaching styles that best describe your overall approach. You may choose multiple styles." />
			</Label>
			<div className="space-y-2">
				{teachingStyles.map((style) => (
					<div
						key={style}
						className="flex items-center"
					>
						<Checkbox
							id={`style-${style}`}
							checked={selectedStyles.includes(style)}
							onCheckedChange={(checked) => handleCheckboxChange('teachingStyles', style)}
							style={checkboxStyle}
						/>
						<label
							htmlFor={`style-${style}`}
							className="ml-2 text-sm"
						>
							{style}
						</label>
					</div>
				))}
			</div>
		</div>
	</Container>
);
