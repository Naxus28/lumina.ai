import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { User, Building, MapPin } from 'lucide-react';
import { AddressFormProps, useAddressForm } from './hooks/useAddressForm';
import { InputGroup } from './InputGroup';

export const SenderForm: React.FC<AddressFormProps> = ({ onDataChange }) => {
	const { formData, handleInputChange } = useAddressForm({ onDataChange });

	return (
		<Card>
			<CardContent className="p-4">
				<h3 className="text-lg font-semibold mb-4 text-gray-600 flex items-center">Sender Information</h3>
				<div className="space-y-4">
					<InputGroup
						label="Full Name"
						name="name"
						placeholder="e.g. Dr. Jane Smith"
						icon={<User className="w-5 h-5 text-gray-400" />}
						value={formData.name}
						onChange={handleInputChange}
					/>
					<InputGroup
						label="Title"
						name="title"
						placeholder="e.g. Assistant Professor of Biology"
						icon={<User className="w-5 h-5 text-gray-400" />}
						value={formData.title}
						onChange={handleInputChange}
					/>
					<InputGroup
						label="Institution"
						name="institution"
						placeholder="e.g. University of California, Berkeley"
						icon={<Building className="w-5 h-5 text-gray-400" />}
						value={formData.institution}
						onChange={handleInputChange}
					/>
					<InputGroup
						label="Address"
						name="address"
						placeholder="e.g. 1234 University Ave, Berkeley, CA 94720"
						icon={<MapPin className="w-5 h-5 text-gray-400" />}
						value={formData.address}
						onChange={handleInputChange}
					/>
				</div>
			</CardContent>
		</Card>
	);
};
