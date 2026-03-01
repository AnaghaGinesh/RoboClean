import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, MapPin, Plus } from 'lucide-react';

const UPCOMING_PLANS = [
  { id: 1, title: 'Living Room Full Clean', time: 'Tomorrow, 10:00 AM', area: '4 Windows', priority: 'High' },
  { id: 2, title: 'Bedroom North Window', time: 'Wed, 02:00 PM', area: '1 Window', priority: 'Medium' },
  { id: 3, title: 'Kitchen Deep Clean', time: 'Sat, 09:00 AM', area: '2 Windows', priority: 'Low' },
];

export default function PlanScreen() {
  return (
    <div className="flex flex-col gap-6 p-6 pb-24">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Cleaning Plan</h2>
        <button className="size-10 bg-primary text-background-dark rounded-full flex items-center justify-center shadow-lg shadow-primary/20">
          <Plus size={24} />
        </button>
      </div>

      <div className="card bg-primary/5 border-primary/20 p-6 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="size-12 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
            <Calendar size={24} />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">Next Scheduled</span>
            <span className="text-lg font-bold">Living Room Full Clean</span>
          </div>
        </div>
        <div className="flex gap-6 mt-2">
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-slate-500" />
            <span className="text-sm font-medium">10:00 AM</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-slate-500" />
            <span className="text-sm font-medium">Main Hall</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Upcoming Tasks</h3>
        {UPCOMING_PLANS.map((plan, idx) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="card flex items-center gap-4 p-4"
          >
            <div className={`size-2 rounded-full ${
              plan.priority === 'High' ? 'bg-red-500' : 
              plan.priority === 'Medium' ? 'bg-primary' : 'bg-slate-500'
            }`} />
            <div className="flex-1 flex flex-col">
              <span className="font-bold">{plan.title}</span>
              <span className="text-xs text-slate-500">{plan.time} • {plan.area}</span>
            </div>
            <button className="text-[10px] font-bold text-primary uppercase tracking-widest border border-primary/30 px-2 py-1 rounded hover:bg-primary/10 transition-colors">
              Edit
            </button>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 p-6 rounded-2xl border-2 border-dashed border-slate-800 flex flex-col items-center gap-3 text-center">
        <p className="text-sm text-slate-500">Need a custom cleaning schedule?</p>
        <button className="text-primary font-bold text-sm underline underline-offset-4">
          Generate AI Plan
        </button>
      </div>
    </div>
  );
}
