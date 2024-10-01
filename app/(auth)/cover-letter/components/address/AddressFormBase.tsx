import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export interface AddressData {
	name: string;
	title: string;
	institution: string;
	address: string;
}

export interface AddressFormBaseProps {
	onDataChange: (data: AddressData) => void;
}

export function AddressFormBase({ onDataChange }: AddressFormBaseProps) {
	const [formData, setFormData] = useState<AddressData>({
		name: '',
		title: '',
		institution: '',
		address: '',
	});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	useEffect(() => {
		onDataChange(formData);
	}, [formData, onDataChange]);

	const renderInput = (name: keyof AddressData, label: string) => (
		<div className="mb-4">
			<Label htmlFor={name}>{label}</Label>
			<Input
				type="text"
				id={name}
				name={name}
				value={formData[name]}
				onChange={handleInputChange}
				className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
			/>
		</div>
	);

	return { formData, renderInput };
}
