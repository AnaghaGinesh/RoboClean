import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Search, PlusCircle, Cpu, Bell, Sliders, ChevronRight, CheckCircle2, Package, Clock, AlertCircle } from 'lucide-react';
import { supabase } from '../services/supabase';
import { COMPONENTS } from '../constants';

interface ComponentItem {
  id: string;
  name: string;
  description: string;
  price: number;
  status: 'ACQUIRED' | 'ORDERED' | 'NEEDED';
  icon: React.ReactNode;
}

export default function HardwareScreen() {
  const [components, setComponents] = useState<ComponentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const totalBudget = 3500;

  useEffect(() => {
    fetchComponents();
  }, []);

  async function fetchComponents() {
    try {
      const { data, error } = await supabase
        .from('components')
        .select('*');

      if (error) throw error;
      
      if (data && data.length > 0) {
        const mapped = data.map((item: any) => ({
          id: item.id || Math.random().toString(),
          name: item['add item'] || 'Unknown',
          description: item.description || 'Hardware module',
          price: item.price || 0,
          status: item.status || 'ACQUIRED',
          icon: getIconForName(item['add item'])
        }));
        setComponents(mapped);
      } else {
        // Fallback to local constants if DB is empty
        const fallback = COMPONENTS.map(item => ({
          ...item,
          icon: getIconForName(item.name),
          status: (item.status || 'NEEDED') as 'ACQUIRED' | 'ORDERED' | 'NEEDED'
        }));
        setComponents(fallback as ComponentItem[]);
      }
    } catch (err) {
      console.error('Error fetching components:', err);
      // Fallback on error too
      const fallback = COMPONENTS.map(item => ({
        ...item,
        icon: getIconForName(item.name),
        status: (item.status || 'NEEDED') as 'ACQUIRED' | 'ORDERED' | 'NEEDED'
      }));
      setComponents(fallback as ComponentItem[]);
    } finally {
      setLoading(false);
    }
  }

  const getIconForName = (name: string) => {
    if (name.toLowerCase().includes('esp32')) return <Cpu size={20} />;
    if (name.toLowerCase().includes('ultrasonic')) return <div className="flex gap-0.5"><div className="size-1 bg-primary rounded-full"/><div className="size-1 bg-primary rounded-full"/><div className="size-1 bg-primary rounded-full"/></div>;
    if (name.toLowerCase().includes('cups')) return <div className="size-4 border-2 border-primary rounded-full border-dashed" />;
    return <Package size={20} />;
  };

  const handleAddItem = async () => {
    const name = prompt('Enter component name:');
    if (!name) return;
    
    const priceStr = prompt('Enter price (₹):');
    const price = parseInt(priceStr || '0');

    try {
      const { error } = await supabase
        .from('components')
        .insert([{ 
          'add item': name,
          price: price,
          description: 'User added component',
          status: 'NEEDED'
        }]);

      if (error) throw error;
      fetchComponents();
    } catch (err) {
      alert('Error adding item: ' + (err as Error).message);
    }
  };

  const handleSeedData = async () => {
    const seedItems = [
      { 'add item': 'ESP32 Microcontroller', price: 650, description: 'Core processing & IoT (PRD 4.0)', status: 'ACQUIRED' },
      { 'add item': 'Ultrasonic Sensors (x3)', price: 450, description: 'Edge detection & obstacles (PRD 3.3)', status: 'ACQUIRED' },
      { 'add item': 'L298N Motor Driver', price: 250, description: 'DC motor control unit (PRD 4.0)', status: 'ORDERED' },
      { 'add item': 'DC Geared Motors (x2)', price: 500, description: 'Locomotion drive system (PRD 3.2)', status: 'ORDERED' },
      { 'add item': 'Vacuum Suction Cups', price: 550, description: 'Vertical adhesion module (PRD 3.2)', status: 'NEEDED' },
      { 'add item': 'ABS Robot Chassis', price: 700, description: 'Lightweight frame (PRD 6.0)', status: 'NEEDED' },
      { 'add item': 'Microfiber Wiping Pads', price: 150, description: 'Cleaning wear-and-tear item (PRD 3.4)', status: 'NEEDED' },
    ];

    try {
      const { error } = await supabase
        .from('components')
        .insert(seedItems);

      if (error) throw error;
      alert('Hardware components added to Supabase!');
      fetchComponents();
    } catch (err) {
      alert('Error seeding data: ' + (err as Error).message);
    }
  };

  const spentBudget = components.reduce((acc, item) => acc + item.price, 0);
  const usedPercent = Math.min((spentBudget / totalBudget) * 100, 100);

  return (
    <div className="flex flex-col gap-6 p-6 pb-24">
      {/* Top Header */}
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Project Dashboard</span>
          <h1 className="text-2xl font-black tracking-tighter">ROBOCLEAN_V2.0</h1>
        </div>
        <div className="flex gap-2">
          <button className="size-10 bg-surface-light rounded-xl flex items-center justify-center text-slate-400 hover:text-primary transition-colors">
            <Bell size={20} />
          </button>
          <button className="size-10 bg-surface-light rounded-xl flex items-center justify-center text-slate-400 hover:text-primary transition-colors">
            <Sliders size={20} />
          </button>
        </div>
      </div>

      {/* Next Phase Card */}
      <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 flex items-center justify-between group cursor-pointer hover:bg-primary/20 transition-all">
        <div className="flex items-center gap-4">
          <div className="size-12 rounded-full border-2 border-primary flex items-center justify-center">
            <div className="size-6 rounded-full border-2 border-primary border-dotted animate-spin" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-primary uppercase tracking-widest">Next Phase</span>
            <span className="text-sm font-bold">Sensor Integration & Calibration</span>
          </div>
        </div>
        <ChevronRight size={20} className="text-primary group-hover:translate-x-1 transition-transform" />
      </div>

      {/* Budget Allocation */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="size-4 bg-primary/20 rounded-sm flex items-center justify-center">
              <div className="size-1.5 bg-primary rounded-sm" />
            </div>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Budget Allocation</span>
          </div>
          <button className="text-[10px] font-black text-slate-500 uppercase tracking-widest bg-surface-light px-3 py-1 rounded-md border border-white/5">Edit_Limit</button>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-end">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black">₹{spentBudget.toLocaleString()}</span>
              <span className="text-sm font-bold text-slate-500">.00</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-sm font-black text-primary">{usedPercent.toFixed(1)}%</span>
              <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Of ₹3,500 Cap</span>
            </div>
          </div>
          <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-primary shadow-[0_0_10px_#00f2ff]"
              initial={{ width: 0 }}
              animate={{ width: `${usedPercent}%` }}
              transition={{ duration: 1.5 }}
            />
          </div>
          <div className="flex justify-between text-[8px] font-bold text-slate-600 uppercase tracking-widest">
            <span>Min_Est: ₹1,800</span>
            <span>Max_Limit: ₹3,500</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-2">
          <BudgetStat label="Items" value={components.length.toString().padStart(2, '0')} />
          <BudgetStat label="Avg/Unit" value={`₹${components.length ? Math.round(spentBudget / components.length) : 0}`} />
          <BudgetStat label="Margin" value={`₹${Math.max(0, totalBudget - spentBudget).toLocaleString()}`} color="text-emerald-500" />
        </div>
      </div>

      {/* Components Status */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Package size={16} className="text-slate-500" />
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Components Status</span>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={handleSeedData}
              className="bg-primary/10 text-primary text-[8px] font-black px-3 py-1 rounded-md border border-primary/20 hover:bg-primary/20 transition-all"
            >
              SEED DATA
            </button>
            <button 
              onClick={handleAddItem}
              className="bg-primary text-background-dark text-[10px] font-black px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <PlusCircle size={14} />
              NEW MODULE
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {loading ? (
            [1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-surface-light rounded-3xl animate-pulse" />)
          ) : (
            <>
              {components.map((item) => (
                <div key={item.id} className="glass-card flex flex-col gap-4 p-4">
                  <div className="flex justify-between items-start">
                    <div className="size-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                      {item.icon}
                    </div>
                    <StatusBadge status={item.status} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-sm">{item.name}</span>
                    <span className="text-[10px] text-slate-500 font-bold">₹{item.price.toFixed(2)}</span>
                  </div>
                </div>
              ))}
              <button 
                onClick={handleAddItem}
                className="glass-card border-dashed border-white/10 flex flex-col items-center justify-center gap-2 p-4 hover:bg-white/5 transition-all group"
              >
                <div className="size-10 bg-white/5 rounded-full flex items-center justify-center text-slate-500 group-hover:text-primary transition-colors">
                  <PlusCircle size={24} />
                </div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Add Item</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Active System Specs */}
      <div className="glass-card flex flex-col gap-4">
        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Active System Specs</span>
        <div className="flex flex-col gap-2 font-mono text-[10px]">
          <SpecRow label="MCU_TYPE" value="XTENSA_LX6" />
          <SpecRow label="POWER_SRC" value="LI-PO_11.1V" />
          <SpecRow label="SENS_BUS" value="I2C_ADDRESS_X3" />
        </div>
      </div>
    </div>
  );
}

function BudgetStat({ label, value, color = "text-white" }: { label: string; value: string; color?: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">{label}</span>
      <span className={`text-lg font-black tracking-tight ${color}`}>{value}</span>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors = {
    ACQUIRED: 'text-emerald-500 bg-emerald-500/10',
    ORDERED: 'text-primary bg-primary/10',
    NEEDED: 'text-blue-500 bg-blue-500/10'
  };
  return (
    <span className={`text-[8px] font-black px-2 py-1 rounded-md uppercase tracking-widest ${colors[status as keyof typeof colors] || colors.NEEDED}`}>
      {status}
    </span>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-white/5 pb-1">
      <span className="text-slate-500">{label}:</span>
      <span className="font-bold">{value}</span>
    </div>
  );
}
