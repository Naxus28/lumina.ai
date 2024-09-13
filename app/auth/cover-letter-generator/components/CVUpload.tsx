import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';

interface CVUploadProps {
	onFileSelect: (file: File | null) => void;
}

export const CVUpload: React.FC<CVUploadProps> = ({ onFileSelect }) => {
	const [fileName, setFileName] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		console.log('event', event);
		console.log('event.target.files', event.target.files);
		const file = event.target.files?.[0];
		if (file) {
			setFileName(file.name);
			onFileSelect(file);
		}
	};

	const handleRemoveFile = () => {
		setFileName(null);
		onFileSelect(null);
		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	};

	const handleUploadClick = () => {
		fileInputRef.current?.click();
	};

	return (
		<section className="mb-8">
			<div className="flex items-center mb-4">
				<div className="bg-[#006D77] text-white rounded-full w-6 h-6 flex items-center justify-center font-bold mr-2 text-xs">3</div>
				<h2 className="text-2xl font-semibold text-gray-700">Upload Your CV</h2>
			</div>
			<input
				ref={fileInputRef}
				type="file"
				accept=".pdf"
				onChange={handleFileChange}
				className="hidden"
				id="cv-upload"
			/>
			{!fileName ? (
				<Button
					variant="outline"
					className="w-full border-gray-300 text-gray-700"
					onClick={handleUploadClick}
				>
					<Upload className="mr-2 h-5 w-5" />
					Upload CV (PDF)
				</Button>
			) : (
				<div className="flex items-center justify-between p-2 border border-gray-300 rounded-md">
					<span className="text-sm text-gray-600 truncate max-w-[80%]">{fileName}</span>
					<Button
						variant="ghost"
						size="sm"
						onClick={handleRemoveFile}
						className="text-gray-500 hover:text-gray-700"
					>
						<X className="h-4 w-4" />
					</Button>
				</div>
			)}
		</section>
	);
};
