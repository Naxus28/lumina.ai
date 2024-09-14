import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { User, Building, MapPin, Send } from 'lucide-react';

interface AddresseeSenderData {
	senderName: string;
	senderTitle: string;
	senderInstitution: string;
	senderAddress: string;
	addresseeName: string;
	addresseeTitle: string;
	addresseeInstitution: string;
	addresseeAddress: string;
}

interface AddresseeSenderFormProps {
	onDataChange: (data: AddresseeSenderData) => void;
}

export function AddresseeSenderForm({ onDataChange }: AddresseeSenderFormProps) {
	const [formData, setFormData] = useState<AddresseeSenderData>({
		senderName: '',
		senderTitle: '',
		senderInstitution: '',
		senderAddress: '',
		addresseeName: '',
		addresseeTitle: '',
		addresseeInstitution: '',
		addresseeAddress: '',
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

	const renderInputGroup = (label: string, name: string, placeholder: string, icon: React.ReactNode) => (
		<div className="space-y-2">
			<Label
				htmlFor={name}
				className="text-sm font-medium text-gray-700"
			>
				{label}
			</Label>
			<div className="relative">
				<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">{icon}</div>
				<Input
					id={name}
					name={name}
					value={formData[name as keyof AddresseeSenderData]}
					onChange={handleInputChange}
					placeholder={placeholder}
					className="pl-10 w-full focus-theme-border"
				/>
			</div>
		</div>
	);

	return (
		<div className="space-y-8 bg-gray-50 rounded-lg shadow-sm">
			<style
				jsx
				global
			>{`
				.focus-theme-border {
					transition: border-color 0.2s ease-in-out;
				}
				.focus-theme-border:focus {
					border-color: #006d77;
					box-shadow: 0 0 0 1px #006d77;
				}
			`}</style>
			<h2 className="text-lg font-semibold text-gray-800 mb-4 uppercase">2. Provide the sender and addressee details for your cover letter</h2>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				<Card>
					<CardContent className="p-4">
						<h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
							<Send className="w-5 h-5 mr-2 text-[#006D77]" />
							Sender Information
						</h3>
						<div className="space-y-4">
							{renderInputGroup('Full Name', 'senderName', 'e.g. Gabriel Ferraz', <User className="w-5 h-5 text-gray-400" />)}
							{renderInputGroup('Title', 'senderTitle', 'e.g. PhD Candidate in Historical Musicology', <User className="w-5 h-5 text-gray-400" />)}
							{renderInputGroup('Institution', 'senderInstitution', 'e.g. University of Florida School of Music', <Building className="w-5 h-5 text-gray-400" />)}
							{renderInputGroup('Address', 'senderAddress', 'e.g. P.O. Box 117900 - Gainesville, FL 32611-7900', <MapPin className="w-5 h-5 text-gray-400" />)}
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent className="p-6">
						<h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
							<Send className="w-5 h-5 mr-2 text-[#006D77]" />
							Addressee Information
						</h3>
						<div className="space-y-4">
							{renderInputGroup('Full Name', 'addresseeName', 'e.g. C. William Bechman', <User className="w-5 h-5 text-gray-400" />)}
							{renderInputGroup('Title', 'addresseeTitle', 'e.g. Human Resources Department', <User className="w-5 h-5 text-gray-400" />)}
							{renderInputGroup('Institution', 'addresseeInstitution', 'e.g. College of Mount Saint Vincent', <Building className="w-5 h-5 text-gray-400" />)}
							{renderInputGroup('Address', 'addresseeAddress', 'e.g. 6301 Riverdale Ave. Bronx, NY 10471', <MapPin className="w-5 h-5 text-gray-400" />)}
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
