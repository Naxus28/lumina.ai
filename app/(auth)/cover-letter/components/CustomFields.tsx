import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { Container } from '@/app/layout-components/Container';
import { H2, Paragraph } from '@/app/components/typography';

interface CustomFieldsProps {
	customFields: Record<string, string>;
	setCustomFields: React.Dispatch<React.SetStateAction<Record<string, string>>>;
	newFieldName: string;
	setNewFieldName: (value: string) => void;
}

export const CustomFields: React.FC<CustomFieldsProps> = ({
	customFields,
	setCustomFields,
	newFieldName,
	setNewFieldName,
}) => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
		checkIfMobile();
		window.addEventListener('resize', checkIfMobile);
		return () => window.removeEventListener('resize', checkIfMobile);
	}, []);

	const handleAddCustomField = () => {
		if (newFieldName.trim() !== '') {
			setCustomFields((prev) => ({
				...prev,
				[newFieldName.trim()]: '',
			}));
			setNewFieldName('');
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			handleAddCustomField();
		}
	};

	const handleRemoveCustomField = (fieldName: string) => {
		setCustomFields((prev) => {
			const newFields = { ...prev };
			delete newFields[fieldName];
			return newFields;
		});
	};

	const handleCustomFieldChange = (fieldName: string, value: string) => {
		setCustomFields((prev) => ({
			...prev,
			[fieldName]: value,
		}));
	};

	return (
		<div className="space-y-2">
			{Object.entries(customFields).map(([fieldName, fieldValue]) => (
				<div
					key={fieldName}
					className="flex flex-col space-y-2"
				>
					<div className="flex justify-between items-center">
						<label
							htmlFor={fieldName}
							className="text-sm font-medium text-gray-700"
						>
							{fieldName}
						</label>
						<Button
							onClick={() => handleRemoveCustomField(fieldName)}
							variant="outline"
							size="sm"
						>
							Remove
						</Button>
					</div>
					<Input
						id={fieldName}
						value={fieldValue}
						onChange={(e) => handleCustomFieldChange(fieldName, e.target.value)}
						placeholder={`Enter content for ${fieldName}`}
					/>
				</div>
			))}
			<div className="flex space-x-2">
				<Input
					placeholder='Type a new field name and press "Enter"'
					value={newFieldName}
					onChange={(e) => setNewFieldName(e.target.value)}
					onKeyDown={handleKeyDown}
				/>
				{isMobile && <Button onClick={handleAddCustomField}>Add Field</Button>}
			</div>
		</div>
	);
};
