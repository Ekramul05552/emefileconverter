export interface ConversionType {
  id: string;
  name: string;
  icon: string;
  supportedFormats: string[];
  category: 'image' | 'document' | 'resize';
}

export interface ConversionHistory {
  id: string;
  fileName: string;
  fromFormat: string;
  toFormat: string;
  timestamp: Date;
  downloadUrl?: string;
  fileSize: number;
}

export interface ResizePreset {
  country: string;
  flag: string;
  width: number;
  height: number;
  name: string;
}

export interface Language {
  code: string;
  name: string;
  flag: string;
}

export interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}