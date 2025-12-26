import GlassCard from '@/components/ui/GlassCard';

const StatBento = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <GlassCard className="col-span-1 md:col-span-2 bg-gradient-to-br from-emerald-900/40 to-black/20 border-emerald-500/30">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-emerald-300 font-medium mb-1">Total Emission (Month)</p>
            <h2 className="text-5xl font-bold text-white tracking-tight">124.5 <span className="text-2xl text-slate-400 font-normal">kg</span></h2>
          </div>
          <div className="p-3 bg-emerald-500/20 rounded-2xl text-emerald-400 text-2xl">🌍</div>
        </div>
        <div className="mt-6 flex items-center gap-2">
          <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded-lg text-xs font-bold">↑ 12%</span>
          <span className="text-slate-400 text-sm">vs last month</span>
        </div>
      </GlassCard>


      <GlassCard>
        <p className="text-slate-400 text-sm mb-2">Total Trips</p>
        <p className="text-3xl font-bold text-white">42</p>
        <div className="w-full bg-white/10 h-1 mt-4 rounded-full overflow-hidden">
          <div className="bg-cyan-400 h-full w-3/4"></div>
        </div>
      </GlassCard>


      <GlassCard>
        <p className="text-slate-400 text-sm mb-2">Green Score</p>
        <p className="text-3xl font-bold text-emerald-400">A+</p>
        <p className="text-xs text-slate-500 mt-2">Top 5% in company</p>
      </GlassCard>
    </div>
  );
};

export default StatBento;