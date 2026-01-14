
import React from 'react';
import { Project } from '../types';

interface SectorHighlightsProps {
  projects: Project[];
}

const SECTOR_COLORS = [
  'border-emerald-500 text-emerald-800 bg-emerald-50',
  'border-indigo-500 text-indigo-800 bg-indigo-50',
  'border-rose-500 text-rose-800 bg-rose-50',
  'border-blue-500 text-blue-800 bg-blue-50',
  'border-amber-500 text-amber-800 bg-amber-50'
];

const SectorHighlights: React.FC<SectorHighlightsProps> = ({ projects }) => {
  // Fix: Explicitly type accumulator and initial value to avoid "untyped function call" issues with reduce generic
  const sectorCounts = projects.reduce((acc: Record<string, number>, curr: Project) => {
    acc[curr.sector] = (acc[curr.sector] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Fix: Use explicit casting for values in the sort comparator to resolve arithmetic type errors
  const topSectors = Object.entries(sectorCounts)
    .sort((a, b) => (b[1] as number) - (a[1] as number))
    .slice(0, 5);

  return (
    <div className="grid grid-cols-1 gap-6 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {topSectors.map(([sector, count], idx) => (
          <div key={sector} className={`relative border-b-8 rounded-[32px] p-10 flex flex-col items-center justify-center text-center shadow-xl transition-all hover:-translate-y-2 ${SECTOR_COLORS[idx % SECTOR_COLORS.length]}`}>
            <span className="text-lg font-black uppercase tracking-tighter mb-4 opacity-70">{sector}</span>
            <div className="flex items-baseline gap-2"><span className="text-7xl font-black">{count}</span></div>
            <span className="text-sm font-bold opacity-60 mt-2">مشروع مستهدف</span>
            <div className="absolute top-4 left-6 opacity-10 font-black text-8xl pointer-events-none">0{idx + 1}</div>
          </div>
        ))}
      </div>
      <div className="mt-12 p-8 bg-blue-900 text-white rounded-[32px] shadow-2xl">
        <h3 className="text-2xl font-black mb-4">تحليل التوزيع القطاعي</h3>
        <p className="text-xl leading-relaxed opacity-90">يُظهر التوزيع الحالي تركيزاً كبيراً على قطاع <span className="text-yellow-400 font-black">{topSectors[0]?.[0]}</span> يليه قطاع <span className="text-yellow-400 font-black">{topSectors[1]?.[0]}</span>، مما يعكس أولويات المؤسسة في دعم البنية التحتية والخدمات الأساسية.</p>
      </div>
    </div>
  );
};

export default SectorHighlights;
