import React, { useRef, useState, useEffect } from 'react';
import { Upload, X } from 'lucide-react';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';

interface ImageUploadProps {
    label?: string;
    name: string;
    value?: File | null;
    currentImageUrl?: string;
    onChange: (file: File | null) => void;
    error?: string;
    required?: boolean;
    accept?: string;
    maxSize?: number; // in MB
    className?: string;
    previewClassName?: string;
    dragDropText?: string;
    helpText?: string;
}

export default function ImageUpload({
                                        label = 'Image',
                                        name,
                                        value,
                                        currentImageUrl,
                                        onChange,
                                        error,
                                        required = false,
                                        accept = 'image/*',
                                        maxSize = 5,
                                        className = '',
                                        previewClassName = 'w-48 h-32',
                                        dragDropText = 'Click to upload or drag and drop',
                                        helpText = 'PNG, JPG, GIF, WebP up to 5MB'
                                    }: ImageUploadProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imagePreview, setImagePreview] = useState<string>(currentImageUrl || '');
    const [dragOver, setDragOver] = useState(false);

    // Update preview when currentImageUrl changes
    useEffect(() => {
        if (currentImageUrl) {
            setImagePreview(currentImageUrl);
        }
    }, [currentImageUrl]);

    const validateFile = (file: File): string | null => {
        // Validate file type
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            return 'Please select a valid image file (JPEG, PNG, GIF, or WebP)';
        }

        // Validate file size
        if (file.size > maxSize * 1024 * 1024) {
            return `File size must be less than ${maxSize}MB`;
        }

        return null;
    };

    const handleFileChange = (file: File | null) => {
        if (!file) {
            onChange(null);
            setImagePreview('');
            return;
        }

        const validationError = validateFile(file);
        if (validationError) {
            alert(validationError);
            return;
        }

        onChange(file);

        // Create preview
        const reader = new FileReader();
        reader.onload = (event) => {
            setImagePreview(event.target?.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        handleFileChange(file);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragOver(false);

        const file = e.dataTransfer.files?.[0] || null;
        handleFileChange(file);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragOver(false);
    };

    const removeImage = () => {
        onChange(null);
        setImagePreview('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const openFileDialog = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className={`grid gap-4 ${className}`}>
            <Label htmlFor={name}>
                {label} {required && <span className="text-red-500">*</span>}
            </Label>

            <div className="space-y-3">
                <input
                    ref={fileInputRef}
                    id={name}
                    name={name}
                    type="file"
                    accept={accept}
                    onChange={handleFileInput}
                    className="hidden"
                    required={required}
                />

                <div
                    onClick={openFileDialog}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-200 ${
                        dragOver
                            ? 'border-blue-400 bg-blue-50'
                            : error
                                ? 'border-red-300 bg-red-50'
                                : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                    }`}
                >
                    <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">
                        {dragDropText}
                    </p>
                    {helpText && (
                        <p className="text-xs text-gray-400 mt-1">
                            {helpText}
                        </p>
                    )}
                </div>

                {error && <InputError message={error} />}
            </div>

            {/* Image Preview */}
            {imagePreview && (
                <div className="relative inline-block">
                    <img
                        src={imagePreview}
                        alt="Preview"
                        className={`object-cover rounded border shadow-sm ${previewClassName}`}
                        onError={() => setImagePreview('')}
                    />
                    <button
                        type="button"
                        onClick={removeImage}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                        <X className="h-3 w-3" />
                    </button>
                </div>
            )}
        </div>
    );
}
