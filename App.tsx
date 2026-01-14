import React, { useState, useMemo, useRef } from 'react';
import ReportLayout from './components/ReportLayout';
import OverviewSection from './components/OverviewSection';
import StatsGrid from './components/StatsGrid';
import SectorHighlights from './components/SectorHighlights';
import RegionalStats from './components/RegionalStats'; // استيراد المكون الجديد
import ChartsSection from './components/ChartsSection';
import FilterSection from './components/FilterSection';
import ProjectsTable from './components/ProjectsTable';
import { DownloadIcon, FileIcon, PresentationIcon } from './components/Icons';
import { rawProjects, getRegion } from './data';
import { FilterState, Project } from './types';

// تعريفه لتجنب أخطاء TypeScript حيث أن المكتبة مستوردة في HTML
declare const PptxGenJS: any;

const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(rawProjects);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  
  const [filters, setFilters] = useState<FilterState>({
    region: '', sector: '', municipality: '', searchNotes: '', searchName: '', valueFilter: ''
  });

  const overviewRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const regionalRef = useRef<HTMLDivElement>(null); // مرجع جديد للمناطق
  const sectorsRef = useRef<HTMLDivElement>(null);
  const chartsRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  const scrollTo = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchRegion = !filters.region || p.region === filters.region;
      const matchSector = !filters.sector || p.sector === filters.sector;
      const matchMunicipality = !filters.municipality || p.municipality === filters.municipality;
      const matchName = !filters.searchName || p.name.toLowerCase().includes(filters.searchName.toLowerCase());
      const matchNotes = !filters.searchNotes || (p.notes && p.notes.toLowerCase().includes(filters.searchNotes.toLowerCase()));
      
      let matchValue = true;
      if (filters.valueFilter === 'with-value') matchValue = p.value !== null;
      else if (filters.valueFilter === 'without-value') matchValue = p.value === null;

      return matchRegion && matchSector && matchMunicipality && matchName && matchNotes && matchValue;
    });
  }, [filters, projects]);

  const handleExportPPTX = () => {
    const pptx = new PptxGenJS();
    pptx.layout = 'LAYOUT_WIDE';
    pptx.rtl = true;

    const slide1 = pptx.addSlide();
    slide1.background = { fill: '1E3A8A' };
    slide1.addText('المؤسسة الوطنية للنفط', { x: 0, y: 2, w: '100%', align: 'center', fontSize: 44, color: 'FFFFFF', bold: true, fontFace: 'Arial' });
    slide1.addText('إدارة التنمية المستدامة', { x: 0, y: 3, w: '100%', align: 'center', fontSize: 32, color: 'EAB308', bold: true });
    slide1.addText('قسم الدراسات', { x: 0, y: 3.8, w: '100%', align: 'center', fontSize: 24, color: 'CBD5E1' });
    slide1.addText('مستهدف مشاريع عام 2026', { x: 0, y: 5, w: '100%', align: 'center', fontSize: 20, color: 'FFFFFF', italic: true });

    const slide2 = pptx.addSlide();
    const totalValue = filteredProjects.reduce((acc, curr) => acc + (curr.value || 0), 0);
    slide2.addText('مؤشرات الأداء الرئيسية', { x: 0.5, y: 0.5, fontSize: 24, color: '1E3A8A', bold: true });
    slide2.addTable([
      [{ text: 'المؤشر', options: { bold: true, fill: 'F1F5F9' } }, { text: 'القيمة', options: { bold: true, fill: 'F1F5F9' } }],
      ['إجمالي الميزانية المعتمدة', `${totalValue.toLocaleString()} د.ل`],
      ['العدد الكلي للمشاريع', filteredProjects.length.toString()],
      ['المشاريع المكتملة البيانات', filteredProjects.filter(p => p.value !== null).length.toString()],
      ['المشاريع قيد الدراسة', filteredProjects.filter(p => p.value === null).length.toString()]
    ] as any, { x: 0.5, y: 1.5, w: 9, border: { pt: 1, color: 'CBD5E1' } });

    const slide3 = pptx.addSlide();
    slide3.addText('قائمة المشاريع التفصيلية', { x: 0.5, y: 0.5, fontSize: 24, color: '1E3A8A', bold: true });
    const tableData: any[][] = [
      ['المشروع', 'القطاع', 'القيمة'].map(h => ({ text: h, options: { fill: '1E3A8A', color: 'FFFFFF', bold: true } }))
    ];
    filteredProjects.slice(0, 10).forEach(p => {
      tableData.push([p.name, p.sector, p.value ? p.value.toLocaleString() : 'قيد الدراسة']);
    });
    slide3.addTable(tableData, { x: 0.5, y: 1.2, w: 12, fontSize: 10 });

    pptx.writeFile({ fileName: `تقرير_مشاريع_NOC_2026.pptx` });
  };

  const handleAddProject = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleDeleteProject = (id: number) => {
    if (confirm('هل أنت متأكد من حذف هذا المشروع؟')) {
      setProjects(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleSaveProject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newProj: Project = {
      id: editingProject ? editingProject.id : Date.now(),
      name: formData.get('name') as string,
      value: formData.get('value') ? Number(formData.get('value')) : null,
      municipality: formData.get('municipality') as string,
      region: getRegion(formData.get('municipality') as string, ''),
      sector: formData.get('sector') as string,
      beneficiary: formData.get('beneficiary') as string,
      notes: formData.get('notes') as string,
    };

    if (editingProject) {
      setProjects(prev => prev.map(p => p.id === editingProject.id ? newProj : p));
    } else {
      setProjects(prev => [newProj, ...prev]);
    }
    setIsModalOpen(false);
  };

  const SidebarContent = (
    <div className="flex flex-col h-full gap-8">
      <div className="no-print">
         <button 
          onClick={handleAddProject}
          className="w-full flex items-center justify-center gap-3 bg-blue-900 text-white p-4 rounded-2xl font-black text-sm shadow-xl hover:bg-blue-800 transition-all mb-4"
        >
          <span>+ إضافة مشروع جديد</span>
        </button>
      </div>

      <FilterSection filters={filters} setFilters={setFilters} projects={projects} />
      
      <div className="pt-6 border-t border-slate-100 no-print">
        <h3 className="text-[10px] font-black text-slate-400 uppercase mb-4 tracking-widest">فهرس الوصول السريع</h3>
        <div className="space-y-1">
          {[
            { ref: overviewRef, title: 'النظرة العامة' },
            { ref: statsRef, title: 'مؤشرات الأداء' },
            { ref: regionalRef, title: 'التوزيع الجغرافي' },
            { ref: sectorsRef, title: 'تحليل القطاعات' },
            { ref: chartsRef, title: 'الرسوم البيانية' },
            { ref: tableRef, title: 'جدول البيانات' }
          ].map((item, italic) => (
            <button
              key={italic}
              onClick={() => scrollTo(item.ref)}
              className="w-full text-right px-4 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-900 transition-all"
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-6 border-t border-slate-100 no-print">
        <h3 className="text-[10px] font-black text-slate-400 uppercase mb-4 tracking-widest">تصدير التقارير</h3>
        <div className="flex flex-col gap-3">
          <button onClick={handleExportPPTX} className="flex items-center justify-between px-5 py-4 rounded-xl text-xs font-bold bg-amber-50 text-amber-700 border border-amber-100 hover:bg-amber-100 transition-all">
            <span>تصدير PowerPoint</span>
            <PresentationIcon />
          </button>
          <button onClick={() => window.print()} className="flex items-center justify-between px-5 py-4 rounded-xl text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100 hover:bg-blue-100 transition-all">
            <span>تصدير PDF</span>
            <FileIcon />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <ReportLayout sidebar={SidebarContent}>
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-8 bg-blue-900 text-white flex justify-between items-center">
              <h3 className="text-2xl font-black">{editingProject ? 'تعديل مشروع' : 'إضافة مشروع جديد'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-3xl">&times;</button>
            </div>
            <form onSubmit={handleSaveProject} className="p-10 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-black text-slate-400 mb-2">اسم المشروع</label>
                  <input name="name" defaultValue={editingProject?.name} required className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-bold outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-black text-slate-400 mb-2">القيمة (د.ل)</label>
                  <input name="value" type="number" defaultValue={editingProject?.value || ''} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-bold outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-black text-slate-400 mb-2">القطاع</label>
                  <input name="sector" defaultValue={editingProject?.sector} required className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-bold outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-black text-slate-400 mb-2">البلدية</label>
                  <input name="municipality" defaultValue={editingProject?.municipality} required className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-bold outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-black text-slate-400 mb-2">الجهة المستفيدة</label>
                  <input name="beneficiary" defaultValue={editingProject?.beneficiary} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-bold outline-none" />
                </div>
              </div>
              <div className="flex gap-4 pt-6">
                <button type="submit" className="flex-1 bg-blue-900 text-white py-5 rounded-2xl font-black shadow-xl">حفظ البيانات</button>
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-8 py-5 bg-slate-100 text-slate-500 rounded-2xl font-black">إلغاء</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="max-w-[1400px] mx-auto space-y-20">
        <header className="no-print text-center space-y-4 pt-16 pb-12 border-b border-slate-100">
          <div className="flex flex-col items-center">
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight mb-3">
              المؤسسة الوطنية للنفط
            </h1>
            <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-2">
              إدارة التنمية المستدامة
            </h2>
            <h3 className="text-2xl md:text-3xl font-bold text-slate-400">
              قسم الدراسات
            </h3>
            <div className="mt-10 relative inline-block">
              <div className="absolute inset-0 bg-blue-900 blur-2xl opacity-10"></div>
              <div className="relative bg-blue-900 text-white px-12 py-4 rounded-full font-black text-2xl shadow-2xl border border-blue-800 tracking-widest uppercase">
                مستهدف مشاريع 2026
              </div>
            </div>
          </div>
          <div className="pt-12 flex justify-center gap-6">
             <button onClick={handleExportPPTX} className="bg-amber-500 text-white px-10 py-5 rounded-[24px] font-black text-base shadow-xl hover:bg-amber-600 hover:-translate-y-1 transition-all flex items-center gap-4">
              <PresentationIcon />
              <span>تصدير عرض التقديمي (PPTX)</span>
            </button>
            <button onClick={() => window.print()} className="bg-blue-900 text-white px-10 py-5 rounded-[24px] font-black text-base shadow-xl hover:bg-blue-800 hover:-translate-y-1 transition-all flex items-center gap-4">
              <DownloadIcon />
              <span>تصدير التقرير الفني (PDF)</span>
            </button>
          </div>
        </header>

        <div ref={overviewRef} className="scroll-mt-10 animate-in fade-in slide-in-from-bottom-5 duration-500">
          <OverviewSection />
        </div>

        <div ref={statsRef} className="scroll-mt-10 animate-in fade-in slide-in-from-bottom-5 duration-700">
          <div className="border-r-8 border-blue-900 pr-8 mb-12">
            <h2 className="text-4xl font-black text-blue-900">مؤشرات الأداء الاستراتيجية</h2>
            <p className="text-slate-400 font-bold mt-2">تحليل رقمي شامل للميزانيات المرصودة ونسب الإنجاز</p>
          </div>
          <StatsGrid projects={filteredProjects} />
        </div>

        {/* القسم الجديد للمناطق الجغرافية */}
        <div ref={regionalRef} className="scroll-mt-10 animate-in fade-in slide-in-from-bottom-5 duration-700">
          <div className="border-r-8 border-blue-900 pr-8 mb-12">
            <h2 className="text-4xl font-black text-blue-900">نطاق الانتشار الجغرافي</h2>
            <p className="text-slate-400 font-bold mt-2">توزيع عدد المشاريع على كافة ربوع ليبيا والمنشآت النفطية</p>
          </div>
          <RegionalStats projects={filteredProjects} />
        </div>

        <div ref={sectorsRef} className="scroll-mt-10 animate-in fade-in slide-in-from-bottom-5 duration-700">
          <div className="border-r-8 border-blue-900 pr-8 mb-12">
            <h2 className="text-4xl font-black text-blue-900">تحليل القطاعات الحيوية</h2>
            <p className="text-slate-400 font-bold mt-2">توزيع المشاريع حسب القطاعات الخدمية الأكثر احتياجاً</p>
          </div>
          <SectorHighlights projects={filteredProjects} />
        </div>

        <div ref={chartsRef} className="scroll-mt-10 animate-in fade-in slide-in-from-bottom-5 duration-1000">
          <ChartsSection projects={filteredProjects} />
        </div>

        <div ref={tableRef} className="scroll-mt-10 pb-24 animate-in fade-in slide-in-from-bottom-5 duration-1000">
          <ProjectsTable 
            projects={filteredProjects} 
            onEdit={handleEditProject} 
            onDelete={handleDeleteProject} 
          />
        </div>

        <footer className="text-center py-20 border-t border-slate-100 flex flex-col items-center gap-4">
          <div className="w-16 h-1 bg-blue-900 rounded-full mb-2"></div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-slate-400 font-black text-[10px] uppercase tracking-[0.4em] mb-2">Report Prepared By</span>
            <span className="text-2xl font-black text-blue-900">طه النفاتي</span>
            <span className="text-lg font-bold text-slate-500">رئيس قسم الدراسات</span>
          </div>
          <div className="mt-8 text-slate-300 text-[9px] font-black uppercase tracking-[0.5em] no-print">
            National Oil Corporation • Sustainable Development Department • 2026 Strategy
          </div>
        </footer>
      </div>
    </ReportLayout>
  );
};

export default App;
