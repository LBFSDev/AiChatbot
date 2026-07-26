import React, { useState, useRef, ChangeEvent, DragEvent } from 'react';
import './FileUpload.css';

interface FileUploadProps {
  maxSizeMB?: number;
  acceptedTypes?: string[];
  onUploadSuccess?: (result: any) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ 
  maxSizeMB = 10, 
  acceptedTypes = ['application/pdf'],
  onUploadSuccess 
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateAndAddFiles = (incomingFiles: FileList | File[]) => {
    setError('');
    const validFiles: File[] = [];

    Array.from(incomingFiles).forEach((file: File) => {
      if (file.size > maxSizeMB * 1024 * 1024) {
        setError(`"${file.name}" exceeds the ${maxSizeMB}MB limit.`);
        return;
      }
      if (acceptedTypes.length > 0 && !acceptedTypes.includes(file.type)) {
        setError(`"${file.name}" is not a supported file type.`);
        return;
      }
      validFiles.push(file);
    });

    if (validFiles.length > 0) {
      setFiles((prev) => [...prev, ...validFiles]);
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    setIsUploading(true);
    setError('');

    const formData = new FormData();
    // Appending selected files
    files.forEach((file) => {
      formData.append('file', file);
    });

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData, // Browser automatically sets 'multipart/form-data' header
      });

      if (!response.ok) {
        throw new Error('Upload failed. Please try again.');
      }

      const data = await response.json();
      setFiles([]); // Reset list on success
      if (onUploadSuccess) onUploadSuccess(data);
    } catch (err: any) {
      setError(err.message || 'An error occurred during upload.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="file-upload-container">
      <div
        className={`drop-zone ${isDragging ? 'dragging' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          if (e.dataTransfer.files) validateAndAddFiles(e.dataTransfer.files);
        }}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => e.target.files && validateAndAddFiles(e.target.files)}
          style={{ display: 'none' }}
          accept={acceptedTypes.join(',')}
        />
        <div className="upload-icon">📁</div>
        <p className="primary-text"><strong>Click to upload</strong> or drag and drop</p>
        <p className="secondary-text">PDF files only (max {maxSizeMB}MB)</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      {files.length > 0 && (
        <>
          <ul className="file-list">
            {files.map((file, index) => (
              <li key={`${file.name}-${index}`} className="file-item">
                <span className="file-name">{file.name}</span>
                <button 
                  type="button" 
                  className="remove-btn" 
                  onClick={() => setFiles(files.filter((_, i) => i !== index))}
                  disabled={isUploading}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>

          <button 
            className="upload-submit-btn" 
            onClick={handleUpload} 
            disabled={isUploading}
          >
            {isUploading ? 'Processing & Embedding...' : 'Save to Database'}
          </button>
        </>
      )}
    </div>
  );
};

export default FileUpload;