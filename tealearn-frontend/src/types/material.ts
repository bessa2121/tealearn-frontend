export interface Material {
  id: number;
  title: string;
  createdAt: string;
}

export interface MaterialsResponse {
  content: Material[];
}

export interface MaterialDetails {
  id: number;
  title: string;
  fileName: string | null;
  originalText: string;
  createdAt: string;
  hasAdaptation: boolean;
  adaptationsCount: number;
  latestAdaptationPreview: string | null;
  textLength: number;
}

export interface AdaptationResponse {
  materialId: number;
  originalText: string;
  adaptedText: string;
}

export interface AdaptationHistory {
  id: number;
  promptVersion: string;
  createdAt: string;
  preview: string;
  adaptedText: string;
}