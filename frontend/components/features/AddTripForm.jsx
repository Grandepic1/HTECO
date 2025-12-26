'use client';
import { useState } from 'react';
import GlassCard from '@/components/ui/GlassCard';

const AddTripForm = () => {
  const [distance, setDistance] = useState('');
  
  const inputStyle = "w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all";

  return (
    <GlassCard className="h-full relative overflow-hidden group">
    
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -z-10 group-hover:bg-emerald-500/20 transition-all"></div>

      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
        <span className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400">🚀</span>
        New Journey
      </h3>
      
      <form className="space-y-5">
        <div>
          <label className="text-xs uppercase tracking-wider text-slate-400 font-semibold ml-1 mb-2 block">Vehicle</label>
          <select className={`${inputStyle} appearance-none cursor-pointer`}>
            <option className="bg-slate-900">Tesla Model 3 (Electric)</option>
            <option className="bg-slate-900">Toyota Innova (Solar)</option>
          </select>
        </div>

        <div>
          <label className="text-xs uppercase tracking-wider text-slate-400 font-semibold ml-1 mb-2 block">Distance (km)</label>
          <input 
            type="number" 
            placeholder="e.g. 25.5" 
            className={inputStyle}
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
          />
        </div>

        <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] hover:scale-[1.02] active:scale-95 transition-all">
          Calculate & Save
        </button>
      </form>

      {/* Live Result */}
      <div className="mt-6 pt-6 border-t border-white/10 text-center">
        <p className="text-slate-400 text-sm">Estimated Emission</p>
        <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 mt-1">
          {distance ? (distance * 0.12).toFixed(2) : '0.00'} <span className="text-lg font-medium text-emerald-500">kg</span>
        </p>
      </div>
    </GlassCard>
  );
};

export default AddTripForm;