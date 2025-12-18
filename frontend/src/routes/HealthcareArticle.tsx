import React from "react";
import { useQuery } from "@tanstack/react-query";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Button } from "../components/ui/button";
import { Download, Printer, MapPin } from "lucide-react";
import { api } from "../lib/api";

const HealthcareArticle: React.FC = () => {
  const { data } = useQuery({
    queryKey: ["healthcare-nekrasovka-data"],
    queryFn: async () => {
      const res = await api.get("/data/healthcare-nekrasovka");
      return res.data;
    },
    retry: false,
  });

  const coverage = data?.coverage ?? 78.2;
  const avgDistance = data?.avg_distance ?? 1.15;

  // Данные для таблицы покрытия по времени доступности
  const coverageData = [
    { time: "5 минут", coverage: 22.8, area: 2.57 },
    { time: "10 минут", coverage: 42, area: 4.75 },
    { time: "15 минут", coverage: 64.3, area: 7.27 },
    { time: "20 минут", coverage: 78.2, area: 8.83 },
  ];

  // Данные для столбчатой диаграммы
  const chartData = [
    { label: "5 мин", value: 22.8, fill: "#ef4444" },
    { label: "10 мин", value: 42, fill: "#f97316" },
    { label: "15 мин", value: 64.3, fill: "#eab308" },
    { label: "20 мин", value: 78.2, fill: "#10b981" },
  ];

  const medicalFacilities = [
    { name: "Амбулатория на 1-й Вольской", type: "Первичная помощь", lat: 55.701, lon: 37.958 },
    { name: "Детская поликлиника Некрасовка", type: "Педиатрия", lat: 55.705, lon: 37.976 },
    { name: "Диагностический центр", type: "Диагностика", lat: 55.71, lon: 37.99 },
    { name: "Прививочный пункт", type: "Профилактика", lat: 55.695, lon: 37.97 },
  ];

  const microdistricts = [
    { name: "Люберецкие поля", population: 12700, status: "Полное покрытие" },
    { name: "Некрасовка-Парк", population: 9800, status: "Полное покрытие" },
    { name: "Улица Покровская", population: 8700, status: "Полное покрытие" },
    { name: "Северный кластер", population: 7600, status: "Зона риска" },
    { name: "Южные кварталы", population: 9100, status: "Зона риска" },
    { name: "ЖК Лондон", population: 5400, status: "Полное покрытие" },
  ];

  return (
    <div className="space-y-8 text-slate-800 dark:text-slate-100">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold">Пространственный анализ доступности медицинской инфраструктуры в Некрасовке</h1>
          <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">Оценка эффективности расположения медучреждений и доступности услуг для жителей</p>
          <p className="mt-3 text-sm text-slate-500">Авторы: Артём Бурнашов и Мария Маклаева</p>
        </div>
        <div className="flex gap-2 items-center print:hidden">
          <Button variant="outline" onClick={() => window.print()} className="flex items-center gap-2">
            <Printer size={14} /> Печать
          </Button>
          <Button onClick={async () => {
            try {
              const html2pdf = await import("html2pdf.js");
              html2pdf.default().from(document.getElementById('healthcare-article') as HTMLElement).save('healthcare_nekrasovka.pdf');
            } catch (e) {
              alert('Установите html2pdf.js: npm install html2pdf.js');
            }
          }} className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white">
            <Download size={14} /> Скачать PDF
          </Button>
        </div>
      </div>

      <section id="healthcare-article" className="space-y-6 bg-white dark:bg-slate-900/5 p-6 rounded-lg border">
        <h2 className="text-2xl font-semibold">Введение</h2>
        <p>
          Мы представляем результаты пространственного анализа доступности медицинских услуг в муниципальном округе Некрасовка.
          Этот район характеризуется высокой плотностью застройки, быстрым ростом населения и выраженной потребностью в устойчивой социальной инфраструктуре.
        </p>
        <p>
          Наша задача состояла в том, чтобы оценить не только формальное количество медицинских точек, но и их реальную доступность для жителей, с учётом пешей мобильности, городской планировки и нормативов Москвы.
        </p>

        <h3 className="text-xl font-semibold mt-6">Методологические подходы</h3>
        <p>Для исследования использовались два ключевых подхода:</p>
        
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold text-blue-900 dark:text-blue-100">1. Location-allocation</h4>
            <p className="text-sm mt-2">
              Этот метод определяет, насколько эффективно расположены объекты медицинской инфраструктуры относительно жилой застройки.
              Он помогает понять, где медицинские учреждения расположены оптимально, а где их размещение не соответствует структуре района.
            </p>
          </div>
          
          <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
            <h4 className="font-semibold text-green-900 dark:text-green-100">2. Catchment areas — зоны охвата</h4>
            <p className="text-sm mt-2">
              Мы построили зоны доступности на основе изохрон пешеходной доступности: 5, 10, 15 и 20 минут пешком.
              Этот подход позволяет судить, насколько быстро жители могут дойти до ближайшей медицинской помощи и где необходимо развитие сети.
            </p>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6">Нормативная база</h3>
        <p>
          Чтобы оценка была корректной, мы опирались на два набора стандартов:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Московские стандарты шаговой доступности</strong> — ориентир по нормативу «15 минут» для объектов первичной помощи.</li>
          <li><strong>Методические рекомендации Минздрава по амбулаторным сетям</strong> — позволяют обосновать размещение филиалов, ФАПов и дополнительных кабинетов даже при ограниченных бюджетах.</li>
        </ul>
        <p className="mt-4">
          Таким образом, исследование сочетает пространственный анализ, нормативную оценку и прикладное планирование.
        </p>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border">
          <h3 className="text-xl font-semibold mb-4">Ключевые показатели доступности</h3>
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30 rounded-lg">
              <div className="text-sm text-slate-600 dark:text-slate-300">Доля населения в шаговой доступности</div>
              <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{coverage}%</div>
              <div className="text-xs text-slate-500 mt-1">В 20-минутной доступности пешком</div>
            </div>
            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-lg">
              <div className="text-sm text-slate-600 dark:text-slate-300">Средняя удалённость до ближайшего объекта</div>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">{avgDistance} км</div>
              <div className="text-xs text-slate-500 mt-1">Соответствует нормативу Москвы</div>
            </div>
            <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30 rounded-lg">
              <div className="text-sm text-slate-600 dark:text-slate-300">Зоны повышенного риска</div>
              <div className="text-3xl font-bold text-red-600 dark:text-red-400">{100 - coverage}%</div>
              <div className="text-xs text-slate-500 mt-1">Вне зоны доступности</div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border">
          <h3 className="text-xl font-semibold mb-4">Покрытие по времени пешеходной доступности</h3>
          <div style={{ width: '100%', height: 280 }}>
            <ResponsiveContainer>
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip formatter={(value) => `${value}%`} />
                <Bar dataKey="value" fill="#8884d8">
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-900 p-6 rounded-lg border">
        <h3 className="text-xl font-semibold mb-4">Таблица доступности по времени</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 dark:bg-slate-800">
              <tr>
                <th className="px-4 py-2 text-left font-semibold">Время пешком</th>
                <th className="px-4 py-2 text-left font-semibold">Покрытие населения, %</th>
                <th className="px-4 py-2 text-left font-semibold">Площадь, км²</th>
                <th className="px-4 py-2 text-left font-semibold">Статус</th>
              </tr>
            </thead>
            <tbody>
              {coverageData.map((row, idx) => (
                <tr key={idx} className="border-t dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="px-4 py-3 font-medium">{row.time}</td>
                  <td className="px-4 py-3">{row.coverage}%</td>
                  <td className="px-4 py-3">{row.area}</td>
                  <td className="px-4 py-3">
                    {row.time === "15 минут" && <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded text-xs font-semibold">Норматив</span>}
                    {row.time === "20 минут" && <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded text-xs font-semibold">Текущее состояние</span>}
                    {row.time === "10 минут" && <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100 rounded text-xs font-semibold">Комфортный уровень</span>}
                    {row.time === "5 минут" && <span className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 rounded text-xs font-semibold">Оптимальный</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Результаты пространственного анализа</h2>
        
        <div className="space-y-4">
          <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border">
            <h4 className="font-semibold text-lg mb-2">Интерпретация данных</h4>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li>Почти 80% территории попадает в 15–20-минутную доступность, что соответствует минимальным требованиям по первичной медпомощи.</li>
              <li>Но только 42% территории имеют доступ менее чем за 10 минут — это ниже комфортного уровня для районов с высокой плотностью населения.</li>
              <li>Характерные «белые пятна» находятся на северо-востоке и юге — там расположены новые кварталы, где инфраструктура не успевает за застройкой.</li>
              <li>Пешая доступность остаётся ключевым критерием: многие маршруты удлинены из-за отсутствия прямых проходов, ограждений, особенностей дворовой планировки.</li>
            </ul>
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border">
            <h4 className="font-semibold text-lg mb-2">Пространственные выводы</h4>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li>Существующая сеть медучреждений формально присутствует, но фактически распределена неравномерно.</li>
              <li>Новые микрорайоны требуют приоритетного внимания, так как отдалены от основных медкластеров.</li>
              <li>Плотность населения создаёт нагрузку даже в тех зонах, где расстояние формально соответствует нормативам.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-900 p-6 rounded-lg border">
        <h3 className="text-xl font-semibold mb-4">Микрорайоны Некрасовки и статус покрытия</h3>
        <div className="space-y-3">
          {microdistricts.map((district, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50">
              <div>
                <div className="font-medium">{district.name}</div>
                <div className="text-sm text-slate-500">Население: {district.population.toLocaleString()} человек</div>
              </div>
              <div>
                {district.status === "Полное покрытие" ? (
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-full text-xs font-semibold">✓ Полное</span>
                ) : (
                  <span className="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 rounded-full text-xs font-semibold">⚠ Риск</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white dark:bg-slate-900 p-6 rounded-lg border">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <MapPin size={20} className="text-indigo-600" />
          Обследованные медицинские объекты
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {medicalFacilities.map((facility, idx) => (
            <div key={idx} className="p-3 border rounded-lg bg-slate-50 dark:bg-slate-800/50">
              <div className="font-medium text-sm">{facility.name}</div>
              <div className="text-xs text-slate-500 mt-1">Тип: {facility.type}</div>
              <div className="text-xs text-slate-500">Координаты: {facility.lat.toFixed(3)}, {facility.lon.toFixed(3)}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6 bg-white dark:bg-slate-900/5 p-6 rounded-lg border">
        <h2 className="text-2xl font-semibold">Рекомендации</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border-l-4 border-l-indigo-500">
            <h4 className="font-semibold mb-2">1. Строительство дополнительных медицинских пунктов в «зонах риска»</h4>
            <p className="text-sm">Введение фельдшерских пунктов, малых амбулаторий или филиалов позволит снизить долю проблемных территорий до менее 10%, распределить нагрузку между объектами и обеспечить доступность для пожилых и маломобильных групп.</p>
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border-l-4 border-l-green-500">
            <h4 className="font-semibold mb-2">2. Оптимизация сети через переосмысление маршрутов</h4>
            <p className="text-sm">Пространственный анализ показывает, где нужны новые тротуары и сквозные проходы, улучшение навигации и повышение безопасности маршрутов.</p>
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border-l-4 border-l-orange-500">
            <h4 className="font-semibold mb-2">3. Приоритизация инфраструктуры в быстрорастущих кварталах</h4>
            <p className="text-sm">Планирование новых объектов должно идти синхронно с застройкой, а не догонять её спустя годы.</p>
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border-l-4 border-l-blue-500">
            <h4 className="font-semibold mb-2">4. Применение подходов location-allocation</h4>
            <p className="text-sm">Этот инструмент позволяет моделировать будущие сценарии загрузки, выбирать оптимальные места под новые объекты и обосновывать бюджетные вложения.</p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Примерный перечень медобъектов</h2>
        <p className="text-slate-600 dark:text-slate-400">Среди обследованных точек в районе:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>«Горздрав»</strong> (несколько аптек)</li>
          <li><strong>Частные стоматологии</strong></li>
          <li><strong>«Доктор рядом»</strong></li>
          <li><strong>Медицинские центры и амбулатории</strong></li>
          <li><strong>«Амеда»</strong> (клиники частной диагностики и врачебной помощи)</li>
        </ul>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-4">
          Этот список демонстрирует плотность аптечной сети, но также показывает нехватку именно объектов первичной врачебной помощи.
        </p>
      </section>

      <section className="space-y-4 bg-white dark:bg-slate-900/5 p-6 rounded-lg border">
        <h2 className="text-2xl font-semibold">Заключение</h2>
        <p>
          Наш анализ показывает, что Некрасовка — район с активным развитием, но инфраструктурные решения должны идти в ногу со скоростью этого роста.
        </p>
        <p className="font-semibold text-lg mt-4">
          Главный вывод: доступность медицинской помощи в районе недостаточно равномерна, а «белые пятна» формируют реальные риски для качества жизни.
        </p>
        <p className="mt-4">
          Использование пространственных подходов, нормативов Москвы и методических рекомендаций Минздрава позволяет:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>обосновывать строительство новых объектов,</li>
          <li>планировать развитие района системно,</li>
          <li>формировать комфортную городскую среду,</li>
          <li>обеспечивать реальную, а не формальную доступность медицинских услуг.</li>
        </ul>
      </section>
    </div>
  );
};

export default HealthcareArticle;
