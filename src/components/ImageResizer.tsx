import React, { useState } from 'react';
import { Crop, Download } from 'lucide-react';
import FileDropzone from './FileDropzone';
import { resizeImage, downloadFile } from '../utils/fileUtils';
import { getTranslation } from '../utils/translations';
import { ResizePreset } from '../types';

interface ImageResizerProps {
  language: string;
}

const resizePresets: ResizePreset[] = [
  { country: 'thailand', flag: '🇹🇭', width: 35, height: 45, name: 'Thailand' },
  { country: 'malaysia', flag: '🇲🇾', width: 35, height: 50, name: 'Malaysia' },
  { country: 'singapore', flag: '🇸🇬', width: 35, height: 45, name: 'Singapore' }
];

const ImageResizer: React.FC<ImageResizerProps> = ({ language }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [selectedPreset, setSelectedPreset] = useState<ResizePreset | null>(null);
  const [customWidth, setCustomWidth] = useState<number>(300);
  const [customHeight, setCustomHeight] = useState<number>(400);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const supportedFormats = ['jpg', 'jpeg', 'png', 'webp'];

  const handleResize = async () => {
    if (files.length === 0) return;

    setIsProcessing(true);
    
    try {
      const targetWidth = selectedPreset ? selectedPreset.width * 10 : customWidth;
      const targetHeight = selectedPreset ? selectedPreset.height * 10 : customHeight;

      for (const file of files) {
        const resizedBlob = await resizeImage(file, targetWidth, targetHeight);
        const fileName = file.name.replace(/\.[^/.]+$/, `_resized.${file.name.split('.').pop()}`);
        downloadFile(resizedBlob, fileName);
      }
    } catch (error) {
      console.error('Resize failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-white/20 p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-amber-100 rounded-lg">
          <Crop className="w-6 h-6 text-amber-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">
          {getTranslation('imageResizer', language)}
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
          <label className="block text-sm font-medium text-gray-700 mb-3">
            {getTranslation('resizePresets', language)}:
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {resizePresets.map((preset) => (
              <button
                key={preset.country}
                onClick={() => setSelectedPreset(preset)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  selectedPreset?.country === preset.country
                    ? 'border-amber-500 bg-amber-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-1">{preset.flag}</div>
                  <div className="text-sm font-medium text-gray-800">
                    {getTranslation(preset.country, language)}
                  </div>
                  <div className="text-xs text-gray-500">
                    {preset.width}mm × {preset.height}mm
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            {getTranslation('customSize', language)}:
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                {getTranslation('width', language)} ({getTranslation('pixels', language)})
              </label>
              <input
                type="number"
                value={customWidth}
                onChange={(e) => {
                  setCustomWidth(Number(e.target.value));
                  setSelectedPreset(null);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                {getTranslation('height', language)} ({getTranslation('pixels', language)})
              </label>
              <input
                type="number"
                value={customHeight}
                onChange={(e) => {
                  setCustomHeight(Number(e.target.value));
                  setSelectedPreset(null);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleResize}
          disabled={files.length === 0 || isProcessing}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
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

export default ImageResizer;