
import React from 'react';
import { EyeIcon } from './Icons';

const OverviewSection: React.FC = () => (
  <section className="relative overflow-hidden bg-white p-12 md:p-16 rounded-[48px] shadow-sm border border-slate-100 mb-12 transition-all hover:shadow-2xl group">
    {/* عناصر ديكورية خلفية */}
    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-full -mr-32 -mt-32 blur-3xl transition-transform group-hover:scale-150 duration-1000"></div>
    <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-50/30 rounded-full -ml-24 -mb-24 blur-2xl"></div>
    
    <div className="relative z-10 max-w-5xl mx-auto">
      <div className="flex flex-col items-center text-center mb-12">
        <div className="p-5 bg-gradient-to-br from-blue-900 to-blue-700 text-white rounded-3xl shadow-2xl mb-6 transform group-hover:rotate-6 transition-transform">
          <EyeIcon />
        </div>
        <h2 className="text-4xl font-black text-slate-900 mb-2">النظرة العامة للمشاريع الاستراتيجية</h2>
        <div className="h-1.5 w-24 bg-amber-500 rounded-full mb-4"></div>
        <p className="text-slate-400 font-bold text-sm uppercase tracking-[0.3em]">Executive Strategic Summary • 2026</p>
      </div>
      
      <div className="space-y-10">
        <div className="text-slate-700 leading-[2] text-2xl font-medium text-justify">
          <p className="mb-8 indent-12 first-letter:text-6xl first-letter:font-black first-letter:text-blue-900 first-letter:float-right first-letter:ml-4 first-letter:mt-2">
            انطلاقاً من الرؤية الاستراتيجية الشاملة للمؤسسة الوطنية للنفط، يمثل هذا التقرير خارطة الطريق التنفيذية لمشاريع التنمية المستدامة المستهدفة للعام المالي 2026. لقد تم اختيار هذه المشاريع بعناية فائقة لتشمل كافة المناطق الجغرافية، مع التركيز المكثف على البلديات المحيطة بالعمليات النفطية لضمان تحقيق أقصى درجات المسؤولية الاجتماعية.
          </p>
          
          <div className="relative p-8 bg-slate-50 rounded-[32px] border-r-8 border-blue-900 shadow-inner">
            <p className="text-2xl leading-relaxed">
              تستند هذه البيانات إلى حصر دقيق شمل <span className="text-blue-900 font-black decoration-amber-500 decoration-4 underline-offset-8 underline">12 قطاعاً حيوياً</span>، حيث بلغت القيمة المالية المرصودة للمشاريع المعتمدة فنياً حتى تاريخه:
              <span className="block mt-4 text-5xl font-black text-blue-900 tracking-tighter">
                140,512,261 <span className="text-2xl font-bold text-slate-400 mr-2">دينار ليبي</span>
              </span>
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
          <div className="bg-amber-50/50 border border-amber-200 p-8 rounded-[32px] flex items-start gap-6">
            <div className="text-4xl shrink-0 bg-white p-4 rounded-2xl shadow-sm">💡</div>
            <div>
              <h4 className="font-black text-amber-900 text-xl mb-2">توصية إدارية هامة</h4>
              <p className="text-amber-800 text-lg leading-relaxed font-bold opacity-80">
                يتحتم على اللجان الفنية تسريع وتيرة مراجعة المقايسات للمشاريع التي لا تزال "قيد التقييم" لضمان إدراجها ضمن الميزانية النهائية قبل إغلاق الربع الأول.
              </p>
            </div>
          </div>
          
          <div className="bg-blue-50/50 border border-blue-100 p-8 rounded-[32px] flex items-start gap-6">
            <div className="text-4xl shrink-0 bg-white p-4 rounded-2xl shadow-sm">🎯</div>
            <div>
              <h4 className="font-black text-blue-900 text-xl mb-2">هدف المرحلة</h4>
              <p className="text-blue-800 text-lg leading-relaxed font-bold opacity-80">
                تحويل كافة مذكرات التفاهم والزيارات الميدانية إلى مشاريع ملموسة على الأرض تعزز من ثقة المجتمع المحلي في الدور التنموي للمؤسسة.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default OverviewSection;
