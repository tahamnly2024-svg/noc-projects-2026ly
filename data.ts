
import { Project } from './types';

export const getRegion = (municipality: string, name: string): string => {
  const m = municipality || "";
  const n = name || "";
  
  // المنطقة الغربية (تم حذف سيناون وبنت بية ودرج منها)
  if (m.includes("جادو") || m.includes("زليتن") || m.includes("طرابلس") || m.includes("غريان") || m.includes("الرجبان") || m.includes("زوارة") || m.includes("بني وليد") || m.includes("قصر بن غشير") || m.includes("الزنتان") || m.includes("قصر الاخيار") || m.includes("الزاوية") || m.includes("الرياينة") || m.includes("القلعة") || m.includes("الحرابة")) {
    return "المنطقة الغربية";
  }
  
  // المنطقة الجنوبية (تمت إضافة سيناون وبنت بية ودرج هنا لضبط الإحصائيات)
  if (m.includes("العوينات") || m.includes("تراغن") || m.includes("اوباري") || m.includes("سبها") || m.includes("مرزق") || m.includes("الشرقية") || m.includes("براك الشاطى") || m.includes("غات") || m.includes("ادري الشاطئ") || m.includes("وادي عتبة") || m.includes("بلديات الجنوب") || m.includes("سيناون") || m.includes("بنت بية") || m.includes("درج") || n.includes("ذوي الاحتياجات") || n.includes("الرمال الزاحفة")) {
    return "المنطقة الجنوبية";
  }
  
  if (m.includes("سرت") || m.includes("الجفرة") || m.includes("زلة") || m.includes("هراوة")) {
    return "المنطقة الوسطى";
  }
  if (m.includes("درنة") || m.includes("بنغازي") || m.includes("سلوق")) {
    return "المنطقة الشرقية";
  }
  if (m.includes("جالو") || m.includes("منطقة الواحات") || m.includes("مرادة") || m.includes("الالواحات")) {
    return "الواحات";
  }
  if (m.includes("البريقة") || m.includes("راس لانوف") || m.includes("بلدية السدرة") || m.includes("الهلال النفطي")) {
    return "الهلال النفطي";
  }
  
  return "المنطقة الغربية"; 
};

