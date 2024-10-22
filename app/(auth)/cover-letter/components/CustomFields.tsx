import React, { useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

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
	const lastTextareaRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		if (lastTextareaRef.current) {
			lastTextareaRef.current.focus();
		}
	}, [Object.keys(customFields).length]);

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
		<div className="space-y-4">
			{Object.entries(customFields).map(([fieldName, fieldValue], index) => (
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
							variant="ghost"
							size="sm"
						>
							<X className="h-4 w-4" />
						</Button>
					</div>
					<Textarea
						id={fieldName}
						value={fieldValue}
						onChange={(e) => handleCustomFieldChange(fieldName, e.target.value)}
						placeholder={`Enter content for ${fieldName}`}
						ref={index === Object.keys(customFields).length - 1 ? lastTextareaRef : null}
						className="max-h-32 min-h-[80px]"
					/>
					<div className="border border-gray-300 !mb-8 !mt-8" />
				</div>
			))}
			<div className="flex space-x-2">
				<Input
					placeholder="New field name"
					value={newFieldName}
					onChange={(e) => setNewFieldName(e.target.value)}
					onKeyDown={handleKeyDown}
				/>
				<Button
					onClick={handleAddCustomField}
					className="bg-purple-600 hover:bg-purple-700 text-white"
				>
					Add Field
				</Button>
			</div>
		</div>
	);
};
