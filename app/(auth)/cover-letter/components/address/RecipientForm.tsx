import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { User, Building, MapPin } from 'lucide-react';
import { AddressFormProps, useAddressForm } from './hooks/useAddressForm';
import { InputGroup } from './InputGroup';
import { cn } from '@/lib/utils';

export const RecipientForm: React.FC<AddressFormProps> = ({ onDataChange, styleOverrides }) => {
	const { formData, handleInputChange } = useAddressForm({ onDataChange });

	return (
		<Card className={styleOverrides?.card}>
			<CardContent className={cn('p-4', styleOverrides?.cardContent)}>
				<h3 className="text-lg font-semibold mb-4 text-gray-600 flex items-center">Recipient Information</h3>
				<div className="space-y-4">
					<InputGroup
						label="Full Name"
						name="name"
						placeholder="e.g. Dr. John Doe"
						icon={<User className="w-5 h-5 text-gray-400" />}
						value={formData.name}
						onChange={handleInputChange}
					/>
					<InputGroup
						label="Title"
						name="title"
						placeholder="e.g. Chair, Search Committee"
						icon={<User className="w-5 h-5 text-gray-400" />}
						value={formData.title}
						onChange={handleInputChange}
					/>
					<InputGroup
						label="Institution"
						name="institution"
						placeholder="e.g. Stanford University"
						icon={<Building className="w-5 h-5 text-gray-400" />}
						value={formData.institution}
						onChange={handleInputChange}
					/>
					<InputGroup
						label="Address"
						name="address"
						placeholder="e.g. 450 Serra Mall, Stanford, CA 94305"
						icon={<MapPin className="w-5 h-5 text-gray-400" />}
						value={formData.address}
						onChange={handleInputChange}
					/>
				</div>
			</CardContent>
		</Card>
	);
};
