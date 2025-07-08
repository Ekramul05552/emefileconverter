import React, { useState } from 'react';
import { Image, FileImage, Download, FileText } from 'lucide-react';
import FileDropzone from './FileDropzone';
import { convertImageFormat, downloadFile, createPDFFromImages } from '../utils/fileUtils';
import { getTranslation } from '../utils/translations';

interface ImageConverterProps {
  language: string;
}

const ImageConverter: React.FC<ImageConverterProps> = ({ language }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [targetFormat, setTargetFormat] = useState<string>('png');
  const [mergeIntoPdf, setMergeIntoPdf] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const supportedFormats = ['jpg', 'jpeg', 'png', 'webp'];

  const handleConvert = async () => {
    if (files.length === 0) return;

    setIsProcessing(true);
    
    try {
      if (mergeIntoPdf) {
        const pdfBlob = await createPDFFromImages(files);
        downloadFile(pdfBlob, `converted_images.pdf`);
      } else {
        for (const file of files) {
          const convertedBlob = await convertImageFormat(file, targetFormat);
          const fileName = file.name.replace(/\.[^/.]+$/, `.${targetFormat}`);
          downloadFile(convertedBlob, fileName);
        }
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
        <div className="p-2 bg-blue-100 rounded-lg">
          <Image className="w-6 h-6 text-blue-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">
          {getTranslation('imageConverter', language)}
        </h2>
      </div>

      <FileDropzone
        files={files}
        onFilesChange={setFiles}
        acceptedFormats={supportedFormats}
        language={language}
      />

      <div className="mt-6 space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="merge-pdf"
              checked={mergeIntoPdf}
              onChange={(e) => setMergeIntoPdf(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <label htmlFor="merge-pdf" className="text-sm font-medium text-gray-700">
              {getTranslation('mergeIntoPdf', language)}
            </label>
          </div>
        </div>

        {!mergeIntoPdf && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {getTranslation('convertTo', language)}:
            </label>
            <select
              value={targetFormat}
              onChange={(e) => setTargetFormat(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="png">PNG</option>
              <option value="jpg">JPG</option>
              <option value="jpeg">JPEG</option>
              <option value="webp">WebP</option>
            </select>
          </div>
        )}

        <button
          onClick={handleConvert}
          disabled={files.length === 0 || isProcessing}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          {isProcessing ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : mergeIntoPdf ? (
            <FileText className="w-5 h-5" />
          ) : (
            <FileImage className="w-5 h-5" />
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

export default ImageConverter;