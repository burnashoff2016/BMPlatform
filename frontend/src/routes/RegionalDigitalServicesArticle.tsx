import React, { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from "recharts";
import { Button } from "../components/ui/button";
import { Download, Printer, ChevronDown, ChevronUp, MapPin, Scale, TrendingUp, Users, Award, Target, Brain, Globe, Building, Clock } from "lucide-react";
import { api } from "../lib/api";

const COLORS = ["#3b82f6", "#10b981", "#8b5cf6"];
const REGION_COLORS = {
  "Санкт-Петербург": "#3b82f6",
  "Свердловская область": "#10b981", 
  "Чеченская Республика": "#8b5cf6"
};

const RegionalDigitalServicesArticle: React.FC = () => {
  const articleRef = useRef<HTMLDivElement>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    introduction: true,
    stPetersburg: true,
    sverdlovsk: true,
    chechen: true,
    comparison: true,
    problems: true,
    conclusion: true
  });

  const { data: regionalData } = useQuery({
    queryKey: ["regional-digital-services-data"],
    queryFn: async () => {
      const response = await api.get("/data/regional-digital-services");
      return response.data;
    },
    retry: false,
  });

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  // Sample data for visualizations
  const digitalMaturityData = [
    { region: "Санкт-Петербург", maturity: 85, color: "#3b82f6" },
    { region: "Свердловская область", maturity: 72, color: "#10b981" },
    { region: "Чеченская Республика", maturity: 58, color: "#8b5cf6" },
  ];

  const serviceCoverageData = [
    { region: "Санкт-Петербург", coverage: 95, services: 120 },
    { region: "Свердловская область", coverage: 100, services: 105 },
    { region: "Чеченская Республика", coverage: 65, services: 75 },
  ];

  const institutionalData = [
    { region: "Санкт-Петербург", institution: "Комитет по ИТ", strength: 90 },
    { region: "Свердlovская область", institution: "Минцифры", strength: 95 },
    { region: "Чеченская Республика", institution: "Минтранс и связь", strength: 70 },
  ];

  const regulatoryData = [
    { region: "Санкт-Петербург", laws: 12, digitalServices: 85 },
    { region: "Свердlovская область", laws: 18, digitalServices: 100 },
    { region: "Чеченская Республика", laws: 7, digitalServices: 65 },
  ];

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
          filename: "comparative-analysis-digital-services-regulation.pdf",
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

  return (
    <div ref={articleRef} className="space-y-10 leading-relaxed text-slate-800 dark:text-slate-100">
      {/* Кнопки действий */}
      <div className="flex flex-wrap gap-3 sticky top-0 bg-white dark:bg-slate-950 p-4 rounded-lg border border-slate-200 dark:border-slate-700 z-10 print:hidden">
        <Button onClick={handlePrint} variant="outline" className="flex items-center gap-2">
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
          <span className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-semibold rounded-full">
            Сравнительный анализ №7
          </span>
        </div>
        <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
          Сравнительно-правовой анализ регулирования цифровых услуг в Санкт-Петербурге, Свердловской области и Чеченской Республике
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 mb-6">
          Как регионы России подходят к цифровизации государственных и муниципальных услуг
        </p>
        <div className="flex flex-wrap gap-4 text-sm">
          <div>
            <span className="font-semibold">Авторы:</span>
            <br />
            <span className="text-slate-700 dark:text-slate-300">Артём Бурнашов и Мария Маклаева</span>
          </div>
          <div>
            <span className="font-semibold">Дисциплина:</span>
            <br />
            <span className="text-slate-700 dark:text-slate-300">Информационно-аналитические технологии</span>
          </div>
          <div>
            <span className="font-semibold">Дата:</span>
            <br />
            <span className="text-slate-700 dark:text-slate-300">13 декабря 2025 г.</span>
          </div>
        </div>
      </section>

      {/* Введение */}
      <section className="space-y-6">
        <div 
          className="cursor-pointer"
          onClick={() => toggleSection('introduction')}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">Введение</h2>
            {expandedSections.introduction ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </div>
        </div>
        
        {expandedSections.introduction && (
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              Цифровая трансформация региональных систем управления и предоставления услуг является одним из ключевых направлений развития современной России. В данном анализе рассматриваются особенности правового регулирования цифровых услуг в трех субъектах РФ: Санкт-Петербурге, Свердловской области и Чеченской Республике. Сравнительный анализ позволяет выявить как общие тенденции, так и региональные особенности в подходах к цифровизации государственных и муниципальных услуг.
            </p>
            <p>
              Все три региона находятся в разных стадиях цифровой зрелости, имеют различный уровень развития инфраструктуры, нормативно-правовой базы и институциональных механизмов. Это делает сравнительный анализ особенно ценным для понимания факторов, способствующих или препятствующих эффективной цифровизации.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-2">Санкт-Петербург</div>
                <p className="text-sm">Инновационный подход, амбициозные цели</p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <div className="text-2xl font-bold text-green-700 dark:text-green-300 mb-2">Свердловская область</div>
                <p className="text-sm">Системный подход, четкие показатели</p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                <div className="text-2xl font-bold text-purple-700 dark:text-purple-300 mb-2">Чеченская Республика</div>
                <p className="text-sm">Постепенное развитие, учет специфики</p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Санкт-Петербург */}
      <section className="space-y-6">
        <div 
          className="cursor-pointer"
          onClick={() => toggleSection('stPetersburg')}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <MapPin className="text-blue-500" />
              Санкт-Петербург: инновационный подход к цифровизации
            </h2>
            {expandedSections.stPetersburg ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </div>
        </div>
        
        {expandedSections.stPetersburg && (
          <div className="space-y-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
              <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-4">Нормативно-правовая база</h3>
              <div className="space-y-4 text-lg">
                <p>
                  Санкт-Петербург демонстрирует системный подход к созданию правовых основ цифровых услуг. Правительство города приняло постановление от 30 марта 2022 года № 265 о государственной информационной системе "Цифровые сервисы на потребительском рынке Санкт-Петербурга", что стало важным шагом в цифровизации потребительского рынка.
                </p>
                <p>
                  В 2025 году был принят Закон Санкт-Петербурга от 18 июня 2025 г. № 387-72, который расширил перечень обладателей информации, содержащейся в государственных информационных системах, что способствует более эффективному взаимодействию между ведомствами.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 p-6 rounded-xl border-2 border-blue-300 dark:border-blue-700">
                <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
                  <Target className="text-blue-600" />
                  Стратегические цели
                </h3>
                <ul className="space-y-3 text-lg">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>К 2024 году планировалось перевести в цифровой формат 95% государственных услуг</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Завершение первого этапа цифровой трансформации с охватом всех сфер деятельности</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Фокус на внедрении ИИ и элементов роботехники</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 p-6 rounded-xl border-2 border-blue-300 dark:border-blue-700">
                <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
                  <Award className="text-blue-600" />
                  Достижения
                </h3>
                <ul className="space-y-3 text-lg">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Модернизация подсистем Единой системы госуслуг</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Активное развитие ИИ-решений</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Участие в федеральных цифровых инициативах</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
              <h3 className="font-bold text-lg mb-4">Институциональные особенности</h3>
              <p className="text-lg">
                Комитет по информатизации и связи активно развивает цифровые решения, модернизируя подсистемы Единой системы госуслуг Санкт-Петербурга. Санкт-Петербург отличается инновационным подходом и амбициозными целями. Регион активно внедряет передовые технологии, включая искусственный интеллект и роботехнику, что соответствует статусу федерального города и научного центра.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Свердловская область */}
      <section className="space-y-6">
        <div 
          className="cursor-pointer"
          onClick={() => toggleSection('sverdlovsk')}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <MapPin className="text-green-500" />
              Свердловская область: системный подход к цифровой трансформации
            </h2>
            {expandedSections.sverdlovsk ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </div>
        </div>
        
        {expandedSections.sverdlovsk && (
          <div className="space-y-6">
            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800">
              <h3 className="text-2xl font-bold text-green-900 dark:text-green-100 mb-4">Институциональные основы</h3>
              <div className="space-y-4 text-lg">
                <p>
                  Свердловская область создала специализированное ведомство – Министерство цифрового развития и связи, которое координирует процессы цифровизации в регионе. Это свидетельствует о системном подходе к управлению цифровыми преобразованиями.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 p-6 rounded-xl border-2 border-green-300 dark:border-green-700">
                <h3 className="text-2xl font-bold text-green-900 dark:text-green-100 mb-4 flex items-center gap-2">
                  <Scale className="text-green-600" />
                  Нормативное регулирование
                </h3>
                <ul className="space-y-3 text-lg">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Закон Свердловской области от 20.10.2011 № 94-ОЗ "О государственных информационных системах"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Постановление Правительства от 27 декабря 2022 года № 925-ПП о ГИС "Единое цифровое..."</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/30 dark:to-teal-900/30 p-6 rounded-xl border-2 border-green-300 dark:border-green-700">
                <h3 className="text-2xl font-bold text-green-900 dark:text-green-100 mb-4 flex items-center gap-2">
                  <TrendingUp className="text-green-600" />
                  Конкретные достижения
                </h3>
                <ul className="space-y-3 text-lg">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>100% массовых социально значимых услуг в электронном формате к 2024 году</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Проект региональной ГИС занял 1 место во II Национальной премии</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
              <h3 className="font-bold text-lg mb-4">Институциональные особенности</h3>
              <p className="text-lg">
                Свердловская область демонстрирует системный подход к цифровой трансформации с четкими целевыми показателями и развитой нормативной базой. Регион показывает высокие результаты, подтвержденные победами в национальных конкурсах, что свидетельствует о зрелой цифровой экосистеме.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Чеченская Республика */}
      <section className="space-y-6">
        <div 
          className="cursor-pointer"
          onClick={() => toggleSection('chechen')}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <MapPin className="text-purple-500" />
              Чеченская Республика: развитие цифровых услуг в условиях специфики региона
            </h2>
            {expandedSections.chechen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </div>
        </div>
        
        {expandedSections.chechen && (
          <div className="space-y-6">
            <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-xl border border-purple-200 dark:border-purple-800">
              <h3 className="text-2xl font-bold text-purple-900 dark:text-purple-100 mb-4">Особенности регулирования</h3>
              <div className="space-y-4 text-lg">
                <p>
                  Чеченская Республика развивает цифровые услуги с учетом своих региональных особенностей. В республике активно внедряется сервис "Цифровой МФЦ", который позволяет подавать заявления в электронном виде, осуществлять онлайн-запись в МФЦ для сокращения времени ожидания и получать информацию о статусе услуги.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/30 dark:to-indigo-900/30 p-6 rounded-xl border-2 border-purple-300 dark:border-purple-700">
                <h3 className="text-2xl font-bold text-purple-900 dark:text-purple-100 mb-4 flex items-center gap-2">
                  <Users className="text-purple-600" />
                  Доступность электронных услуг
                </h3>
                <ul className="space-y-3 text-lg">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>"Электронная приемная" на портале государственных услуг</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>Онлайн-запись в МФЦ</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/30 dark:to-violet-900/30 p-6 rounded-xl border-2 border-purple-300 dark:border-purple-700">
                <h3 className="text-2xl font-bold text-purple-900 dark:text-purple-100 mb-4 flex items-center gap-2">
                  <Scale className="text-purple-600" />
                  Нормативно-правовое развитие
                </h3>
                <ul className="space-y-3 text-lg">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>Закон ЧР от 24 марта 2025 года № 9-РЗ</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>Закон ЧР от 19 ноября 2025 г. № 46-РЗ</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
              <h3 className="font-bold text-lg mb-4">Региональные особенности</h3>
              <p className="text-lg">
                Чеченская Республика активно участвует в федеральных цифровых проектах, что способствует развитию электронных услуг в регионе. Республика развивает цифровые услуги с учетом специфики региона и уровня цифровой зрелости. Активно внедряются базовые цифровые сервисы, такие как электронная запись в МФЦ, и участвует в федеральных проектах, что способствует постепенному повышению доступности цифровых услуг для населения.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Сравнительный анализ */}
      <section className="space-y-6">
        <div 
          className="cursor-pointer"
          onClick={() => toggleSection('comparison')}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">4. Сравнительный анализ и выводы</h2>
            {expandedSections.comparison ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </div>
        </div>
        
        {expandedSections.comparison && (
          <div className="space-y-6">
            <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-xl border border-amber-200 dark:border-amber-800">
              <h3 className="text-2xl font-bold text-amber-900 dark:text-amber-100 mb-4">Общие тенденции</h3>
              <div className="space-y-4 text-lg">
                <p>Все три региона демонстрируют активное развитие цифровых услуг, при этом можно выделить общие тенденции:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Цифровизация массовых услуг:</strong> Все регионы ставят задачу перевода основных социально значимых услуг в электронный формат. Санкт-Петербург планирует достичь 95% цифровизации к 2024 году, Свердловская область – 100%, Чеченская Республика также активно развивает это направление.</li>
                  <li><strong>Создание ГИС:</strong> Все регионы активно развивают государственные информационные системы: Санкт-Петербург имеет ГИС "Цифровые сервисы на потребительском рынке", Свердловская область – систему "Единое цифровое...", Чеченская Республика внедряет цифровые сервисы через МФЦ.</li>
                  <li><strong>Институциональное обеспечение:</strong> Регионы создают специализированные органы управления: в Свердловской области действует Министерство цифрового развития и связи, в Санкт-Петербурге – Комитет по информатизации и связи, в Чеченской Республике – Министерство транспорта и связи.</li>
                </ul>
              </div>
            </div>

            {/* Визуализация */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
                <h3 className="font-bold text-lg mb-4">Уровень цифровой зрелости</h3>
                <div style={{ width: '100%', height: 250 }}>
                  <ResponsiveContainer>
                    <BarChart data={digitalMaturityData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="region" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip 
                        formatter={(value) => [`${value}%`, "Уровень зрелости"]}
                        labelFormatter={(label) => `Регион: ${label}`}
                      />
                      <Bar dataKey="maturity">
                        {digitalMaturityData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
                <h3 className="font-bold text-lg mb-4">Охват цифровых услуг</h3>
                <div style={{ width: '100%', height: 250 }}>
                  <ResponsiveContainer>
                    <BarChart data={serviceCoverageData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="region" />
                      <YAxis domain={[0, 120]} />
                      <Tooltip 
                        formatter={(value) => [`${value}%`, "Охват"]}
                        labelFormatter={(label) => `Регион: ${label}`}
                      />
                      <Bar dataKey="coverage">
                        {digitalMaturityData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
                <h3 className="font-bold text-lg mb-4">Институциональное обеспечение</h3>
                <div style={{ width: '100%', height: 250 }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={institutionalData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={(props) => `${props.payload.region}: ${props.payload.strength}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="strength"
                      >
                        {institutionalData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={digitalMaturityData[index].color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, "Сила института"]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-xl border-2 border-blue-300 dark:border-blue-700">
                <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-3">Санкт-Петербург</h3>
                <p className="text-lg">Отличается инновационным подходом и амбициозными целями. Регион активно внедряет передовые технологии, включая искусственный интеллект и роботехнику, что соответствует статусу федерального города и научного центра.</p>
              </div>

              <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl border-2 border-green-300 dark:border-green-700">
                <h3 className="text-xl font-bold text-green-900 dark:text-green-100 mb-3">Свердловская область</h3>
                <p className="text-lg">Демонстрирует системный подход к цифровой трансформации с четкими целевыми показателями и высокими достижениями. Регион показывает высокие результаты, подтвержденные победами в национальных конкурсах.</p>
              </div>

              <div className="p-6 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/30 dark:to-violet-900/30 rounded-xl border-2 border-purple-300 dark:border-purple-700">
                <h3 className="text-xl font-bold text-purple-900 dark:text-purple-100 mb-3">Чеченская Республика</h3>
                <p className="text-lg">Развивает цифровые услуги с учетом специфики региона и уровня цифровой зрелости. Активно внедряются базовые цифровые сервисы с постепенным повышением доступности услуг для населения.</p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Проблемы и перспективы */}
      <section className="space-y-6">
        <div 
          className="cursor-pointer"
          onClick={() => toggleSection('problems')}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">Проблемы и перспективы</h2>
            {expandedSections.problems ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </div>
        </div>
        
        {expandedSections.problems && (
          <div className="space-y-6">
            <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-xl border border-red-200 dark:border-red-800">
              <h3 className="text-2xl font-bold text-red-900 dark:text-red-100 mb-4">Общие проблемы регионов</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700">
                  <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-2">1. Повышение цифровой грамотности</h4>
                  <p>Необходимость повышения цифровой грамотности населения, особенно в сельских и отдаленных районах, остается одной из ключевых проблем.</p>
                </div>
                <div className="p-4 bg-white dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700">
                  <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-2">2. Информационная безопасность</h4>
                  <p>Обеспечение информационной безопасности при предоставлении цифровых услуг требует постоянного внимания и инвестиций.</p>
                </div>
                <div className="p-4 bg-white dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700">
                  <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-2">3. Интеграция систем</h4>
                  <p>Интеграция региональных систем с федеральными платформами остается сложной задачей.</p>
                </div>
                <div className="p-4 bg-white dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700">
                  <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-2">4. Финансирование</h4>
                  <p>Недостаточное финансирование цифровой инфраструктуры и программ цифровизации.</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800">
              <h3 className="text-2xl font-bold text-green-900 dark:text-green-100 mb-4">Перспективы развития</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700">
                  <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-2">1. Расширение перечня услуг</h4>
                  <p>Расширение перечня услуг, предоставляемых в полностью электронном виде, за счет интеграции с другими государственными и муниципальными системами.</p>
                </div>
                <div className="p-4 bg-white dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700">
                  <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-2">2. ИИ для персонализации</h4>
                  <p>Внедрение искусственного интеллекта для персонализации услуг и автоматизации процессов подачи и обработки заявок граждан.</p>
                </div>
                <div className="p-4 bg-white dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700">
                  <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-2">3. Межведомственное взаимодействие</h4>
                  <p>Развитие межведомственного взаимодействия на цифровой основе для сокращения сроков и упрощения процедур.</p>
                </div>
                <div className="p-4 bg-white dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700">
                  <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-2">4. Цифровая инфраструктура</h4>
                  <p>Развитие цифровой инфраструктуры в сельских и отдаленных районах для обеспечения равного доступа к цифровым услугам.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Географическое сравнение с картой */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold flex items-center gap-3">
          <MapPin className="text-indigo-500" />
          Географическое сравнение уровней цифровизации
        </h2>
        
        <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
          <h3 className="font-bold text-lg mb-4">Интерактивная карта регионов по уровню цифровой зрелости</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {regionalData?.regions?.map((region: any, idx: number) => (
              <div 
                key={idx} 
                className="p-4 rounded-lg border-2 transition-all hover:shadow-lg"
                style={{
                  backgroundColor: 
                    region.maturity_index > 75 
                      ? "#dcfce7" 
                      : region.maturity_index > 60 
                      ? "#fef3c7" 
                      : "#fee2e2",
                  borderColor:
                    region.maturity_index > 75 
                      ? "#16a34a" 
                      : region.maturity_index > 60 
                      ? "#ca8a04" 
                      : "#dc2626",
                }}
              >
                <div className="font-semibold text-sm">{region.name}</div>
                <div className="text-2xl font-bold mt-1">
                  {region.maturity_index > 75 ? "✅" : region.maturity_index > 60 ? "⚡" : "⚠️"}
                </div>
                <div className="text-xs text-slate-600 mt-1">Индекс: {region.maturity_index}</div>
                <div className="text-xs text-slate-600">Услуг: {region.services_count}</div>
              </div>
            ))}
          </div>
          
          {/* Заглушка для карты - в реальном приложении здесь будет интерактивная карта */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-8 rounded-xl border-2 border-dashed border-blue-300 dark:border-blue-700 min-h-[400px] flex flex-col items-center justify-center text-center">
            <MapPin className="h-12 w-12 text-blue-500 mb-4" />
            <h4 className="text-xl font-semibold text-blue-900 dark:text-blue-200 mb-2">Интерактивная карта уровней цифровизации</h4>
            <p className="text-blue-700 dark:text-blue-300 mb-4">
              Визуализация сравнения уровней цифровой зрелости Санкт-Петербурга, Свердловской области и Чеченской Республики
            </p>
            <div className="text-sm text-blue-600 dark:text-blue-400 text-left w-full max-w-md">
              <p className="mb-2"><strong>Санкт-Петербург:</strong> Инновационный подход, амбициозные цели (95% цифровизации)</p>
              <p className="mb-2"><strong>Свердловская область:</strong> Системный подход с четкими показателями (100% массовых услуг онлайн)</p>
              <p><strong>Чеченская Республика:</strong> Постепенное развитие с учетом региональной специфики</p>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-800 rounded text-xs text-slate-600 dark:text-slate-400">
            <p><strong>Легенда:</strong> ✅ Высокий уровень (&gt;75) • ⚡ Средний уровень (60-75) • ⚠️ Низкий уровень (&lt;60)</p>
          </div>
        </div>
      </section>

      {/* Заключение */}
      <section className="space-y-6">
        <div 
          className="cursor-pointer"
          onClick={() => toggleSection('conclusion')}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">Заключение</h2>
            {expandedSections.conclusion ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </div>
        </div>
        
        {expandedSections.conclusion && (
          <div className="space-y-6 border-t-2 border-slate-200 dark:border-slate-700 pt-8">
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-700">
              <p className="text-lg leading-relaxed space-y-4">
                <span className="font-bold">Сравнительно-правовой анализ регулирования цифровых услуг в Санкт-Петербурге, Свердловской области и Чеченской Республике показывает, что все регионы активно развивают цифровую трансформацию, но с разной степенью зрелости и различными подходами.</span>
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h3 className="font-bold text-blue-900 dark:text-blue-200 mb-2">Санкт-Петербург</h3>
                  <p className="text-sm">Демонстрирует инновационный подход с акцентом на передовые технологии</p>
                </div>
                
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <h3 className="font-bold text-green-900 dark:text-green-200 mb-2">Свердловская область</h3>
                  <p className="text-sm">Показывает системный подход с четкими целевыми показателями и высокими достижениями</p>
                </div>
                
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                  <h3 className="font-bold text-purple-900 dark:text-purple-200 mb-2">Чеченская Республика</h3>
                  <p className="text-sm">Постепенно развивает базовые цифровые сервисы с учетом региональной специфики</p>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
                <h3 className="font-bold text-lg mb-3">Рекомендации по улучшению цифровизации</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-slate-700 dark:text-slate-300">•</span>
                    <span>Совершенствование нормативной базы в сфере цифровых услуг</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-slate-700 dark:text-slate-300">•</span>
                    <span>Повышение цифровой грамотности населения</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-slate-700 dark:text-slate-300">•</span>
                    <span>Эффективное распределение финансовых ресурсов на цифровую трансформацию</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-slate-700 dark:text-slate-300">•</span>
                    <span>Обмен успешным опытом между регионами</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-slate-700 dark:text-slate-300">•</span>
                    <span>Развитие межведомственного взаимодействия на цифровой основе</span>
                  </li>
                </ul>
              </div>
              
              <div className="mt-6 text-lg italic">
                <p>
                  Дальнейшее развитие цифровых услуг в регионах будет зависеть от совершенствования нормативной базы, повышения цифровой грамотности населения и эффективного распределения финансовых ресурсов на цифровую трансформацию. Успешный опыт Свердловской области и Санкт-Петербурга может быть полезен для других регионов, включая Чеченскую Республику, в реализации программ цифровизации.
                </p>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default RegionalDigitalServicesArticle;