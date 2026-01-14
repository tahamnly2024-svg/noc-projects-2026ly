
import React from 'react';
import { Project } from '../types';
import { TableIcon } from './Icons';

interface ProjectsTableProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (id: number) => void;
}

const ProjectsTable: React.FC<ProjectsTableProps> = ({ projects, onEdit, onDelete }) => (
  <section className="bg-white rounded-[40px] shadow-sm border border-slate-200 overflow-hidden mb-8">
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-10 bg-gradient-to-l from-blue-900 to-blue-800 text-white">
      <div className="flex items-center gap-5">
        <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl">
          <TableIcon />
        </div>
        <div>
          <h2 className="text-3xl font-black">قائمة البيانات التفصيلية</h2>
          <p className="text-blue-200/70 font-bold text-sm mt-1">سجل المشاريع المستهدفة لعام 2026</p>
        </div>
      </div>
      <div className="bg-white/10 px-6 py-2 rounded-full border border-white/20 font-black text-sm">
        إجمالي: {projects.length} مشروع
      </div>
    </div>
    
    <div className="overflow-x-auto">
      <table className="w-full text-right border-collapse">
        <thead>
          <tr className="bg-slate-50 text-slate-500 text-sm font-black border-b border-slate-100 uppercase tracking-tighter">
            <th className="p-6 text-center w-16">#</th>
            <th className="p-6 min-w-[300px]">المشروع</th>
            <th className="p-6">القيمة (د.ل)</th>
            <th className="p-6">الموقع الجغرافي</th>
            <th className="p-6">القطاع</th>
            <th className="p-6">الجهة المستفيدة</th>
            <th className="p-6 text-center">الإجراءات</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {projects.length > 0 ? projects.map((project, idx) => (
            <tr key={project.id} className="hover:bg-slate-50/80 transition-all group">
              <td className="p-6 font-bold text-slate-300 text-center">{idx + 1}</td>
              <td className="p-6">
                <div className="flex flex-col">
                  <span className="font-extrabold text-[17px] text-slate-900 leading-tight group-hover:text-blue-900 transition-colors">{project.name}</span>
                  <span className="text-[11px] font-bold text-slate-400 mt-1 italic">{project.notes || 'لا توجد ملاحظات إضافية'}</span>
                </div>
              </td>
              <td className="p-6">
                {project.value ? (
                  <span className="font-black text-[18px] text-slate-900 tabular-nums">{project.value.toLocaleString('ar-LY')}</span>
                ) : (
                  <span className="text-slate-300 font-bold italic text-xs bg-slate-100 px-3 py-1 rounded-full">قيد التقييم</span>
                )}
              </td>
              <td className="p-6">
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-slate-800 text-sm">{project.municipality}</span>
                  <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md inline-block self-start">{project.region}</span>
                </div>
              </td>
              <td className="p-6">
                <span className="bg-white text-slate-700 px-4 py-1.5 rounded-xl text-xs font-black border border-slate-200 shadow-sm inline-block">
                  {project.sector}
                </span>
              </td>
              <td className="p-6 font-bold text-sm text-slate-600">{project.beneficiary || '-'}</td>
              <td className="p-6">
                <div className="flex items-center justify-center gap-2">
                  <button 
                    onClick={() => onEdit(project)}
                    className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                    title="تعديل المشروع"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  </button>
                  <button 
                    onClick={() => onDelete(project.id)}
                    className="p-2 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-600 hover:text-white transition-all shadow-sm"
                    title="حذف المشروع"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                  </button>
                </div>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan={7} className="p-32 text-center">
                <div className="flex flex-col items-center gap-4">
                  <span className="text-6xl grayscale opacity-20">📂</span>
                  <p className="text-slate-400 font-black italic text-xl">لا توجد مشاريع مطابقة للبحث</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </section>
);

export default ProjectsTable;
