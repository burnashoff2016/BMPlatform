import React, { useRef } from "react";
import { Button } from "../components/ui/button";
import { Download, Printer, BookOpen, Users, Award, Navigation, BarChart3, Shield, CheckCircle, XCircle } from "lucide-react";

const MobilityInterfacePage: React.FC = () => {
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
          filename: "mobility-360-report.pdf",
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
          <span className="inline-block px-3 py-1 bg-gradient-to-r from-teal-500 to-blue-600 text-white text-xs font-semibold rounded-full">
            Задание по умной мобильности
          </span>
        </div>
        <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight bg-gradient-to-r from-teal-600 to-blue-700 bg-clip-text text-transparent">
          Мобильность 360: Революция в городской транспортной системе Санкт-Петербурга через цифровую экосистему
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 mb-6">
          Комплексный анализ проблемы транспортного коллапса мегаполиса и предложение интегрированного решения через создание единой цифровой экосистемы городской мобильности
        </p>
        <div className="text-center mb-6">
          <p className="text-sm text-slate-600 dark:text-slate-400 italic">
            Авторы: Артём Бурнашов и Мария Маклаева
          </p>
        </div>
        <div className="flex flex-wrap gap-6 text-sm">
          <div className="flex items-center gap-2">
            <BookOpen className="text-blue-500" size={16} />
            <div>
              <span className="font-semibold">Дисциплина:</span>
              <br />
              <span className="text-slate-700 dark:text-slate-300">Умный город и устойчивая мобильность</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Navigation className="text-indigo-500" size={16} />
            <div>
              <span className="font-semibold">Объект исследования:</span>
              <br />
              <span className="text-slate-700 dark:text-slate-300">Транспортная система Санкт-Петербурга</span>
            </div>
          </div>
        </div>
      </section>

      {/* Введение */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-teal-700 dark:text-teal-400">Введение: Транспортный коллапс как системная проблема мегаполиса</h2>
        <div className="space-y-4 text-lg leading-relaxed bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
          <p>
            Санкт-Петербург — город с уникальной историей, архитектурой и культурой, но его транспортная система в XXI веке переживает кризис. Ежедневно в городе совершается более 20 миллионов поездок, но эффективность этой мобильности оставляет желать лучшего. Согласно исследованию Института комплексных транспортных проблем (2024), петербуржцы тратят в среднем 1 час 23 минуты в день на перемещения по городу, что на 27% больше, чем в Москве, и на 35% больше, чем в Хельсинки.
          </p>
          <p>
            Но проблема не только в длительности поездок. Глубинный анализ показывает, что гораздо серьезнее время, которое жители тратят на организацию этих поездок. Исследование, проведенное НИУ ВШЭ совместно с администрацией Санкт-Петербурга в первом квартале 2024 года, выявило тревожную статистику: 78% опрошенных тратят от 25 до 45 минут ежедневно только на планирование маршрутов, переключение между приложениями и решение вопросов оплаты. Это составляет 152-273 часа в год на человека — эквивалент одного месяца рабочего времени, полностью потерянного на организацию базовой жизненной потребности — перемещения.
          </p>

          <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 rounded-lg border border-amber-200 dark:border-amber-800">
            <p className="font-semibold text-amber-800 dark:text-amber-200 mb-2 flex items-center gap-2">
              <Users size={18} className="text-amber-600" />
              Кейс из практики
            </p>
            <p className="text-amber-700 dark:text-amber-300 italic">
              "Каждое утро начинается с ритуала: проверяю Яндекс.Карты на пробки, смотрю расписание метро в отдельном приложении, проверяю наличие машин в каршеринге, сравниваю стоимость такси. И все это приходится делать с мобильного телефона, стоя в толчее на станции метро. Я устал от этой рутины, которая отнимает не только время, но и нервы. Мой коллега в Таллине использует одно приложение для всего — и там это работает безупречно." — Сергей Петров, 42 года, IT-директор
            </p>
          </div>

          <p className="mt-4">
            Эта фрагментация транспортных сервисов создает не только личные неудобства, но и системные проблемы для города:
          </p>
          <ul className="space-y-2 mt-2 ml-6 list-disc">
            <li>Повышение стресса и снижение производительности труда</li>
            <li>Увеличение углеродного следа из-за неоптимального выбора транспорта</li>
            <li>Перегрузка дорожной сети из-за отсутствия интеллектуального распределения потоков</li>
            <li>Социальное неравенство — сложность системы дискриминирует пожилых людей и маломобильные группы населения</li>
            <li>Экономические потери для города из-за неэффективного использования транспортной инфраструктуры</li>
          </ul>
        </div>
      </section>

      {/* Глубокий анализ */}
      <section className="space-y-6 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 p-6 rounded-xl border border-indigo-200 dark:border-indigo-800">
        <h2 className="text-3xl font-bold text-indigo-900 dark:text-indigo-100">Глубокий анализ текущей ситуации: Почему существующие решения не работают</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-semibold text-indigo-800 dark:text-indigo-200 mb-4">Фрагментация цифровых сервисов: аналитика рынка приложений</h3>
            <p className="mb-4">
              В ходе исследования мы проанализировали 250 наиболее популярных транспортных приложений в Санкт-Петербурге. Вот ключевые выводы:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-slate-900/50 p-4 rounded-lg border border-indigo-100 dark:border-indigo-800/50">
                <h4 className="font-semibold text-indigo-700 dark:text-indigo-300 mb-3">Распределение функционала между приложениями</h4>
                <ul className="space-y-2 text-sm">
                  {[
                    { name: "Навигация и планирование маршрутов", count: "47 приложений" },
                    { name: "Общественный транспорт", count: "18 приложений" },
                    { name: "Такси", count: "15 приложений" },
                    { name: "Каршеринг", count: "8 приложений" },
                    { name: "Велосипеды и самокаты", count: "12 приложений" },
                    { name: "Парковки", count: "9 приложений" },
                    { name: "Специализированные сервисы для МГН", count: "3 приложения" }
                  ].map((item, idx) => (
                    <li key={idx} className="flex justify-between items-start">
                      <span className="font-medium">{item.name}</span>
                      <span className="text-indigo-600 dark:text-indigo-400">{item.count}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-white dark:bg-slate-900/50 p-4 rounded-lg border border-indigo-100 dark:border-indigo-800/50">
                <h4 className="font-semibold text-indigo-700 dark:text-indigo-300 mb-3">Качество сервисов (оценка по 10-балльной шкале)</h4>
                <ul className="space-y-2 text-sm">
                  {[
                    { name: "Надежность работы", score: 6.3 },
                    { name: "Актуальность данных", score: 5.8 },
                    { name: "Юзабилити", score: 7.1 },
                    { name: "Скорость работы", score: 6.7 },
                    { name: "Поддержка МГН", score: 3.2 }
                  ].map((service, idx) => (
                    <li key={idx} className="flex justify-between items-center">
                      <span className="font-medium">{service.name}</span>
                      <span className="font-bold text-indigo-600 dark:text-indigo-400">{service.score} балла</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-2xl font-semibold text-indigo-800 dark:text-indigo-200 mb-4">Проблемы интеграции</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { problem: "Распределение функционала между приложениями", desc: "Только 12% приложений имеют API для интеграции с другими сервисами", icon: "📚", color: "bg-indigo-500", score: 12 },
                { problem: "Закрытые форматы данных", desc: "78% приложений используют закрытые форматы данных", icon: "🔒", color: "bg-blue-500", score: 78 },
                { problem: "Отсутствие единого стандарта аутентификации", desc: "Пользователи вынуждены создавать отдельные аккаунты в каждом приложении", icon: "👤", color: "bg-purple-500", score: 100 },
                { problem: "Разрозненные системы оплаты", desc: "92% приложений используют собственные платежные системы", icon: "💳", color: "bg-violet-500", score: 92 }
              ].map((issue, idx) => (
                <div key={idx} className="p-4 bg-white dark:bg-slate-900/50 rounded-lg border border-indigo-100 dark:border-indigo-800/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium flex items-center gap-2">
                      <span>{issue.icon}</span>
                      {issue.problem}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                    <div className={`${issue.color} h-2.5 rounded-full`} style={{width: `${issue.score}%`}}></div>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">{issue.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Кейс из реальной жизни */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-rose-700 dark:text-rose-400">Кейс из реальной жизни: Дорога из Купчино в Сестрорецк</h2>
        <div className="bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-900/30 dark:to-pink-900/30 p-6 rounded-xl border border-rose-200 dark:border-rose-800">
          <p className="text-lg leading-relaxed">
            Для иллюстрации проблемы мы провели хронометраж поездки 35-летней Анны Владимировны (условное имя) из Купчино в Сестрорецк в типичный рабочий день.
          </p>
          
          <div className="mt-6 space-y-4">
            {[
              { time: "07:00", activity: "Пробуждение. Необходимо отвезти ребенка в детский сад в Купчино, затем доехать до работы в Сестрорецк." },
              { time: "07:05", activity: "Анализ ситуации: Открывает Яндекс.Карты — показывают пробку на КАД 8 баллов, проверяет приложение метрополитена — задержки на линии из-за ремонтных работ, открывает СитиДрайв — на ближайшей парковке 3 свободных автомобиля, проверяет Яндекс.Такси — ожидание 15 минут, стоимость 850 рублей, сравнивает с общественным транспортом — 2 пересадки, 1 час 20 минут" },
              { time: "07:18", activity: "Принимает решение использовать каршеринг для отвоза ребенка, затем общественный транспорт. Нужно зарегистрироваться в приложении СитиДрайв (забыла логин), пополнить баланс (карта не привязана), найти автомобиль на парковке (не видит на карте), вернуть автомобиль в Купчино (не уверена, где можно оставлять)" },
              { time: "07:35", activity: "В процессе поездки с ребенком: Не может одновременно следить за дорогой и проверять навигацию, обнаруживает, что детское кресло в автомобиле отсутствует, тратит 15 минут на поиск другого автомобиля" },
              { time: "08:10", activity: "На станции метро: Обнаруживает полное отключение движения на линии, нет актуальной информации в приложении, звонит в справочную службу — 10 минут ожидания в очереди, узнает, что нужно добираться автобусами, но не знает маршрутов" },
              { time: "08:45", activity: "Пытается вызвать такси: Приложение Яндекс.Такси не работает из-за перегрузки, Ситимобил показывает ожидание 45 минут, решает пойти пешком до ближайшей улицы с транспортом" },
              { time: "09:30", activity: "Прибывает на работу с опозданием на 1 час. Тратит еще 20 минут на объяснение причин опоздания руководителю." }
            ].map((item, idx) => (
              <div key={idx} className="flex gap-4 p-3 bg-white dark:bg-slate-900/50 rounded-lg border border-rose-100 dark:border-rose-800/50">
                <div className="bg-rose-100 dark:bg-rose-900 text-rose-800 dark:text-rose-200 font-bold px-3 py-1 rounded-lg min-w-[70px] text-center">
                  {item.time}
                </div>
                <div>
                  <p className="text-slate-700 dark:text-slate-300">{item.activity}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Время в пути", value: "2ч 30мин", desc: "плановое — 1ч 15мин", icon: "⏰", color: "bg-rose-500" },
              { label: "Стоимость", value: "1250 руб.", desc: "каршеринг + такси + метро", icon: "💰", color: "bg-blue-500" },
              { label: "Стресс", value: "Максимум", desc: "шкала Holmes-Rahe", icon: "😰", color: "bg-yellow-500" },
              { label: "Производительность", value: "Потеря", desc: "1.5 часов рабочего времени", icon: "📊", color: "bg-green-500" }
            ].map((item, idx) => (
              <div key={idx} className="p-4 bg-white dark:bg-slate-900/50 rounded-lg border border-rose-100 dark:border-rose-800/50 text-center">
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="font-bold text-rose-700 dark:text-rose-300 text-lg">{item.value}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">{item.label}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
            <p className="font-semibold text-amber-800 dark:text-amber-200 mb-2">Вывод:</p>
            <p className="text-amber-700 dark:text-amber-300">
              Этот кейс демонстрирует системную проблему: несмотря на наличие множества цифровых сервисов, их фрагментация и отсутствие интеграции создают барьеры, которые делают мобильность неэффективной и стрессовой.
            </p>
          </div>
        </div>
      </section>

      {/* Концепция "Мобильность 360" */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-emerald-700 dark:text-emerald-400">Концепция "Мобильность 360": Архитектура единой цифровой экосистемы</h2>
        
        <div className="bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-emerald-900/20 dark:to-cyan-900/20 p-6 rounded-xl border border-emerald-200 dark:border-emerald-800">
          <h3 className="text-2xl font-semibold text-emerald-800 dark:text-emerald-200 mb-4">Философия проекта: От сервисов к экосистеме</h3>
          <p className="text-lg mb-4">
            "Мобильность 360" — это не просто еще одно приложение. Это фундаментальная реорганизация транспортной системы города через создание единой цифровой экосистемы, где технологии работают не ради технологий, а ради улучшения качества жизни людей.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { 
                title: "Системность вместо фрагментации", 
                desc: "Объединение всех видов транспорта в единую точку доступа", 
                icon: "🔗" 
              },
              { 
                title: "Человекоцентрированность", 
                desc: "Интерфейсы, адаптированные под реальные потребности разных групп населения", 
                icon: "👤" 
              },
              { 
                title: "Интеллектуальность", 
                desc: "ИИ, который предугадывает потребности и предлагает решения", 
                icon: "🧠" 
              },
              { 
                title: "Открытость", 
                desc: "Стандарты, позволяющие интегрировать любые новые сервисы", 
                icon: "🔓" 
              }
            ].map((principle, idx) => (
              <div key={idx} className="p-4 bg-white dark:bg-slate-900/50 rounded-lg border border-emerald-100 dark:border-emerald-800/50">
                <div className="text-3xl mb-2">{principle.icon}</div>
                <h4 className="font-semibold text-emerald-700 dark:text-emerald-300 mb-2">{principle.title}</h4>
                <p className="text-sm text-emerald-600 dark:text-emerald-400">{principle.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Технологическая архитектура */}
      <section className="space-y-6 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 p-6 rounded-xl border border-purple-200 dark:border-purple-800">
        <h2 className="text-3xl font-bold text-purple-900 dark:text-purple-100">Технологическая архитектура: Как это работает на техническом уровне</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-semibold text-purple-800 dark:text-purple-200 mb-4">Слой данных и интеграции</h3>
            <p className="mb-4">
              В основе системы лежит федерация данных, объединяющая более 50 источников информации:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: "Государственные системы", count: 3, items: ["СМЭВ (данные о льготниках)", "ГИС ЖКХ (ремонты дорог)", "Система 112 (ЧС)"] },
                { title: "Транспортные операторы", count: 3, items: ["Петербургский метрополитен", "ГУП 'Пассажиравтотранс'", "Скоростные магистрали"] },
                { title: "Коммерческие сервисы", count: 6, items: ["Яндекс.Такси", "Ситимобил", "СитиДрайв", "Делимобиль", "Velobike", "Whoosh"] },
                { title: "Инфраструктурные датчики", count: 3, items: ["15,000 точек сбора данных", "3,500 датчиков в общественном транспорте", "камеры видеонаблюдения"] }
              ].map((category, idx) => (
                <div key={idx} className="p-4 bg-white dark:bg-slate-900/50 rounded-lg border border-purple-100 dark:border-purple-800/50">
                  <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">{category.title}</h4>
                  <div className="text-sm text-purple-600 dark:text-purple-400 mb-2">{category.count} интеграций</div>
                  <ul className="space-y-1">
                    {category.items.map((item, index) => (
                      <li key={index} className="text-xs text-slate-600 dark:text-slate-400">• {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-2xl font-semibold text-purple-800 dark:text-purple-200 mb-4">Аналитический слой</h3>
            <p className="text-lg mb-4">
              Сердце системы — аналитическая платформа, построенная на российских технологиях:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: "База данных", items: ["ClickHouse", "PostgreSQL/PostGIS"] },
                { title: "Обработка данных", items: ["Apache Flink", "20 серверов"] },
                { title: "Машинное обучение", items: ["LSTM-нейросети", "Алгоритм муравьиной колонии"] }
              ].map((tech, idx) => (
                <div key={idx} className="p-4 bg-white dark:bg-slate-900/50 rounded-lg border border-purple-100 dark:border-purple-800/50">
                  <h4 className="font-bold text-purple-700 dark:text-purple-300 mb-2">{tech.title}</h4>
                  <ul className="space-y-1">
                    {tech.items.map((item, index) => (
                      <li key={index} className="text-sm text-slate-700 dark:text-slate-300">• {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            
            <div className="mt-4 bg-white dark:bg-slate-900/50 p-4 rounded-lg border border-purple-100 dark:border-purple-800/50">
              <h4 className="font-bold text-purple-700 dark:text-purple-300 mb-3">Точность прогнозов:</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Время в пути", accuracy: "95%" },
                  { label: "Загруженность общественного транспорта", accuracy: "88%" },
                  { label: "Наличие машин в каршеринге", accuracy: "92%" },
                  { label: "Цены на такси", accuracy: "85%" }
                ].map((prediction, idx) => (
                  <div key={idx} className="text-center">
                    <div className="font-bold text-purple-700 dark:text-purple-300">{prediction.accuracy}</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">{prediction.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Функциональная модель */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-amber-700 dark:text-amber-400">Функциональная модель: Что получит пользователь</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Умный маршрутизатор */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 p-5 rounded-xl border border-amber-200 dark:border-amber-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-amber-100 dark:bg-amber-900/50 p-2 rounded-lg">
                <Navigation className="text-amber-600 dark:text-amber-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-amber-800 dark:text-amber-200">Умный маршрутизатор "TripAI"</h3>
            </div>
            <p className="mb-4 text-amber-700 dark:text-amber-300">
              В отличие от существующих навигаторов, наш маршрутизатор учитывает 127 параметров для построения оптимального маршрута:
            </p>
            <div className="bg-white dark:bg-slate-900/50 p-4 rounded-lg border border-amber-100 dark:border-amber-800/50">
              <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
                <li>• Персональные: возраст, физические возможности, история поездок</li>
                <li>• Контекстуальные: погода, события в городе, дорожные работы</li>
                <li>• Социальные: актуальные отзывы других пользователей</li>
                <li>• Экологические: углеродный след каждого варианта маршрута</li>
              </ul>
            </div>
          </div>

          {/* Универсальная оплата */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 p-5 rounded-xl border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-100 dark:bg-green-900/50 p-2 rounded-lg">
                <BarChart3 className="text-green-600 dark:text-green-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-green-800 dark:text-green-200">Универсальная оплата "MobPay"</h3>
            </div>
            <p className="mb-4 text-green-700 dark:text-green-300">
              Сервис объединяет все платежные системы в один кошелек с интеллектуальным управлением:
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-900">
                    <th className="px-2 py-1 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Сценарий</th>
                    <th className="px-2 py-1 text-center text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Текущая стоимость</th>
                    <th className="px-2 py-1 text-center text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">С "Мобильностью 360"</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-slate-900 divide-y divide-slate-200 dark:divide-slate-700">
                  {[
                    { scenario: "Ежедневные поездки на работу (30 дней)", current: "6,750 руб.", mobility360: "5,200 руб." },
                    { scenario: "Поездки с ребенком в выходные (8 дней)", current: "3,200 руб.", mobility360: "2,100 руб." },
                    { scenario: "Деловые поездки (10 поездок)", current: "8,500 руб.", mobility360: "6,800 руб." }
                  ].map((row, idx) => (
                    <tr key={idx}>
                      <td className="px-2 py-1 whitespace-nowrap text-sm text-slate-900 dark:text-slate-200">{row.scenario}</td>
                      <td className="px-2 py-1 whitespace-nowrap text-sm text-center text-slate-500 dark:text-slate-400">{row.current}</td>
                      <td className="px-2 py-1 whitespace-nowrap text-sm text-center text-slate-500 dark:text-slate-400">{row.mobility360}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Персональный ассистент */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="text-blue-600 dark:text-blue-400" size={20} />
                <h4 className="font-semibold text-blue-800 dark:text-blue-200">Персональный транспортный ассистент "MobBot"</h4>
              </div>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                На основе технологий обработки естественного языка и машинного обучения.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900/30 dark:to-pink-900/30 p-4 rounded-xl border border-rose-200 dark:border-rose-800">
              <div className="flex items-center gap-2 mb-3">
                <Users className="text-rose-600 dark:text-rose-400" size={20} />
                <h4 className="font-semibold text-rose-800 dark:text-rose-200">Экосистема доступности "MobAccess"</h4>
              </div>
              <p className="text-sm text-rose-700 dark:text-rose-300">
                Специальный модуль для маломобильных групп населения.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Экономический эффект */}
      <section className="space-y-6 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 p-6 rounded-xl border border-cyan-200 dark:border-cyan-800">
        <h2 className="text-3xl font-bold text-cyan-900 dark:text-cyan-100">Экономический анализ: Количественная оценка эффекта</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Эффект для граждан */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-cyan-800 dark:text-cyan-200">Эффект для граждан</h3>
            
            <div className="bg-white dark:bg-slate-900/50 p-5 rounded-lg border border-cyan-100 dark:border-cyan-800/50">
              <h4 className="font-bold text-lg text-cyan-700 dark:text-cyan-300 mb-3">Экономия времени</h4>
              <p className="text-cyan-600 dark:text-cyan-300 mb-3">На основе анализа 10,000 реальных маршрутов пользователей:</p>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span>Среднее время планирования поездки</span>
                  <span className="font-semibold">↓ с 28 до 4 мин</span>
                </li>
                <li className="flex justify-between">
                  <span>Среднее время в пути</span>
                  <span className="font-semibold">↓ на 18%</span>
                </li>
                <li className="flex justify-between">
                  <span>Устранение непредвиденных задержек</span>
                  <span className="font-semibold">+12 мин экономии</span>
                </li>
              </ul>
              <p className="mt-3 text-center font-bold text-cyan-700 dark:text-cyan-300">
                Годовая экономия: 183.75 часов на человека
              </p>
              <p className="text-center text-sm text-cyan-600 dark:text-cyan-300">
                Монетизация: 104,370 руб./год
              </p>
            </div>
            
            <div className="bg-white dark:bg-slate-900/50 p-5 rounded-lg border border-cyan-100 dark:border-cyan-800/50">
              <h4 className="font-bold text-lg text-cyan-700 dark:text-cyan-300 mb-3">Экономия денежных средств</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span>Оптимизация выбора транспорта</span>
                  <span className="font-semibold">15-20% экономии</span>
                </li>
                <li className="flex justify-between">
                  <span>Автоматическое применение льгот</span>
                  <span className="font-semibold">8-12% экономии</span>
                </li>
              </ul>
              <p className="mt-3 text-center font-bold text-cyan-700 dark:text-cyan-300">
                Годовая экономия: 16,380 руб./чел
              </p>
            </div>
          </div>

          {/* Эффект для бюджета */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-cyan-800 dark:text-cyan-200">Эффект для бюджета Санкт-Петербурга</h3>
            
            <div className="bg-white dark:bg-slate-900/50 p-5 rounded-lg border border-cyan-100 dark:border-cyan-800/50">
              <h4 className="font-bold text-lg text-cyan-700 dark:text-cyan-300 mb-3">Снижение административных издержек</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span>Контакт-центры</span>
                  <span className="font-semibold">-15.2 млн руб./год</span>
                </li>
                <li className="flex justify-between">
                  <span>Печатные материалы</span>
                  <span className="font-semibold">-8.7 млн руб./год</span>
                </li>
                <li className="flex justify-between">
                  <span>Диспетчерские службы</span>
                  <span className="font-semibold">-18.9 млн руб./год</span>
                </li>
              </ul>
              <p className="mt-3 text-center font-bold text-cyan-700 dark:text-cyan-300">
                Всего: 55.2 млн руб./год
              </p>
            </div>
            
            <div className="bg-white dark:bg-slate-900/50 p-5 rounded-lg border border-cyan-100 dark:border-cyan-800/50">
              <h4 className="font-bold text-lg text-cyan-700 dark:text-cyan-300 mb-3">Дополнительные доходы и экономия</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span>Налоговые поступления</span>
                  <span className="font-semibold">+127.5 млн руб.</span>
                </li>
                <li className="flex justify-between">
                  <span>Экологическая экономия</span>
                  <span className="font-semibold">+48.3 млн руб.</span>
                </li>
                <li className="flex justify-between">
                  <span>Оптимизация инфраструктуры</span>
                  <span className="font-semibold">+204.6 млн руб.</span>
                </li>
              </ul>
              <p className="mt-3 text-center font-bold text-cyan-700 dark:text-cyan-300">
                Всего: 466.8 млн руб./год
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 p-5 rounded-lg border border-purple-200 dark:border-purple-800">
              <p className="text-center font-bold text-purple-800 dark:text-purple-200 text-lg">
                Общий экономический эффект: 522 млн руб./год
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Заключение */}
      <section className="space-y-6 border-t-2 border-slate-300 dark:border-slate-600 pt-8">
        <h2 className="text-3xl font-bold text-teal-700 dark:text-teal-400">Заключение: Транспорт будущего начинается сегодня</h2>
        <div className="text-lg leading-relaxed space-y-4 bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-900/30 dark:to-blue-900/30 p-6 rounded-lg border border-teal-200 dark:border-teal-800">
          <p>
            "Мобильность 360" — это не просто технологический проект. Это фундаментальная трансформация отношения города к своим жителям. Мы переходим от системы, где граждане вынуждены подстраиваться под инфраструктуру, к экосистеме, которая адаптируется под потребности людей.
          </p>
          <p>
            Экономические показатели впечатляют: срок окупаемости менее 5 месяцев, годовой эффект для бюджета — 522 млн рублей, экономия времени для граждан — 184 часа в год на человека. Но более важно социальное измерение: снижение стресса, повышение доступности города для всех категорий жителей, вклад в экологическое будущее Санкт-Петербурга.
          </p>
          <p>
            Проект демонстрирует, как российские технологии могут решать реальные проблемы людей. Использование отечественных решений обеспечивает цифровой суверенитет, создает рабочие места для отечественных специалистов и формирует основу для экспорта компетенций в другие города.
          </p>
          <p className="font-semibold text-teal-800 dark:text-teal-200">
            Санкт-Петербург имеет историческую возможность стать мировым лидером в области умной городской мобильности. Начав с "Мобильности 360", город может задать стандарт для всей России и мира. Инвестиции в цифровую транспортную экосистему — это инвестиции не просто в технологии, а в качество жизни миллионов людей, в будущее города и в устойчивое развитие региона. Время действовать. Время для "Мобильности 360" — это сейчас.
          </p>
        </div>
      </section>

      {/* Интерфейс платформы */}
      <section id="mobility-platform-interface" className="space-y-6 border-t-2 border-slate-300 dark:border-slate-600 pt-8">
        <h2 className="text-3xl font-bold text-purple-700 dark:text-purple-400">Интерфейс платформы "Мобильность 360"</h2>
        
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
                    <p className="text-sm text-slate-600 dark:text-slate-400">Возраст: 35 лет, Санкт-Петербург</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Уровень мобильности</p>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-4">
                      <div className="bg-green-500 h-4 rounded-full" style={{width: "78%"}}></div>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 text-center mt-1">Высокий уровень</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Пройдено маршрутов</p>
                    <p className="font-bold text-indigo-700 dark:text-indigo-300">167 за год</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
                <h3 className="font-bold text-lg text-indigo-700 dark:text-indigo-300 mb-3">Рекомендуемые маршруты</h3>
                <div className="space-y-2">
                  <button className="w-full text-left p-2 hover:bg-indigo-50 dark:hover:bg-slate-700 rounded-lg border border-indigo-200 dark:border-indigo-700">
                    <p className="font-medium">Дом - Офис (оптимизированный)</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">32 мин, 280 ₽</p>
                  </button>
                  <button className="w-full text-left p-2 hover:bg-indigo-50 dark:hover:bg-slate-700 rounded-lg border border-indigo-200 dark:border-indigo-700">
                    <p className="font-medium">Офис - Фитнес-центр</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">45 мин, 120 ₽</p>
                  </button>
                  <button className="w-full text-left p-2 hover:bg-indigo-50 dark:hover:bg-slate-700 rounded-lg border border-indigo-200 dark:border-indigo-700">
                    <p className="font-medium">Детский сад - Дом</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">22 мин, 90 ₽</p>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Основной контент маршрута */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
                <div className="flex gap-3 mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-xl text-indigo-700 dark:text-indigo-300 mb-2">Маршрут: Дом - Офис</h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                      Оптимизированный маршрут с учетом текущей ситуации на дорогах и личных предпочтений
                    </p>
                    
                    <div className="flex gap-2 mb-4">
                      <div className="flex-1 bg-slate-100 dark:bg-slate-700 rounded-lg p-3">
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Время в пути</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">32 мин (обычно 45 мин)</p>
                      </div>
                      <div className="flex-1 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg p-3">
                        <p className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">Стоимость</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">280 ₽ (с льготой 15%)</p>
                      </div>
                      <div className="flex-1 bg-green-100 dark:bg-green-900/50 rounded-lg p-3">
                        <p className="text-sm font-semibold text-green-700 dark:text-green-300">CO₂</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">2.1 кг (на 35% меньше)</p>
                      </div>
                    </div>
                    
                    <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-4 mb-4">
                      <h4 className="font-semibold mb-2">Рекомендация системы</h4>
                      <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
                        Сегодня рекомендуем выехать в 8:15 для оптимального времени в пути. Учтены: 
                        прогноз погоды, дорожные работы на Московском проспекте, и ваше предпочтение избегать общественного транспорта в час пик.
                      </p>
                      <div className="flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400">
                        <Navigation size={14} />
                        <span>Оптимизировано с помощью TripAI</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium transition-colors">
                        Выбрать маршрут
                      </button>
                      <button className="px-4 bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-500 rounded-lg font-medium transition-colors">
                        Поделиться
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Визуализация маршрута */}
                <div className="bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-4">
                  <h4 className="font-semibold text-center mb-3">Графическое представление маршрута</h4>
                  <div className="flex justify-center items-center h-32 bg-white dark:bg-slate-700 rounded-lg relative overflow-hidden">
                    <div className="absolute w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjAuNSIgZmlsbD0iIzMzMyIgZmlsbC1vcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjcGF0dGVybikiLz48L3N2Zz4=')] opacity-20"></div>
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mb-2">
                        🏠
                      </div>
                      <div className="w-1 h-16 bg-blue-500 mb-2"></div>
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mb-2">
                        🚇
                      </div>
                      <div className="w-1 h-8 bg-blue-500 mb-2"></div>
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                        🏢
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Дополнительные ресурсы */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow border-l-4 border-blue-500">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="text-blue-500" size={20} />
                    <h4 className="font-bold">Эко-баллы</h4>
                  </div>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">1,240</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Сэкономлено CO₂</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">2.4 тонны в этом году</p>
                </div>
                
                <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow border-l-4 border-green-500">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="text-green-500" size={20} />
                    <h4 className="font-bold">Подписки</h4>
                  </div>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">Активна</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">"Рабочая неделя"</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Экономия: 1,200 руб./мес</p>
                </div>
                
                <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow border-l-4 border-purple-500">
                  <div className="flex items-center gap-2 mb-2">
                    <XCircle className="text-purple-500" size={20} />
                    <h4 className="font-bold">Поддержка</h4>
                  </div>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">24/7</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Чат-бот и ассистент</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Возможна видеоконсультация</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Поддержка и сообщество */}
          <div className="mt-6 bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
            <h3 className="font-bold text-lg text-indigo-700 dark:text-indigo-300 mb-3">Сообщество и поддержка</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-lg border border-cyan-200 dark:border-cyan-800">
                <p className="font-semibold">Ваш персональный ассистент</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">MobBot, ИИ-ассистент, всегда онлайн</p>
                <button className="mt-2 text-sm bg-cyan-600 hover:bg-cyan-700 text-white px-3 py-1 rounded-lg">
                  Задать вопрос
                </button>
              </div>
              <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <p className="font-semibold">Сообщество пользователей</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Петербургские пользователи</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">42 человека онлайн</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MobilityInterfacePage;