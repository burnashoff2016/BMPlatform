import React from "react";
import { useQuery } from "@tanstack/react-query";
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { Button } from "../components/ui/button";
import { Download, Printer } from "lucide-react";
import { api } from "../lib/api";

const fallback = {
  sentiment: [
    { name: "Негатив", value: 68 },
    { name: "Нейтрально", value: 24 },
    { name: "Позитив", value: 8 },
  ],
  issues: [
    { issue: "Низкие зарплаты", count: 48 },
    { issue: "Дороги", count: 37 },
    { issue: "Отсутствие работы", count: 33 },
    { issue: "Медицина", count: 28 },
    { issue: "Досуг", count: 18 },
  ],
  qualityDistribution: [
    { label: "1-3", count: 24 },
    { label: "4-5", count: 38 },
    { label: "6-7", count: 80 },
    { label: "8-10", count: 58 },
  ],
};

const COLORS = ["#ef4444", "#f59e0b", "#10b981"];

const MonitoringArticle: React.FC = () => {
  const { data } = useQuery({
    queryKey: ["monitoring-kostroma-data"],
    queryFn: async () => {
      const res = await api.get("/data/monitoring-kostroma");
      return res.data;
    },
    retry: false,
  });

  const sentiment = (data && (data.sentiment ?? data.sentiment_distribution)) || fallback.sentiment;
  const issues = (data && (data.issues ?? data.issues_list)) || fallback.issues;
  const qualityDistribution = (data && (data.qualityDistribution ?? data.quality_distribution)) || fallback.qualityDistribution;


  const sampleReviews = [
    {
      name: "Екатерина, 24 года, студентка техникума",
      age: 24,
      intent: "Планирую уехать",
      text: "Хочу учиться и работать в другом городе — здесь мало возможностей для развития, а дороги это просто позор.",
    },
    {
      name: "Иван, 49 лет, инженер",
      age: 49,
      intent: "Останусь",
      text: "Нравится спокойная жизнь и природа, сосновый бор, но раздражают постоянные пробки в Костроме из-за моста и нехватка качественных медицинских услуг.",
    },
  ];


  return (
    <div className="space-y-8 text-slate-800 dark:text-slate-100">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold">Мониторинг общественного мнения — Костромская область</h1>
          <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">Анализ оценок качества жизни и миграционных намерений жителей региона</p>
          <p className="mt-3 text-sm text-slate-500">Автор: Артём Бурнашов</p>
        </div>
        <div className="flex gap-2 items-center print:hidden">
          <Button variant="outline" onClick={() => window.print()} className="flex items-center gap-2"><Printer size={14} /> Печать</Button>
          <Button onClick={async () => {
            try {
              const html2pdf = await import("html2pdf.js");
              html2pdf.default().from(document.getElementById('monitoring-article') as HTMLElement).save('monitoring_kostroma.pdf');
            } catch (e) {
              alert('Установите html2pdf.js: npm install html2pdf.js');
            }
          }} className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white"><Download size={14} /> Скачать PDF</Button>
          <Button asChild className="ml-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md shadow-md flex items-center gap-2">
            <a href="/tasks/monitoring-kostroma/form">Перейти к полной форме</a>
          </Button>
        </div>
      </div>

      <section id="monitoring-article" className="space-y-6 bg-white dark:bg-slate-900/5 p-6 rounded-lg border">
        <h2 className="text-2xl font-semibold">Тема</h2>
        <p className="text-lg">Мониторинг общественного мнения жителей Костромской области о качестве жизни и намерениях уехать из региона.</p>

        <h3 className="text-xl font-semibold mt-4">Вступление</h3>
        <p>
          Я представляю Вам результаты исследования, посвящённого анализу общественного мнения
          жителей Костромской области. Целью работы было понять, как жители региона оценивают качество жизни, какие проблемы
          считают наиболее значимыми и каков уровень миграционных настроений — то есть намерений уехать в другие регионы России.
        </p>
        <p>
          Тема имеет не только исследовательское, но и управленческое значение. Для региональных властей такие данные — инструмент
          принятия решений, позволяющий корректировать социальную, экономическую и инфраструктурную политику.
        </p>

        <h3 className="text-xl font-semibold mt-4">Почему эта тема актуальна</h3>
        <p>
          Костромская область последние годы сталкивается с характерными для малых и средних регионов вызовами: оттоком населения,
          старением демографической структуры, ограниченностью рабочих мест и невысоким уровнем доходов.
        </p>
        <p>В таких условиях настроения жителей становятся ключевым индикатором:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>удовлетворены ли люди качеством городской и сельской инфраструктуры;</li>
          <li>насколько доступны социальные услуги;</li>
          <li>есть ли у молодёжи перспектива в регионе;</li>
          <li>чувствуют ли граждане уверенность в будущем;</li>
          <li>видят ли люди смысл оставаться в регионе или рассматривают возможность переезда.</li>
        </ul>
        <p>Понимание этих настроений позволяет выстраивать адресную, а не абстрактную региональную политику.</p>

        <h3 className="text-xl font-semibold mt-4">Методология исследования</h3>
        <p>
          Для сбора данных мы использовали собственную платформу мониторинга, выполненную в формате интерактивной формы. Через неё
          жители могли оставлять свои комментарии, оценки и мнения.
        </p>
        <p>Мы собрали:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>текстовые сообщения,</li>
          <li>эмоциональные оценки (позитив, нейтрально, негатив),</li>
          <li>упоминания ключевых проблем,</li>
          <li>выраженные мотивы для возможного переезда.</li>
        </ul>
        <p>Далее данные были обработаны средствами:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>контент-анализа — для выделения тем,</li>
          <li>сентимент-анализа — для оценки эмоционального фона сообщений,</li>
          <li>частотного анализа — для выделения наиболее повторяющихся проблем,</li>
          <li>кластеризации — для группировки схожих мнений.</li>
        </ul>
        <p>Это позволило получить целостную картину общественных настроений.</p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Примеры ответов жителей (реалистичные примеры)</h2>
        <div className="grid gap-4">
          {sampleReviews.map((r, i) => (
            <div key={i} className="rounded-lg border bg-white dark:bg-slate-900 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">{r.name}</div>
                  <div className="text-xs text-slate-500">Возраст: {r.age} — {r.intent}</div>
                </div>
              </div>
              <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">{r.text}</p>
            </div>
          ))}
        </div>
      </section>


      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-1 bg-white dark:bg-slate-900 p-4 rounded-lg border">
          <h3 className="font-semibold mb-3">1. Общий эмоциональный фон</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">По итогам анализа выявлено преобладание негативных оценок качества жизни. Ниже — распределение тональности.</p>
          <div style={{ width: '100%', height: 220 }} className="mt-3">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={sentiment} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={80} label>
                  {sentiment.map((_entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-3 text-sm">Жители чаще всего выражали недовольство: уровень заработных плат, отсутствие рабочих мест, качество дорог, состояние медицины, отсутствие возможностей для профессионального роста.</p>
        </div>

        <div className="col-span-1 lg:col-span-2 bg-white dark:bg-slate-900 p-4 rounded-lg border">
          <h3 className="font-semibold mb-3">2. Причины миграционных настроений и темы обсуждения</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">Среди мотивов уехать из региона чаще всего назывались работа и доходы, образование и развитие, инфраструктура, а также социальная среда.</p>
          <div style={{ width: '100%', height: 260 }} className="mt-3">
            <ResponsiveContainer>
              <BarChart data={issues} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="issue" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#f97316" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-3 text-sm">По частоте упоминаний лидируют: низкие зарплаты, состояние дорог, отсутствие рабочих мест, медицина и качество обслуживания, рост цен, миграция молодёжи, ограниченные возможности досуга.</p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Сентимент-анализ</h2>
        <p className="text-lg">Анализ эмоциональной окраски комментариев показал: 68 % — негативные оценки, 24 % — нейтральные, 8 % — позитивные. Негатив преобладает прежде всего при обсуждении экономики и занятости. Позитив встречается в темах природы, экологии и безопасности.</p>
      </section>

      <section className="space-y-6 bg-white dark:bg-slate-900/5 p-6 rounded-lg border">
        <h2 className="text-2xl font-semibold">Ключевые выводы</h2>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Жители Костромской области оценивают качество жизни как невысокое.</li>
          <li>Проблемы социально-экономического характера заметно преобладают над позитивными моментами.</li>
          <li>Сильны миграционные настроения, особенно среди молодых жителей, что создаёт дополнительную нагрузку на рынок труда и социальную сферу.</li>
          <li>Основные жалобы носят системный характер и требуют комплексного решения: нельзя устранить одну проблему, не затронув остальные.</li>
          <li>Отток населения имеет структурные причины, а не является разовой тенденцией.</li>
        </ol>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Рекомендации для региональной политики</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border">
            <h4 className="font-semibold">Экономическое развитие и поддержка занятости</h4>
            <p className="text-sm">Программы по привлечению инвестиций, созданию рабочих мест, поддержке предпринимательства.</p>
          </div>
          <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border">
            <h4 className="font-semibold">Модернизация инфраструктуры</h4>
            <p className="text-sm">Дороги, медицина, транспорт — ключевые темы для жителей.</p>
          </div>
          <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border">
            <h4 className="font-semibold">Повышение качества городской среды</h4>
            <p className="text-sm">Развитие досуговых пространств, культурных инициатив и молодёжных программ.</p>
          </div>
          <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border">
            <h4 className="font-semibold">Поддержка молодёжи</h4>
            <p className="text-sm">Стипендии, гранты, стажировки, программы удержания молодых специалистов.</p>
          </div>
          <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border md:col-span-2">
            <h4 className="font-semibold">Продвижение региона как комфортного места для жизни</h4>
            <p className="text-sm">Социальные кампании, которые формируют позитивную идентичность.</p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Заключение</h2>
        <p>Наше исследование показывает, что общественное мнение — это не просто набор комментариев, а ценный источник данных о настроениях, проблемах и ожиданиях жителей. Понимание этих настроений помогает выстраивать более эффективную и адресную региональную политику, а также предотвращать социальные риски.</p>
        <p>Мы надеемся, что результаты нашей работы смогут стать основой для дальнейшего анализа и принятия решений, направленных на повышение качества жизни и снижение миграционных настроений в Костромской области.</p>
      </section>
    </div>
  );
};

export default MonitoringArticle;
