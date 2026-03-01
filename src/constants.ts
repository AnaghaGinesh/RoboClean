import { ComponentItem, RobotStatus } from './types';

export const ROBOT_STATUS: RobotStatus = {
  suction: 2.8,
  battery: 85,
  edges: '4/4',
  progress: 62,
  startTime: '09:42 AM',
  estRemaining: '08 min',
  position: { x: 40.2, y: 160.5 },
  mode: 'AUTONOMOUS DEEP CLEAN',
  windowName: 'East Wing Facade',
};

export const COMPONENTS: ComponentItem[] = [
  {
    id: '1',
    name: 'ESP32 Microcontroller',
    description: 'Core processing & IoT (PRD 4.0)',
    price: 650,
    status: 'ACQUIRED',
  },
  {
    id: '2',
    name: 'Ultrasonic Sensors (x3)',
    description: 'Edge detection & obstacles (PRD 3.3)',
    price: 450,
    status: 'ACQUIRED',
  },
  {
    id: '3',
    name: 'L298N Motor Driver',
    description: 'DC motor control unit (PRD 4.0)',
    price: 250,
    status: 'ORDERED',
  },
  {
    id: '4',
    name: 'DC Geared Motors (x2)',
    description: 'Locomotion drive system (PRD 3.2)',
    price: 500,
    status: 'ORDERED',
  },
  {
    id: '5',
    name: 'Vacuum Suction Cups',
    description: 'Vertical adhesion module (PRD 3.2)',
    price: 550,
    status: 'NEEDED',
  },
  {
    id: '6',
    name: 'ABS Robot Chassis',
    description: 'Lightweight frame (PRD 6.0)',
    price: 700,
    status: 'NEEDED',
  },
  {
    id: '7',
    name: 'Microfiber Wiping Pads',
    description: 'Cleaning wear-and-tear item (PRD 3.4)',
    price: 150,
    status: 'NEEDED',
  },
];
