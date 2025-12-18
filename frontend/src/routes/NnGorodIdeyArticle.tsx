import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from "recharts";
import { Button } from "../components/ui/button";
import { Download, Printer } from "lucide-react";
import { Link } from "react-router-dom";

const sampleCategories = [
  { category: "Городская среда", value: 14, fill: "#3b82f6" },
  { category: "Транспорт", value: 10, fill: "#06b6d4" },
  { category: "Культура", value: 8, fill: "#f97316" },
  { category: "Экология", value: 7, fill: "#10b981" },
  { category: "Цифровые сервисы", value: 6, fill: "#a78bfa" },
];

const NnGorodIdeyArticle: React.FC = () => {
  // Try to fetch summary, but fall back to sample data if API doesn't provide arrays
  // Keep the UI resilient similar to other articles
  // (no errors if endpoint missing)
  const handlePrint = () => window.print();

  const handleDownload = async () => {
    try {
      const html2pdf = await import("html2pdf.js");
      html2pdf.default().from(document.getElementById("nn-article") as HTMLElement).save("nn_gorod_idey.pdf");
    } catch (e) {
      alert("Установите html2pdf.js: npm install html2pdf.js");
    }
  };

  return (
    <div className="space-y-8 text-slate-800 dark:text-slate-100">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold">«Нижний Новгород – Город Идей» — концепция платформы</h1>
          <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">Концепция системы электронного участия для жителей Нижнего Новгорода</p>
          <p className="mt-3 text-sm text-slate-500">Авторы: Артём Бурнашов и Мария Маклаева</p>
        </div>
        <div className="flex flex-wrap gap-2 items-center print:hidden">
          <Button variant="ghost" onClick={handlePrint} className="flex items-center gap-2"><Printer size={14} /> Печать</Button>
          <Button onClick={handleDownload} className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white"><Download size={14} /> Скачать PDF</Button>
          <Button asChild className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white">
            <Link to="/nn-gorod-idey-prototype">
              Прототип платформы
            </Link>
          </Button>
        </div>
      </div>

      <section id="nn-article" className="space-y-6 bg-white dark:bg-slate-900/5 p-6 rounded-lg border">
        <h2 className="text-2xl font-semibold">Введение</h2>
        <p>
          Мы представляем концепцию новой платформы электронного участия для жителей Нижнего Новгорода.
          Проект получил название «Нижний Новгород – Город Идей», и его цель — создать современный, инклюзивный и технологичный инструмент взаимодействия между жителями и городской администрацией.
        </p>
        <p>
          Сегодня практически все крупные города России сталкиваются с одинаковыми вызовами: снижение доверия граждан к механизмам управления,
          ограниченные форматы обратной связи и отсутствие прозрачности решений. В этих условиях электронное участие становится ключевым инструментом.
        </p>

        <h3 className="text-xl font-semibold mt-4">Почему это важно</h3>
        <p>
          Нижний Новгород — город с богатой историей и активным сообществом. Платформа позволит обсуждать проекты благоустройства, предлагать инициативы,
          участвовать в голосованиях и влиять на приоритеты развития, формируя реальный диалог между жителями и властью.
        </p>

        <h3 className="text-xl font-semibold mt-4">Бенчмаркинг</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">Мы изучили опыт современных платформ и выделили сильные и слабые стороны:</p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
          <li>«Активный гражданин» (Москва) — масштабные голосования, ограниченная открытость обсуждений.</li>
          <li>«Наш Санкт-Петербург» — проблемно-ориентированный подход, ограничены возможности инициатив.</li>
          <li>«Открытый Татарстан» — хорошая отчётность, но слабая модульность.</li>
          <li>«Чистая страна» — узкая тематическая направленность.</li>
          <li>«Доброволец России» — сильная работа с сообществами, не фокусируется на городском управлении.</li>
        </ul>
        <p className="mt-2">Вывод: ни одна система не объединяет обсуждение, голосование, идеи и аналитику в едином пользовательском опыте.</p>

        <h3 className="text-xl font-semibold mt-4">Концепция платформы — ключевые модули</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-indigo-50 dark:bg-indigo-950/30 rounded-lg border">
            <h4 className="font-semibold">1. «Идеи для города» — генератор инициатив</h4>
            <p className="text-sm mt-2">Предложения с фото, схемами, голосованием и подпиской. Алгоритмы ранжируют по полезности и поддержке сообщества.</p>
          </div>

          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border">
            <h4 className="font-semibold">2. «Голосование» — прозрачный механизм</h4>
            <p className="text-sm mt-2">Проверка личности через госуслуги/авторизацию, открытый протокол результатов и публичная экспертиза решений.</p>
          </div>

          <div className="p-4 bg-yellow-50 dark:bg-yellow-950/30 rounded-lg border">
            <h4 className="font-semibold">3. «Диалог» — площадка для обсуждений</h4>
            <p className="text-sm mt-2">Открытые обсуждения с участием представителей власти, мягкая модерация и ИИ-помощь для фильтрации токсичного контента.</p>
          </div>

          <div className="p-4 bg-sky-50 dark:bg-sky-950/30 rounded-lg border">
            <h4 className="font-semibold">4. «Аналитика» — умные отчёты</h4>
            <p className="text-sm mt-2">Автоматические отчёты по активности, тональности, болевым точкам и рейтингам тем для администрации и граждан.</p>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-4">Прототип интерфейса</h3>
        <p>Предлагаем лаконичный, адаптивный интерфейс с единой панелью управления, тёмной/светлой темами и геоинформационным компонентом для идей на карте.</p>

        <h3 className="text-xl font-semibold mt-4">Дорожная карта внедрения</h3>
        <ol className="list-decimal pl-6 space-y-2">
          <li><strong>MVP (1–2 месяца)</strong> — идеи + голосование, базовая аналитика, авторизация, мобильная адаптация.</li>
          <li><strong>Расширение (3–6 месяцев)</strong> — обсуждения, рейтинги, улучшенная модерация, геокарта инициатив.</li>
          <li><strong>Интеграция (6–12 месяцев)</strong> — МФЦ, API для служб, интеграция данных по благоустройству, муниципальные бюджеты участия.</li>
        </ol>

        <h3 className="text-xl font-semibold mt-4">Ожидаемые эффекты</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Рост вовлечённости жителей;</li>
          <li>Прозрачность решений;</li>
          <li>Снижение конфликтов через диалог;</li>
          <li>Улучшение городской среды;</li>
          <li>Создание цифрового следа взаимодействия.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-4">Примеры категорий идей (статус)</h3>
        <div style={{ width: '100%', height: 260 }}>
          <ResponsiveContainer>
            <BarChart data={sampleCategories} margin={{ top: 10, right: 20, left: 0, bottom: 30 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value">
                {sampleCategories.map((c, i) => (
                  <Cell key={i} fill={c.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <h3 className="text-xl font-semibold mt-4">Заключение</h3>
        <p>
          Платформа «Нижний Новгород – Город Идей» — это экосистема, объединяющая жителей и власть и превращающая участие в инструмент управления городом.
          Мы уверены, что такой подход позволит Нижнему Новгороду стать лидером в сфере цифрового взаимодействия с гражданами.
        </p>
      </section>
    </div>
  );
};

export default NnGorodIdeyArticle;
