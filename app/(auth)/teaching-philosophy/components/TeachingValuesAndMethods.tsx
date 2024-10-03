import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Container } from '@/app/layout-components/Container';
import { H2 } from '@/app/components/typography';
import { InfoTooltip } from '@/app/components/InfoTooltip';

interface TeachingValuesAndMethodsProps {
	inputs: {
		teachingValues: string[];
		assessmentMethods: string[];
	};
	handleCheckboxChange: (name: string, value: string) => void;
}

const checkboxStyle = {
	backgroundColor: '#e5e7eb',
	borderColor: '#d1d5db',
	color: '#7c3aed',
	'&:hover': { backgroundColor: '#d1d5db' },
	'&:focus': { boxShadow: '0 0 0 2px rgba(124, 58, 237, 0.5)' },
};

const teachingValues = [
	'Critical thinking',
	'Technological ethics',
	'Collaboration',
	'Innovation',
	'Lifelong learning',
];
const assessmentMethods = [
	'Projects and assignments',
	'Oral presentations',
	'Peer evaluations',
	'Written exams',
	'Research papers',
	'Class participation',
	'Practical demonstrations',
	'Portfolio assessments',
	'Group work',
	'Reflective journals',
];

export const TeachingValuesAndMethods: React.FC<TeachingValuesAndMethodsProps> = ({ inputs, handleCheckboxChange }) => (
	<Container>
		<H2 className="text-lg">Teaching Values and Methods</H2>
		<div className="space-y-6">
			<div className="space-y-2">
				<Label>
					Teaching Values*
					<InfoTooltip content="Select the core values that guide your teaching philosophy and approach." />
				</Label>
				<div className="space-y-2">
					{teachingValues.map((value) => (
						<div
							key={value}
							className="flex items-center"
						>
							<Checkbox
								id={`value-${value}`}
								checked={inputs.teachingValues.includes(value)}
								onCheckedChange={(checked) => handleCheckboxChange('teachingValues', value)}
								style={checkboxStyle}
								required={inputs.teachingValues.length === 0}
							/>
							<label
								htmlFor={`value-${value}`}
								className="ml-2 text-sm"
							>
								{value}
							</label>
						</div>
					))}
				</div>
			</div>
			<div className="space-y-2">
				<Label>
					Assessment Methods*
					<InfoTooltip content="Choose the methods you use to evaluate student learning and progress." />
				</Label>
				<div className="space-y-2">
					{assessmentMethods.map((method) => (
						<div
							key={method}
							className="flex items-center"
						>
							<Checkbox
								id={`assessment-${method}`}
									checked={inputs.assessmentMethods.includes(method)}
									onCheckedChange={(checked) => handleCheckboxChange('assessmentMethods', method)}
									style={checkboxStyle}
									required={inputs.assessmentMethods.length === 0}
							/>
							<label
								htmlFor={`assessment-${method}`}
								className="ml-2 text-sm"
							>
								{method}
							</label>
						</div>
					))}
				</div>
			</div>
		</div>
	</Container>
);
