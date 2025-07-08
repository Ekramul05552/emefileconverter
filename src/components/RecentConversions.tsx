import React from 'react';
import { Clock, Download, Trash2 } from 'lucide-react';
import { ConversionHistory } from '../types';
import { formatFileSize } from '../utils/fileUtils';
import { getTranslation } from '../utils/translations';

interface RecentConversionsProps {
  history: ConversionHistory[];
  onClearHistory: () => void;
  language: string;
}

const RecentConversions: React.FC<RecentConversionsProps> = ({
  history,
  onClearHistory,
  language
}) => {
  const formatTimeAgo = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  if (history.length === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-white/20 p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gray-100 rounded-lg">
            <Clock className="w-6 h-6 text-gray-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">
            {getTranslation('recentConversions', language)}
          </h2>
        </div>
        <div className="text-center py-8 text-gray-500">
          <Clock className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>No recent conversions</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-white/20 p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-100 rounded-lg">
            <Clock className="w-6 h-6 text-gray-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">
            {getTranslation('recentConversions', language)}
          </h2>
        </div>
        <button
          onClick={onClearHistory}
          className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          {getTranslation('clearHistory', language)}
        </button>
      </div>

      <div className="space-y-3 max-h-64 overflow-y-auto">
        {history.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-gray-800">{item.fileName}</span>
                <span className="text-xs text-gray-500">
                  {item.fromFormat.toUpperCase()} → {item.toFormat.toUpperCase()}
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>{formatFileSize(item.fileSize)}</span>
                <span>{formatTimeAgo(item.timestamp)}</span>
              </div>
            </div>
            {item.downloadUrl && (
              <button
                onClick={() => window.open(item.downloadUrl, '_blank')}
                className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentConversions;