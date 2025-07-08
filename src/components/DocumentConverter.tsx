import React, { useState } from 'react';
import { FileText, Download } from 'lucide-react';
import FileDropzone from './FileDropzone';
import { downloadFile } from '../utils/fileUtils';
import { getTranslation } from '../utils/translations';

interface DocumentConverterProps {
  language: string;
}

const DocumentConverter: React.FC<DocumentConverterProps> = ({ language }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [targetFormat, setTargetFormat] = useState<string>('docx');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const supportedFormats = ['pdf', 'doc', 'docx', 'xls', 'xlsx'];

  const handleConvert = async () => {
    if (files.length === 0) return;

    setIsProcessing(true);
    
    try {
      // In a real application, you would use proper document conversion libraries
      // This is a placeholder implementation
      for (const file of files) {
        // Simulate conversion process
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const convertedBlob = new Blob([`Converted ${file.name} to ${targetFormat}`], {
          type: targetFormat === 'pdf' ? 'application/pdf' : 'application/msword'
        });
        
        const fileName = file.name.replace(/\.[^/.]+$/, `.${targetFormat}`);
        downloadFile(convertedBlob, fileName);
      }
    } catch (error) {
      console.error('Conversion failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-white/20 p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-emerald-100 rounded-lg">
          <FileText className="w-6 h-6 text-emerald-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">
          {getTranslation('documentConverter', language)}
        </h2>
      </div>

      <FileDropzone
        files={files}
        onFilesChange={setFiles}
        acceptedFormats={supportedFormats}
        language={language}
      />

      <div className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {getTranslation('convertTo', language)}:
          </label>
          <select
            value={targetFormat}
            onChange={(e) => setTargetFormat(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="pdf">PDF</option>
            <option value="docx">Word (.docx)</option>
            <option value="doc">Word (.doc)</option>
            <option value="xlsx">Excel (.xlsx)</option>
            <option value="xls">Excel (.xls)</option>
          </select>
        </div>

        <button
          onClick={handleConvert}
          disabled={files.length === 0 || isProcessing}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          {isProcessing ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Download className="w-5 h-5" />
          )}
          {isProcessing 
            ? getTranslation('processing', language)
            : getTranslation('convert', language)
          }
        </button>
      </div>
    </div>
  );
};

export default DocumentConverter;