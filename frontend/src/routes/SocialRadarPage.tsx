import React, { useRef, useState } from 'react';
import { Button } from '../components/ui/button';
import { Download, Printer, BarChart3, Target, Users, Shield, TrendingUp, MapPin, AlertTriangle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const SocialRadarPage: React.FC = () => {
  const articleRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState('main');

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
          filename: "social-radar-project.pdf",
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

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={articleRef} className="space-y-10 leading-relaxed text-slate-800 dark:text-slate-100">
      {/* Кнопки действий */}
      <div className="fixed top-4 right-4 z-50 flex flex-wrap gap-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur p-3 rounded-xl border border-slate-200 dark:border-slate-700 print:hidden">
        <Button onClick={handlePrint} variant="ghost" className="flex items-center gap-2 text-sm border border-slate-200 dark:border-slate-700">
          <Printer size={14} />
          Печать
        </Button>
        <Button onClick={handleDownloadPDF} className="flex items-center gap-2 text-sm bg-blue-600 hover:bg-blue-700">
          <Download size={14} />
          PDF
        </Button>
      </div>

      {/* Навигация */}
      <nav className="fixed top-1/2 right-4 transform -translate-y-1/2 hidden lg:block z-40 print:hidden">
        <div className="bg-white dark:bg-slate-800 p-2 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
          {[
            { id: 'main', label: 'Главная', icon: Target },
            { id: 'problem', label: 'Проблема', icon: AlertTriangle },
            { id: 'solution', label: 'Решение', icon: CheckCircle },
            { id: 'tech', label: 'Техническое', icon: BarChart3 },
            { id: 'implementation', label: 'Внедрение', icon: TrendingUp },
            { id: 'risks', label: 'Риски', icon: Shield },
            { id: 'finance', label: 'Финансы', icon: Users }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`flex items-center gap-2 w-full px-3 py-2 text-sm rounded-lg mb-1 ${
                activeSection === item.id 
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' 
                  : 'hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <item.icon size={16} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Заголовок */}
      <section id="main" className="border-b border-slate-200 dark:border-slate-700 pb-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 rounded-2xl p-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-4 rounded-2xl">
            <Target className="text-white h-12 w-12" />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              «Социальный радар»
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-800 dark:text-white mb-2">
              ИИ-система раннего выявления семей, нуждающихся в поддержке
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-2">
              Пилотный проект для Министерства социального развития Московской области
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
              <Shield size={16} />
              Задание 16
            </div>
          </div>
        </div>
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-600 dark:text-slate-400 italic">
            Авторы: Артём Бурнашов и Мария Маклаева
          </p>
        </div>
      </section>

      {/* Анализ проблемы */}
      <motion.section
        id="problem"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-slate-800/50 rounded-2xl p-8 border border-slate-200 dark:border-slate-700"
      >
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
          <AlertTriangle className="text-red-600" size={32} />
          Анализ проблемы
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white">Текущая ситуация в Московской области</h3>
            <div className="space-y-4">
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-500">
                <h4 className="font-semibold text-red-800 dark:text-red-200">42 368 семей</h4>
                <p className="text-red-700 dark:text-red-300">обратились за социальной помощью впервые в 2023 году</p>
              </div>
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-200">68% обращений</h4>
                <p className="text-yellow-700 dark:text-yellow-300">имели характер экстренной помощи</p>
              </div>
              <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border-l-4 border-orange-500">
                <h4 className="font-semibold text-orange-800 dark:text-orange-200">3.5 месяца</h4>
                <p className="text-orange-700 dark:text-orange-300">среднее время с момента возникновения проблемы до обращения в соцзащиту</p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border-l-4 border-purple-500">
                <h4 className="font-semibold text-purple-800 dark:text-purple-200">57% семей</h4>
                <p className="text-purple-700 dark:text-purple-300">требовали комплексной помощи по 2-3 направлениям</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white">Проблемы традиционного подхода</h3>
            <div className="space-y-3">
              {[
                { icon: "🔄", text: "Реактивный характер помощи: Социальные службы реагируют на уже возникшие проблемы вместо их предотвращения" },
                { icon: "🔗", text: "Фрагментация данных: Информация о семьях хранится в изолированных системах" },
                { icon: "👤", text: "Недостаток ресурсов: На одного социального работника приходится 250-300 семей" },
                { icon: "🧠", text: "Субъективность оценки: Решения принимаются на основе ограниченной информации" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-slate-700 dark:text-slate-300">{item.text}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 flex items-center gap-2">
                <MapPin className="text-blue-600" size={16} />
                Кейс из практики
              </h4>
              <p className="mt-2 text-blue-700 dark:text-blue-300">
                Семья из Одинцовского округа потеряла кормильца в январе 2023 года. Первое обращение в соцзащиту было только в апреле, когда накопилась задолженность по ЖКХ и кредитам. Стоимость комплексной помощи составила 420 тыс. руб., тогда как при раннем выявлении (в феврале) можно было ограничиться психологической поддержкой и содействием в трудоустройстве с бюджетом 85 тыс. руб.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Обоснование целесообразности ИИ */}
      <motion.section
        id="solution"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-8 border border-green-200 dark:border-slate-700"
      >
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
          <CheckCircle className="text-green-600" size={32} />
          Обоснование целесообразности ИИ
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white">Почему традиционные методы неэффективны</h3>
            <div className="space-y-3">
              {[
                { icon: "👥", text: "Человеческий фактор: Социальные работники не могут вручную анализировать данные по 1.9 млн детей и 2.3 млн семей области" },
                { icon: "⚡", text: "Скорость реакции: Ручной анализ занимает 2-3 недели, за которые ситуация может усугубиться" },
                { icon: "🔍", text: "Прогностическая слепота: Традиционные методы не позволяют выявить скрытые паттерны и корреляции" },
                { icon: "📏", text: "Ограниченный охват: Только 15-20% семей получают профилактическую поддержку из-за нехватки специалистов" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-white dark:bg-slate-700/50 rounded-lg">
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-slate-700 dark:text-slate-300">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white">Преимущества ИИ-подхода</h3>
            <div className="space-y-3">
              {[
                { icon: "🔮", text: "Прогностическая аналитика: ML-модели могут выявлять риски за 1-2 месяца до обращения в соцзащиту" },
                { icon: "🔄", text: "Комплексный анализ: Обработка данных из 12+ источников в единой системе" },
                { icon: "🌐", text: "Масштабируемость: Система может обрабатывать данные по всем 7 млн жителей области" },
                { icon: "⚖️", text: "Объективность: Алгоритмы принимают решения на основе данных, а не субъективных оценок" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-white dark:bg-slate-700/50 rounded-lg">
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-slate-700 dark:text-slate-300">{item.text}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-teal-100 dark:bg-teal-900/30 rounded-lg border border-teal-300 dark:border-teal-800">
              <h4 className="font-semibold text-teal-800 dark:text-teal-200 flex items-center gap-2">
                <TrendingUp className="text-teal-600" size={16} />
                Расчет потенциального эффекта
              </h4>
              <ul className="mt-2 space-y-1 text-teal-700 dark:text-teal-300">
                <li>• При раннем выявлении 30% семей можно снизить затраты на 45%</li>
                <li>• Для Московской области это экономия <strong>1.2 млрд руб. в год</strong></li>
                <li>• Снижение нагрузки на социальных работников на 35%</li>
                <li>• Повышение качества жизни 15 000+ семей ежегодно</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Техническое задание */}
      <motion.section
        id="tech"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white dark:bg-slate-800/50 rounded-2xl p-8 border border-slate-200 dark:border-slate-700"
      >
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
          <BarChart3 className="text-blue-600" size={32} />
          Техническое задание на разработку
        </h2>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white">Архитектура системы</h3>
          <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl font-mono text-sm">
            <pre className="whitespace-pre-wrap">
{`┌─────────────────────────────────────────────────────────────────────┐
│                  ИСТОЧНИКИ ДАННЫХ                                    │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │
│  │ Соцзащита   │  │ Здравоохра- │  │ Образова-   │  │ ЖКХ и       │  │
│  │ (обращения, │  │ ние (запро- │  │ ние (успе-  │  │ финансы     │  │
│  │ льготы)     │  │ сы анали-   │  │ ваемость)   │  │ (задолжен-  │  │
│  └─────────────┘  │ зов)        │  └─────────────┘  │ ности)      │  │
│                    └─────────────┘                   └─────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
                    │               │               │
                    ▼               ▼               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                   СЛОЙ ИНТЕГРАЦИИ С СМЭВ                             │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  Адаптер СМЭВ                                                │  │
│  │  - SOAP/REST API                                             │  │
│  │  - X.509 сертификаты                                         │  │
│  │  - WS-Security                                               │  │
│  │  - SAML 2.0 аутентификация                                   │  │
│  └───────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                   ХРАНИЛИЩЕ ДАННЫХ                                   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │
│  │ Data Lake   │  │ Операционная│  │ Аналитичес- │  │ Реестр      │  │
│  │ (сырые дан- │  │ БД          │  │ кая БД      │  │ рисков      │  │
│  │ ные)        │  │ (PostgreSQL)│  │ (ClickHouse)│  │ (графовая)  │  │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘  │
└─────────────────────────────────────────────────────────────────────┘`}
            </pre>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-3 text-slate-800 dark:text-white">Функциональные требования</h3>
            <ul className="space-y-2">
              <li className="p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">Модуль прогнозирования рисков</li>
              <li className="p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">Модуль интеграции с внешними системами</li>
              <li className="p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">Модуль работы с социальными работниками</li>
              <li className="p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">Модуль отчетности и аналитики</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3 text-slate-800 dark:text-white">Нефункциональные требования</h3>
            <ul className="space-y-2">
              <li className="p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">Производительность: 50 млн записей в сутки</li>
              <li className="p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">Доступность: 99.95% uptime</li>
              <li className="p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">Безопасность: соответствие ФЗ-152</li>
              <li className="p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">Масштабируемость: до 10 млн записей в год</li>
            </ul>
          </div>
        </div>
      </motion.section>

      {/* План пилотного внедрения */}
      <motion.section
        id="implementation"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-8 border border-indigo-200 dark:border-slate-700"
      >
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
          <TrendingUp className="text-indigo-600" size={32} />
          План пилотного внедрения
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { 
              stage: "Подготовительный", 
              duration: "2 месяца", 
              description: "Формирование команды, сбор данных, разработка архитектуры", 
              color: "from-blue-500 to-blue-600",
              icon: "📋"
            },
            { 
              stage: "Разработка и тестирование", 
              duration: "3 месяца", 
              description: "Создание MVP, обучение моделей, тестирование", 
              color: "from-green-500 to-green-600",
              icon: "🧪"
            },
            { 
              stage: "Пилотное внедрение", 
              duration: "4 месяца", 
              description: "Запуск в 3 муниципальных образованиях", 
              color: "from-yellow-500 to-yellow-600",
              icon: "🚀"
            },
            { 
              stage: "Оценка результатов", 
              duration: "1 месяц", 
              description: "Сравнительный анализ, формирование отчета", 
              color: "from-purple-500 to-purple-600",
              icon: "📊"
            }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              className={`bg-gradient-to-br ${item.color} text-white rounded-2xl p-6 shadow-lg`}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="font-bold text-lg mb-2">{item.stage}</h3>
              <p className="text-sm opacity-90 mb-2">{item.duration}</p>
              <p className="text-xs opacity-80">{item.description}</p>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-8 overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
            <thead className="bg-slate-100 dark:bg-slate-700">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-200 uppercase tracking-wider">Метрика</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-200 uppercase tracking-wider">Базовое значение</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-200 uppercase tracking-wider">Целевое значение</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
              <tr>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white">Скорость выявления</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">3.5 месяца</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">≤14 дней</td>
              </tr>
              <tr>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white">Точность прогнозов</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">-</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">≥85%</td>
              </tr>
              <tr>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white">Снижение экстренных обращений</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">100%</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">≤65%</td>
              </tr>
              <tr>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white">Сокращение рабочего времени</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">100%</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">≥25%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.section>

      {/* Оценка рисков */}
      <motion.section
        id="risks"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white dark:bg-slate-800/50 rounded-2xl p-8 border border-slate-200 dark:border-slate-700"
      >
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
          <Shield className="text-amber-600" size={32} />
          Оценка рисков
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white">Технические риски</h3>
            <div className="space-y-4">
              <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                <h4 className="font-semibold text-amber-800 dark:text-amber-200">Некачественные данные</h4>
                <p className="text-amber-700 dark:text-amber-300 mt-2">Вероятность: Высокая | Влияние: Критическое</p>
                <p className="text-amber-700 dark:text-amber-300 mt-1">Меры: Поэтапное подключение источников, контроль качества, ML-методы обработки</p>
              </div>
              <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                <h4 className="font-semibold text-amber-800 dark:text-amber-200">Сбои в работе системы</h4>
                <p className="text-amber-700 dark:text-amber-300 mt-2">Вероятность: Средняя | Влияние: Высокое</p>
                <p className="text-amber-700 dark:text-amber-300 mt-1">Меры: Резервирование, отказоустойчивая архитектура, ежедневное резервное копирование</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white">Этические риски</h3>
            <div className="space-y-4">
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                <h4 className="font-semibold text-red-800 dark:text-red-200">Дискриминация отдельных групп населения</h4>
                <p className="text-red-700 dark:text-red-300 mt-2">Вероятность: Средняя | Влияние: Критическое</p>
                <p className="text-red-700 dark:text-red-300 mt-1">Меры: Регулярный аудит алгоритмов, этический комитет, разнообразие обучающей выборки</p>
              </div>
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                <h4 className="font-semibold text-red-800 dark:text-red-200">Нарушение конфиденциальности</h4>
                <p className="text-red-700 dark:text-red-300 mt-2">Вероятность: Высокая | Влияние: Критическое</p>
                <p className="text-red-700 dark:text-red-300 mt-1">Меры: Анонимизация данных, разграничение доступа, шифрование</p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Расчет TCO */}
      <motion.section
        id="finance"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-8 border border-emerald-200 dark:border-slate-700"
      >
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
          <TrendingUp className="text-emerald-600" size={32} />
          Расчет TCO на 3 года
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-semibold text-lg mb-3 text-slate-800 dark:text-white">Единовременные затраты</h3>
            <p className="text-2xl font-bold text-emerald-600">41.1 млн руб.</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">первый год</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-semibold text-lg mb-3 text-slate-800 dark:text-white">Ежегодные затраты</h3>
            <p className="text-2xl font-bold text-blue-600">32.7 млн руб.</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">на третий год</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-semibold text-lg mb-3 text-slate-800 dark:text-white">Экономический эффект</h3>
            <p className="text-2xl font-bold text-purple-600">4.95 млрд руб.</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">за 3 года</p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
          <h3 className="font-semibold text-lg mb-4 text-slate-800 dark:text-white">Ключевые финансовые показатели</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-emerald-600">2.5 мес.</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Срок окупаемости</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">4.78 млрд руб.</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">NPV</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-600">347%</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">IRR</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Заключение */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8"
      >
        <h2 className="text-3xl font-bold mb-6">Заключение</h2>
        <div className="prose prose-invert max-w-none">
          <p className="text-lg mb-4">
            «Социальный радар» представляет собой не просто технологическое решение, а новый подход к социальной политике, где технологии служат человеку, а не наоборот. Проект демонстрирует, как искусственный интеллект может быть использован для решения реальных социальных проблем и повышения качества жизни граждан.
          </p>
          <p className="text-lg mb-4">
            Внедрение системы позволит Московской области стать лидером в области цифровой трансформации социальной сферы, создав прецедент для других регионов России. Инвестиции в проактивную социальную поддержку сегодня — это вклад в стабильность и процветание региона завтра.
          </p>
          <p className="text-lg">
            Проект готов к запуску пилотной фазы при наличии необходимых согласований и финансирования. «Социальный радар» — это инструмент для создания более справедливого и безопасного общества для всех жителей Московской области.
          </p>
        </div>
      </motion.section>
    </div>
  );
};

export default SocialRadarPage;