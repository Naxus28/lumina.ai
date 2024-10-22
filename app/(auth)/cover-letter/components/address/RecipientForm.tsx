import React from 'react';
import { AddressFormData } from './hooks/useAddressForm';
import { InputGroup } from './InputGroup';
import { cn } from '@/lib/utils';

interface RecipientFormProps {
	handleInputChange: React.Dispatch<React.SetStateAction<AddressFormData>>;
	formData: AddressFormData;
	styleOverrides?: { card?: string; cardContent?: string };
}

export const RecipientForm: React.FC<RecipientFormProps> = ({ handleInputChange, styleOverrides, formData }) => {
	const handleChange = (field: string, e: React.ChangeEvent<HTMLInputElement>) => {
		const updatedFields = { ...formData, [field]: e.target.value };
		handleInputChange(updatedFields);
	};

	return (
		<div className={cn('p-4', styleOverrides?.cardContent)}>
			<h3 className="text-lg font-semibold mb-4 text-gray-600 flex items-center">Recipient Information</h3>
			<div className="space-y-4">
				<InputGroup
					label="Full Name"
					name="name"
					placeholder="e.g. Dr. John Doe"
					value={formData.name}
					onChange={(e) => handleChange('name', e)}
				/>
				<InputGroup
					label="Title"
					name="title"
					placeholder="e.g. Chair, Search Committee"
					value={formData.title}
					onChange={(e) => handleChange('title', e)}
				/>
				<InputGroup
					label="Institution"
					name="institution"
					placeholder="e.g. Stanford University"
					value={formData.institution}
					onChange={(e) => handleChange('institution', e)}
				/>
				<InputGroup
					label="Address"
					name="address"
					placeholder="e.g. 450 Serra Mall, Stanford, CA 94305"
					value={formData.address}
					onChange={(e) => handleChange('address', e)}
				/>
			</div>
		</div>
	);
};
