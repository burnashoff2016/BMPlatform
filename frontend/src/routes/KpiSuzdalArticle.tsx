import React, { useRef } from "react";
import { Button } from "../components/ui/button";
import { Download, Printer } from "lucide-react";

const KpiSuzdalArticle: React.FC = () => {
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
          filename: "kpi-suzdal-research.pdf",
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
            Задание 8
          </span>
        </div>
        <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
          Система KPI для оценки качества электронных услуг в туристическом муниципалитете Суздаль: влияние сезонности на эффективность цифрового взаимодействия
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 mb-6">
          Оценка и внедрение адаптивной системы ключевых показателей эффективности в условиях выраженной туристической сезонности
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
        <h2 className="text-3xl font-bold">Введение: Цифровая трансформация туристической столицы Золотого кольца</h2>
        <div className="space-y-4 text-lg leading-relaxed">
          <p>
            Суздаль, один из древнейших городов России и жемчужина Золотого кольца, ежегодно принимает сотни тысяч туристов, стремящихся прикоснуться к богатейшему историко-культурному наследию. В условиях растущего внутреннего туризма и цифровой трансформации государственного управления, вопрос качества электронных услуг приобретает стратегическое значение для муниципалитета. Однако уникальная особенность Суздаля — ярко выраженная сезонность туристического потока — создает серьезные вызовы для обеспечения стабильного цифрового взаимодействия с жителями и гостями города.
          </p>
          <p>
            Согласно статистическим данным, пиковые сезоны в Суздале приходятся на период с апреля по сентябрь, что создает колоссальную нагрузку на инфраструктуру, включая цифровые сервисы. В 2024-2025 годах город демонстрирует впечатляющий рост потребительской активности и туристического потока, что еще больше актуализирует необходимость внедрения гибкой системы оценки качества электронных услуг.
          </p>
        </div>
      </section>

      {/* Проблематика */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold">Проблематика: Сезонность как ключевой фактор цифрового взаимодействия</h2>
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold">Особенности туристического сезона в Суздале</h3>
          <div className="space-y-4 text-lg">
            <p>
              Суздаль с его населением около девяти тысяч человек демонстрирует уникальную туристическую привлекательность, которая приводит к многократному увеличению численности населения в пиковые периоды. Богатая история и архитектура, развитая гостиничная сеть и удобная транспортная доступность делают город особенно популярным в теплые месяцы года. Однако такая концентрация туристов создает серьезные проблемы перегрузки городской инфраструктуры, включая цифровые сервисы.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-lg text-blue-900 dark:text-blue-200">Ключевые сезонные пики в Суздале:</h4>
            <ul className="list-disc pl-6 space-y-2 text-lg">
              <li><strong>Летний сезон (июнь-август):</strong> максимальная посещаемость, включая организованные экскурсионные группы</li>
              <li><strong>Праздничные периоды:</strong> Новый год, Масленица, День России</li>
              <li><strong>Фестивальные события:</strong> Музей деревянной архитектуры и другие культурные мероприятия, такие как те, что проводились 12 июня 2024 года.</li>
            </ul>
          </div>

          <h3 className="text-2xl font-semibold">Влияние сезонности на цифровые сервисы</h3>
          <div className="space-y-4 text-lg">
            <p>
              Сезонные колебания создают следующие проблемы для электронных услуг:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Пиковые нагрузки на серверы:</strong> резкое увеличение количества запросов в высокий сезон</li>
              <li><strong>Деградация качества сервиса:</strong> увеличение времени отклика, падение доступности сервисов</li>
              <li><strong>Рост количества жалоб:</strong> пользователи сталкиваются с техническими сбоями в самый ответственный период их поездки</li>
              <li><strong>Неравномерная загрузка персонала:</strong> поддержка цифровых сервисов перегружена в сезон и простаивает в межсезонье</li>
            </ul>
          </div>
          <p>
            Как отмечают эксперты, обеспечение эффективных цифровых услуг во всех муниципалитетах, независимо от их размера, является критически важным для устойчивого и инклюзивного развития. Однако для туристических городов с выраженной сезонностью стандартные подходы к оценке качества оказываются недостаточными.
          </p>
        </div>
      </section>

      {/* Система KPI */}
      <section className="space-y-6 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
        <h2 className="text-3xl font-bold text-blue-900 dark:text-blue-100">Система KPI: Адаптация к сезонным реалиям Суздаля</h2>
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-blue-900 dark:text-blue-200">Принципы построения сезонно-адаптивной системы KPI</h3>
          <div className="space-y-4 text-lg">
            <p>
              Для эффективной оценки качества электронных услуг в Суздале необходимо использовать комплексный подход, учитывающий специфику туристического муниципалитета. Основные принципы системы:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Сезонная дифференциация показателей:</strong> разделение KPI на высокий и низкий сезоны</li>
              <li><strong>Динамические пороговые значения:</strong> изменение целевых показателей в зависимости от периода года</li>
              <li><strong>Комплексный мониторинг:</strong> оценка как технических, так и пользовательских аспектов</li>
              <li><strong>Прогнозирование нагрузки:</strong> использование исторических данных для планирования ресурсов</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Ключевые показатели */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold">Ключевые показатели эффективности (KPI)</h2>
        
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold">1. Технические KPI</h3>
          
          <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-700 space-y-4">
            <h4 className="font-bold text-lg text-blue-800 dark:text-blue-200">Доступность сервисов (Uptime):</h4>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Низкий сезон (октябрь-март):</strong> ≥99.5%</li>
              <li><strong>Высокий сезон (апрель-сентябрь):</strong> ≥98.5%</li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-700 space-y-4">
            <h4 className="font-bold text-lg text-blue-800 dark:text-blue-200">Время отклика системы:</h4>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Низкий сезон:</strong> ≤1.5 секунды</li>
              <li><strong>Высокий сезон:</strong> ≤3.0 секунды</li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-700 space-y-4">
            <h4 className="font-bold text-lg text-blue-800 dark:text-blue-200">Пропускная способность:</h4>
            <p>Способность системы обрабатывать на 300% больше запросов в пиковые дни, чем в среднем за месяц</p>
          </div>

          <h3 className="text-2xl font-semibold">2. Пользовательские KPI</h3>
          
          <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-700 space-y-4">
            <h4 className="font-bold text-lg text-green-800 dark:text-green-200">Удовлетворенность пользователей (CSAT):</h4>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Целевой показатель в высокий сезон:</strong> ≥4.0/5.0</li>
              <li><strong>Целевой показатель в низкий сезон:</strong> ≥4.5/5.0</li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-700 space-y-4">
            <h4 className="font-bold text-lg text-green-800 dark:text-green-200">Время решения запроса в поддержке:</h4>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Низкий сезон:</strong> ≤30 минут</li>
              <li><strong>Высокий сезон:</strong> ≤2 часа</li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-700 space-y-4">
            <h4 className="font-bold text-lg text-green-800 dark:text-green-200">Доля успешных транзакций:</h4>
            <p>≥95% в любой сезон</p>
          </div>

          <h3 className="text-2xl font-semibold">3. Бизнес-ориентированные KPI</h3>
          
          <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-700 space-y-4">
            <h4 className="font-bold text-lg text-purple-800 dark:text-purple-200">Конверсия в цифровые услуги:</h4>
            <p>Доля пользователей, завершающих процесс получения услуги онлайн без перехода в оффлайн</p>
          </div>
          
          <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-700 space-y-4">
            <h4 className="font-bold text-lg text-purple-800 dark:text-purple-200">Снижение количества повторных обращений:</h4>
            <p>Показатель должен быть на 20% ниже в высокий сезон по сравнению с предыдущим годом</p>
          </div>
          
          <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-700 space-y-4">
            <h4 className="font-bold text-lg text-purple-800 dark:text-purple-200">Экономическая эффективность:</h4>
            <p>Снижение затрат на обслуживание одного запроса в высокий сезон за счет автоматизации</p>
          </div>
        </div>
      </section>

      {/* Методология учета сезонности */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold">Методология учета сезонности</h2>
        <div className="space-y-4 text-lg">
          <p>
            Для корректной оценки эффективности цифровых сервисов в Суздале предлагается использовать следующую методику:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Сезонная нормализация данных:</strong> все показатели приводятся к базовому сезону с использованием коэффициентов сезонности</li>
            <li><strong>Индекс сезонной устойчивости:</strong> комплексный показатель, рассчитываемый по формуле, где каждый компонент нормализован относительно сезонных целей</li>
            <li><strong>Прогностическая аналитика:</strong> использование данных за предыдущие годы для прогнозирования нагрузки и планирования ресурсов</li>
          </ul>
        </div>
      </section>

      {/* Практическая реализация */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold">Практическая реализация: Кейс Суздаля</h2>
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold">Этапы внедрения системы KPI</h3>

          <div className="space-y-4">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border-2 border-blue-300 dark:border-blue-700">
              <h4 className="font-bold text-xl text-blue-900 dark:text-blue-200 mb-2">Этап 1. Аудит текущего состояния (1-2 месяца)</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Анализ существующих цифровых сервисов</li>
                <li>Сбор данных по сезонным колебаниям за последние 3 года</li>
                <li>Определение "узких мест" в пиковые периоды</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border-2 border-green-300 dark:border-green-700">
              <h4 className="font-bold text-xl text-green-900 dark:text-green-200 mb-2">Этап 2. Разработка сезонно-адаптивных KPI (1 месяц)</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Установление дифференцированных целевых показателей</li>
                <li>Настройка системы автоматического мониторинга</li>
                <li>Разработка дашбордов для разных уровней управления</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border-2 border-yellow-300 dark:border-yellow-700">
              <h4 className="font-bold text-xl text-yellow-900 dark:text-yellow-200 mb-2">Этап 3. Техническая оптимизация (3-6 месяцев)</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Масштабирование серверной инфраструктуры</li>
                <li>Внедрение балансировки нагрузки</li>
                <li>Оптимизация баз данных и кэширование</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border-2 border-purple-300 dark:border-purple-700">
              <h4 className="font-bold text-xl text-purple-900 dark:text-purple-200 mb-2">Этап 4. Обучение персонала и запуск системы (1 месяц)</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Обучение сотрудников работе с новой системой KPI</li>
                <li>Проведение тестового периода в межсезонье</li>
                <li>Формирование команды быстрого реагирования на пиковые нагрузки</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Ожидаемые результаты */}
      <section className="space-y-6 bg-green-50 dark:bg-green-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800">
        <h2 className="text-3xl font-bold text-green-900 dark:text-green-100">Ожидаемые результаты</h2>
        <div className="space-y-4 text-lg">
          <p>
            Внедрение сезонно-адаптивной системы KPI позволит администрации Суздаля:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Повысить качество цифровых услуг в пиковые периоды на 30-40% по сравнению с текущими показателями</li>
            <li>Снизить количество жалоб на работу электронных сервисов в высокий сезон на 50%</li>
            <li>Оптимизировать расходы на IT-инфраструктуру за счет точного прогнозирования нагрузки</li>
            <li>Улучшить имидж города как современного туристического направления, готового к цифровым вызовам</li>
            <li>Создать основу для устойчивого развития цифровых сервисов, способных адаптироваться к изменяющимся условиям</li>
          </ul>
        </div>
      </section>

      {/* Заключение */}
      <section className="space-y-6 border-t-2 border-slate-300 dark:border-slate-600 pt-8">
        <h2 className="text-3xl font-bold">Заключение: Цифровой Суздаль — устойчивый и доступный для всех</h2>
        <div className="text-lg leading-relaxed space-y-4 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-lg">
          <p>
            Внедрение системы KPI, учитывающей сезонные особенности туристического потока, представляет собой стратегический шаг в цифровой трансформации Суздаля. Как отмечают эксперты, отсутствие измеримых показателей целей, связанных с экономическим и социальным воздействием ИКТ, является серьезным барьером для эффективной цифровизации. Сезонно-адаптивная система KPI устраняет этот пробел, позволяя объективно оценивать качество цифровых услуг в реальных условиях работы муниципалитета.
          </p>
          <p>
            Успешная реализация данной системы не только повысит эффективность цифрового взаимодействия с жителями и туристами, но и создаст основу для дальнейшего развития Суздаля как умного туристического города. В условиях роста внутреннего туризма и увеличения потребительской активности в Суздале, инвестиции в цифровую инфраструктуру и системы оценки ее качества окупятся многократно через повышение туристической привлекательности и качества жизни местного населения.
          </p>
          <p>
            Администрация Суздаля, обладая уникальным культурным наследием и современным подходом к управлению, имеет все возможности стать образцом для других туристических муниципалитетов России в области внедрения интеллектуальных систем оценки качества цифровых услуг с учетом сезонной специфики. Будущее цифрового Суздаля — это синтез богатейшей истории и инновационных технологий управления, обеспечивающих комфорт и удовлетворенность каждого посетителя независимо от времени года.
          </p>
        </div>
      </section>
    </div>
  );
};

export default KpiSuzdalArticle;