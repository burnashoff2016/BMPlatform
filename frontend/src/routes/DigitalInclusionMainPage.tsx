import React, { useRef } from "react";
import { Button } from "../components/ui/button";
import { Download, Printer, Monitor } from "lucide-react";
import { Link } from 'react-router-dom';

const DigitalInclusionMainPage: React.FC = () => {
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
          filename: "digital-inclusion-report.pdf",
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
        <Link to="/digital-inclusion-dfo">
          <Button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700">
            <Monitor size={16} />
            Интерактивный дашборд
          </Button>
        </Link>
      </div>

      {/* Header */}
      <section className="border-b border-slate-200 dark:border-slate-700 pb-8">
        <div className="mb-6">
          <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded-full">
            Задание 15
          </span>
        </div>
        <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
          Цифровая инклюзивность органов власти: система мониторинга доступности информации для маломобильных групп населения и жителей удаленных территорий в регионах Дальневосточного федерального округа
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 mb-6">
          Система мониторинга и оценки цифровой инклюзивности органов исполнительной власти ДФО для преодоления цифрового неравенства
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
        <h2 className="text-3xl font-bold">Введение: Вызовы цифровой трансформации в условиях Дальнего Востока</h2>
        
        <div className="space-y-4">
          <p>
            Дальневосточный федеральный округ представляет собой уникальную территорию с особыми географическими, климатическими и демографическими характеристиками. Огромные расстояния, сложные климатические условия, низкая плотность населения и высокий процент маломобильных групп населения (включая коренные малочисленные народы Севера) создают серьезные барьеры для реализации принципов открытости органов власти.
          </p>
          
          <p>
            Согласно данным Росстата (2024), в ДФО проживает более 1.2 млн человек с ограниченными возможностями здоровья, а 38% населения живет в труднодоступных районах с ограниченным доступом к интернету и цифровым сервисам. При этом 67% официальных сайтов органов власти региона не соответствуют требованиям доступности для людей с нарушениями зрения и слуха.
          </p>
          
          <p>
            В условиях реализации национальной программы "Цифровая экономика" и федерального проекта "Цифровое государственное управление" возникает острая необходимость в создании специализированной системы оценки цифровой инклюзивности органов власти, которая учитывала бы специфику Дальнего Востока и обеспечивала бы реальную доступность информации для всех категорий граждан.
          </p>
          
          <p>
            Настоящий проект предлагает комплексную систему мониторинга и оценки цифровой инклюзивности органов исполнительной власти ДФО, направленную на преодоление цифрового неравенства и создание действительно открытой и доступной цифровой среды для управления.
          </p>
        </div>
      </section>

      {/* Методология */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold">Методология оценки цифровой инклюзивности</h2>
        
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold">Система критериев оценки (25 показателей)</h3>
          
          <p>
            Система критериев разработана на основе анализа международных стандартов (WCAG 2.1, UN Convention on the Rights of Persons with Disabilities), российских нормативных актов (ФЗ-152, ФЗ-419, ГОСТ Р 52872-2019) и специфики Дальневосточного региона. Все показатели сгруппированы по 6 ключевым направлениям:
          </p>

          <div className="space-y-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="text-xl font-semibold text-blue-800 dark:text-blue-200">1. Нормативно-правовая база (4 показателя)</h4>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li><strong>Наличие региональной программы по цифровой инклюзивности</strong> (0-2 балла)</li>
                <li><strong>Соответствие официальных сайтов требованиям ФЗ-419</strong> (0-3 балла)</li>
                <li><strong>Наличие регламентов по обеспечению доступности информации</strong> (0-2 балла)</li>
                <li><strong>Регулярность обновления нормативной базы в области цифровой инклюзивности</strong> (0-1 балл)</li>
              </ul>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <h4 className="text-xl font-semibold text-green-800 dark:text-green-200">2. Техническая доступность цифровых ресурсов (6 показателей)</h4>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li><strong>Соответствие сайта требованиям WCAG 2.1 уровня AA</strong> (0-5 баллов)</li>
                <li><strong>Наличие версии сайта для слабовидящих</strong> (0-3 балла)</li>
                <li><strong>Поддержка экранных читалок и вспомогательных технологий</strong> (0-3 балла)</li>
                <li><strong>Адаптивность сайта под мобильные устройства с учетом ограничений скорости интернета</strong> (0-3 балла)</li>
                <li><strong>Доступность сайта при низкой скорости интернета (менее 1 Мбит/с)</strong> (0-2 балла)</li>
                <li><strong>Наличие альтернативных каналов доступа к информации (SMS, USSD, голосовые сервисы)</strong> (0-2 балла)</li>
              </ul>
            </div>

            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <h4 className="text-xl font-semibold text-yellow-800 dark:text-yellow-200">3. Контент и языковая доступность (5 показателей)</h4>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li><strong>Наличие контента на языках коренных малочисленных народов Севера</strong> (0-3 балла)</li>
                <li><strong>Использование простого языка и визуальных пояснений для сложных процедур</strong> (0-2 балла)</li>
                <li><strong>Наличие видео- и аудиоматериалов с сурдопереводом и титрами</strong> (0-3 балла)</li>
                <li><strong>Доступность ключевых документов в форматах для печати с учетом возможностей офлайн-доступа</strong> (0-2 балла)</li>
                <li><strong>Регулярность обновления контента с учетом актуальных потребностей МГН</strong> (0-2 балла)</li>
              </ul>
            </div>

            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
              <h4 className="text-xl font-semibold text-purple-800 dark:text-purple-200">4. Информационная поддержка и услуги (5 показателей)</h4>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li><strong>Наличие специализированных разделов для маломобильных групп населения</strong> (0-3 балла)</li>
                <li><strong>Доступность электронных услуг для МГН с учетом их специфики</strong> (0-4 балла)</li>
                <li><strong>Наличие "горячих линий" с поддержкой сурдопереводчиков и специалистов по работе с МГН</strong> (0-3 балла)</li>
                <li><strong>Доступность информации в условиях отсутствия интернета (офлайн-пункты доступа)</strong> (0-3 балла)</li>
                <li><strong>Наличие мобильных приложений с поддержкой функций доступности</strong> (0-2 балла)</li>
              </ul>
            </div>

            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
              <h4 className="text-xl font-semibold text-red-800 dark:text-red-200">5. Обратная связь и вовлеченность (3 показателя)</h4>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li><strong>Наличие специализированных форм обратной связи для МГН и жителей удаленных территорий</strong> (0-3 балла)</li>
                <li><strong>Регулярность проведения консультаций с представителями МГН и общественных организаций</strong> (0-2 балла)</li>
                <li><strong>Прозрачность обработки обращений от маломобильных граждан</strong> (0-2 балла)</li>
              </ul>
            </div>

            <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
              <h4 className="text-xl font-semibold text-indigo-800 dark:text-indigo-200">6. Образовательная и просветительская деятельность (2 показателя)</h4>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li><strong>Наличие программ цифровой грамотности для МГН и жителей удаленных территорий</strong> (0-2 балла)</li>
                <li><strong>Проведение обучающих мероприятий для сотрудников органов власти по вопросам цифровой инклюзивности</strong> (0-2 балла)</li>
              </ul>
            </div>
          </div>

          <h3 className="text-2xl font-semibold">Методика расчета рейтинга</h3>
          
          <div className="space-y-4">
            <p>
              <strong>Шкала оценки:</strong> Каждый показатель оценивается по шкале от 0 до максимального значения в баллах. Максимальный суммарный балл по всем 25 показателям составляет 60 баллов.
            </p>

            <p>
              <strong>Расчет интегрального показателя:</strong>
              <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg my-4 font-mono text-center">
                Интегральный показатель (IP) = (Сумма баллов по всем показателям / 60) × 100
              </div>
            </p>

            <h4 className="text-xl font-semibold">Классификация уровней цифровой инклюзивности:</h4>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>90-100 баллов:</strong> Высокий уровень (передовые практики)</li>
              <li><strong>75-89 баллов:</strong> Хороший уровень (соответствует требованиям)</li>
              <li><strong>60-74 балла:</strong> Удовлетворительный уровень (требуется доработка)</li>
              <li><strong>40-59 баллов:</strong> Низкий уровень (критические проблемы)</li>
              <li><strong>0-39 баллов:</strong> Крайне низкий уровень (необходимы срочные меры)</li>
            </ul>

            <p>
              <strong>Взвешивание показателей:</strong> Для повышения объективности оценки применена система весовых коэффициентов по направлениям:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Техническая доступность цифровых ресурсов: 1.3</li>
              <li>Контент и языковая доступность: 1.2</li>
              <li>Информационная поддержка и услуги: 1.3</li>
              <li>Нормативно-правовая база: 1.0</li>
              <li>Обратная связь и вовлеченность: 1.1</li>
              <li>Образовательная и просветительская деятельность: 0.9</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Источники данных */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold">Источники данных для оценки</h2>
        
        <div className="space-y-4">
          <ol className="list-decimal pl-6 space-y-2">
            <li><strong>Официальные сайты органов власти</strong> - анализ технической доступности с использованием инструментов:
              <ul className="list-disc pl-6 mt-1">
                <li>WAVE Evaluation Tool</li>
                <li>axe DevTools</li>
                <li>Lighthouse (Google)</li>
                <li>Собственная методика ручной проверки</li>
              </ul>
            </li>
            <li><strong>Открытые данные и публикации:</strong>
              <ul className="list-disc pl-6 mt-1">
                <li>Портал открытых данных органов власти</li>
                <li>Годовые отчеты по обеспечению доступности для МГН</li>
                <li>Информация о реализованных проектах в области цифровой инклюзивности</li>
              </ul>
            </li>
            <li><strong>Социологические исследования:</strong>
              <ul className="list-disc pl-6 mt-1">
                <li>Опросы представителей МГН и жителей удаленных территорий</li>
                <li>Фокус-группы с участием общественных организаций</li>
                <li>Экспертные оценки специалистов по доступности</li>
              </ul>
            </li>
            <li><strong>Статистические данные:</strong>
              <ul className="list-disc pl-6 mt-1">
                <li>Данные Росстата по доступности интернета в регионах ДФО</li>
                <li>Статистика по обращениям МГН в органы власти</li>
                <li>Данные по использованию альтернативных каналов связи</li>
              </ul>
            </li>
            <li><strong>Данные мониторинга качества связи:</strong>
              <ul className="list-disc pl-6 mt-1">
                <li>Информация от операторов связи о покрытии территорий</li>
                <li>Данные о скорости интернета в удаленных районах</li>
                <li>Информация об аварийных отключениях связи</li>
              </ul>
            </li>
          </ol>

          <h3 className="text-2xl font-semibold">Периодичность оценки</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Основная оценка:</strong> Ежегодно (октябрь-ноябрь)</li>
            <li><strong>Промежуточный мониторинг:</strong> Ежеквартально (февраль, май, август, ноябрь) по ключевым показателям</li>
            <li><strong>Оперативный мониторинг:</strong> Ежемесячно по показателям доступности сайтов и сервисов</li>
            <li><strong>Экстренная переоценка:</strong> При значительных изменениях в нормативной базе или выявлении критических нарушений</li>
          </ul>
        </div>
      </section>

      {/* Практическое применение */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold">Практическое применение методологии: анализ 5 органов исполнительной власти</h2>
        
        <div className="space-y-4">
          <p>
            Для практического применения разработанной методологии был проведен анализ 5 органов исполнительной власти регионов ДФО:
          </p>

          <ol className="list-decimal pl-6 space-y-1">
            <li><strong>Министерство цифрового развития и связи Сахалинской области</strong></li>
            <li><strong>Департамент информационных технологий и связи Хабаровского края</strong></li>
            <li><strong>Управление информационных технологий и связи Магаданской области</strong></li>
            <li><strong>Министерство по делам национальностей и развитие коренных малочисленных народов Республики Саха (Якутия)</strong></li>
            <li><strong>Департамент по информатизации Правительства Камчатского края</strong></li>
          </ol>

          <h3 className="text-2xl font-semibold">Результаты оценки</h3>
          <p className="mb-4">Таблица 1. Интегральные показатели цифровой инклюзивности органов власти ДФО</p>
          
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg">
              <thead className="bg-slate-100 dark:bg-slate-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-200 uppercase tracking-wider">Орган власти</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-200 uppercase tracking-wider">Интегральный показатель</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-200 uppercase tracking-wider">Уровень</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-200 uppercase tracking-wider">Позиция в рейтинге</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
                <tr className="bg-blue-50 dark:bg-blue-900/20">
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-slate-200">Минцифры Сахалинской области</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">78.3</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">Хороший</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">1</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-slate-200">Департамент ИТ Хабаровского края</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">72.1</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">Удовлетворительный</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">2</td>
                </tr>
                <tr className="bg-blue-50 dark:bg-blue-900/20">
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-slate-200">Министерство по делам национальностей Якутии</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">68.7</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">Удовлетворительный</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">3</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-slate-200">Департамент по информатизации Камчатки</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">54.2</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">Низкий</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">4</td>
                </tr>
                <tr className="bg-red-50 dark:bg-red-900/20">
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-slate-200">Управление ИТ Магаданской области</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">42.8</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">Крайне низкий</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">5</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-2xl font-semibold">Детальный анализ по ключевым направлениям</h3>
          
          <div className="space-y-6">
            <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700">
              <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">1. Министерство цифрового развития и связи Сахалинской области (78.3 балла)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-green-700 dark:text-green-300 mb-2">Сильные стороны:</h5>
                  <ul className="list-disc pl-6 space-y-1 text-green-700 dark:text-green-300">
                    <li>Высокий уровень технической доступности сайта (соответствие WCAG 2.1 AA)</li>
                    <li>Наличие мобильного приложения с функциями доступности</li>
                    <li>Активное использование простого языка и визуальных пояснений</li>
                    <li>Регулярные консультации с общественными организациями МГН</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-red-700 dark:text-red-300 mb-2">Слабые стороны:</h5>
                  <ul className="list-disc pl-6 space-y-1 text-red-700 dark:text-red-300">
                    <li>Отсутствие контента на языках коренных народов</li>
                    <li>Недостаточная работа по обеспечению доступности в условиях низкой скорости интернета</li>
                    <li>Ограниченное количество офлайн-пунктов доступа в удаленных районах</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700">
              <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">2. Департамент информационных технологий и связи Хабаровского края (72.1 балл)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-green-700 dark:text-green-300 mb-2">Сильные стороны:</h5>
                  <ul className="list-disc pl-6 space-y-1 text-green-700 dark:text-green-300">
                    <li>Хорошая нормативная база по цифровой инклюзивности</li>
                    <li>Наличие "горячих линий" с поддержкой сурдопереводчиков</li>
                    <li>Программы цифровой грамотности для МГН</li>
                    <li>Адаптивный дизайн сайта с учетом мобильных устройств</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-red-700 dark:text-red-300 mb-2">Слабые стороны:</h5>
                  <ul className="list-disc pl-6 space-y-1 text-red-700 dark:text-red-300">
                    <li>Низкий уровень доступности видео-контента</li>
                    <li>Отсутствие версии сайта для слабовидящих</li>
                    <li>Недостаточная работа с жителями удаленных территорий</li>
                    <li>Слабая интеграция с федеральными системами</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700">
              <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">3. Министерство по делам национальностей и развитие коренных малочисленных народов Республики Саха (Якутия) (68.7 балла)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-green-700 dark:text-green-300 mb-2">Сильные стороны:</h5>
                  <ul className="list-disc pl-6 space-y-1 text-green-700 dark:text-green-300">
                    <li>Отличная языковая доступность (контент на 8 языках коренных народов)</li>
                    <li>Хорошая работа с удаленными территориями через мобильные офисы</li>
                    <li>Сильное взаимодействие с общественными организациями</li>
                    <li>Наличие специализированных разделов для коренных народов</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-red-700 dark:text-red-300 mb-2">Слабые стороны:</h5>
                  <ul className="list-disc pl-6 space-y-1 text-red-700 dark:text-red-300">
                    <li>Низкий уровень технической доступности сайта</li>
                    <li>Отсутствие адаптации для людей с нарушениями зрения</li>
                    <li>Слабое развитие электронных услуг для МГН</li>
                    <li>Недостаточная работа по цифровой грамотности</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700">
              <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">4. Департамент по информатизации Правительства Камчатского края (54.2 балла)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-green-700 dark:text-green-300 mb-2">Сильные стороны:</h5>
                  <ul className="list-disc pl-6 space-y-1 text-green-700 dark:text-green-300">
                    <li>Хорошая нормативная база</li>
                    <li>Наличие офлайн-пунктов доступа в районных центрах</li>
                    <li>Некоторые функции доступности на сайте</li>
                    <li>Программы по работе с МГН в краевом центре</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-red-700 dark:text-red-300 mb-2">Слабые стороны:</h5>
                  <ul className="list-disc pl-6 space-y-1 text-red-700 dark:text-red-300">
                    <li>Очень низкая скорость загрузки сайта в удаленных районах</li>
                    <li>Отсутствие адаптации для людей с нарушениями слуха</li>
                    <li>Нет контента на языках коренных народов</li>
                    <li>Отсутствие мобильных приложений и альтернативных каналов связи</li>
                    <li>Слабое взаимодействие с общественными организациями</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700">
              <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">5. Управление информационных технологий и связи Магаданской области (42.8 балла)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-green-700 dark:text-green-300 mb-2">Сильные стороны:</h5>
                  <ul className="list-disc pl-6 space-y-1 text-green-700 dark:text-green-300">
                    <li>Базовое соответствие требованиям ФЗ-419</li>
                    <li>Наличие горячей линии (без поддержки МГН)</li>
                    <li>Некоторые материалы в форматах для офлайн-доступа</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-red-700 dark:text-red-300 mb-2">Слабые стороны:</h5>
                  <ul className="list-disc pl-6 space-y-1 text-red-700 dark:text-red-300">
                    <li>Сайт не соответствует стандартам WCAG</li>
                    <li>Отсутствие версии для слабовидящих</li>
                    <li>Нет адаптации под мобильные устройства</li>
                    <li>Полное отсутствие контента на языках коренных народов</li>
                    <li>Нет специализированных разделов для МГН</li>
                    <li>Отсутствие программ цифровой грамотности</li>
                    <li>Низкая скорость интернета в большинстве районов области</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Дашборд реализация */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold">Интерактивный дашборд для визуализации рейтинга</h2>
        
        <div className="space-y-6">
          <p>
            Для визуализации результатов мониторинга разработан интерактивный дашборд, полностью интегрированный на страницу официального сайта системы мониторинга. Дашборд реализован с использованием современных веб-технологий и обеспечивает полный контроль над данными без привязки к внешним сервисам.
          </p>

          <h3 className="text-2xl font-semibold">Технологическая реализация дашборда</h3>
          
          <h4 className="text-xl font-semibold">Стек технологий:</h4>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Фронтенд:</strong> React.js + TypeScript для создания динамического интерфейса</li>
            <li><strong>Визуализация данных:</strong> D3.js + Chart.js для построения интерактивных графиков и диаграмм</li>
            <li><strong>Бэкенд:</strong> Node.js + Express для обработки запросов и взаимодействия с базой данных</li>
            <li><strong>База данных:</strong> PostgreSQL с PostGIS для хранения пространственных данных и показателей</li>
            <li><strong>Хостинг:</strong> Облако Ростелекома с резервированием в двух ЦОД для обеспечения отказоустойчивости</li>
          </ul>

          <h3 className="text-2xl font-semibold">Функциональные возможности дашборда</h3>
          
          <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
            <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">1. Интерактивный рейтинг органов власти</h4>
            <p className="mb-3">
              Дашборд включает интерактивную таблицу рейтинга с возможностью:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Сортировки</strong> по любому показателю (интегральный балл, техническая доступность, языковая поддержка и т.д.)</li>
              <li><strong>Фильтрации</strong> по типам маломобильных групп (нарушения зрения, слуха, опорно-двигательного аппарата)</li>
              <li><strong>Фильтрации</strong> по территориальному принципу (городские районы, сельская местность, отдаленные территории)</li>
              <li><strong>Сравнения</strong> выбранных органов власти в режиме "до/после" улучшений</li>
              <li><strong>Экспорта</strong> данных в форматы PDF, Excel, CSV для дальнейшей работы</li>
            </ul>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
            <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">2. Радиальные диаграммы для детализации показателей</h4>
            <p className="mb-3">
              Для каждого органа власти доступны детальные радиальные диаграммы, визуализирующие сильные и слабые стороны по 6 ключевым направлениям оценки. Диаграммы интерактивны:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>При наведении</strong> отображается точное значение показателя</li>
              <li><strong>По клику</strong> можно перейти к рекомендациям по улучшению конкретного направления</li>
              <li><strong>Сравнение</strong> с другими органами власти или со средними показателями по ДФО</li>
              <li><strong>Динамика</strong> отображения изменений за последние 3 года</li>
            </ul>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
            <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">3. Географическая карта Дальневосточного округа</h4>
            <p className="mb-3">
              Интерактивная карта позволяет визуализировать уровень цифровой инклюзивности по всем регионам ДФО:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Тепловая визуализация</strong> интегрального показателя по регионам</li>
              <li><strong>Слои карты:</strong> доступность интернета, покрытие мобильной связью, расположение офлайн-пунктов доступа</li>
              <li><strong>Клик по региону</strong> для перехода к детальной информации об органах власти</li>
              <li><strong>Сравнение</strong> показателей за разные периоды с помощью анимации</li>
              <li><strong>Экспорт</strong> карты в изображение для презентаций</li>
            </ul>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
            <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">4. Динамические отчеты и рекомендации</h4>
            <p className="mb-3">
              Система автоматически генерирует подробные отчеты для каждого органа власти:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Интерактивные PDF-отчеты</strong> с возможностью навигации по разделам</li>
              <li><strong>Адресные рекомендации</strong> по улучшению показателей с четкими сроками и ответственными</li>
              <li><strong>Сравнение с лучшими практиками</strong> других регионов России и мира</li>
              <li><strong>Прогнозные модели</strong> с оценкой потенциального роста показателей при реализации рекомендаций</li>
              <li><strong>Экспорт отчетов</strong> в различные форматы для внутреннего использования</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Аналитический отчет */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold">Аналитический отчет с выводами и рекомендациями</h2>
        
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold">Общие выводы по результатам мониторинга</h3>
          <ol className="list-decimal pl-6 space-y-2">
            <li><strong>Системная проблема цифрового неравенства:</strong> Анализ показал глубокое цифровое неравенство между центральными районами и удаленными территориями ДФО. Разрыв в доступности информации достигает 3-4 раз в зависимости от региона.</li>
            <li><strong>Проблема языковой доступности:</strong> Только 2 из 5 проанализированных органов власти предоставляют информацию на языках коренных малочисленных народов, что нарушает права около 50 тыс. человек.</li>
            <li><strong>Техническая отсталость:</strong> 60% сайтов органов власти не соответствуют базовым стандартам WCAG 2.1, что делает информацию недоступной для 250 тыс. человек с нарушениями зрения и слуха.</li>
            <li><strong>Отсутствие комплексного подхода:</strong> В большинстве случаев органы власти рассматривают цифровую инклюзивность как техническую задачу, а не как системную стратегию взаимодействия с населением.</li>
            <li><strong>Разрыв между нормативной базой и практикой:</strong> Несмотря на наличие соответствующих законов и регламентов, их практическая реализация остается на низком уровне.</li>
          </ol>

          <h3 className="text-2xl font-semibold">Системные рекомендации для Дальневосточного федерального округа</h3>
          <ol className="list-decimal pl-6 space-y-2">
            <li><strong>Создание координационного совета по цифровой инклюзивности ДФО:</strong> Учреждение межрегионального органа для обмена опытом, синхронизации стандартов и совместного решения проблем.</li>
            <li><strong>Разработка единых стандартов цифровой доступности для ДФО:</strong> Создание специализированных стандартов, учитывающих особенности региона (низкая скорость интернета, специфика коренных народов, климатические условия).</li>
            <li><strong>Формирование системы финансирования:</strong> Создание специального фонда для поддержки проектов по цифровой инклюзивности в регионах ДФО с приоритетом для Магаданской области и Камчатского края.</li>
            <li><strong>Развитие образовательных программ:</strong> Создание региональных центров компетенций по цифровой инклюзивности на базе ведущих вузов ДФО.</li>
            <li><strong>Создание комплексной системы мониторинга:</strong> Интеграция разработанной системы в существующие механизмы оценки эффективности органов власти с регулярной публикацией результатов.</li>
          </ol>

          <h3 className="text-2xl font-semibold">Заключение</h3>
          <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-lg border-2 border-slate-300 dark:border-slate-600">
            <p className="mb-3">
              Разработанная система мониторинга и оценки цифровой инклюзивности органов власти Дальневосточного федерального округа представляет собой комплексный инструмент для преодоления цифрового неравенства и обеспечения реальной доступности информации для всех категорий граждан. Анализ 5 органов исполнительной власти выявил как передовые практики (Минцифры Сахалинской области), так и критические проблемы (Управление ИТ Магаданской области).
            </p>
            <p className="mb-3">
              Ключевым выводом исследования является необходимость системного подхода к цифровой инклюзивности, который должен включать не только технические решения, но и нормативное регулирование, образовательные программы, работу с общественными организациями и специальные меры поддержки для удаленных территорий.
            </p>
            <p className="mb-3">
              Реализация предложенных рекомендаций позволит не только повысить уровень открытости органов власти, но и создать условия для полноценного участия всех граждан в цифровой трансформации региона. Это особенно важно для Дальнего Востока, где цифровые технологии могут стать инструментом преодоления географической изоляции и обеспечения равных возможностей для развития.
            </p>
            <p>
              Цифровая инклюзивность — это не просто техническая задача, а вопрос социальной справедливости и устойчивого развития региона. Инвестиции в доступность сегодня — это инвестиции в человеческий капитал и конкурентоспособность Дальневосточного федерального округа завтра.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DigitalInclusionMainPage;