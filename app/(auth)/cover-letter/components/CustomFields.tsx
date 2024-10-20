import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface CustomFieldsProps {
	customFields: Record<string, string>;
	setCustomFields: React.Dispatch<React.SetStateAction<Record<string, string>>>;
	newFieldName: string;
	setNewFieldName: React.Dispatch<React.SetStateAction<string>>;
}

export const CustomFields: React.FC<CustomFieldsProps> = ({
	customFields,
	setCustomFields,
	newFieldName,
	setNewFieldName,
}) => {
	const handleAddCustomField = () => {
		if (newFieldName.trim() !== '') {
			setCustomFields((prev) => ({
				...prev,
				[newFieldName.trim()]: '',
			}));
			setNewFieldName('');
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
		<div className="space-y-4">
			{Object.entries(customFields).map(([fieldName, fieldValue]) => (
				<div
					key={fieldName}
					className="flex flex-col space-y-2"
				>
					<div className="flex justify-between items-center">
						<Label htmlFor={fieldName}>{fieldName}</Label>
						<Button
							type="button"
							variant="outline"
							size="sm"
							onClick={() => handleRemoveCustomField(fieldName)}
						>
							Remove
						</Button>
					</div>
					<Textarea
						id={fieldName}
						value={fieldValue}
						onChange={(e) => handleCustomFieldChange(fieldName, e.target.value)}
						placeholder={`Enter content for ${fieldName}`}
					/>
				</div>
			))}
			<div className="flex space-x-2">
				<Input
					placeholder="New field name"
					value={newFieldName}
					onChange={(e) => setNewFieldName(e.target.value)}
				/>
				<Button
					className="bg-purple-700 hover:bg-purple-800"
					onClick={handleAddCustomField}
				>
					Add Field
				</Button>
			</div>
		</div>
	);
};
