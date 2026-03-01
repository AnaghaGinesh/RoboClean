import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutGrid, 
  Settings, 
  ChevronLeft, 
  Terminal, 
  Bell, 
  Sliders, 
  Activity, 
  Cpu, 
  History as HistoryIcon, 
  Calendar,
  User,
  Gamepad2,
  Box
} from 'lucide-react';
import StatusScreen from './components/StatusScreen';
import ControlScreen from './components/ControlScreen';
import HardwareScreen from './components/HardwareScreen';
import HistoryScreen from './components/HistoryScreen';
import PlanScreen from './components/PlanScreen';
import CodeScreen from './components/CodeScreen';

type Screen = 'status' | 'control' | 'hardware' | 'history' | 'plan' | 'code' | 'profile' | 'settings';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('status');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'status': return <StatusScreen />;
      case 'control': return <ControlScreen />;
      case 'hardware': return <HardwareScreen />;
      case 'history': return <HistoryScreen />;
      case 'plan': return <PlanScreen />;
      case 'code': return <CodeScreen />;
      default: return <StatusScreen />;
    }
  };

  const getHeader = () => {
    switch (currentScreen) {
      case 'status':
        return (
          <header className="flex items-center justify-between px-6 py-4 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="size-8 bg-primary/20 rounded-lg flex items-center justify-center">
                <Activity size={18} className="text-primary" />
              </div>
              <span className="font-black tracking-widest text-sm uppercase">Roboclean Elite</span>
            </div>
            <button className="size-10 bg-surface-light rounded-xl flex items-center justify-center text-primary">
              <Settings size={20} />
            </button>
          </header>
        );
      case 'control':
        return (
          <header className="flex items-center justify-between px-6 py-4 border-b border-white/5">
            <button onClick={() => setCurrentScreen('status')} className="size-10 flex items-center justify-center text-slate-400">
              <ChevronLeft size={24} />
            </button>
            <div className="flex flex-col items-center">
              <span className="font-black tracking-widest text-sm uppercase">Monitoring Console</span>
              <span className="text-[8px] font-bold text-primary uppercase tracking-[0.2em]">System Active // RC-904</span>
            </div>
            <button className="size-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
              <Terminal size={20} />
            </button>
          </header>
        );
      case 'hardware':
        return null; // Hardware screen has its own header in the image
      default:
        return (
          <header className="flex items-center justify-between px-6 py-4 border-b border-white/5">
            <button onClick={() => setCurrentScreen('status')} className="size-10 flex items-center justify-center text-slate-400">
              <ChevronLeft size={24} />
            </button>
            <span className="font-black tracking-widest text-sm uppercase">{currentScreen}</span>
            <div className="size-10" />
          </header>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background-dark text-slate-100 flex flex-col max-w-md mx-auto relative overflow-hidden shadow-2xl">
      {getHeader()}

      <main className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-surface/80 backdrop-blur-xl border-t border-white/5 px-6 py-4 flex justify-between items-center z-50">
        <NavItem 
          active={currentScreen === 'status'} 
          onClick={() => setCurrentScreen('status')} 
          icon={<LayoutGrid size={20} />} 
          label="Overview" 
        />
        <NavItem 
          active={currentScreen === 'control'} 
          onClick={() => setCurrentScreen('control')} 
          icon={<Gamepad2 size={20} />} 
          label="Control" 
        />
        <NavItem 
          active={currentScreen === 'hardware'} 
          onClick={() => setCurrentScreen('hardware')} 
          icon={<Box size={20} />} 
          label="Hardware" 
        />
        <NavItem 
          active={currentScreen === 'history'} 
          onClick={() => setCurrentScreen('history')} 
          icon={<HistoryIcon size={20} />} 
          label="Logs" 
        />
        <NavItem 
          active={currentScreen === 'profile'} 
          onClick={() => setCurrentScreen('profile')} 
          icon={<User size={20} />} 
          label="Account" 
        />
      </nav>
    </div>
  );
}

function NavItem({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1.5 transition-all ${active ? 'text-primary' : 'text-slate-500'}`}
    >
      <div className={`transition-transform ${active ? 'scale-110' : 'scale-100'}`}>
        {icon}
      </div>
      <span className="text-[9px] font-black uppercase tracking-widest">{label}</span>
      {active && (
        <motion.div 
          layoutId="nav-indicator"
          className="size-1 bg-primary rounded-full shadow-[0_0_8px_#00f2ff]" 
        />
      )}
    </button>
  );
}
