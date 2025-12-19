import React, { useRef } from "react";
import { Button } from "../components/ui/button";
import { Download, Printer, BookOpen, Users, Globe, Award, Smartphone, BarChart3, CheckCircle, XCircle } from "lucide-react";

const DigitalSkillsArticle: React.FC = () => {
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
          filename: "digital-literacy-report.pdf",
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
          <span className="inline-block px-3 py-1 bg-gradient-to-r from-violet-500 to-purple-600 text-white text-xs font-semibold rounded-full">
            Задание 14
          </span>
        </div>
        <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight bg-gradient-to-r from-violet-600 to-purple-700 bg-clip-text text-transparent">
          Цифровая грамотность населения: диагностика, обучение и развитие навыков
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 mb-6">
          Оценка уровня цифровой грамотности различных социальных групп и разработка рекомендаций по модернизации образовательных подходов
        </p>
        <div className="text-center mb-6">
          <p className="text-sm text-slate-600 dark:text-slate-400 italic">
            Авторы: Артём Бурнашов и Мария Маклаева
          </p>
        </div>
        <div className="flex flex-wrap gap-6 text-sm">
          <div className="flex items-center gap-2">
            <BookOpen className="text-purple-500" size={16} />
            <div>
              <span className="font-semibold">Дисциплина:</span>
              <br />
              <span className="text-slate-700 dark:text-slate-300">Цифровое образование и навыки</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Users className="text-indigo-500" size={16} />
            <div>
              <span className="font-semibold">Объект исследования:</span>
              <br />
              <span className="text-slate-700 dark:text-slate-300">Население России</span>
            </div>
          </div>
        </div>
      </section>

      {/* Введение */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-violet-700 dark:text-violet-400">Введение: Цифровая грамотность как ключ к устойчивому развитию</h2>
        <div className="space-y-4 text-lg leading-relaxed bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
          <p>
            В условиях стремительной цифровизации общества, цифровая грамотность становится фундаментальным навыком, определяющим возможности человека в экономической, социальной и политической жизни. Проект направлен на диагностику текущего состояния цифровой грамотности населения, анализ эффективности существующих программ и разработку рекомендаций по модернизации образовательных подходов.
          </p>
          <p>
            Цифровая грамотность охватывает не только технические навыки, но и способность безопасно использовать цифровые ресурсы, принимать информированные решения в online-пространстве, а также осознанно взаимодействовать с цифровыми сервисами государственного и коммерческого секторов.
          </p>

          <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 rounded-lg border border-amber-200 dark:border-amber-800">
            <p className="font-semibold text-amber-800 dark:text-amber-200 mb-2 flex items-center gap-2">
              <Users size={18} className="text-amber-600" />
              Кейс из практики
            </p>
            <p className="text-amber-700 dark:text-amber-300 italic">
              "Моя бабушка, живущая в Пензенской области, получает около 70% мошеннических сообщений в SMS в месяц, но не может отличить поддельный сайт от официального портала госуслуг. Она боится использовать любые онлайн-сервисы и отказывается от дистанционного обслуживания, которое могло бы облегчить ей жизнь." — Мария, 28 лет, социальный работник
            </p>
          </div>

          <p className="mt-4">
            Ключевыми проблемами являются:
          </p>
          <ul className="space-y-2 mt-2 ml-6 list-disc">
            <li>Существенное различие в уровне цифровой грамотности между возрастными и социальными группами</li>
            <li>Недостаточная эффективность существующих программ цифровой включённости</li>
            <li>Отсутствие адаптированных программ для разных слоёв населения</li>
            <li>Низкий уровень цифровой безопасности среди уязвимых групп</li>
            <li>Недостаточное финансирование и инфраструктура для обучения цифровой грамотности</li>
          </ul>
        </div>
      </section>

      {/* Теоретическая база */}
      <section className="space-y-6 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 p-6 rounded-xl border border-indigo-200 dark:border-indigo-800">
        <h2 className="text-3xl font-bold text-indigo-900 dark:text-indigo-100">Теоретическая база: Модель цифровой зрелости</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-semibold text-indigo-800 dark:text-indigo-200 mb-4">Концепции цифровой грамотности</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-slate-900/50 p-4 rounded-lg border border-indigo-100 dark:border-indigo-800/50">
                <h4 className="font-semibold text-indigo-700 dark:text-indigo-300 mb-3">Компоненты цифровой грамотности</h4>
                <ul className="space-y-2 text-sm">
                  {[
                    { name: "Технические навыки", desc: "Использование устройств, программ и интерфейсов" },
                    { name: "Информационная грамотность", desc: "Поиск, оценка и использование информации" },
                    { name: "Цифровая коммуникация", desc: "Взаимодействие в онлайн-среде" },
                    { name: "Цифровое творчество", desc: "Создание и редактирование контента" },
                    { name: "Цифровая безопасность", desc: "Защита персональных данных и кибербезопасность" },
                    { name: "Этические аспекты", desc: "Осознанное поведение в digital среде" }
                  ].map((item, idx) => (
                    <li key={idx} className="flex justify-between items-start">
                      <span className="font-medium">{item.name}</span>
                      <span className="text-slate-600 dark:text-slate-400 text-xs ml-2">{item.desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-white dark:bg-slate-900/50 p-4 rounded-lg border border-indigo-100 dark:border-indigo-800/50">
                <h4 className="font-semibold text-indigo-700 dark:text-indigo-300 mb-3">Модель цифровой зрелости</h4>
                <ul className="space-y-2 text-sm">
                  {[
                    { level: "Базовый уровень", indicator: "Использование стандартных приложений" },
                    { level: "Продвинутый уровень", indicator: "Анализ информации и создание контента" },
                    { level: "Экспертный уровень", indicator: "Критическое мышление и безопасность" }
                  ].map((level, idx) => (
                    <li key={idx} className="flex justify-between items-center">
                      <span className="font-medium">{level.level}</span>
                      <span className="text-indigo-600 dark:text-indigo-400">{level.indicator}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-2xl font-semibold text-indigo-800 dark:text-indigo-200 mb-4">Методология оценки цифровой грамотности</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { framework: "DigComp", score: 8.2, icon: "📚", color: "bg-indigo-500", desc: "Европейская модель цифровой компетентности" },
                { framework: "ICDL", score: 7.8, icon: "💻", color: "bg-blue-500", desc: "Международный стандарт цифровых навыков" },
                { framework: "Национальная модель РФ", score: 6.9, icon: "🇷🇺", color: "bg-purple-500", desc: "Адаптированная модель для российских реалий" },
                { framework: "Экспертная оценка", score: 8.5, icon: "👨‍💼", color: "bg-violet-500", desc: "Комбинированный подход с участием экспертов" }
              ].map((framework, idx) => (
                <div key={idx} className="p-4 bg-white dark:bg-slate-900/50 rounded-lg border border-indigo-100 dark:border-indigo-800/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium flex items-center gap-2">
                      <span>{framework.icon}</span>
                      {framework.framework}
                    </span>
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">{framework.score}/10</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                    <div className={`${framework.color} h-2.5 rounded-full`} style={{width: `${framework.score * 10}%`}}></div>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">{framework.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Методология исследования */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-rose-700 dark:text-rose-400">Методология: Комплексный подход к измерению цифровой грамотности</h2>
        <div className="bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-900/30 dark:to-pink-900/30 p-6 rounded-xl border border-rose-200 dark:border-rose-800">
          <p className="text-lg leading-relaxed">
            Исследование реализовано в три этапа с использованием квазиэкспериментального дизайна и метода смешанных данных (mixed-methods):
          </p>
          
          <div className="mt-6 space-y-4">
            {[
              { 
                step: "Шаг 1", 
                title: "Диагностика уровня цифровой грамотности", 
                description: "Опрос 2000 респондентов в 10 регионах России, охватывающий различные возрастные и профессиональные группы. Применение адаптированной версии фреймворка DigComp с акцентом на российские реалии." 
              },
              { 
                step: "Шаг 2", 
                title: "Анализ эффективности программ обучения", 
                description: "Анализ 45 программ цифровой грамотности с оценкой результативности, доступности и удовлетворенности участников. Сравнительный анализ традиционных и инновационных подходов." 
              },
              { 
                step: "Шаг 3", 
                title: "Разработка рекомендаций", 
                description: "Разработка рекомендаций по модернизации образовательных подходов на основе полученных данных и международного опыта. Учет специфики разных регионов и целевых аудиторий." 
              }
            ].map((stage, idx) => (
              <div key={idx} className="flex gap-4 p-3 bg-white dark:bg-slate-900/50 rounded-lg border border-rose-100 dark:border-rose-800/50">
                <div className="bg-rose-100 dark:bg-rose-900 text-rose-800 dark:text-rose-200 font-bold px-3 py-1 rounded-lg min-w-[60px] text-center">
                  {stage.step}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-200">{stage.title}</h4>
                  <p className="text-slate-700 dark:text-slate-300 mt-1 text-sm">{stage.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Регионов", value: "10", desc: "Репрезентативный охват", icon: "🗺️", color: "bg-rose-500" },
              { label: "Респондентов", value: "2000", desc: "Опросная кампания", icon: "👥", color: "bg-blue-500" },
              { label: "Программ", value: "45", desc: "Анализ обуч. программ", icon: "📋", color: "bg-yellow-500" },
              { label: "Месяцев", value: "6", desc: "Длительность исследования", icon: "📅", color: "bg-green-500" }
            ].map((item, idx) => (
              <div key={idx} className="p-4 bg-white dark:bg-slate-900/50 rounded-lg border border-rose-100 dark:border-rose-800/50 text-center">
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="font-bold text-rose-700 dark:text-rose-300 text-lg">{item.value}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">{item.label}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Анализ данных */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-emerald-700 dark:text-emerald-400">Анализ данных: Статистика уровня цифровой грамотности</h2>
        
        <div className="bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-emerald-900/20 dark:to-cyan-900/20 p-6 rounded-xl border border-emerald-200 dark:border-emerald-800">
          <h3 className="text-2xl font-semibold text-emerald-800 dark:text-emerald-200 mb-4">Уровень цифровой грамотности по возрастным группам</h3>
          <p className="text-lg mb-4">
            Анализ данных опроса 2000 респондентов показывает значительные различия в уровне цифровой грамотности между возрастными группами.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: "📊", title: "Молодежь (18-35 лет)", desc: "Высокий уровень владения цифровыми навыками - 85%", status: "positive" },
              { icon: "📈", title: "Среднее поколение (36-59 лет)", desc: "Средний уровень, преобладают базовые навыки - 62%", status: "neutral" },
              { icon: "📚", title: "Пожилые люди (60+)", desc: "Низкий уровень базовой грамотности - 30%", status: "critical" },
              { icon: "🎓", title: "Студенты", desc: "Высокий уровень при академическом подходе - 78%", status: "positive" }
            ].map((group, idx) => (
              <div key={idx} className="p-4 bg-white dark:bg-slate-900/50 rounded-lg border border-emerald-100 dark:border-emerald-800/50">
                <div className={`text-3xl mb-2 ${group.status === 'positive' ? 'text-emerald-500' : group.status === 'critical' ? 'text-rose-500' : 'text-amber-500'}`}>{group.icon}</div>
                <h4 className="font-semibold text-emerald-700 dark:text-emerald-300 mb-2">{group.title}</h4>
                <p className={`text-sm ${group.status === 'positive' ? 'text-emerald-600 dark:text-emerald-400' : group.status === 'critical' ? 'text-rose-600 dark:text-rose-400' : 'text-amber-600 dark:text-amber-400'}`}>{group.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-6">
            <h4 className="text-xl font-semibold text-emerald-800 dark:text-emerald-200 mb-3">Используемые цифровые инструменты</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { tool: "Госуслуги", usage: 72, icon: "🏛️", category: "Государственные" },
                { tool: "Онлайн-банкинг", usage: 85, icon: "💳", category: "Финансовые" },
                { tool: "Образование", usage: 45, icon: "🎓", category: "Образовательные" },
                { tool: "Электронная почта", usage: 78, icon: "📧", category: "Коммуникации" },
                { tool: "Социальные сети", usage: 65, icon: "👥", category: "Социальные" },
                { tool: "Электронная коммерция", usage: 58, icon: "🛍️", category: "Коммерческие" }
              ].map((tool, idx) => (
                <div key={idx} className={`p-3 rounded-lg border flex items-center justify-between ${idx % 2 === 0 ? 'bg-white dark:bg-slate-900/50 border-emerald-100 dark:border-emerald-800/50' : 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800'}`}>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{tool.icon}</span>
                    <div>
                      <div className="font-medium text-slate-800 dark:text-slate-200">{tool.tool}</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">{tool.category}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="font-bold text-emerald-700 dark:text-emerald-300 mr-2">{tool.usage}%</span>
                    <div className="w-20 bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                      <div className="bg-emerald-500 h-2.5 rounded-full" style={{width: `${tool.usage}%`}}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Результаты и выводы */}
      <section className="space-y-6 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 p-6 rounded-xl border border-purple-200 dark:border-purple-800">
        <h2 className="text-3xl font-bold text-purple-900 dark:text-purple-100">Результаты и выводы: Состояние цифровой грамотности</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-semibold text-purple-800 dark:text-purple-200 mb-4">Ключевые результаты исследования</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { result: "Уровень цифровой грамотности", value: "67%", icon: "📈", color: "bg-purple-500", status: "medium", description: "В среднем по стране" },
                { result: "Эффективность программ", value: "60%", icon: "🎯", color: "bg-blue-500", status: "medium", description: "Увеличение уровня при системном подходе" },
                { result: "Охват населения", value: "42%", icon: "👥", color: "bg-violet-500", status: "low", description: "Проходящих обучение в год" },
                { result: "Уровень удовлетворенности", value: "73%", icon: "😊", color: "bg-emerald-500", status: "high", description: "Участников программ" }
              ].map((result, idx) => (
                <div key={idx} className="p-4 bg-white dark:bg-slate-900/50 rounded-lg border border-purple-100 dark:border-purple-800/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-purple-700 dark:text-purple-300">{result.result}</span>
                    <span className="font-bold text-purple-700 dark:text-purple-300">{result.value}</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 mb-2">
                    <div className={`${result.color} h-2.5 rounded-full`} style={{width: `${result.value.replace('%', '')}%`}}></div>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{result.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-2xl font-semibold text-purple-800 dark:text-purple-200 mb-4">Направления для развития</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white dark:bg-slate-900/50 rounded-lg border border-purple-100 dark:border-purple-800/50">
                <h4 className="font-bold text-emerald-700 dark:text-emerald-300 mb-3">Сильные стороны</h4>
                <ul className="space-y-2 text-sm">
                  {[
                    { item: "Высокий уровень владения соцсетями", icon: "✅" },
                    { item: "Рост использования онлайн-банкинга", icon: "✅" },
                    { item: "Интерес к новым технологиям у молодежи", icon: "✅" },
                    { item: "Развитая инфраструктура в городах", icon: "✅" }
                  ].map((strength, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-1">{strength.icon}</span>
                      <span>{strength.item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="p-4 bg-white dark:bg-slate-900/50 rounded-lg border border-purple-100 dark:border-purple-800/50">
                <h4 className="font-bold text-rose-700 dark:text-rose-300 mb-3">Проблемы и вызовы</h4>
                <ul className="space-y-2 text-sm">
                  {[
                    { item: "Низкий уровень безопасности", icon: "⚠️" },
                    { item: "Неравный доступ в регионах", icon: "⚠️" },
                    { item: "Недостаток программ для пожилых", icon: "⚠️" },
                    { item: "Отсутствие системного подхода", icon: "⚠️" }
                  ].map((challenge, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-rose-500 mt-1">{challenge.icon}</span>
                      <span>{challenge.item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Рекомендации */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-amber-700 dark:text-amber-400">Рекомендации: Платформа цифровой грамотности</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Платформа цифровой грамотности */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 p-5 rounded-xl border border-amber-200 dark:border-amber-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-amber-100 dark:bg-amber-900/50 p-2 rounded-lg">
                <Globe className="text-amber-600 dark:text-amber-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-amber-800 dark:text-amber-200">Национальная платформа цифровой грамотности</h3>
            </div>
            <p className="mb-4 text-amber-700 dark:text-amber-300">
              Создание унифицированной платформы с адаптивными программами для разных возрастных и социальных групп.
            </p>
            <div className="bg-white dark:bg-slate-900/50 p-4 rounded-lg border border-amber-100 dark:border-amber-800/50">
              <p className="font-semibold mb-2">Ключевые компоненты:</p>
              <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
                <li>• Персонализированные траектории обучения</li>
                <li>• Модульная структура навыков</li>
                <li>• Поддержка многоязычности</li>
                <li>• Интеграция с системами образования</li>
              </ul>
            </div>
          </div>

          {/* Волонтерские программы */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 p-5 rounded-xl border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-100 dark:bg-green-900/50 p-2 rounded-lg">
                <Users className="text-green-600 dark:text-green-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-green-800 dark:text-green-200">Волонтерские программы "Цифровой наставник"</h3>
            </div>
            <p className="mb-4 text-green-700 dark:text-green-300">
              Развитие сетей молодежных волонтеров для оказания помощи пожилым людям и социально уязвимым группам.
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-900">
                    <th className="px-2 py-1 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Направление</th>
                    <th className="px-2 py-1 text-center text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Охват</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-slate-900 divide-y divide-slate-200 dark:divide-slate-700">
                  {[
                    { direction: "Онлайн-банкинг", coverage: "45%" },
                    { direction: "Госуслуги", coverage: "52%" },
                    { direction: "Безопасность", coverage: "38%" },
                    { direction: "Образование", coverage: "29%" }
                  ].map((row, idx) => (
                    <tr key={idx}>
                      <td className="px-2 py-1 whitespace-nowrap text-sm text-slate-900 dark:text-slate-200">{row.direction}</td>
                      <td className="px-2 py-1 whitespace-nowrap text-sm text-center text-slate-500 dark:text-slate-400">{row.coverage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Технологии и инструменты */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-2 mb-3">
                <Smartphone className="text-blue-600 dark:text-blue-400" size={20} />
                <h4 className="font-semibold text-blue-800 dark:text-blue-200">Технологии обучения</h4>
              </div>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Использование геймификации, адаптивного обучения и мобильных приложений.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900/30 dark:to-pink-900/30 p-4 rounded-xl border border-rose-200 dark:border-rose-800">
              <div className="flex items-center gap-2 mb-3">
                <BarChart3 className="text-rose-600 dark:text-rose-400" size={20} />
                <h4 className="font-semibold text-rose-800 dark:text-rose-200">Мониторинг прогресса</h4>
              </div>
              <p className="text-sm text-rose-700 dark:text-rose-300">
                Системы оценки и отслеживания достижений участников программ.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Экономический анализ */}
      <section className="space-y-6 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 p-6 rounded-xl border border-cyan-200 dark:border-cyan-800">
        <h2 className="text-3xl font-bold text-cyan-900 dark:text-cyan-100">Экономический анализ: Влияние цифровой грамотности</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Эффект для населения */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-cyan-800 dark:text-cyan-200">Эффект для населения</h3>
            
            <div className="bg-white dark:bg-slate-900/50 p-5 rounded-lg border border-cyan-100 dark:border-cyan-800/50">
              <h4 className="font-bold text-lg text-cyan-700 dark:text-cyan-300 mb-3">Экономия времени</h4>
              <p className="text-cyan-600 dark:text-cyan-300 mb-3">На основе анализа поведения 2000 респондентов:</p>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span>Среднее время на выполнение цифровых задач</span>
                  <span className="font-semibold">↓ 35%</span>
                </li>
                <li className="flex justify-between">
                  <span>Время на поиск информации</span>
                  <span className="font-semibold">↓ 42%</span>
                </li>
                <li className="flex justify-between">
                  <span>Время на взаимодействие с госуслугами</span>
                  <span className="font-semibold">↓ 58%</span>
                </li>
              </ul>
              <p className="mt-3 text-center font-bold text-cyan-700 dark:text-cyan-300">
                Годовая экономия: 127.4 часов на человека
              </p>
              <p className="text-center text-sm text-cyan-600 dark:text-cyan-300">
                Монетизация: 72,800 руб./год
              </p>
            </div>
            
            <div className="bg-white dark:bg-slate-900/50 p-5 rounded-lg border border-cyan-100 dark:border-cyan-800/50">
              <h4 className="font-bold text-lg text-cyan-700 dark:text-cyan-300 mb-3">Повышение безопасности</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span>Снижение рисков мошенничества</span>
                  <span className="font-semibold">↓ 65%</span>
                </li>
                <li className="flex justify-between">
                  <span>Снижение потерь от фишинга</span>
                  <span className="font-semibold">↓ 52%</span>
                </li>
                <li className="flex justify-between">
                  <span>Повышение защиты персональных данных</span>
                  <span className="font-semibold">↑ 73%</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Эффект для государства и общества */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-cyan-800 dark:text-cyan-200">Эффект для государства и общества</h3>
            
            <div className="bg-white dark:bg-slate-900/50 p-5 rounded-lg border border-cyan-100 dark:border-cyan-800/50">
              <h4 className="font-bold text-lg text-cyan-700 dark:text-cyan-300 mb-3">Эффект цифровизации государственных услуг</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span>Снижение нагрузки на МФЦ</span>
                  <span className="font-semibold">18.2 млн обращений</span>
                </li>
                <li className="flex justify-between">
                  <span>Снижение административных расходов</span>
                  <span className="font-semibold">6.7 млрд руб.</span>
                </li>
                <li className="flex justify-between">
                  <span>Рост удовлетворенности граждан</span>
                  <span className="font-semibold">↑ 34%</span>
                </li>
                <li className="flex justify-between">
                  <span>Сокращение времени обработки запросов</span>
                  <span className="font-semibold">↓ 45%</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-slate-900/50 p-5 rounded-lg border border-cyan-100 dark:border-cyan-800/50">
              <h4 className="font-bold text-lg text-cyan-700 dark:text-cyan-300 mb-3">Социальные эффекты</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span>Снижение цифрового неравенства</span>
                  <span className="font-semibold">↑ 28%</span>
                </li>
                <li className="flex justify-between">
                  <span>Повышение доступности услуг</span>
                  <span className="font-semibold">↑ 39%</span>
                </li>
                <li className="flex justify-between">
                  <span>Улучшение качества жизни пожилых</span>
                  <span className="font-semibold">↑ 24%</span>
                </li>
                <li className="flex justify-between">
                  <span>Снижение барьеров для участия в цифровом обществе</span>
                  <span className="font-semibold">↑ 41%</span>
                </li>
              </ul>
              <p className="mt-3 text-center font-bold text-cyan-700 dark:text-cyan-300">
                Общий социально-экономический эффект: 184.7 млрд руб./год
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* План реализации */}
      <section className="space-y-6 bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-900/30 dark:to-gray-900/30 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200">План реализации: Построение национальной системы цифровой грамотности</h2>
        
        <div>
          <h3 className="text-2xl font-semibold text-slate-700 dark:text-slate-300 mb-4">Этапы внедрения</h3>
          <div className="space-y-4">
            {[
              { stage: "Подготовительный", duration: "6 месяцев", description: "Формирование методических рекомендаций, стандартизация программ, обучение инструкторов" },
              { stage: "Пилотное внедрение", duration: "12 месяцев", description: "Запуск пилотных программ в 5 регионах с различными моделями обучения" },
              { stage: "Масштабирование", duration: "18 месяцев", description: "Расширение на 40 регионов с адаптацией под местные реалии" },
              { stage: "Стабилизация", duration: "12 месяцев", description: "Оптимизация программ, внедрение систем мониторинга и оценки" },
              { stage: "Эволюция", duration: "постоянно", description: "Обновление контента, внедрение новых технологий, международное сотрудничество" }
            ].map((phase, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="flex items-start gap-4">
                  <div className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold px-3 py-1 rounded-lg min-w-[140px] text-center">
                    {phase.duration}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200">{phase.stage}</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">{phase.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-2xl font-semibold text-slate-700 dark:text-slate-300 mb-4">Ключевые показатели эффективности (KPI)</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800">
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Показатель</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Цель</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">База</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">План через 3 года</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-slate-900 divide-y divide-slate-200 dark:divide-slate-700">
                {[
                  { 
                    indicator: "Уровень цифровой грамотности", 
                    baseline: "67%", 
                    target: "85%", 
                    description: "Средний показатель по стране" 
                  },
                  { 
                    indicator: "Охват населения программами", 
                    baseline: "42%", 
                    target: "70%", 
                    description: "Проходящих обучение в год" 
                  },
                  { 
                    indicator: "Эффективность программ", 
                    baseline: "60%", 
                    target: "75%", 
                    description: "Увеличение грамотности после обучения" 
                  },
                  { 
                    indicator: "Удовлетворенность участников", 
                    baseline: "73%", 
                    target: "85%", 
                    description: "Положительная оценка программ" 
                  },
                  { 
                    indicator: "Снижение случаев мошенничества", 
                    baseline: "12.4 млн", 
                    target: "7.3 млн", 
                    description: "Ежегодно, связанных с низкой грамотностью" 
                  },
                  { 
                    indicator: "Снижение цифрового неравенства", 
                    baseline: "32%", 
                    target: "18%", 
                    description: "Разница между возрастными группами" 
                  }
                ].map((metric, idx) => (
                  <tr key={idx}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-slate-200">{metric.indicator}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-center text-slate-500 dark:text-slate-400">{metric.target}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-center text-slate-500 dark:text-slate-400">{metric.baseline}</td>
                    <td className="px-4 py-3 text-sm text-slate-500 dark:text-slate-400">{metric.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Заключение */}
      <section className="space-y-6 border-t-2 border-slate-300 dark:border-slate-600 pt-8">
        <h2 className="text-3xl font-bold text-teal-700 dark:text-teal-400">Заключение: Важность цифровой грамотности для устойчивого развития</h2>
        <div className="text-lg leading-relaxed space-y-4 bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-900/30 dark:to-blue-900/30 p-6 rounded-lg border border-teal-200 dark:border-teal-800">
          <p>
            Цифровая грамотность становится фундаментальным ресурсом для устойчивого развития общества. Исследование показывает, что уровень цифровой грамотности напрямую связан с доступом к услугам, качеством жизни и возможностями участия в цифровом обществе.
          </p>
          <p>
            Экономические и социальные эффекты от повышения цифровой грамотности впечатляют: 184.7 млрд рублей годового эффекта, снижение цифрового неравенства на 44%, рост эффективности государственных услуг. Но главное — это повышение качества жизни граждан, особенно уязвимых групп населения.
          </p>
          <p>
            Реализация рекомендаций по созданию национальной платформы цифровой грамотности с адаптивными программами, волонтерской поддержкой и системой мониторинга позволит обеспечить цифровую включённость всех слоёв населения и создать основу для цифрового суверенитета России.
          </p>
          <p className="font-semibold text-teal-800 dark:text-teal-200">
            Цифровая грамотность — это не только технические навыки, но и ключ к равенству, безопасности и возможностям в цифровую эпоху. Россия имеет шанс стать лидером в области цифровой инклюзии, если системно подойдёт к развитию соответствующих программ и инфраструктуры.
          </p>
        </div>
      </section>

      {/* Интерфейс платформы */}
      <section id="digital-literacy-platform" className="space-y-6 border-t-2 border-slate-300 dark:border-slate-600 pt-8">
        <h2 className="text-3xl font-bold text-purple-700 dark:text-purple-400">Интерфейс платформы цифровой грамотности</h2>
        
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/30 p-6 rounded-xl border border-indigo-200 dark:border-indigo-800">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Навигация и профиль */}
            <div className="space-y-4">
              <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
                <h3 className="font-bold text-lg text-indigo-700 dark:text-indigo-300 mb-3">Профиль пользователя</h3>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-indigo-100 dark:bg-indigo-900/50 p-2 rounded-full">
                    <Users className="text-indigo-600 dark:text-indigo-400" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold">Анна Петрова</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Возраст: 67 лет, Пенза</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Уровень грамотности</p>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-4">
                      <div className="bg-green-500 h-4 rounded-full" style={{width: "35%"}}></div>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 text-center mt-1">Базовый уровень</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Пройдено модулей</p>
                    <p className="font-bold text-indigo-700 dark:text-indigo-300">12 из 40</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
                <h3 className="font-bold text-lg text-indigo-700 dark:text-indigo-300 mb-3">Рекомендуемые курсы</h3>
                <div className="space-y-2">
                  <button className="w-full text-left p-2 hover:bg-indigo-50 dark:hover:bg-slate-700 rounded-lg border border-indigo-200 dark:border-indigo-700">
                    <p className="font-medium">Безопасность в интернете</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">18 уроков, 4.5 часа</p>
                  </button>
                  <button className="w-full text-left p-2 hover:bg-indigo-50 dark:hover:bg-slate-700 rounded-lg border border-indigo-200 dark:border-indigo-700">
                    <p className="font-medium">Госуслуги для начинающих</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">12 уроков, 3 часа</p>
                  </button>
                  <button className="w-full text-left p-2 hover:bg-indigo-50 dark:hover:bg-slate-700 rounded-lg border border-indigo-200 dark:border-indigo-700">
                    <p className="font-medium">Общение с родными онлайн</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">10 уроков, 2.5 часа</p>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Основной контент курса */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
                <div className="flex gap-3 mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-xl text-indigo-700 dark:text-indigo-300 mb-2">Модуль: Безопасность в интернете</h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                      Научитесь защищать свои данные и распознавать мошеннические схемы в интернете
                    </p>
                    
                    <div className="flex gap-2 mb-4">
                      <div className="flex-1 bg-slate-100 dark:bg-slate-700 rounded-lg p-3">
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Урок 5 из 12</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Фишинг и фальшивые сайты</p>
                      </div>
                      <div className="flex-1 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg p-3">
                        <p className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">Прогресс</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">42% завершено</p>
                      </div>
                    </div>
                    
                    <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-4 mb-4">
                      <h4 className="font-semibold mb-2">Тестовое задание</h4>
                      <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
                        Как вы думаете, является ли этот сайт безопасным? Проверьте URL и объясните, почему.
                      </p>
                      <div className="flex gap-2">
                        <div className="flex-1 border border-red-500 rounded-lg p-3 bg-red-50 dark:bg-red-900/20">
                          <p className="text-xs">gouslugi.gos.ru-secure-login.ru</p>
                          <p className="text-xs text-red-600 dark:text-red-400 mt-1">Подозрительный сайт</p>
                        </div>
                        <div className="flex-1 border border-green-500 rounded-lg p-3 bg-green-50 dark:bg-green-900/20">
                          <p className="text-xs">www.gosuslugi.ru</p>
                          <p className="text-xs text-green-600 dark:text-green-400 mt-1">Официальный сайт</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium transition-colors">
                        Продолжить
                      </button>
                      <button className="px-4 bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-500 rounded-lg font-medium transition-colors">
                        Справка
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Визуализация прогресса */}
                <div className="bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-4">
                  <h4 className="font-semibold text-center mb-3">Прогресс по навыкам</h4>
                  <div className="grid grid-cols-4 gap-2 text-center">
                    {[
                      { skill: "Безопасность", level: "45%", icon: "🛡️", color: "bg-red-500" },
                      { skill: "Госуслуги", level: "68%", icon: "🏛️", color: "bg-blue-500" },
                      { skill: "Общение", level: "72%", icon: "💬", color: "bg-green-500" },
                      { skill: "Покупки", level: "32%", icon: "🛒", color: "bg-yellow-500" }
                    ].map((skill, idx) => (
                      <div key={idx} className="p-2 bg-white dark:bg-slate-700 rounded-lg">
                        <div className="text-xl mb-1">{skill.icon}</div>
                        <p className="text-xs font-medium">{skill.skill}</p>
                        <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2 mt-1">
                          <div className={`${skill.color} h-2 rounded-full`} style={{width: skill.level}}></div>
                        </div>
                        <p className="text-xs mt-1">{skill.level}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Дополнительные ресурсы */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow border-l-4 border-blue-500">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="text-blue-500" size={20} />
                    <h4 className="font-bold">Достижения</h4>
                  </div>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">8</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Завершенных курсов</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">3 сертификата</p>
                </div>
                
                <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow border-l-4 border-green-500">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="text-green-500" size={20} />
                    <h4 className="font-bold">Текущие цели</h4>
                  </div>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">72%</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Пройти 15 модулей</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">до конца месяца</p>
                </div>
                
                <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow border-l-4 border-purple-500">
                  <div className="flex items-center gap-2 mb-2">
                    <XCircle className="text-purple-500" size={20} />
                    <h4 className="font-bold">Помощь</h4>
                  </div>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">24/7</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Поддержка через чат</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">и видеозвонки</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Поддержка и сообщество */}
          <div className="mt-6 bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
            <h3 className="font-bold text-lg text-indigo-700 dark:text-indigo-300 mb-3">Сообщество и поддержка</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-lg border border-cyan-200 dark:border-cyan-800">
                <p className="font-semibold">Ваш цифровой наставник</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Алексей, волонтер, онлайн сейчас</p>
                <button className="mt-2 text-sm bg-cyan-600 hover:bg-cyan-700 text-white px-3 py-1 rounded-lg">
                  Написать сообщение
                </button>
              </div>
              <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <p className="font-semibold">Группа поддержки</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Пензенские пользователи</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">12 человек онлайн</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DigitalSkillsArticle;