
export enum View {
  DASHBOARD = 'DASHBOARD',
  SELF_DESTRUCT = 'SELF_DESTRUCT'
}

export interface Asset {
  id: string;
  filename: string;
  url: string;
  isTainted: boolean;
  taintId?: string;
  status: 'PENDING' | 'PROCESSING' | 'SECURED';
}

// Added Territory interface for maps grounding or visualization features
export interface Territory {
  name: string;
  infiltratedPhotos: number;
  detectionRisk: string;
  status: string;
}
