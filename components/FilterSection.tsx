
import React from 'react';
import { FilterState, Project } from '../types';
import { FilterIcon, RedoIcon } from './Icons';

interface FilterSectionProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  projects: Project[];
}

const FilterSection: React.FC<FilterSectionProps> = ({ filters, setFilters, projects }) => {
  // تصفية المناطق لإزالة غير محدد تماماً من الواجهة
  const regions = Array.from(new Set(projects.map(p => p.region)))
    .filter(r => r && r !== "غير محدد")
    .sort();
    
  const sectors = Array.from(new Set(projects.map(p => p.sector))).filter(Boolean).sort();
  const municipalities = Array.from(new Set(projects.map(p => p.municipality))).filter(Boolean).sort();

  const handleReset = () => setFilters({ region: '', sector: '', municipality: '', searchNotes: '', searchName: '', valueFilter: '' });
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-slate-800 font-black text-sm mb-4"><FilterIcon /><span>فلاتر التحكم في العرض</span></div>
      <div className="space-y-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-black text-slate-400 uppercase">المنطقة الجغرافية</label>
          <select name="region" value={filters.region} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">كل المناطق</option>
            {regions.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1.5"><label className="text-[11px] font-black text-slate-400 uppercase">القطاع المستفيد</label><select name="sector" value={filters.sector} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500"><option value="">كل القطاعات</option>{sectors.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
        <div className="flex flex-col gap-1.5"><label className="text-[11px] font-black text-slate-400 uppercase">نطاق البلدية</label><select name="municipality" value={filters.municipality} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500"><option value="">كل البلديات</option>{municipalities.map(m => <option key={m} value={m}>{m}</option>)}</select></div>
        <div className="flex flex-col gap-1.5"><label className="text-[11px] font-black text-slate-400 uppercase">مستوى القيمة</label><select name="valueFilter" value={filters.valueFilter} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500"><option value="">كل القيم</option><option value="with-value">ذات قيمة مالية</option><option value="without-value">قيد التقييم</option></select></div>
        <div className="pt-4 border-t border-slate-100"><input name="searchName" type="text" value={filters.searchName} onChange={handleChange} placeholder="بحث بالاسم..." className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 mb-4" /><button onClick={handleReset} className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 p-2.5 rounded-lg text-xs font-black transition-all"><RedoIcon />إعادة تعيين الافتراضي</button></div>
      </div>
    </div>
  );
};

export default FilterSection;
