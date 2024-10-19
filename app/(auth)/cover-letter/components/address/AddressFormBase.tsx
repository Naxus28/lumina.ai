import React, { useState, useEffect } from 'react';

export interface AddressData {
	name: string;
	title: string;
	institution: string;
	address: string;
}

export interface AddressFormBaseProps {
	onDataChange: (data: AddressData) => void;
}

export const AddressFormBase = ({ onDataChange }: AddressFormBaseProps) => {
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

	return { formData, handleInputChange };
};
