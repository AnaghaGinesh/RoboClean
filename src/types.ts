export type Screen = 'status' | 'control' | 'hardware' | 'profile' | 'history' | 'plan' | 'schedule' | 'build' | 'code' | 'settings';

export interface ComponentItem {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  imageUrl?: string;
  tag?: string;
  status?: 'ACQUIRED' | 'ORDERED' | 'NEEDED';
}

export interface RobotStatus {
  suction: number;
  battery: number;
  edges: string;
  progress: number;
  startTime: string;
  estRemaining: string;
  position: { x: number; y: number };
  mode: string;
  windowName: string;
}
