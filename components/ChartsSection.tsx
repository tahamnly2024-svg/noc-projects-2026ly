
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { Project } from '../types';
import { ChartIcon } from './Icons';

interface ChartsSectionProps {
  projects: Project[];
}

const COLORS = ['#004d40', '#283593', '#c62828', '#ef6c00', '#2e7d32', '#6a1b9a', '#0277bd', '#f9a825', '#37474f', '#ad1457'];

const ChartsSection: React.FC<ChartsSectionProps> = ({ projects }) => {
  // تصفية البيانات لاستبعاد أي شيء غير مصنف
  const validProjects = projects.filter(p => p.region && p.region !== "غير محدد");

  // 1. توزيع الميزانية حسب المناطق
  const regionValueData = validProjects.reduce((acc: any[], curr) => {
    const regionName = curr.region;
    const existing = acc.find(item => item.name === regionName);
    if (existing) existing.value += (curr.value || 0);
    else acc.push({ name: regionName, value: curr.value || 0 });
    return acc;
  }, []).filter(r => r.value > 0);

  // 2. عدد المشاريع لكل قطاع
  const sectorCountData = validProjects.reduce((acc: any[], curr) => {
    const existing = acc.find(item => item.name === curr.sector);
    if (existing) existing.count += 1;
    else acc.push({ name: curr.sector, count: 1 });
    return acc;
  }, []).sort((a, b) => b.count - a.count);

  // 3. التوزيع المالي حسب القطاع
  const sectorValueData = validProjects.reduce((acc: any[], curr) => {
    const existing = acc.find(item => item.name === curr.sector);
    if (existing) existing.value += (curr.value || 0);
    else acc.push({ name: curr.sector, value: curr.value || 0 });
    return acc;
  }, []).filter(s => s.value > 0).sort((a, b) => b.value - a.value);

  const regions = Array.from(new Set(validProjects.map(p => p.region))).filter(Boolean) as string[];
  const sectors = Array.from(new Set(validProjects.map(p => p.sector))).filter(Boolean) as string[];
  
  const regionSectorData = regions.map(region => {
    const entry: any = { name: region };
    sectors.forEach(sector => {
      entry[sector] = validProjects.filter(p => p.region === region && p.sector === sector).length;
    });
    return entry;
  });

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-slate-200 shadow-2xl rounded-xl text-sm font-bold">
          <p className="text-slate-900 mb-2 border-b pb-1 font-black">{label || payload[0].name}</p>
          {payload.map((p: any, i: number) => (
            <p key={i} style={{ color: p.color || p.fill }} className="flex justify-between gap-4">
              <span>{p.name}:</span>
              <span>{p.value.toLocaleString('ar-LY')} {p.dataKey === 'count' || sectors.includes(p.name || p.dataKey) ? 'مشروع' : 'د.ل'}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <section className="mb-8">
      <div className="flex items-center gap-3 mb-6 text-blue-900">
        <ChartIcon />
        <h2 className="text-2xl font-black">التحليل البياني المتقدم للمشاريع</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 flex flex-col">
          <h3 className="text-center font-black text-slate-800 mb-8 text-xl">توزيع الميزانية التقديرية حسب المناطق</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={regionValueData} 
                  innerRadius={80} 
                  outerRadius={110} 
                  paddingAngle={5} 
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {regionValueData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '30px', fontSize: '14px', fontWeight: 800 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 flex flex-col">
          <h3 className="text-center font-black text-slate-800 mb-8 text-xl">توزيع القطاعات داخل كل منطقة</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={regionSectorData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fontWeight: 700 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fontWeight: 700 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
                <Legend iconType="rect" wrapperStyle={{ paddingTop: '20px', fontSize: '11px', fontWeight: 700 }} />
                {sectors.map((sector, index) => (
                  <Bar 
                    key={sector} 
                    dataKey={sector} 
                    stackId="a" 
                    fill={COLORS[index % COLORS.length]} 
                    radius={index === sectors.length - 1 ? [4, 4, 0, 0] : [0, 0, 0, 0]} 
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 flex flex-col">
          <h3 className="text-center font-black text-slate-800 mb-8 text-xl">إجمالي عدد المشاريع حسب القطاع</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sectorCountData.slice(0, 10)} layout="vertical" margin={{ left: 20, right: 40 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  width={120} 
                  tick={{ fontSize: 13, fontWeight: 800, fill: '#1e3a8a' }} 
                  axisLine={false} 
                  tickLine={false} 
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
                <Bar dataKey="count" radius={[0, 10, 10, 0]} barSize={30}>
                  {sectorCountData.map((entry, index) => (
                    <Cell key={`bar-cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 flex flex-col">
          <h3 className="text-center font-black text-slate-800 mb-8 text-xl">توزيع القيمة المالية الكلية حسب القطاعات</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={sectorValueData.slice(0, 8)} 
                  cx="50%" 
                  cy="50%" 
                  outerRadius={100} 
                  dataKey="value"
                  stroke="none"
                >
                  {sectorValueData.map((entry, index) => (
                    <Cell key={`sector-cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '30px', fontSize: '13px', fontWeight: 700 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-blue-50 border-r-8 border-blue-900 p-6 rounded-2xl shadow-sm">
        <h4 className="font-black text-blue-900 mb-2">ملاحظة تحليلية:</h4>
        <p className="text-blue-800 font-bold leading-relaxed">
          يوضح الرسم البياني "توزيع القطاعات داخل كل منطقة" التباين في الأولويات التنموية؛ حيث يبرز قطاع {sectors[0]} كأكثر القطاعات انتشاراً في {regions[0]}، بينما يتركز النشاط في {regions[1] || 'مناطق أخرى'} حول قطاعات خدمية محددة، مما يسهل عملية تخصيص الموارد لعام 2026.
        </p>
      </div>
    </section>
  );
};

export default ChartsSection;
