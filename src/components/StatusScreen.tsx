import React from 'react';
import { motion } from 'motion/react';
import { Wind, Battery, Square, Pause, Home, Droplets, Bot, Clock } from 'lucide-react';
import { ROBOT_STATUS } from '../constants';

export default function StatusScreen() {
  return (
    <div className="flex flex-col gap-8 p-6 pb-24">
      {/* Cleaning Indicator */}
      <div className="flex justify-center mt-4">
        <div className="relative size-72 flex items-center justify-center">
          {/* Background Circle */}
          <div className="absolute inset-0 border-[6px] border-white/5 rounded-full" />
          
          {/* Progress Arc */}
          <svg className="absolute inset-0 size-full -rotate-90">
            <circle
              cx="144"
              cy="144"
              r="141"
              fill="none"
              stroke="currentColor"
              strokeWidth="6"
              strokeDasharray={2 * Math.PI * 141}
              strokeDashoffset={2 * Math.PI * 141 * (1 - ROBOT_STATUS.progress / 100)}
              className="text-primary"
              strokeLinecap="round"
            />
          </svg>

          {/* Glow Dots */}
          {[0, 90, 180, 270].map((deg) => (
            <div
              key={deg}
              className="absolute size-2 bg-primary rounded-full shadow-[0_0_10px_#00f2ff]"
              style={{
                transform: `rotate(${deg}deg) translateY(-141px)`,
              }}
            />
          ))}

          <div className="flex flex-col items-center gap-1">
            <Bot size={48} className="text-white/20" />
            <span className="text-5xl font-black tracking-tighter">{ROBOT_STATUS.progress}%</span>
            <span className="text-[10px] font-black text-primary tracking-[0.3em] uppercase">Optimizing</span>
          </div>
        </div>
      </div>

      {/* Header Info */}
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">{ROBOT_STATUS.windowName}</h1>
        <p className="text-slate-500 font-bold tracking-widest text-[10px] mt-1 uppercase">{ROBOT_STATUS.mode}</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4">
        <MetricCard 
          icon={<Wind size={18} />} 
          label="Suction" 
          value={`${ROBOT_STATUS.suction} kPa`} 
          status="Active" 
        />
        <MetricCard 
          icon={<Battery size={18} />} 
          label="Battery" 
          value={`${ROBOT_STATUS.battery} %`} 
          status="Charging" 
        />
        <MetricCard 
          icon={<Square size={18} />} 
          label="Edge Detect" 
          value={ROBOT_STATUS.edges} 
          status="Secured" 
        />
        <MetricCard 
          icon={<Clock size={18} />} 
          label="Time Left" 
          value={ROBOT_STATUS.estRemaining} 
          status="Est." 
        />
      </div>

      {/* Main Actions */}
      <div className="flex flex-col gap-4 mt-2">
        <button className="w-full bg-primary text-background-dark font-black py-6 rounded-3xl flex items-center justify-center gap-4 shadow-2xl shadow-primary/20 hover:bg-primary-dark transition-all active:scale-95 group">
          <div className="size-10 bg-background-dark rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
            <Pause size={20} className="text-primary fill-primary" />
          </div>
          <span className="text-xl tracking-widest">PAUSE SYSTEM</span>
        </button>
        
        <div className="flex gap-4">
          <button className="flex-1 bg-white/5 border border-white/10 py-5 rounded-2xl flex items-center justify-center gap-3 font-bold text-xs tracking-widest hover:bg-white/10 transition-all uppercase">
            <Home size={18} />
            Return Base
          </button>
          <button className="flex-1 bg-white/5 border border-white/10 py-5 rounded-2xl flex items-center justify-center gap-3 font-bold text-xs tracking-widest hover:bg-white/10 transition-all uppercase">
            <Droplets size={18} />
            Fluid Refill
          </button>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ icon, label, value, status }: { icon: React.ReactNode; label: string; value: string; status: string }) {
  return (
    <div className="glass-card flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="text-primary">{icon}</div>
        <span className="text-[10px] font-black text-primary uppercase tracking-widest">{status}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{label}</span>
        <span className="text-2xl font-black tracking-tight">{value}</span>
      </div>
    </div>
  );
}
