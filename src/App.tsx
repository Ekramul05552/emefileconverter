import React, { useState } from 'react';
import { FileImage, FileText, Crop } from 'lucide-react';
import LanguageSwitcher from './components/LanguageSwitcher';
import ImageConverter from './components/ImageConverter';
import DocumentConverter from './components/DocumentConverter';
import ImageResizer from './components/ImageResizer';
import RecentConversions from './components/RecentConversions';
import { ConversionHistory } from './types';
import { getTranslation } from './utils/translations';

type ConversionMode = 'image' | 'document' | 'resize';

function App() {
  const [currentMode, setCurrentMode] = useState<ConversionMode>('image');
  const [language, setLanguage] = useState<string>('en');
  const [conversionHistory, setConversionHistory] = useState<ConversionHistory[]>([]);

  const clearHistory = () => {
    setConversionHistory([]);
  };

  const modes = [
    {
      id: 'image' as ConversionMode,
      name: getTranslation('imageConverter', language),
      icon: FileImage,
      color: 'blue',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      id: 'document' as ConversionMode,
      name: getTranslation('documentConverter', language),
      icon: FileText,
      color: 'emerald',
      gradient: 'from-emerald-500 to-emerald-600'
    },
    {
      id: 'resize' as ConversionMode,
      name: getTranslation('imageResizer', language),
      icon: Crop,
      color: 'amber',
      gradient: 'from-amber-500 to-amber-600'
    }
  ];

  const renderCurrentMode = () => {
    switch (currentMode) {
      case 'image':
        return <ImageConverter language={language} />;
      case 'document':
        return <DocumentConverter language={language} />;
      case 'resize':
        return <ImageResizer language={language} />;
      default:
        return <ImageConverter language={language} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      {/* Background Pattern */}
      <div className={`absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.05"%3E%3Cpath d="m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40`}></div>
      
      <div className="relative z-10">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <img 
                    src="/eme 320 X 320 px.jpg" 
                    alt="EME Air International" 
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-800">
                    {getTranslation('title', language)}
                  </h1>
                  <p className="text-sm text-gray-600">
                    {getTranslation('subtitle', language)}
                  </p>
                </div>
              </div>
              <LanguageSwitcher
                currentLanguage={language}
                onLanguageChange={setLanguage}
              />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Mode Selection */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {getTranslation('selectConversion', language)}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {modes.map((mode) => {
                const Icon = mode.icon;
                return (
                  <button
                    key={mode.id}
                    onClick={() => setCurrentMode(mode.id)}
                    className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                      currentMode === mode.id
                        ? `border-${mode.color}-500 bg-${mode.color}-50 shadow-lg`
                        : 'border-gray-200 hover:border-gray-300 bg-white/50 hover:bg-white/80'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className={`p-3 rounded-lg bg-gradient-to-r ${mode.gradient}`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800">{mode.name}</h3>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Converter */}
            <div className="lg:col-span-2">
              {renderCurrentMode()}
            </div>

            {/* Recent Conversions */}
            <div className="lg:col-span-1">
              <RecentConversions
                history={conversionHistory}
                onClearHistory={clearHistory}
                language={language}
              />
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white/80 backdrop-blur-sm border-t border-white/20 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center text-gray-600">
              <p className="mb-2">EME File Converter - Convert and resize your files with ease</p>
              <p className="text-sm">Built with React, TypeScript, and Tailwind CSS</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;