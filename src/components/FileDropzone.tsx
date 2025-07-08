import React, { useCallback } from 'react';
import { Upload, File, X } from 'lucide-react';
import { formatFileSize } from '../utils/fileUtils';
import { getTranslation } from '../utils/translations';

interface FileDropzoneProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
  acceptedFormats: string[];
  language: string;
}

const FileDropzone: React.FC<FileDropzoneProps> = ({
  files,
  onFilesChange,
  acceptedFormats,
  language
}) => {
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    onFilesChange([...files, ...droppedFiles]);
  }, [files, onFilesChange]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      onFilesChange([...files, ...selectedFiles]);
    }
  }, [files, onFilesChange]);

  const removeFile = (index: number) => {
    onFilesChange(files.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full">
      <div
        className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer bg-blue-50/50"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => document.getElementById('file-input')?.click()}
      >
        <Upload className="w-12 h-12 text-blue-400 mx-auto mb-4" />
        <p className="text-lg font-medium text-gray-700 mb-2">
          {getTranslation('dragDrop', language)}
        </p>
        <p className="text-sm text-gray-500">
          {getTranslation('supportedFormats', language)}: {acceptedFormats.join(', ')}
        </p>
        <input
          id="file-input"
          type="file"
          multiple
          accept={acceptedFormats.map(format => `.${format}`).join(',')}
          onChange={handleFileInput}
          className="hidden"
        />
      </div>

      {files.length > 0 && (
        <div className="mt-6 space-y-3">
          <h3 className="text-lg font-semibold text-gray-800">
            {getTranslation('selectFiles', language)} ({files.length})
          </h3>
          <div className="max-h-48 overflow-y-auto space-y-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <File className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-800">{file.name}</p>
                    <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileDropzone;