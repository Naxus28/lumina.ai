import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Container } from '@/app/layout-components/Container';
import { H2 } from '@/app/components/typography';
import { InfoTooltip } from '@/app/components/InfoTooltip';

interface BasicInformationProps {
	inputs: {
		discipline: string;
		experience: string;
	};
	handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const BasicInformation: React.FC<BasicInformationProps> = ({ inputs, handleInputChange }) => (
	<Container>
		<H2 className="text-lg">Basic Information</H2>
		<div className="space-y-6">
			<div className="space-y-2">
				<Label
					htmlFor="discipline"
					className="text-gray-600 flex items-center"
				>
					Academic Discipline*
					<InfoTooltip content="Your primary field of study, any specializations or focus areas, and interdisciplinary interests if applicable. E.g. Computer Science (AI focus), with cognitive psychology interests; Environmental Biology, specializing in marine ecosystems; Comparative Literature, with digital humanities applications, etc." />
				</Label>
				<Input
					id="discipline"
					name="discipline"
					value={inputs.discipline}
					onChange={handleInputChange}
					required
				/>
				<div className="space-y-2">
					<Label
						htmlFor="experience"
						className="text-gray-600 flex items-center"
					>
						Years of Teaching Experience*
						<InfoTooltip content="E.g., 7 years, including 3 years as a teaching assistant and 4 years as a lecturer" />
					</Label>
					<Input
						id="experience"
						name="experience"
						type="number"
						min="0"
						value={inputs.experience}
						onChange={handleInputChange}
						required
					/>
				</div>
			</div>
		</div>
	</Container>
);
