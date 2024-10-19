import React, { useState } from 'react';

export interface AddressFormProps {
	onDataChange: (data: AddressFormData) => void;
}

export interface AddressFormData {
	name: string;
	title: string;
	institution: string;
	address: string;
}

export const useAddressForm = ({ onDataChange }: AddressFormProps) => {
	const [formData, setFormData] = useState<AddressFormData>({
		name: '',
		title: '',
		institution: '',
		address: '',
	});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => {
			const newData = { ...prev, [name]: value };
			onDataChange(newData);
			return newData;
		});
	};

	return { formData, handleInputChange };
};
