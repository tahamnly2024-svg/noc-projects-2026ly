
import React from 'react';
import { Project } from '../types';

interface RegionalStatsProps {
  projects: Project[];
}

const REGION_THEMES: Record<string, { color: string, icon: string, bg: string }> = {
  "المنطقة الغربية": { color: "text-blue-900", icon: "🏛️", bg: "bg-blue-50" },
  "المنطقة الجنوبية": { color: "text-amber-700", icon: "☀️", bg: "bg-amber-50" },
  "المنطقة الشرقية": { color: "text-emerald-700", icon: "🏰", bg: "bg-emerald-50" },
  "الواحات": { color: "text-green-700", icon: "🌴", bg: "bg-green-50" },
  "الهلال النفطي": { color: "text-indigo-700", icon: "⚓", bg: "bg-indigo-50" },
  "المنطقة الوسطى": { color: "text-slate-700", icon: "📍", bg: "bg-slate-100" },
};

const RegionalStats: React.FC<RegionalStatsProps> = ({ projects }) => {
  const regions = ["المنطقة الغربية", "المنطقة الجنوبية", "المنطقة الشرقية", "المنطقة الوسطى", "الواحات", "الهلال النفطي"];
  
  const regionalCounts = regions.map(reg => ({
    name: reg,
    count: projects.filter(p => p.region === reg).length,
    ...REGION_THEMES[reg] || { color: "text-slate-700", icon: "📍", bg: "bg-slate-50" }
  }));

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 py-8">
      {regionalCounts.map((reg, idx) => (
        <div 
          key={idx} 
          className={`relative overflow-hidden group p-8 rounded-[32px] border border-transparent hover:border-slate-200 transition-all hover:shadow-2xl flex flex-col items-center text-center ${reg.bg}`}
        >
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity text-6xl">
            {reg.icon}
          </div>
          
          <span className="text-4xl mb-4 transform group-hover:scale-125 transition-transform duration-500">
            {reg.icon}
          </span>
          
          <h4 className="text-sm font-black text-slate-500 mb-2 uppercase tracking-tighter">
            {reg.name}
          </h4>
          
          <div className="flex items-baseline gap-1">
            <span className={`text-5xl font-black ${reg.color}`}>
              {reg.count}
            </span>
          </div>
          
          <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase">مشروع مستهدف</p>
          
          <div className="mt-6 w-full h-1 bg-white/50 rounded-full overflow-hidden">
            <div 
              className={`h-full opacity-40 ${reg.color.replace('text', 'bg')}`} 
              style={{ width: `${(reg.count / projects.length) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default RegionalStats;
