import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface CVUploadProps {
	onFileSelect: (file: File | null) => void;
	setCVFileName: (name: string | undefined) => void;
	cvFileName?: string;
}

export const CVUpload: React.FC<CVUploadProps> = ({ onFileSelect, setCVFileName, cvFileName }) => {
	const [isDragging, setIsDragging] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setCVFileName(file.name);
			onFileSelect(file);
		}
	};

	const handleRemoveFile = () => {
		setCVFileName(undefined);
		onFileSelect(null);
		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	};

	const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(true);
	};

	const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);
	};

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);

		const file = e.dataTransfer.files?.[0];
		if (file && file.type === 'application/pdf') {
			setCVFileName(file.name);
			onFileSelect(file);
		}
	};

	return (
		<div>
			<div
				className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer ${
					isDragging ? 'border-[#006D77] bg-[#E0F2F1]' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
				}`}
				onDragEnter={handleDragEnter}
				onDragLeave={handleDragLeave}
				onDragOver={handleDragOver}
				onDrop={handleDrop}
				onClick={() => fileInputRef.current?.click()}
			>
				<Upload className="w-10 h-10 mb-3 text-gray-400" />
				<p className="mb-2 text-sm text-gray-500">
					<span className="font-semibold">Click to upload</span> or drag and drop
				</p>
				<p className="text-xs text-gray-500">PDF (MAX. 10MB)</p>
				<Input
					id="cv-file"
					type="file"
					className="hidden"
					accept=".pdf"
					ref={fileInputRef}
					onChange={handleFileChange}
				/>
			</div>
			{cvFileName && (
				<div className="flex items-center mt-4">
					<p className="text-sm text-gray-600 mr-2">{cvFileName}</p>
					<Button
						variant="ghost"
						size="sm"
						onClick={handleRemoveFile}
						className="p-1"
					>
						<X className="h-4 w-4 text-gray-500" />
					</Button>
				</div>
			)}
		</div>
	);
};
