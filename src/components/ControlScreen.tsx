import React from 'react';
import { motion } from 'motion/react';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Droplets, AlertTriangle, Battery, Terminal } from 'lucide-react';
import { ROBOT_STATUS } from '../constants';

export default function ControlScreen() {
  return (
    <div className="flex flex-col gap-6 p-6 pb-24">
      {/* Grid View */}
      <div className="relative aspect-[4/3] bg-[#050b14] rounded-2xl border border-primary/20 overflow-hidden">
        {/* Dot Grid */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, #00f2ff 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}
        />
        
        {/* Path SVG */}
        <svg className="absolute inset-0 w-full h-full p-8" viewBox="0 0 400 300">
          <motion.path
            d="M 40,40 L 360,40 L 360,80 L 40,80 L 40,120 L 360,120 L 360,160 L 40,160"
            fill="none"
            stroke="#00f2ff"
            strokeWidth="2"
            strokeDasharray="4 4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.rect
            x="36"
            y="156"
            width="8"
            height="8"
            fill="#00f2ff"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </svg>

        {/* Overlays */}
        <div className="absolute bottom-4 left-4 bg-background-dark/80 backdrop-blur-md border border-primary/30 rounded-lg px-3 py-1.5">
          <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-widest">Sector: N_Facade_W01</span>
        </div>

        <div className="absolute top-4 right-4 bg-background-dark/80 backdrop-blur-md border border-primary/30 rounded-lg px-2 py-1 flex items-center gap-1.5">
          <Battery size={12} className="text-primary" />
          <span className="text-[10px] font-mono font-bold">84.02%</span>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 gap-4">
        <div className="glass-card flex flex-col gap-2 border-l-4 border-l-primary/40">
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Coordinates</span>
          <div className="flex flex-col font-mono">
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-primary">POS_X</span>
              <span className="text-xl font-bold tracking-widest">040.20</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-primary">POS_Y</span>
              <span className="text-xl font-bold tracking-widest">160.50</span>
            </div>
          </div>
        </div>
        <div className="glass-card flex flex-col gap-2 border-l-4 border-l-primary/40">
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Status</span>
          <div className="flex items-center gap-2">
            <div className="size-2 bg-primary rounded-sm shadow-[0_0_8px_#00f2ff]" />
            <span className="text-xl font-black tracking-widest uppercase">Clean_Op</span>
          </div>
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Uptime: 00:42:18</span>
        </div>
      </div>

      {/* Manual Controls */}
      <div className="flex gap-6 items-start">
        {/* D-Pad */}
        <div className="grid grid-cols-3 gap-1 p-2 bg-slate-900/40 rounded-xl border border-white/5">
          <div />
          <DPadButton icon={<ChevronUp />} />
          <div />
          <DPadButton icon={<ChevronLeft />} />
          <div className="size-12 flex items-center justify-center bg-background-dark border border-primary/20 rounded-md">
            <span className="text-[8px] font-black text-primary uppercase">Man</span>
          </div>
          <DPadButton icon={<ChevronRight />} />
          <div />
          <DPadButton icon={<ChevronDown />} />
          <div />
        </div>

        {/* Action Buttons */}
        <div className="flex-1 flex flex-col gap-3">
          <button className="flex items-center justify-between px-6 py-4 rounded-xl border-l-4 border-l-primary bg-surface-light hover:bg-white/10 transition-all group">
            <span className="text-xs font-black tracking-[0.2em] uppercase">Spray Liquid</span>
            <Droplets size={16} className="text-primary group-hover:scale-110 transition-transform" />
          </button>
          <button className="flex items-center justify-between px-6 py-4 rounded-xl border-l-4 border-l-accent-red bg-surface-light hover:bg-white/10 transition-all group">
            <span className="text-xs font-black tracking-[0.2em] uppercase">Job Halt</span>
            <AlertTriangle size={16} className="text-accent-red group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>

      {/* Bottom Metrics */}
      <div className="grid grid-cols-3 gap-3">
        <MiniMetric label="Pressure" value="2.4 BAR" />
        <MiniMetric label="Temp" value="24.5°C" />
        <MiniMetric label="Speed" value="0.12 m/s" />
      </div>
    </div>
  );
}

function DPadButton({ icon }: { icon: React.ReactNode }) {
  return (
    <button className="size-12 rounded-md bg-white/5 border border-white/5 flex items-center justify-center text-primary hover:bg-primary/20 transition-all active:scale-90">
      {React.cloneElement(icon as React.ReactElement, { size: 20 })}
    </button>
  );
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white/5 border border-white/5 rounded-xl p-3 flex flex-col items-center gap-1">
      <span className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em]">{label}</span>
      <span className="text-xs font-bold tracking-widest">{value}</span>
    </div>
  );
}
