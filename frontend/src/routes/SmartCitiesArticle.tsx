import React, { useRef } from "react";
import { Button } from "../components/ui/button";
import { Download, Printer } from "lucide-react";

const SmartCitiesArticle: React.FC = () => {
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
          filename: "social-radar-research.pdf",
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
          <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded-full">
            Задание 12
          </span>
        </div>
        <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
          Система раннего выявления социальных рисков «Социальный радар» с интеграцией в СМЭВ
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 mb-6">
          Комплексное решение для цифровой трансформации социального сопровождения в муниципалитетах
        </p>
        <div className="text-center mb-6">
          <p className="text-sm text-slate-600 dark:text-slate-400 italic">
            Авторы: Артём Бурнашов и Мария Маклаева
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          <div>
            <span className="font-semibold">Дисциплина:</span>
            <br />
            <span className="text-slate-700 dark:text-slate-300">Информационно-аналитические технологии</span>
          </div>
        </div>
      </section>

      {/* Введение */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold">Введение: Вызовы современной социальной сферы</h2>
        <div className="space-y-6">
          <p className="text-lg leading-relaxed">
            Современные муниципалитеты сталкиваются с комплексом взаимосвязанных проблем в социальной сфере, требующих системного цифрового решения. Ситуация усугубляется ростом социальной напряженности и фрагментацией данных по различным ведомствам. Статистика показывает тревожные тенденции:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: "📈", title: "Рост проблем", value: "+23%", desc: "рост числа семей в трудной жизненной ситуации за 2023-2024 гг." },
              { icon: "⏳", title: "Время выявления", value: "30 дней", desc: "среднее время выявления проблемной семьи в текущих условиях" },
              { icon: "🏢", title: "Разрозненные данные", value: "15+ ведомств", desc: "хранят разрозненные данные о гражданах" },
              { icon: "✍️", title: "Ручная обработка", value: "70%", desc: "доля ручной обработки информации в работе соцработников" }
            ].map((stat, i) => (
              <div key={i} className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="font-semibold text-slate-900 dark:text-white">{stat.title}</div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stat.value}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">{stat.desc}</div>
              </div>
            ))}
          </div>
          
          <p className="text-lg leading-relaxed">
            Эти проблемы требуют перехода от реактивного подхода к проактивному выявлению социальных рисков. Проект «Социальный радар» с интеграцией в СМЭВ предлагает комплексное решение для цифровой трансформации социального сопровождения в муниципалитетах.
          </p>
        </div>
      </section>

      {/* Цели и стратегические приоритеты */}
      <section className="space-y-6 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
        <h2 className="text-3xl font-bold text-blue-900 dark:text-blue-100">Цели и стратегические приоритеты проекта</h2>
        
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold mb-4">Основная цель</h3>
            <p className="text-lg">
              Создание системы раннего выявления социальных рисков на основе интеграции данных из СМЭВ и муниципальных источников для перехода от реактивного к проактивному предоставлению социальных услуг.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold mb-4">Конкретные цели проекта</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-100 dark:bg-slate-800">
                  <tr>
                    <th className="px-4 py-2 font-semibold">Цель</th>
                    <th className="px-4 py-2 font-semibold">Текущий показатель</th>
                    <th className="px-4 py-2 font-semibold">Целевой показатель</th>
                    <th className="px-4 py-2 font-semibold">Изменение</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  <tr>
                    <td className="px-4 py-3">Время выявления семей в трудной жизненной ситуации</td>
                    <td className="px-4 py-3">30 дней</td>
                    <td className="px-4 py-3">3 дня</td>
                    <td className="px-4 py-3 text-red-600 dark:text-red-400">↓ 90%</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Охват населения проактивными социальными услугами</td>
                    <td className="px-4 py-3">Базовый уровень</td>
                    <td className="px-4 py-3">+40%</td>
                    <td className="px-4 py-3 text-green-600 dark:text-green-400">↑ 40%</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Количество повторных обращений граждан</td>
                    <td className="px-4 py-3">100%</td>
                    <td className="px-4 py-3">65%</td>
                    <td className="px-4 py-3 text-green-600 dark:text-green-400">↓ 35%</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Эффективность распределения социальных ресурсов</td>
                    <td className="px-4 py-3">Низкая</td>
                    <td className="px-4 py-3">Высокая (на основе аналитики)</td>
                    <td className="px-4 py-3 text-green-600 dark:text-green-400">Значительное улучшение</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Скорость межведомственного взаимодействия</td>
                    <td className="px-4 py-3">5-7 дней</td>
                    <td className="px-4 py-3">1 рабочий день</td>
                    <td className="px-4 py-3 text-green-600 dark:text-green-400">↑ 80%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold mb-4">Ключевые показатели эффективности (KPI)</h3>
            <ul className="space-y-3">
              {[
                { icon: "⏱️", text: "Сокращение времени принятия решений по социальной поддержке на 65%" },
                { icon: "😊", text: "Увеличение удовлетворенности жителей качеством соцподдержки на 30%" },
                { icon: "💰", text: "Снижение бюджетных расходов на экстренные меры поддержки на 25%" },
                { icon: "📈", text: "Рост числа проактивно оказанных услуг в 3 раза" }
              ].map((kpi, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-2xl">{kpi.icon}</span>
                  <span className="text-lg">{kpi.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Архитектура системы */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold">Архитектура системы: Технологическая основа</h2>
        
        <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
          <h3 className="text-xl font-semibold mb-4">Общая архитектура решения</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Внешние источники данных */}
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">Внешние источники данных</h4>
              <ul className="space-y-3">
                {[
                  { icon: "🏛️", name: "СМЭВ 3.0", desc: "ЕСИА, ГРЗ, ГРП" },
                  { icon: "🏠", name: "ГИС ЖКХ", desc: "Аварии, обращения" },
                  { icon: "🏥", name: "Медучреждения", desc: "Эпидемиологическая обстановка" },
                  { icon: "🎓", name: "Учебные заведения", desc: "Успеваемость" }
                ].map((source, idx) => (
                  <li key={idx} className="flex items-start gap-3 p-2 bg-white dark:bg-slate-800/50 rounded">
                    <span className="text-xl">{source.icon}</span>
                    <div>
                      <div className="font-medium">{source.name}</div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">{source.desc}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Слой интеграции */}
            <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg border-l-4 border-green-500">
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-3">Слой интеграции с СМЭВ</h4>
              <div className="p-3 bg-white dark:bg-slate-800/50 rounded">
                <div className="font-medium mb-2">Адаптер СМЭВ</div>
                <ul className="text-xs space-y-1">
                  <li>SOAP/REST API</li>
                  <li>X.509 сертификаты</li>
                  <li>WS-Security</li>
                  <li>SAML 2.0 аутентификация</li>
                </ul>
              </div>
            </div>

            {/* Единое хранилище данных */}
            <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg border-l-4 border-purple-500">
              <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-3">Единое хранилище данных</h4>
              <ul className="space-y-3">
                {[
                  { icon: "lake", name: "Data Lake", desc: "Сырые данные" },
                  { icon: "💾", name: "Операционная БД", desc: "PostgreSQL" },
                  { icon: "📊", name: "Аналитическая БД", desc: "ClickHouse" },
                  { icon: "📋", name: "Реестр соц. рисков", desc: "Графовая БД" }
                ].map((storage, idx) => (
                  <li key={idx} className="flex items-start gap-3 p-2 bg-white dark:bg-slate-800/50 rounded">
                    <span className="text-xl">{storage.icon === 'lake' ? '💧' : storage.icon}</span>
                    <div>
                      <div className="font-medium">{storage.name}</div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">{storage.desc}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Аналитический слой */}
          <div className="mt-6 bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg border-l-4 border-yellow-500">
            <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-3">Аналитический слой</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { icon: "🤖", name: "ML-модели", desc: "Прогноз рисков" },
                { icon: "⚙️", name: "Правила бизнес-логики", desc: "Автоматизация" },
                { icon: "🗺️", name: "Геоаналитика", desc: "PostGIS" },
                { icon: "📈", name: "Панель управления", desc: "Grafana" }
              ].map((component, idx) => (
                <div key={idx} className="p-3 bg-white dark:bg-slate-800/50 rounded text-center">
                  <div className="text-2xl mb-1">{component.icon}</div>
                  <div className="font-medium text-sm">{component.name}</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">{component.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Слой предоставления услуг */}
          <div className="mt-6 bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-lg border-l-4 border-indigo-500">
            <h4 className="font-semibold text-indigo-800 dark:text-indigo-200 mb-3">Слой предоставления услуг</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { icon: "📱", name: "Мобильное приложение", desc: "Для жителей" },
                { icon: "🌍", name: "Веб-портал", desc: "Для соцработников" },
                { icon: "📞", name: "Call-центр", desc: "Автоматические звонки" },
                { icon: "🔌", name: "API интеграции", desc: "С внешними системами" }
              ].map((service, idx) => (
                <div key={idx} className="p-3 bg-white dark:bg-slate-800/50 rounded text-center">
                  <div className="text-2xl mb-1">{service.icon}</div>
                  <div className="font-medium text-sm">{service.name}</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">{service.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
          <h3 className="text-xl font-semibold mb-4">Технические требования к интеграции с СМЭВ</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-lg text-red-600 dark:text-red-400">Требования к безопасности:</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Соответствие требованиям ФСТЭК РФ и приказа ФСБ России №378</li>
                <li>Использование квалифицированных сертификатов КриптоПро CSP 5.0</li>
                <li>Шифрование данных по ГОСТ Р 34.12-2015 (Кузнечик)</li>
                <li>Аудит всех операций с логированием в SIEM-систему</li>
                <li>Разделение прав доступа по принципу минимальных привилегий</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-lg text-green-600 dark:text-green-400">Требования к производительности:</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Максимальное время ответа СМЭВ: ≤ 3 секунды</li>
                <li>Пропускная способность: ≥ 1000 запросов/секунду</li>
                <li>Время восстановления после сбоя: ≤ 5 минут</li>
                <li>Доступность системы: ≥ 99.95%</li>
                <li>Время обработки пакетного запроса (10 000 записей): ≤ 15 минут</li>
              </ul>
            </div>
          </div>

          <div className="space-y-4 mt-6">
            <h4 className="font-semibold text-lg text-blue-600 dark:text-blue-400">Требования к форматам данных:</h4>
            <ul className="list-disc pl-6 space-y-2">
              <li>Основной формат обмена: XML по схемам СМЭВ 3.0</li>
              <li>Резервный формат: JSON для внутренних систем</li>
              <li>Кодировка: UTF-8</li>
              <li>Временные метки: ISO 8601 с временной зоной UTC+3</li>
              <li>Идентификаторы: UUID v4 для всех сущностей</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Форматы данных и регламенты обмена */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold">Форматы данных и регламенты обмена</h2>
        
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold mb-4">Ключевые форматы данных СМЭВ</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="text-2xl mb-2">👤</div>
                <h4 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">Сведения о гражданине (ЕСИА)</h4>
                <p className="text-sm">
                  Структурированный запрос информации о личности: имя, дата рождения, адрес регистрации, данные о доходах.
                </p>
                <div className="mt-3">
                  <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">XML-формат</span>
                  <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded ml-1">СНИЛС/ИНН</span>
                </div>
              </div>

              <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg border border-green-200 dark:border-green-800">
                <div className="text-2xl mb-2">🏠</div>
                <h4 className="font-semibold mb-2 text-green-800 dark:text-green-200">Сведения о недвижимости (ЕГРН)</h4>
                <p className="text-sm">
                  Информация о правах собственности, кадастровой стоимости, ограничениях на недвижимое имущество.
                </p>
                <div className="mt-3">
                  <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">Кадастровый номер</span>
                  <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded ml-1">СНИЛС владельца</span>
                </div>
              </div>

              <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg border border-purple-200 dark:border-purple-800">
                <div className="text-2xl mb-2">💰</div>
                <h4 className="font-semibold mb-2 text-purple-800 dark:text-purple-200">Социальные выплаты (ГРЗ)</h4>
                <p className="text-sm">
                  Данные о получаемых гражданином социальных выплатах: пособия, пенсии, субсидии за определенный период.
                </p>
                <div className="mt-3">
                  <span className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded">СНИЛС гражданина</span>
                  <span className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded ml-1">Период</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold mb-4">Регламенты обмена данными</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="text-2xl mb-3 text-blue-600 dark:text-blue-400">⚡</div>
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">Синхронный обмен (реальное время)</h4>
                <div className="space-y-2">
                  <div><span className="font-medium">Частота:</span> По требованию</div>
                  <div><span className="font-medium">Время ответа:</span> ≤ 3 сек.</div>
                  <div><span className="font-medium">Сценарии:</span> Работа с конкретной семьей, экстренная ситуация</div>
                </div>
              </div>

              <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg border border-green-200 dark:border-green-800">
                <div className="text-2xl mb-3 text-green-600 dark:text-green-400">📦</div>
                <h4 className="font-semibold text-green-800 dark:text-green-200 mb-3">Асинхронный обмен (пакетный)</h4>
                <div className="space-y-2">
                  <div><span className="font-medium">Частота:</span> Ежесуточно</div>
                  <div><span className="font-medium">Обработка:</span> До 4 часов</div>
                  <div><span className="font-medium">Сценарии:</span> Обновление реестров, прогнозные модели</div>
                </div>
              </div>

              <div className="p-4 bg-red-50 dark:bg-red-900/30 rounded-lg border border-red-200 dark:border-red-800">
                <div className="text-2xl mb-3 text-red-600 dark:text-red-400">🚨</div>
                <h4 className="font-semibold text-red-800 dark:text-red-200 mb-3">Экстренный обмен</h4>
                <div className="space-y-2">
                  <div><span className="font-medium">Частота:</span> По требованию</div>
                  <div><span className="font-medium">Время ответа:</span> ≤ 30 сек.</div>
                  <div><span className="font-medium">Сценарии:</span> Угрозы жизни, ЧС, ситуации с детьми</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* План-график реализации */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold">Детальный план-график реализации проекта</h2>
        
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold mb-4">Фаза 1: Подготовительная (2 месяца)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-100 dark:bg-slate-800">
                  <tr>
                    <th className="px-4 py-2 font-semibold">Этап</th>
                    <th className="px-4 py-2 font-semibold">Сроки</th>
                    <th className="px-4 py-2 font-semibold">Ответственные</th>
                    <th className="px-4 py-2 font-semibold">Результаты</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  <tr>
                    <td className="px-4 py-3">Анализ требований и согласование с ФНС</td>
                    <td className="px-4 py-3">2 недели</td>
                    <td className="px-4 py-3">Руководитель проекта, юристы</td>
                    <td className="px-4 py-3">Утвержденное ТЗ с юридической экспертизой</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Получение сертификатов и регистрация в СМЭВ</td>
                    <td className="px-4 py-3">3 недели</td>
                    <td className="px-4 py-3">Специалист по ИБ, администратор СМЭВ</td>
                    <td className="px-4 py-3">Сертификаты КриптоПро, регистрация в реестре СМЭВ</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Разработка архитектуры и технического задания</td>
                    <td className="px-4 py-3">4 недели</td>
                    <td className="px-4 py-3">Архитектор, аналитики</td>
                    <td className="px-4 py-3">Детальная архитектура, ТЗ на разработку</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Формирование команды проекта</td>
                    <td className="px-4 py-3">2 недели</td>
                    <td className="px-4 py-3">HR, руководитель проекта</td>
                    <td className="px-4 py-3">Сформированная команда из 8 человек</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold mb-4">Фаза 2: Разработка и тестирование (4 месяца)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-100 dark:bg-slate-800">
                  <tr>
                    <th className="px-4 py-2 font-semibold">Этап</th>
                    <th className="px-4 py-2 font-semibold">Сроки</th>
                    <th className="px-4 py-2 font-semibold">Ответственные</th>
                    <th className="px-4 py-2 font-semibold">Результаты</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  <tr>
                    <td className="px-4 py-3">Разработка модуля интеграции с СМЭВ</td>
                    <td className="px-4 py-3">6 недель</td>
                    <td className="px-4 py-3">Backend-разработчики, интеграторы</td>
                    <td className="px-4 py-3">Рабочий модуль интеграции с тестами</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Разработка аналитических моделей</td>
                    <td className="px-4 py-3">8 недель</td>
                    <td className="px-4 py-3">Data scientists, аналитики</td>
                    <td className="px-4 py-3">5 ML-моделей с точностью ≥85%</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Разработка пользовательских интерфейсов</td>
                    <td className="px-4 py-3">6 недель</td>
                    <td className="px-4 py-3">Frontend-разработчики, дизайнеры</td>
                    <td className="px-4 py-3">Веб-портал и мобильное приложение</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Интеграционное тестирование с СМЭВ</td>
                    <td className="px-4 py-3">4 недели</td>
                    <td className="px-4 py-3">Тестировщики, интеграторы</td>
                    <td className="px-4 py-3">Протокол тестирования, исправление дефектов</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold mb-4">Фаза 3: Внедрение и пилот (3 месяца)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-100 dark:bg-slate-800">
                  <tr>
                    <th className="px-4 py-2 font-semibold">Этап</th>
                    <th className="px-4 py-2 font-semibold">Сроки</th>
                    <th className="px-4 py-2 font-semibold">Ответственные</th>
                    <th className="px-4 py-2 font-semibold">Результаты</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  <tr>
                    <td className="px-4 py-3">Пилотное внедрение в 3 районах</td>
                    <td className="px-4 py-3">6 недель</td>
                    <td className="px-4 py-3">Координаторы проекта, соцработники</td>
                    <td className="px-4 py-3">Отчет по пилоту с рекомендациями</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Обучение пользователей</td>
                    <td className="px-4 py-3">3 недели</td>
                    <td className="px-4 py-3">Тренеры, методисты</td>
                    <td className="px-4 py-3">Обучено 150 соцработников и администраторов</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Настройка мониторинга и аналитики</td>
                    <td className="px-4 py-3">2 недели</td>
                    <td className="px-4 py-3">DevOps, аналитики</td>
                    <td className="px-4 py-3">Рабочие дашборды и системы алертинга</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Приемка проекта</td>
                    <td className="px-4 py-3">1 неделя</td>
                    <td className="px-4 py-3">Заказчик, руководитель проекта</td>
                    <td className="px-4 py-3">Акт приемки, переход в промышленную эксплуатацию</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold mb-4">Фаза 4: Масштабирование и поддержка (постоянно)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-100 dark:bg-slate-800">
                  <tr>
                    <th className="px-4 py-2 font-semibold">Этап</th>
                    <th className="px-4 py-2 font-semibold">Сроки</th>
                    <th className="px-4 py-2 font-semibold">Ответственные</th>
                    <th className="px-4 py-2 font-semibold">Результаты</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  <tr>
                    <td className="px-4 py-3">Масштабирование на весь муниципалитет</td>
                    <td className="px-4 py-3">2 месяца</td>
                    <td className="px-4 py-3">Координаторы проекта</td>
                    <td className="px-4 py-3">Охват 100% территории</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Постоянное обучение новых сотрудников</td>
                    <td className="px-4 py-3">Ежемесячно</td>
                    <td className="px-4 py-3">Тренеры</td>
                    <td className="px-4 py-3">Обучение 20 новых сотрудников/месяц</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Актуализация моделей и правил</td>
                    <td className="px-4 py-3">Ежеквартально</td>
                    <td className="px-4 py-3">Data scientists</td>
                    <td className="px-4 py-3">Обновление 30% моделей ежеквартально</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Плановые аудиты безопасности</td>
                    <td className="px-4 py-3">Ежегодно</td>
                    <td className="px-4 py-3">Специалисты по ИБ</td>
                    <td className="px-4 py-3">Отчеты по аудитам, устранение замечаний</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Комплексная система управления рисками */}
      <section className="space-y-6 bg-red-50 dark:bg-red-900/20 p-6 rounded-xl border border-red-200 dark:border-red-800">
        <h2 className="text-3xl font-bold text-red-900 dark:text-red-100">Комплексная система управления рисками</h2>
        
        <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
          <h3 className="text-xl font-semibold mb-4">Матрица ключевых рисков и мер минимизации</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-red-100 dark:bg-red-900/30">
                <tr>
                  <th className="px-4 py-2 font-semibold">Риск</th>
                  <th className="px-4 py-2 font-semibold">Вероятность</th>
                  <th className="px-4 py-2 font-semibold">Влияние</th>
                  <th className="px-4 py-2 font-semibold">Меры минимизации</th>
                  <th className="px-4 py-2 font-semibold">Ответственный</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                <tr>
                  <td className="px-4 py-3"><strong>Несоответствие требованиям СМЭВ</strong></td>
                  <td className="px-4 py-3">Средняя</td>
                  <td className="px-4 py-3">Критическое</td>
                  <td className="px-4 py-3">
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Привлечение сертифицированного интегратора СМЭВ</li>
                      <li>Еженедельные согласования с ФНС</li>
                      <li>Проведение предварительной экспертизы</li>
                    </ul>
                  </td>
                  <td className="px-4 py-3">Технический руководитель</td>
                </tr>
                <tr>
                  <td className="px-4 py-3"><strong>Утечка персональных данных</strong></td>
                  <td className="px-4 py-3">Высокая</td>
                  <td className="px-4 py-3">Критическое</td>
                  <td className="px-4 py-3">
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Шифрование данных на всех этапах</li>
                      <li>Разграничение доступа по ролям</li>
                      <li>Регулярные аудиты безопасности</li>
                      <li>Обучение сотрудников</li>
                    </ul>
                  </td>
                  <td className="px-4 py-3">Специалист по ИБ</td>
                </tr>
                <tr>
                  <td className="px-4 py-3"><strong>Недостаточная точность прогнозных моделей</strong></td>
                  <td className="px-4 py-3">Средняя</td>
                  <td className="px-4 py-3">Высокое</td>
                  <td className="px-4 py-3">
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Постепенное внедрение с контролем качества</li>
                      <li>Ручная верификация первых 1000 прогнозов</li>
                      <li>Постоянное переобучение моделей на новых данных</li>
                    </ul>
                  </td>
                  <td className="px-4 py-3">Data scientist</td>
                </tr>
                <tr>
                  <td className="px-4 py-3"><strong>Сопротивление соцработников новой системе</strong></td>
                  <td className="px-4 py-3">Высокая</td>
                  <td className="px-4 py-3">Среднее</td>
                  <td className="px-4 py-3">
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Вовлечение сотрудников в разработку с ранних этапов</li>
                      <li>Поощрение за использование системы</li>
                      <li>Упрощенный интерфейс с минимальным обучением</li>
                    </ul>
                  </td>
                  <td className="px-4 py-3">Руководитель проекта</td>
                </tr>
                <tr>
                  <td className="px-4 py-3"><strong>Нестабильность работы СМЭВ</strong></td>
                  <td className="px-4 py-3">Низкая</td>
                  <td className="px-4 py-3">Высокое</td>
                  <td className="px-4 py-3">
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Кэширование критически важных данных</li>
                      <li>Офлайн-режим для базовых операций</li>
                      <li>Резервные каналы связи</li>
                    </ul>
                  </td>
                  <td className="px-4 py-3">DevOps-инженер</td>
                </tr>
                <tr>
                  <td className="px-4 py-3"><strong>Превышение бюджета</strong></td>
                  <td className="px-4 py-3">Средняя</td>
                  <td className="px-4 py-3">Среднее</td>
                  <td className="px-4 py-3">
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Поэтапное финансирование с четкими этапами приемки</li>
                      <li>Фиксированные контракты с подрядчиками</li>
                      <li>Еженедельный финансовый контроль</li>
                    </ul>
                  </td>
                  <td className="px-4 py-3">Финансовый контролер</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
          <h3 className="text-xl font-semibold mb-4">План реагирования на чрезвычайные ситуации</h3>
          
          <div className="space-y-4">
            <div className="p-4 bg-red-50 dark:bg-red-900/30 rounded-lg border border-red-200 dark:border-red-800">
              <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">Сценарий 1: Полный отказ СМЭВ более 30 минут</h4>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Активация резервного кэша данных за последние 24 часа</li>
                <li>Переключение системы в офлайн-режим с пометкой данных как "неподтвержденные"</li>
                <li>Оповещение всех пользователей через push-уведомления</li>
                <li>Ручная обработка критических запросов с последующей синхронизацией</li>
              </ul>
            </div>

            <div className="p-4 bg-red-50 dark:bg-red-900/30 rounded-lg border border-red-200 dark:border-red-800">
              <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">Сценарий 2: Выявление утечки персональных данных</h4>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Немедленное отключение системы от сети</li>
                <li>Блокировка всех учетных записей</li>
                <li>Запуск процедуры расследования с привлечением ФСБ</li>
                <li>Уведомление Роскомнадзора и пострадавших граждан в течение 24 часов</li>
                <li>Восстановление данных из резервных копий за 72 часа до инцидента</li>
              </ul>
            </div>

            <div className="p-4 bg-red-50 dark:bg-red-900/30 rounded-lg border border-red-200 dark:border-red-800">
              <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">Сценарий 3: Критическая ошибка в прогнозной модели</h4>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Отключение автоматического принятия решений</li>
                <li>Переключение на ручной режим работы с обязательным согласованием</li>
                <li>Экспресс-анализ причины ошибки в течение 4 часов</li>
                <li>Корректировка модели и тестирование на выборке перед возвратом в продакшн</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Техническое задание */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold">Техническое задание на интеграцию (упрощенный вариант)</h2>
        
        <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
          <h3 className="text-xl font-semibold mb-4">1. Общие сведения</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Наименование проекта:</strong> Интеграция системы «Социальный радар» с СМЭВ 3.0</li>
            <li><strong>Заказчик:</strong> Администрация муниципального образования</li>
            <li><strong>Исполнитель:</strong> [Наименование подрядчика]</li>
            <li><strong>Срок выполнения:</strong> 9 месяцев с даты подписания договора</li>
          </ul>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
          <h3 className="text-xl font-semibold mb-4">2. Требования к функционалу интеграции</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">2.1. Основные функции модуля интеграции:</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Получение сведений о гражданах через ЕСИА</li>
                <li>Получение сведений о недвижимости через ЕГРН</li>
                <li>Получение сведений о социальных выплатах через ГРЗ</li>
                <li>Получение сведений о судебных задолженностях</li>
                <li>Отправка уведомлений в систему ГИС ЖКХ</li>
                <li>Синхронизация данных с реестром получателей соцподдержки</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">2.2. Требования к безопасности:</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Использование СКЗИ КриптоПро CSP 5.0</li>
                <li>Обмен данными по защищенным каналам TLS 1.3</li>
                <li>Аутентификация по сертификатам X.509</li>
                <li>Шифрование данных по ГОСТ Р 34.12-2015</li>
                <li>Ведение полного аудит-лога всех операций</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">2.3. Требования к надежности:</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Обеспечение 99.95% доступности</li>
                <li>Время восстановления после сбоя ≤ 5 минут</li>
                <li>Автоматическое резервное копирование каждые 15 минут</li>
                <li>Географическое резервирование (2 ЦОД в разных регионах)</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
          <h3 className="text-xl font-semibold mb-4">3. Требования к данным</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">3.1. Справочники и классификаторы:</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Коды регионов РФ по ОКТМО</li>
                <li>Классификатор должностей муниципальных служащих</li>
                <li>Перечень жизненных ситуаций (152 жизненных ситуации)</li>
                <li>Классификатор социальных рисков (45 типов)</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">3.2. Форматы обмена:</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Основной формат: XML по схемам СМЭВ 3.0</li>
                <li>Резервный формат: JSON для внутренних систем</li>
                <li>Кодировка: UTF-8</li>
                <li>Максимальный размер сообщения: 10 МБ</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">3.3. Частота обмена:</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Синхронный режим: по запросу пользователя</li>
                <li>Асинхронный режим: ежесуточно в 02:00 МСК</li>
                <li>Экстренный режим: по требованию с приоритетом</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Экономический эффект */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold">Экономический эффект и стратегическое значение</h2>
        
        <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
          <h3 className="text-xl font-semibold mb-4 text-green-900 dark:text-green-100">Расчет экономической эффективности</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
              <h4 className="font-semibold text-lg mb-4 text-blue-700 dark:text-blue-300">Инвестиции в проект:</h4>
              <ul className="space-y-3">
                {[
                  { item: "Разработка системы:", amount: "8.5 млн ₽" },
                  { item: "Оборудование и лицензии:", amount: "3.2 млн ₽" },
                  { item: "Обучение персонала:", amount: "1.8 млн ₽" },
                  { item: "Итого:", amount: "13.5 млн ₽", bold: true }
                ].map((investment, idx) => (
                  <li key={idx} className="flex justify-between">
                    <span>{investment.item}</span>
                    <span className={`${investment.bold ? 'font-bold text-xl' : ''}`}>{investment.amount}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
              <h4 className="font-semibold text-lg mb-4 text-green-700 dark:text-green-300">Годовой экономический эффект:</h4>
              <ul className="space-y-3">
                {[
                  { item: "Снижение экстренных выплат:", amount: "12.5 млн ₽" },
                  { item: "Оптимизация штата соцработников:", amount: "8.3 млн ₽" },
                  { item: "Предотвращение судебных исков:", amount: "4.7 млн ₽" },
                  { item: "Рост налоговых поступлений от улучшения демографии:", amount: "6.2 млн ₽" },
                  { item: "Итого:", amount: "31.7 млн ₽", bold: true }
                ].map((benefit, idx) => (
                  <li key={idx} className="flex justify-between">
                    <span>{benefit.item}</span>
                    <span className={`${benefit.bold ? 'font-bold text-xl' : ''}`}>{benefit.amount}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
            <h4 className="font-semibold text-lg mb-4 text-purple-700 dark:text-purple-300">Финансовые показатели эффективности:</h4>
            <ul className="space-y-3">
              {[
                { item: "Срок окупаемости:", amount: "5 месяцев" },
                { item: "ROI за 3 года:", amount: "520%" },
                { item: "NPV (чистый дисконтированный доход) за 5 лет:", amount: "124.8 млн ₽" },
                { item: "IRR (внутренняя норма доходности):", amount: "187%" }
              ].map((indicator, idx) => (
                <li key={idx} className="flex justify-between">
                  <span className="font-semibold">{indicator.item}</span>
                  <span className="font-bold text-purple-600 dark:text-purple-400">{indicator.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Заключение */}
      <section className="space-y-6 border-t-2 border-slate-300 dark:border-slate-600 pt-8">
        <h2 className="text-3xl font-bold">Заключение: Будущее социального сопровождения</h2>
        <div className="text-lg leading-relaxed space-y-4 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-lg">
          <p>
            Проект «Социальный радар» представляет собой не просто техническое решение, а стратегическую платформу для трансформации социальной сферы муниципалитета. Система позволяет предсказывать социальные проблемы до их возникновения и своевременно оказывать помощь нуждающимся семьям, что напрямую влияет на качество жизни граждан и социальную стабильность в регионе.
          </p>
          <p>
            Глубокая интеграция с СМЭВ обеспечивает получение актуальных данных из надежных федеральных источников, повышая точность прогнозов и доверие к системе. Проект полностью соответствует национальным стратегиям цифрового развития и социальной поддержки, демонстрируя измеримый экономический эффект и социальную значимость.
          </p>
          <p>
            Реализация «Социального радара» создает основу для дальнейшего развития «умного города» и цифрового государства на муниципальном уровне, где социальная поддержка становится проактивной, персонализированной и эффективной. В условиях роста социальной напряженности такие системы перестают быть инновацией и становятся необходимостью для устойчивого развития территорий. Инвестиции в «Социальный радар» — это инвестиции в социальное будущее муниципалитета и благополучие тысяч семей.
          </p>
        </div>
      </section>
    </div>
  );
};

export default SmartCitiesArticle;