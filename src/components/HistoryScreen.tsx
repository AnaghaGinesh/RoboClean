import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { History as HistoryIcon, Clock, Maximize, Calendar } from 'lucide-react';
import { supabase } from '../services/supabase';

interface CleaningSession {
  date: string;
  window_name: string;
  duration: number;
  area_cleaned: string;
}

export default function HistoryScreen() {
  const [sessions, setSessions] = useState<CleaningSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSessions();
  }, []);

  async function fetchSessions() {
    try {
      const { data, error } = await supabase
        .from('cleaning_sessions')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      if (data) setSessions(data);
    } catch (err) {
      console.error('Error fetching sessions:', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-6 p-6 pb-24">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Cleaning History</h2>
        <div className="size-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
          <HistoryIcon size={20} />
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-slate-800/50 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : sessions.length === 0 ? (
        <div className="card text-center py-12 flex flex-col items-center gap-4">
          <div className="size-16 bg-slate-800 rounded-full flex items-center justify-center text-slate-600">
            <HistoryIcon size={32} />
          </div>
          <p className="text-slate-500">No cleaning sessions recorded yet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {sessions.map((session, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="card flex flex-col gap-3"
            >
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <span className="font-bold text-lg">{session.window_name}</span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Calendar size={12} />
                    {new Date(session.date).toLocaleDateString()} at {new Date(session.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <span className="bg-emerald-500/10 text-emerald-500 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest">
                  Success
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-primary/5">
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-primary" />
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-500 uppercase font-bold">Duration</span>
                    <span className="text-sm font-bold">{session.duration} mins</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Maximize size={14} className="text-primary" />
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-500 uppercase font-bold">Area</span>
                    <span className="text-sm font-bold">{session.area_cleaned}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
