
import React from 'react';

interface ReportLayoutProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

const ReportLayout: React.FC<ReportLayoutProps> = ({ sidebar, children }) => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#F8FAFC] text-slate-800 antialiased" dir="rtl">
      {/* زيادة العرض إلى w-80 بناءً على طلب المستخدم */}
      <aside className="w-full md:w-80 bg-white border-l border-slate-200 shadow-2xl z-20 overflow-y-auto max-h-screen sticky top-0 no-print transition-all duration-300">
        <div className="p-8 border-b border-slate-100 bg-gradient-to-br from-blue-900 to-slate-800 text-white">
          <div className="space-y-3 mb-4">
            <h1 className="text-xl font-extrabold tracking-tight leading-tight">المؤسسة الوطنية للنفط</h1>
            <div className="h-1.5 w-12 bg-yellow-500 rounded-full"></div>
            <h2 className="text-md font-bold text-blue-100">إدارة التنمية المستدامة</h2>
            <h3 className="text-sm font-medium text-yellow-400">قسم الدراسات</h3>
          </div>
          <p className="text-[10px] text-blue-200/60 font-black uppercase tracking-[0.2em]">مستهدف مشاريع 2026</p>
        </div>
        <div className="p-6">{sidebar}</div>
        <div className="mt-auto p-6 border-t border-slate-100 bg-slate-50 text-[10px] text-slate-400 font-bold text-center">
          نظام الإدارة v3.5 | 2026
        </div>
      </aside>
      <main className="flex-1 p-4 md:p-10 overflow-x-hidden bg-slate-50">
        {children}
      </main>
    </div>
  );
};

export default ReportLayout;