export const rawProjects: Project[] = [
    {id: 1, name: "صيانة مدرسة ثانوية التعليم الديني -بلدية جادو", value: null, municipality: "جادو", region: "", sector: "التعليم", beneficiary: "جادو", notes: "زيارة ميدانية"},
    {id: 2, name: "توفير انابيب ومواد ومضخات جادو", value: null, municipality: "جادو", region: "", sector: "المياه", beneficiary: "بلدية جادو", notes: "في انتظار المقايسات من البلدية"},
    {id: 3, name: "مجموعة تجيزات للنظافة ( كاشيك مجنز ر-سيارة قمامة- سيارة شفط مجاري) -القلعة", value: null, municipality: "القلعة", region: "", sector: "المرافق", beneficiary: "بلدية القلعة", notes: "زيارة ميدانية"},
    {id: 4, name: "مجموعة تجهيزات طبية - القلعة", value: null, municipality: "القلعة", region: "", sector: "الصحة", beneficiary: "بلدية القلعة", notes: "زيارة ميدانية"},
    {id: 5, name: "دعم مستشفى الحرابة", value: null, municipality: "الحرابة", region: "", sector: "الصحة", beneficiary: "مستشفى الحرابة", notes: "في انتظار التوجهات"},
    {id: 6, name: "مشروع انارة الطريق - بلدية الرجبان", value: 2718240, municipality: "الرجبان", region: "", sector: "الكهرباء", beneficiary: "بلدية الرجبان", notes: ""},
    {id: 7, name: "مشروع تنفيد انارة الطريق الساحلي بمنطقة مليتة", value: 4943460, municipality: "زوارة", region: "", sector: "الكهرباء", beneficiary: "بلدية زوارة", notes: ""},
    {id: 8, name: "دعم كلية العلوم الجامعة الاسمرية الإسلامية زليتن", value: 60000, municipality: "زليتن", region: "", sector: "التعليم", beneficiary: "الجامعة الاسمرية زليتن", notes: ""},
    {id: 9, name: "توريد معدات وأجهزة طبية لصالح مستشفى نعيمة للحوادث", value: 500000, municipality: "زليتن", region: "", sector: "الصحة", beneficiary: "مستشفى نعيمة للحوادث", notes: ""},
    {id: 10, name: "دعم مستشفى ادواد العالم بمعدات طبية", value: 559594, municipality: "زليتن", region: "", sector: "الصحة", beneficiary: "مستشفى ادواد العالم", notes: ""},
    {id: 11, name: "دعم مجمع الحوريات للعيادات الذهبية بمعدات طبية", value: 710760, municipality: "زليتن", region: "", sector: "الصحة", beneficiary: "مجمع الحوريات للعيادات الذهبية", notes: ""},
    {id: 12, name: "دعم إدارة الإصلاح البيئ -بلدية بني وليد", value: 950000, municipality: "بني وليد", region: "", sector: "البيئة", beneficiary: "الإصلاح البيئ بني وليد", notes: ""},
    {id: 13, name: "صيانة جناح المؤسسة الوطنية للنفط في معرض الدولي", value: null, municipality: "طرابلس", region: "", sector: "المجتمع المدني", beneficiary: "معرض طرابلس الدولي", notes: "في انتظار المطالبة"},
    {id: 14, name: "المختبر الطبي المرجعي- طرابلس", value: 934749, municipality: "طرابلس", region: "", sector: "الصحة", beneficiary: "المختبر المرجعي طرابلس", notes: ""},
    {id: 15, name: "حفر بئر مياه شرب - بلدية قصر بن غشير", value: 101250, municipality: "قصر بن غشير", region: "", sector: "المياه", beneficiary: "قصر بن غشير", notes: ""},
    {id: 16, name: "دعم كلية التربية جامعة طرابلس", value: null, municipality: "طرابلس", region: "", sector: "التعليم", beneficiary: "جامعة طرابلس", notes: "في انتظار المقايسات"},
    {id: 17, name: "دعم كلية الهندسة جامعة طرابلس", value: null, municipality: "طرابلس", region: "", sector: "التعليم", beneficiary: "جامعة طرابلس", notes: "تحديد القيمة بناء على الزيارة"},
    {id: 18, name: "زراعة مائة الف شتلة غابات لبلدية الزنتان", value: 1542600, municipality: "الزنتان", region: "", sector: "الزراعة", beneficiary: "منطقة المرحان", notes: ""},
    {id: 19, name: "صيانة عدد 2 مراكز صحية - بلدبة غريان", value: 2101647, municipality: "غريان", region: "", sector: "الصحة", beneficiary: "مركز أبوزيان - مركز غوط الريح", notes: ""},
    {id: 20, name: "صيانة جهازتصوير مقطعي CT بمنطقة قصر الاخيار", value: 650000, municipality: "قصر الاخيار", region: "", sector: "الصحة", beneficiary: "مستشفى قصر الاخيار القروي", notes: ""},
    {id: 21, name: "دعم مشروع القطب الصناعي -بلدية الزاوية", value: 370000, municipality: "الزاوية", region: "", sector: "المرافق", beneficiary: "بلدية الزاوية", notes: "في انتظار المقايسات"},
    {id: 22, name: "بناء وتجهيز صالة رياضية", value: null, municipality: "الرياينة", region: "", sector: "الشباب والرياضة", beneficiary: "الرياينة", notes: "في انتظار التوجيه"},
    {id: 23, name: "توفير عدد من المحولات الكهربئية", value: null, municipality: "الرياينة", region: "", sector: "الكهرباء", beneficiary: "", notes: "في انتظار التوجيه"},
    {id: 24, name: "تنفيد حجرة مضخات مياه وملحقاتها", value: null, municipality: "الرياينة", region: "", sector: "المياه", beneficiary: "", notes: "في انتظار التوجيه"},
    {id: 25, name: "اجراء صيانة لعدد من المدارس", value: null, municipality: "الرياينة", region: "", sector: "التعليم", beneficiary: "", notes: "في انتظار التوجيه"},
    {id: 26, name: "توفير عدد 2 حافلات لفوج الكشافة", value: null, municipality: "الرياينة", region: "", sector: "الصحة", beneficiary: "", notes: "في انتظار التوجيه"},
    {id: 27, name: "دعم مستشفى الرياينة العام", value: 8728400, municipality: "الرياينة", region: "", sector: "الصحة", beneficiary: "", notes: ""},
    {id: 28, name: "مولد كهرباء", value: 480000, municipality: "الرياينة", region: "", sector: "الكهرباء", beneficiary: "", notes: ""},
    {id: 29, name: "دعم العيادة المجمعة الذهبية الرياينة", value: 3849914, municipality: "الرياينة", region: "", sector: "الصحة", beneficiary: "", notes: ""},
    {id: 30, name: "انشاء منتزه ببلدية البريقة", value: null, municipality: "البريقة", region: "الهلال النفطي", sector: "المجتمع المدني", beneficiary: "بلدية البريقة", notes: "في انتظار التوجيه"},
    {id: 31, name: "مشروع انشاء انارة طريق الرابط بين منطقة العرقوب والحلوق النفطية مسافة 6 كيلومتر", value: null, municipality: "البريقة", region: "", sector: "الطرق", beneficiary: "", notes: "في انتظار التوجيه"},
    {id: 32, name: "صيانة الطريق الرابط بين الساحلي و خور اوقيدة", value: null, municipality: "البريقة", region: "", sector: "الطرق", beneficiary: "", notes: "في انتظار التوجيه"},
    {id: 33, name: "توصيل خط ضغط عالي 11ك.ف", value: null, municipality: "البريقة", region: "", sector: "الكهرباء", beneficiary: "حي العوامة-حي اوريث", notes: "في انتظار التوجيه"},
    {id: 34, name: "انشاء مبنى غسيل كلى مدينة البريقة", value: 5175541, municipality: "البريقة", region: "", sector: "الصحة", beneficiary: "بلدية البريقة", notes: ""},
    {id: 35, name: "توفير تجهيزات لمدرسة عثمان بن عفان", value: null, municipality: "راس لانوف", region: "", sector: "التعليم", beneficiary: "", notes: "في انتظار التوجيه"},
    {id: 36, name: "تنفيد اعمال صيانة لمباني المؤسسة", value: null, municipality: "راس لانوف", region: "", sector: "المرافق", beneficiary: "راس لانوف", notes: "في انتظار التوجيه"},
    {id: 37, name: "مشروع انشاء مبنى مركز صحي مجمع بن جواد", value: 14209852, municipality: "بلدية السدرة", region: "", sector: "الصحة", beneficiary: "بن جواد", notes: ""},
    {id: 38, name: "مشروع انشاء طريق خدمي بن جواد", value: null, municipality: "بلدية السدرة", region: "", sector: "الطرق", beneficiary: "", notes: ""},
    {id: 39, name: "مشروع انشاء مستشفى أطفال سعة 20 سرير بن جواد", value: null, municipality: "بلدية السدرة", region: "", sector: "الصحة", beneficiary: "", notes: ""},
    {id: 40, name: "صيانة وإنشاء فصول إضافية بمدرسة بشرى للتعليم الأساسي", value: 1650000, municipality: "سرت", region: "المنطقة الوسطى", sector: "التعليم", beneficiary: "بلدية سرت", notes: ""},
    {id: 41, name: "حفر 4 ابار مياه ببلدية الجفرة", value: null, municipality: "الجفرة", region: "", sector: "المياه", beneficiary: "ودان- هون", notes: ""},
    {id: 42, name: "تجهيز قسم للعلاج الطبيعي بمستشفى زلة القروي", value: null, municipality: "زلة", region: "", sector: "الصحة", beneficiary: "بلدية زلة", notes: "زيارة ميدانية"},
    {id: 43, name: "توريد جهاز تصوري إشعة", value: null, municipality: "زلة", region: "", sector: "الصحة", beneficiary: "", notes: "زيارة ميدانية"},
    {id: 44, name: "تجهيز غرفة عمليات صغرى", value: null, municipality: "زلة", region: "", sector: "الصحة", beneficiary: "", notes: "زيارة ميدانية"},
    {id: 45, name: "حفر عدد 2 ابار مياه وتشغيل المضخة بالطاقة الشمسية", value: null, municipality: "زلة", region: "", sector: "المياه", beneficiary: "", notes: "زيارة ميدانية"},
    {id: 46, name: "بناء وتجهيز كلية الهندسة النفطية", value: null, municipality: "زلة", region: "", sector: "التعليم", beneficiary: "", notes: "زيارة ميدانية"},
    {id: 47, name: "إنارة الشارع العام بأعمدة الطاقة الشمسية", value: null, municipality: "زلة", region: "", sector: "الكهرباء", beneficiary: "", notes: "في انتظار مقايسة"},
    {id: 48, name: "تركيب منظومة طاقة شمسية لقسم غسيل الكلى", value: 101200, municipality: "زلة", region: "", sector: "الصحة", beneficiary: "", notes: ""},
    {id: 49, name: "توريد وتركيب منظومة مياه شرب وصرف صحي", value: 98500, municipality: "زلة", region: "", sector: "الزراعة", beneficiary: "", notes: ""},
    {id: 50, name: "توريد خزانات رش مبيدات حشرات", value: 109000, municipality: "زلة", region: "", sector: "الزراعة", beneficiary: "", notes: ""},
    {id: 51, name: "انشاء الاعمال المدنية لنقطة تعبئة الغاز", value: null, municipality: "هراوة", region: "", sector: "المرافق", beneficiary: "بلدية هراوة", notes: "في انتظار مقايسة"},
    {id: 52, name: "صيانة مدرسة عبدالجليل سيف النصر", value: null, municipality: "هراوة", region: "", sector: "التعليم", beneficiary: "", notes: "في انتظار مقايسة"},
    {id: 53, name: "تمهيد ودك طريق مكب القمامة بمسافة 2,5 كم", value: null, municipality: "هراوة", region: "", sector: "الطرق", beneficiary: "", notes: "في انتظار مقايسة"},
    {id: 54, name: "توفير مادة (700) طن من مادة البيتومين", value: null, municipality: "الجفرة", region: "", sector: "المرافق", beneficiary: "فريق العمل التطوعي ودان", notes: "في انتظار مقايسة"},
    {id: 55, name: "دعم المعهد العالي للعلوم والتقنية - الواحات", value: null, municipality: "جالو", region: "الواحات", sector: "التعليم", beneficiary: "المعهد العالي للعلوم والتقنية", notes: "في انتظار مقايسة"},
    {id: 56, name: "إنشاء مركز للعلاج الطبيعي", value: null, municipality: "مرادة", region: "", sector: "الصحة", beneficiary: "بلدية مرادة", notes: "في انتظار مقايسة"},
    {id: 57, name: "إنارة الطريق العام بالطاقة الشمسية", value: null, municipality: "مرادة", region: "", sector: "الكهرباء", beneficiary: "", notes: "في انتظار مقايسة"},
    {id: 58, name: "إنشاء مبنى معمل هندسة النفط", value: null, municipality: "مرادة", region: "", sector: "التعليم", beneficiary: "", notes: "في انتظار مقايسة"},
    {id: 59, name: "توصيل خطوط كهرباء", value: null, municipality: "مرادة", region: "", sector: "الكهرباء", beneficiary: "", notes: "في انتظار مقايسة"},
    {id: 60, name: "صيانة محطات تحلية مياه ببلدية مرادة", value: null, municipality: "مرادة", region: "", sector: "المياه", beneficiary: "", notes: "في انتظار مقايسة"},
    {id: 61, name: "صيانة مدرسة بوجعفر المنصوري", value: null, municipality: "مرادة", region: "", sector: "التعليم", beneficiary: "", notes: "في انتظار مقايسة"},
    {id: 62, name: "إنشاء مختبر لمراقبة التلوث والتحاليل البيئية", value: 70000000, municipality: "منطقة الواحات", region: "", sector: "البيئة", beneficiary: "بلديات الواحات", notes: ""},
    {id: 63, name: "بناء دور ثاني بمدرسة السيدة عائشة الإعدادية- بلدية سلوق", value: null, municipality: "سلوق", region: "المنطقة الشرقية", sector: "التعليم", beneficiary: "بلدية سلوق", notes: "في انتظار مقايسة"},
    {id: 64, name: "طبع وسائل إيضاح للمدارس -درنة", value: 47500, municipality: "درنة", region: "", sector: "التعليم", beneficiary: "قطاع الزراعة والثروة الحيوانية درنة", notes: ""},
    {id: 65, name: "دعم مركز بحوث الكيمياء البيئية والبيولوجية جامعة بنغازي", value: null, municipality: "بنغازي", region: "", sector: "التعليم", beneficiary: "جامعة بنغازي", notes: "في انتظار مقايسة"},
    {id: 66, name: "بصيانة مبنى وحدة الرعاية الصحية الأولية", value: 1070139, municipality: "العوينات", region: "المنطقة الجنوبية", sector: "الصحة", beneficiary: "بلدية العوينات", notes: ""},
    {id: 67, name: "حفر عدد (2) أبار بعمق 100م بالمحلات التابعة للبلدية مع توفير مصدر الكهرباء", value: 1330651, municipality: "العوينات", region: "", sector: "المياه", beneficiary: "", notes: ""},
    {id: 68, name: "صيانة بنود محدودة بعدد 3 مدارس.", value: 807198, municipality: "العوينات", region: "", sector: "التعليم", beneficiary: "", notes: ""},
    {id: 69, name: "أنشاء ملعب خماسي محلة مغوة", value: 275915, municipality: "تراغن", region: "", sector: "الشباب والرياضة", beneficiary: "تراغن", notes: ""},
    {id: 70, name: "انشاء حديقة عامة", value: 213207, municipality: "تراغن", region: "", sector: "المرافق", beneficiary: "", notes: ""},
    {id: 71, name: "صيانة وربط عدد 14خزانات مياه أرضية وعلوية وربطها بالشبكة العامة", value: 750000, municipality: "تراغن", region: "", sector: "المياه", beneficiary: "", notes: ""},
    {id: 72, name: "توريد وتركيب (55) أعمدة إنارة تعمل بالطاقة الكهربائية", value: 1650000, municipality: "وادي عتبة", region: "", sector: "الكهرباء", beneficiary: "وادي عتبة", notes: ""},
    {id: 73, name: "حفر بئر مياه بعمق (200 متر)", value: 750000, municipality: "وادي عتبة", region: "", sector: "المياه", beneficiary: "", notes: ""},
    {id: 74, name: "ملعب كرة قدم خماسي", value: 257918, municipality: "وادي عتبة", region: "", sector: "الشباب والرياضة", beneficiary: "", notes: ""},
    {id: 75, name: "صيانة وربط عدد 12خزانات مياه أرضيية وعلوية وربطها بالشبكة العامة", value: 750000, municipality: "وادي عتبة", region: "", sector: "المياه", beneficiary: "", notes: ""},
    {id: 76, name: "مشروع نقل قمامة من امام مدرسة الامل", value: 950000, municipality: "اوباري", region: "", sector: "البيئة", beneficiary: "اوباري", notes: ""},
    {id: 77, name: "انارة الشوارع بالطاقة الشمسية", value: 1614327, municipality: "مرزق", region: "", sector: "الكهرباء", beneficiary: "مرزق", notes: ""},
    {id: 78, name: "صيانة وربط عدد 10خزانات مياه أرضيية وعلوية وربطها بالشبكة العامة", value: 700000, municipality: "مرزق", region: "", sector: "المياه", beneficiary: "", notes: ""},
    {id: 79, name: "صيانة وربط عدد 4 خزانات مياه أرضيية وعلوية وربطها بالشبكة العامة", value: 100000, municipality: "الشرقية", region: "", sector: "المياه", beneficiary: "بلدية الشرقية", notes: ""},
    {id: 80, name: "حفر بئر مياه في مدينة سيناون", value: 750000, municipality: "سيناون", region: "", sector: "المياه", beneficiary: "سيناون", notes: ""},
    {id: 81, name: "حفر مجموعة ابار", value: 3730701, municipality: "براك الشاطى", region: "", sector: "المياه", beneficiary: "برك الشاطى", notes: ""},
    {id: 82, name: "حفر بئر مياه شرب", value: 750000, municipality: "غات", region: "", sector: "المياه", beneficiary: "غات", notes: ""},
    {id: 83, name: "جامعة سبها الإدارة العامة", value: 60000, municipality: "سبها", region: "", sector: "التعليم", beneficiary: "سبها", notes: ""},
    {id: 84, name: "تجهيز معمل للتدريب مهارات اللغة الانجلزية", value: 100000, municipality: "سبها", region: "", sector: "التعليم", beneficiary: "معهد سبها للتقنية النفطية", notes: ""},
    {id: 85, name: "توفير بعد المواد الكهربائية لربط بئر مياه", value: 100000, municipality: "بنت بية", region: "", sector: "المياه", beneficiary: "محلة القراية", notes: ""},
    {id: 86, name: "توفير سيارة اسعاف -بلدية ادري الشاطئ", value: null, municipality: "ادري الشاطئ", region: "", sector: "الصحة", beneficiary: "ادري الشاطئ", notes: "في انتظار التوجيه"},
    {id: 87, name: "حفر بئر مياه", value: 750000, municipality: "بنت بية", region: "", sector: "المياه", beneficiary: "محلة توسكة", notes: ""},
    {id: 88, name: "دعم بلدية درج بحفر عدد (1) ابار مياه", value: null, municipality: "درج", region: "", sector: "المياه", beneficiary: "درج", notes: ""},
    {id: 89, name: "برامج تدريب قصيرة", value: 2100000, municipality: "بلديات الجنوب", region: "", sector: "التعليم", beneficiary: "مجموعة بلديات", notes: ""},
    {id: 90, name: "فتح مركز تعليمي لذوي الاحتياجات الخاصة", value: 60000, municipality: "", region: "", sector: "الصحة", beneficiary: "", notes: ""},
    {id: 91, name: "تاجير الة لإزالة الرمال الزاحفة على الطرق", value: 300000, municipality: "", region: "", sector: "المرافق", beneficiary: "", notes: ""}
].map(p => ({
  ...p,
  region: getRegion(p.municipality, p.name)
}));
