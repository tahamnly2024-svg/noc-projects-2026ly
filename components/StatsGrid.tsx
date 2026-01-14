import React from 'react';
import { Project } from '../types';

interface StatsGridProps {
  projects: Project[];
}

const StatsGrid: React.FC<StatsGridProps> = ({ projects }) => {
  const totalValue = projects.reduce((acc, curr) => acc + (curr.value || 0), 0);
  const projectsWithValue = projects.filter(p => p.value !== null).length;
  
  const stats = [
    { label: 'إجمالي الميزانية المعتمدة', value: totalValue.toLocaleString('ar-LY'), unit: 'دينار ليبي', color: 'text-blue-900', icon: '💰' },
    { label: 'العدد الكلي للمشاريع', value: projects.length, unit: 'مشروع', color: 'text-slate-800', icon: '📋' },
    { label: 'مشاريع مكتملة البيانات', value: projectsWithValue, unit: 'مشروع', color: 'text-emerald-600', icon: '✅' },
    { label: 'مشاريع قيد الدراسة', value: projects.length - projectsWithValue, unit: 'مشروع', color: 'text-amber-600', icon: '⏳' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-10">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-white p-10 rounded-[40px] shadow-xl border border-slate-100 flex flex-col items-center text-center transition-all hover:scale-[1.02]">
          <div className="text-6xl mb-6">{stat.icon}</div>
          <span className="text-lg font-black text-slate-400 uppercase tracking-widest mb-4">{stat.label}</span>
          <div className="flex flex-col items-center gap-2">
            <span className={`text-7xl font-black ${stat.color}`}>{stat.value}</span>
            <span className="text-xl font-bold text-slate-400">{stat.unit}</span>
          </div>
          <div className="mt-8 w-full max-w-xs h-3 bg-slate-100 rounded-full overflow-hidden">
            <div className={`h-full transition-all duration-1000 ease-out ${idx === 0 ? 'bg-blue-600' : 'bg-slate-400'}`} style={{ width: '75%' }} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;