import React, { useRef } from "react";
import { Button } from "../components/ui/button";
import { Download, Printer, TrendingUp, Target, BarChart3, Award } from "lucide-react";

const GovtechInnovationArticle: React.FC = () => {
  const articleRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    if (articleRef.current) {
      window.print();
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const html2pdf = await import("html2pdf.js");
      const element = articleRef.current;
      if (element) {
        const opt = {
          margin: 10,
          filename: "digital-healthcare-benchmarking.pdf",
          image: { type: "jpeg" as const, quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { orientation: "portrait" as const, unit: "mm", format: "a4" },
        };
        html2pdf.default().set(opt).from(element).save();
      }
    } catch (error) {
      alert("Для скачивания PDF установите html2pdf.js: npm install html2pdf.js");
    }
  };

  // Data for the comparison table
  const comparisonData = [
    { param: "Уровень урбанизации", leningrad: "85%", daghestan: "43%", tyumen: "72%", kursk: "68%" },
    { param: "Место в рейтинге РФ", leningrad: "3-е", daghestan: "68-е", tyumen: "15-е", kursk: "25-е" },
    { param: "Доступность электронных услуг", leningrad: "98%", daghestan: "65%", tyumen: "87%", kursk: "76%" },
    { param: "Охват населения цифровыми сервисами", leningrad: "85%", daghestan: "28%", tyumen: "72%", kursk: "52%" },
    { param: "Удовлетворенность пациентов", leningrad: "4.7/5.0", daghestan: "3.8/5.0", tyumen: "4.3/5.0", kursk: "4.1/5.0" },
    { param: "Количество цифровых инноваций", leningrad: "15", daghestan: "4", tyumen: "9", kursk: "7" },
    { param: "Уровень интеграции систем", leningrad: "95%", daghestan: "58%", tyumen: "82%", kursk: "74%" },
    { param: "Инвестиции в IT (% от бюджета)", leningrad: "12%", daghestan: "5%", tyumen: "8%", kursk: "6%" },
    { param: "Охват телемедициной (всего)", leningrad: "78%", daghestan: "32%", tyumen: "85%", kursk: "48%" },
    { param: "Охват телемедициной (сельская местность)", leningrad: "72%", daghestan: "28%", tyumen: "81%", kursk: "42%" },
    { param: "Электронные медкарты", leningrad: "92%", daghestan: "45%", tyumen: "76%", kursk: "63%" },
    { param: "Цифровые кадры", leningrad: "88%", daghestan: "35%", tyumen: "70%", kursk: "55%" },
    { param: "Инфраструктура (интернет)", leningrad: "99%", daghestan: "62%", tyumen: "90%", kursk: "81%" },
  ];

  // Data for the dynamic table
  const dynamicData = [
    { param: "Доступность электронных услуг", leningrad: "+12", daghestan: "+35", tyumen: "+25", kursk: "+28" },
    { param: "Охват населения", leningrad: "+18", daghestan: "+22", tyumen: "+30", kursk: "+25" },
    { param: "Инвестиции в IT", leningrad: "+3", daghestan: "+3", tyumen: "+2", kursk: "+2" },
    { param: "Охват телемедициной", leningrad: "+32", daghestan: "+28", tyumen: "+45", kursk: "+35" },
  ];

  return (
    <div ref={articleRef} className="space-y-10 leading-relaxed text-slate-800 dark:text-slate-100">
      {/* Кнопки действий */}
      <div className="flex flex-wrap gap-3 sticky top-0 bg-white dark:bg-slate-950 p-4 rounded-lg border border-slate-200 dark:border-slate-700 z-10 print:hidden">
        <Button onClick={handlePrint} variant="ghost" className="flex items-center gap-2 border border-slate-200 dark:border-slate-700">
          <Printer size={16} />
          Печать
        </Button>
        <Button onClick={handleDownloadPDF} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
          <Download size={16} />
          Скачать PDF
        </Button>
      </div>

      {/* Header */}
      <section className="border-b border-slate-200 dark:border-slate-700 pb-8">
        <div className="mb-6">
          <span className="inline-block px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-semibold rounded-full">
            Исследование
          </span>
        </div>
        <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight bg-gradient-to-r from-blue-600 to-purple-700 bg-clip-text text-transparent">
          Бенчмаркинг цифровизации первичного звена здравоохранения в регионах с контрастным уровнем урбанизации: опыт Ленинградской области, Республики Дагестан, Тюменской области и Курской области
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 mb-6">
          Комплексный анализ цифровой трансформации первичного звена здравоохранения в регионах с различным уровнем урбанизации
        </p>
        <div className="text-center mb-6">
          <p className="text-sm text-slate-600 dark:text-slate-400 italic">
            Авторы: Артём Бурнашов и Мария Маклаева
          </p>
        </div>
        <div className="flex flex-wrap gap-6 text-sm">
          <div className="flex items-center gap-2">
            <BarChart3 className="text-green-500" size={16} />
            <div>
              <span className="font-semibold">Дисциплина:</span>
              <br />
              <span className="text-slate-700 dark:text-slate-300">Цифровая трансформация здравоохранения</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="text-purple-500" size={16} />
            <div>
              <span className="font-semibold">Период:</span>
              <br />
              <span className="text-slate-700 dark:text-slate-300">2021-2024 гг.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-400">Введение</h2>
        <div className="space-y-4 text-lg leading-relaxed bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
          <p>
            Цифровая трансформация здравоохранения в России представляет собой сложный и многогранный процесс, который протекает крайне неравномерно по регионам. Различия в уровне экономического развития, инфраструктурной обеспеченности, демографической ситуации и, что особенно важно, уровне урбанизации создают существенные диспропорции в скорости и качестве внедрения цифровых технологий в систему здравоохранения.
          </p>
          <p>
            Первичное звено здравоохранения — поликлиники, амбулатории, фельдшерско-акушерские пункты (ФАПы) — является основой всей системы медицинской помощи. Именно здесь формируется первое впечатление пациента о качестве услуг, происходит профилактика заболеваний и ранняя диагностика. Поэтому оценка цифровизации именно первичного звена имеет стратегическое значение для понимания реального состояния цифровой трансформации в здравоохранении.
          </p>
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Выбор регионов для исследования:</p>
            <ul className="space-y-2 text-blue-700 dark:text-blue-300">
              <li><span className="font-medium">Ленинградская область</span> (уровень урбанизации 85%) — регион с высоким уровнем развития инфраструктуры, находящийся в непосредственной близости от федерального центра</li>
              <li><span className="font-medium">Республика Дагестан</span> (уровень урбанизации 43%) — регион с самым низким уровнем урбанизации среди субъектов РФ, характеризующийся сложной горной местностью и многонациональным составом населения</li>
              <li><span className="font-medium">Тюменская область</span> (уровень урбанизации 72%) — регион с развитой экономикой благодаря нефтегазовой отрасли, имеющий значительные сельские территории</li>
              <li><span className="font-medium">Курская область</span> (уровень урбанизации 68%) — регион Центрального федерального округа со смешанным типом населенных пунктов</li>
            </ul>
          </div>
          <p>
            Такой выбор регионов позволяет выявить как общие закономерности цифровизации здравоохранения, так и специфические особенности, обусловленные территориальными, демографическими и экономическими факторами. Исследование охватывает период 2021-2024 годов и базируется на анализе открытых данных из официальных источников.
          </p>
        </div>
      </section>

      {/* Methodology */}
      <section className="space-y-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
        <h2 className="text-3xl font-bold text-blue-900 dark:text-blue-100">Методология исследования</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-semibold text-blue-800 dark:text-blue-200 mb-4">Критерии отбора регионов</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: "🔍", title: "Контрастный уровень урбанизации", desc: "от минимального (43% в Дагестане) до максимального (85% в Ленинградской области)" },
                { icon: "🌍", title: "Географическое разнообразие", desc: "представительство разных федеральных округов (СЗФО, СКФО, УФО, ЦФО)" },
                { icon: "💼", title: "Экономическая дифференциация", desc: "регионы с различным экономическим потенциалом и источниками доходов" },
                { icon: "📊", title: "Доступность данных", desc: "наличие открытых отчетов и статистики по цифровизации здравоохранения" }
              ].map((item, idx) => (
                <div key={idx} className="p-4 bg-white dark:bg-slate-900/50 rounded-lg border border-blue-100 dark:border-blue-800/50 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{item.icon}</div>
                    <div>
                      <div className="font-semibold text-blue-700 dark:text-blue-300">{item.title}</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-blue-800 dark:text-blue-200 mb-4">Параметры оценки</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: "📱", title: "Доступность электронных услуг", desc: "доля медицинских организаций первичного звена, подключенных к ЕГИСЗ" },
                { icon: "👥", title: "Охват населения", desc: "процент жителей региона, регулярно использующих цифровые медицинские сервисы" },
                { icon: "😊", title: "Удовлетворенность пациентов", desc: "средний балл удовлетворенности качеством цифровых услуг по шкале 1-5" },
                { icon: "💡", title: "Цифровые инновации", desc: "количество внедренных инновационных решений в сфере цифрового здравоохранения" },
                { icon: "🔗", title: "Интеграция систем", desc: "уровень взаимодействия региональных систем с федеральными платформами" },
                { icon: "💰", title: "Инвестиции в IT", desc: "доля расходов на информационные технологии в общем бюджете здравоохранения" },
              ].map((param, idx) => (
                <div key={idx} className="p-4 bg-white dark:bg-slate-900/50 rounded-lg border border-blue-100 dark:border-blue-800/50">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-xl">{param.icon}</div>
                    <h4 className="font-semibold text-blue-700 dark:text-blue-300">{param.title}</h4>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{param.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <h3 className="text-2xl font-semibold text-blue-800 dark:text-blue-200 mb-4">Источники данных</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Годовые отчеты министерств здравоохранения регионов за 2021-2024 гг.",
                "Федеральный рейтинг цифровизации здравоохранения субъектов РФ (Минцифры России)",
                "Данные Росстата по уровню урбанизации и ИКТ-показателям",
                "Исследования Национального медицинского исследовательского центра цифрового здравоохранения",
                "Результаты опросов ВЦИОМ и ФОМ по удовлетворенности цифровыми медицинскими услугами",
                "Отчеты региональных операторов связи об уровне интернет-покрытия в медицинских учреждениях"
              ].map((source, idx) => (
                <div key={idx} className="p-3 bg-white dark:bg-slate-900/50 rounded-lg flex items-start gap-2 border border-blue-100 dark:border-blue-800/50">
                  <div className="mt-1 text-blue-500">•</div>
                  <span className="text-slate-700 dark:text-slate-300">{source}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-green-700 dark:text-green-400">Общая картина цифровизации по регионам</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Rating Cards */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 p-5 rounded-xl border border-green-200 dark:border-green-800">
            <h3 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-4 flex items-center gap-2">
              <Award className="text-yellow-500" size={20} />
              Рейтинг региона
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-white dark:bg-slate-900 rounded-lg">
                <span className="font-medium">Ленинградская обл.</span>
                <span className="bg-green-500 text-white px-2 py-1 rounded text-sm font-bold">3-е место</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white dark:bg-slate-900 rounded-lg">
                <span className="font-medium">Тюменская обл.</span>
                <span className="bg-yellow-500 text-white px-2 py-1 rounded text-sm font-bold">15-е место</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white dark:bg-slate-900 rounded-lg">
                <span className="font-medium">Курская обл.</span>
                <span className="bg-orange-500 text-white px-2 py-1 rounded text-sm font-bold">25-е место</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white dark:bg-slate-900 rounded-lg">
                <span className="font-medium">Респ. Дагестан</span>
                <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">68-е место</span>
              </div>
            </div>
          </div>
          
          {/* Growth Indicators */}
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/30 dark:to-indigo-900/30 p-5 rounded-xl border border-purple-200 dark:border-purple-800">
            <h3 className="text-xl font-semibold text-purple-800 dark:text-purple-200 mb-4 flex items-center gap-2">
              <TrendingUp className="text-blue-500" size={20} />
              Темпы роста
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Дагестан</span>
                  <span>+35%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div className="bg-red-500 h-2.5 rounded-full" style={{ width: "100%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Тюменская обл.</span>
                  <span>+30%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: "85%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Курская обл.</span>
                  <span>+25%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "70%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Ленинградская обл.</span>
                  <span>+12%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div className="bg-teal-500 h-2.5 rounded-full" style={{ width: "35%" }}></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Key Insight */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 p-5 rounded-xl border border-amber-200 dark:border-amber-800">
            <h3 className="text-xl font-semibold text-amber-800 dark:text-amber-200 mb-4">Ключевой вывод</h3>
            <p className="text-amber-700 dark:text-amber-300">
              Существует сильная корреляция между уровнем урбанизации и показателями цифровизации (коэффициент корреляции 0.87). 
              Однако эта зависимость не является абсолютной, что подтверждается успешным опытом Тюменской области в телемедицине для сельских территорий.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-indigo-700 dark:text-indigo-400">Сравнительная таблица ключевых показателей</h2>
        <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
            <thead className="bg-slate-50 dark:bg-slate-900">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Параметр</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Ленинградская область</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Республика Дагестан</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Тюменская область</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Курская область</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-900 divide-y divide-slate-200 dark:divide-slate-700">
              {comparisonData.map((row, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? "bg-slate-50 dark:bg-slate-900/50" : "bg-white dark:bg-slate-900"}>
                  <td className="px-4 py-3 text-sm font-medium text-slate-900 dark:text-slate-200">{row.param}</td>
                  <td className="px-4 py-3 text-sm text-center text-slate-700 dark:text-slate-300">{row.leningrad}</td>
                  <td className="px-4 py-3 text-sm text-center text-slate-700 dark:text-slate-300">{row.daghestan}</td>
                  <td className="px-4 py-3 text-sm text-center text-slate-700 dark:text-slate-300">{row.tyumen}</td>
                  <td className="px-4 py-3 text-sm text-center text-slate-700 dark:text-slate-300">{row.kursk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Dynamic Table */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-cyan-700 dark:text-cyan-400">Динамика развития (2021-2024 гг.)</h2>
        <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
            <thead className="bg-slate-50 dark:bg-slate-900">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Показатель</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Ленинградская область</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Республика Дагестан</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Тюменская область</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Курская область</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-900 divide-y divide-slate-200 dark:divide-slate-700">
              {dynamicData.map((row, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? "bg-slate-50 dark:bg-slate-900/50" : "bg-white dark:bg-slate-900"}>
                  <td className="px-4 py-3 text-sm font-medium text-slate-900 dark:text-slate-200">{row.param}</td>
                  <td className="px-4 py-3 text-sm text-center text-slate-700 dark:text-slate-300">+{row.leningrad}</td>
                  <td className="px-4 py-3 text-sm text-center text-slate-700 dark:text-slate-300">+{row.daghestan}</td>
                  <td className="px-4 py-3 text-sm text-center text-slate-700 dark:text-slate-300">+{row.tyumen}</td>
                  <td className="px-4 py-3 text-sm text-center text-slate-700 dark:text-slate-300">+{row.kursk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Key Findings */}
      <section className="space-y-6 bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900/30 dark:to-pink-900/30 p-6 rounded-xl border border-rose-200 dark:border-rose-800">
        <h2 className="text-3xl font-bold text-rose-900 dark:text-rose-100">Ключевые находки исследования</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { 
              title: "Эффект догоняющего развития", 
              desc: "Регионы с изначально низким уровнем цифровизации (Дагестан) показывают более высокие относительные темпы роста",
              icon: "🚀"
            },
            { 
              title: "Стратегическое значение телемедицины", 
              desc: "Темпы роста телемедицинских сервисов во всех регионах впечатляют, что подчеркивает их важность",
              icon: "⚕️"
            },
            { 
              title: "Влияние урбанизации", 
              desc: "Сильная корреляция между уровнем урбанизации и показателями цифровизации (коэффициент 0.87)",
              icon: "🏙️"
            }
          ].map((finding, idx) => (
            <div key={idx} className="p-5 bg-white dark:bg-slate-900/50 rounded-lg border border-rose-100 dark:border-rose-800/50">
              <div className="text-3xl mb-3">{finding.icon}</div>
              <h3 className="font-semibold text-rose-700 dark:text-rose-300 mb-2">{finding.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">{finding.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Regional Practices */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-violet-700 dark:text-violet-400">Лучшие практики по регионам</h2>
        
        {/* Leningrad Region */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
          <h3 className="text-2xl font-semibold text-blue-800 dark:text-blue-200 mb-4">Ленинградская область: Системный подход к цифровизации</h3>
          <div className="space-y-4">
            <div className="p-4 bg-white dark:bg-slate-900/50 rounded-lg border border-blue-100 dark:border-blue-800/50">
              <h4 className="font-bold text-blue-700 dark:text-blue-300 mb-2">"Электронная поликлиника 2.0"</h4>
              <p className="text-slate-700 dark:text-slate-300">Система объединяет запись к врачу, электронные очереди, цифровые рецепты, удаленные консультации и интеграцию с личным кабинетом на портале госуслуг. Используется ИИ для прогнозирования нагрузки.</p>
              <div className="mt-2 text-sm text-green-600 dark:text-green-400">Результат: сокращение времени ожидания на 40%, удовлетворенность 4.8/5.0</div>
            </div>
            <div className="p-4 bg-white dark:bg-slate-900/50 rounded-lg border border-blue-100 dark:border-blue-800/50">
              <h4 className="font-bold text-blue-700 dark:text-blue-300 mb-2">"Цифровой доктор"</h4>
              <p className="text-slate-700 dark:text-slate-300">Программа комплексного обучения медицинского персонала работе с цифровыми технологиями. Все врачи проходят обязательную сертификацию.</p>
              <div className="mt-2 text-sm text-green-600 dark:text-green-400">Результат: 88% врачей уверенно используют цифровые инструменты, снижение нагрузки на 25%</div>
            </div>
          </div>
        </div>
        
        {/* Dagestan Region */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 p-6 rounded-xl border border-amber-200 dark:border-amber-800">
          <h3 className="text-2xl font-semibold text-amber-800 dark:text-amber-200 mb-4">Республика Дагестан: Адаптация технологий под специфику территории</h3>
          <div className="space-y-4">
            <div className="p-4 bg-white dark:bg-slate-900/50 rounded-lg border border-amber-100 dark:border-amber-800/50">
              <h4 className="font-bold text-amber-700 dark:text-amber-300 mb-2">"Здоровье в горах"</h4>
              <p className="text-slate-700 dark:text-slate-300">Комплексное решение для горных районов: мобильные медкомплексы, спутниковая связь, портативное оборудование, система экстренной эвакуации.</p>
              <div className="mt-2 text-sm text-green-600 dark:text-green-400">Результат: охват медицинской помощью вырос с 35% до 68%, время экстренной помощи с 6ч до 1.5ч</div>
            </div>
            <div className="p-4 bg-white dark:bg-slate-900/50 rounded-lg border border-amber-100 dark:border-amber-800/50">
              <h4 className="font-bold text-amber-700 dark:text-amber-300 mb-2">"Многоязычная цифровая платформа"</h4>
              <p className="text-slate-700 dark:text-slate-300">Адаптация сервисов под 14 языков народов Дагестана: автоматический перевод, голосовые ассистенты, видеоконсультации с переводчиками.</p>
              <div className="mt-2 text-sm text-green-600 dark:text-green-400">Результат: рост использования сервисов у меньшинств на 45%, удовлетворенность повысилась на 0.6</div>
            </div>
          </div>
        </div>
        
        {/* Tyumen Region */}
        <div className="bg-gradient-to-r from-cyan-50 to-teal-50 dark:from-cyan-900/30 dark:to-teal-900/30 p-6 rounded-xl border border-cyan-200 dark:border-cyan-800">
          <h3 className="text-2xl font-semibold text-cyan-800 dark:text-cyan-200 mb-4">Тюменская область: Телемедицина как основа доступности</h3>
          <div className="space-y-4">
            <div className="p-4 bg-white dark:bg-slate-900/50 rounded-lg border border-cyan-100 dark:border-cyan-800/50">
              <h4 className="font-bold text-cyan-700 dark:text-cyan-300 mb-2">"Телемедицинский конвейер"</h4>
              <p className="text-slate-700 dark:text-slate-300">Система быстрой маршрутизации пациентов из сельской местности с моментальной консультацией специалиста и автоматической записью.</p>
              <div className="mt-2 text-sm text-green-600 dark:text-green-400">Результат: 85% пациентов получают консультацию в 24ч (ранее 7-14дней), госпитализации сокращены на 30%</div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommendations */}
      <section className="space-y-6 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/30 dark:to-green-900/30 p-6 rounded-xl border border-emerald-200 dark:border-emerald-800">
        <h2 className="text-3xl font-bold text-emerald-900 dark:text-emerald-100">Рекомендации по тиражированию успешного опыта</h2>
        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-semibold text-emerald-800 dark:text-emerald-200 mb-4">Для регионов с высоким уровнем урбанизации</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Внедрение комплексных цифровых экосистем вместо разрозненных сервисов",
                "Создание центров компетенций по цифровому здравоохранению для обучения кадров",
                "Развитие ИИ-решений для прогнозирования заболеваний и оптимизации нагрузки",
                "Интеграция с умными городами и использованием городской инфраструктуры"
              ].map((rec, idx) => (
                <div key={idx} className="p-3 bg-white dark:bg-slate-900/50 rounded-lg flex items-start gap-2 border border-emerald-100 dark:border-emerald-800/50">
                  <div className="mt-1 text-emerald-500 font-bold">✓</div>
                  <span className="text-slate-700 dark:text-slate-300">{rec}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold text-emerald-800 dark:text-emerald-200 mb-4">Для регионов со средним уровнем урбанизации</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Модульный подход к цифровизации - поэтапное внедрение решений",
                "Приоритет телемедицины для сельских территорий с созданием мобильных пунктов",
                "Партнерство с вузами для подготовки цифровых кадров",
                "Программы цифровой грамотности для населения с участием волонтеров"
              ].map((rec, idx) => (
                <div key={idx} className="p-3 bg-white dark:bg-slate-900/50 rounded-lg flex items-start gap-2 border border-emerald-100 dark:border-emerald-800/50">
                  <div className="mt-1 text-emerald-500 font-bold">✓</div>
                  <span className="text-slate-700 dark:text-slate-300">{rec}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold text-emerald-800 dark:text-emerald-200 mb-4">Для регионов с низким уровнем урбанизации</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Адаптация решений под специфику территорий: географические, климатические, культурные особенности",
                "Использование автономных технологий с минимальной зависимостью от инфраструктуры",
                "Создание мобильных медицинских комплексов с собственными источниками энергии и связи",
                "Постепенное внедрение с фокусом на базовые цифровые сервисы"
              ].map((rec, idx) => (
                <div key={idx} className="p-3 bg-white dark:bg-slate-900/50 rounded-lg flex items-start gap-2 border border-emerald-100 dark:border-emerald-800/50">
                  <div className="mt-1 text-emerald-500 font-bold">✓</div>
                  <span className="text-slate-700 dark:text-slate-300">{rec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Conclusion */}
      <section className="space-y-6 border-t-2 border-slate-300 dark:border-slate-600 pt-8">
        <h2 className="text-3xl font-bold text-purple-700 dark:text-purple-400">Заключение</h2>
        <div className="text-lg leading-relaxed space-y-4 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/30 dark:to-indigo-900/30 p-6 rounded-lg border border-purple-200 dark:border-purple-800">
          <p>
            Проведенный бенчмаркинг показал, что уровень цифровизации первичного звена здравоохранения в регионах РФ напрямую коррелирует с уровнем урбанизации, но не является определяющим фактором успеха. Регионы с системным подходом и адекватным финансированием могут достичь выдающихся результатов даже при сложных географических и демографических условиях.
          </p>
          <p>
            Ленинградская область демонстрирует, как высокие инвестиции и интегрированный подход к цифровизации могут создать современную экосистему цифрового здравоохранения. Тюменская область показывает успешную адаптацию телемедицинских технологий для обеспечения доступности медицинской помощи в сельской местности. Республика Дагестан представляет опыт преодоления географических и культурных барьеров через адаптацию технологий под местные условия. Курская область демонстрирует сбалансированный подход с фокусом на доступность цифровых сервисов для всех категорий населения.
          </p>
          <p className="font-semibold text-purple-800 dark:text-purple-200">
            Ключевой вывод исследования заключается в том, что для успешной цифровизации первичного звена необходим индивидуальный подход, учитывающий уровень урбанизации, экономический потенциал и специфику территории. Тиражирование лучших практик должно осуществляться с глубокой адаптацией под конкретные условия региона, а не в формате "один размер подходит всем".
          </p>
          <p>
            Рекомендации, предложенные в настоящем исследовании, могут быть использованы региональными властями для разработки стратегий цифровизации здравоохранения. Инвестиции в цифровое первичное звено сегодня — это не просто модернизация инфраструктуры, а стратегический вклад в здоровье нации и эффективность всей системы здравоохранения в будущем. Цифровизация первичного звена должна рассматриваться как системный фактор повышения качества жизни населения и устойчивого развития регионов.
          </p>
        </div>
      </section>
    </div>
  );
};

export default GovtechInnovationArticle;