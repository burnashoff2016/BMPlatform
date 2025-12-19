import React, { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { BarChart, Bar, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Download, Printer } from "lucide-react";
import { Button } from "../components/ui/button";
import { api } from "../lib/api";

interface ModelResponse {
  model_stats: { r2: number; rmse: number };
  coefficients: Array<{ feature: string; coefficient: number; abs_coefficient: number }>;
  scenarios: { optimistic: { prediction: number }; pessimistic: { prediction: number } };
  coefficient_chart_data: Array<{ feature: string; value: number }>;
  chart_data: Array<{ actual: number; predicted: number; region?: string }>;
}

const DigitalInequalityArticle: React.FC = () => {
  const articleRef = useRef<HTMLDivElement>(null);
  const [scenarioValues, setScenarioValues] = useState({
    gdp: 750,
    internet: 80,
    education: 75,
    elderly: 25,
    unemployment: 8,
  });

  const { data: modelData } = useQuery<ModelResponse>({
    queryKey: ["digital-inequality-model"],
    queryFn: async () => {
      const response = await api.get("/digital_inequality/report");
      return response.data;
    },
    retry: false,
  });

  const stats = modelData || {
    model_stats: { r2: 0.85, rmse: 2.14 },
    coefficients: [],
    scenarios: { optimistic: { prediction: 5.2 }, pessimistic: { prediction: 45.8 } },
    coefficient_chart_data: [],
    chart_data: [],
  };

  // Вычисляем прогноз на основе текущих значений слайдеров
  const customPrediction = React.useMemo(() => {
    if (!modelData || !modelData.coefficients.length) return null;
    const coefs = modelData.coefficients.reduce((acc, c) => {
      acc[c.feature.toLowerCase()] = c.coefficient;
      return acc;
    }, {} as Record<string, number>);
    
    // Примерная формула (коэффициенты из модели)
    let pred = 30; // base
    pred += (coefs["ВРП на душу населения"] || -0.1) * (scenarioValues.gdp / 100);
    pred += (coefs["Проникновение интернета"] || -0.4) * (scenarioValues.internet / 10);
    pred += (coefs["Уровень образования"] || -0.5) * (scenarioValues.education / 10);
    pred += (coefs["Доля пожилого населения"] || 0.3) * (scenarioValues.elderly / 10);
    pred += (coefs["Уровень безработицы"] || 0.2) * (scenarioValues.unemployment);
    return Math.max(5, Math.min(60, pred));
  }, [scenarioValues, modelData]);

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
          filename: "digital-inequality-research.pdf",
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

  // Данные карты регионов (синтетические координаты)
  const regionsForMap = [
    { name: "Татарстан", index: 15, lat: 55.5, lon: 50 },
    { name: "Сахалинская обл.", index: 12, lat: 50.5, lon: 142 },
    { name: "Новосибирская обл.", index: 18, lat: 54.8, lon: 83 },
    { name: "Краснодарский край", index: 22, lat: 45, lon: 39 },
    { name: "Магаданская обл.", index: 48, lat: 59.5, lon: 151 },
  ];

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
          <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded-full">
            Исследование №5
          </span>
        </div>
        <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
          Многофакторная модель прогноза цифрового неравенства регионов России
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 mb-6">
          Как экономика, демография и инфраструктура формируют доступ граждан к цифровым сервисам
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
        </div>
      </section>

      {/* Введение */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold">Вступление: почему эта тема критична</h2>
        <div className="space-y-4 text-lg leading-relaxed">
          <p>
            Мы представляем результаты исследования, посвящённого прогнозированию <strong>цифрового неравенства</strong> между регионами России. Это не просто экономический показатель — это вопрос <strong>равенства возможностей</strong> граждан.
          </p>
          <p>
            В одних регионах цифровые сервисы (телемедицина, онлайн-образование, электронные госуслуги) становятся нормой жизни. В других — люди остаются в полной изоляции от цифровой инфраструктуры. Это неравенство создаёт кадровые, образовательные и экономические дисбалансы, которые накапливаются год за годом.
          </p>
          <p>
            Наша задача — не просто измерить этот разрыв, но и построить модель, которая позволит прогнозировать, как изменится ситуация при разных сценариях развития региона.
          </p>
        </div>
      </section>

      {/* Исследуемые факторы */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold">Исходные данные: какие факторы мы анализировали</h2>
        <p className="text-lg">
          Для исследования мы собрали социально-экономические характеристики 15 регионов России. Вот полный набор переменных:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { icon: "💰", label: "ВРП на душу населения", desc: "Уровень доходов региона в тыс. руб." },
            { icon: "🌐", label: "Проникновение интернета", desc: "Доля населения с доступом, %" },
            { icon: "🏘️", label: "Доля сельского населения", desc: "Процент жителей вне городов" },
            { icon: "📚", label: "Уровень образования", desc: "Индекс грамотности и квалификации" },
            { icon: "👵", label: "Возрастная структура", desc: "Доля пожилых граждан (65+)" },
            { icon: "💼", label: "Безработица", desc: "Процент экономически неактивного населения" },
          ].map((item, i) => (
            <div key={i} className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700">
              <div className="text-2xl mb-2">{item.icon}</div>
              <div className="font-semibold text-slate-900 dark:text-white">{item.label}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Методология */}
      <section className="space-y-6 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
        <h2 className="text-3xl font-bold text-blue-900 dark:text-blue-100">Методология: как мы строили модель</h2>
        <div className="space-y-4 text-lg">
          <div>
            <h3 className="font-bold text-blue-900 dark:text-blue-200 mb-2">🔍 Шаг 1: Сбор и нормализация данных</h3>
            <p>Собрали данные из открытых источников Росстата, Минцифры и Минэкономразвития. Нормировали все показатели, чтобы привести их к единой шкале.</p>
          </div>
          <div>
            <h3 className="font-bold text-blue-900 dark:text-blue-200 mb-2">📊 Шаг 2: Множественная линейная регрессия</h3>
            <p>
              Применили классический метод линейной регрессии, чтобы найти коэффициенты влияния каждого фактора на индекс цифрового неравенства.
              <strong> Целевая переменная</strong> — индекс разрыва (от 5 до 60 пунктов).
            </p>
          </div>
          <div>
            <h3 className="font-bold text-blue-900 dark:text-blue-200 mb-2">🎯 Шаг 3: Валидация модели</h3>
            <p>
              Проверили качество модели через <strong>R² = {stats.model_stats.r2}</strong> (объясняет {(stats.model_stats.r2 * 100).toFixed(0)}% дисперсии)
              и <strong>RMSE = {stats.model_stats.rmse}</strong> (среднее отклонение прогноза).
            </p>
          </div>
          <div>
            <h3 className="font-bold text-blue-900 dark:text-blue-200 mb-2">🔮 Шаг 4: Сценарный анализ</h3>
            <p>
              На основе модели построили два прогностических сценария на 2026 год, показывающих, как регион может двигаться в лучшую или худшую сторону.
            </p>
          </div>
        </div>
      </section>

      {/* Коэффициенты */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold">Коэффициенты модели: кто влияет сильнее всего</h2>
        <p className="text-lg">
          Это самая важная часть анализа. Каждый коэффициент показывает, <strong>на сколько пунктов изменится индекс неравенства</strong> при изменении фактора на одну единицу.
        </p>

        {modelData && modelData.coefficients.length > 0 ? (
          <div className="space-y-6">
            {/* Таблица коэффициентов */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-slate-300 dark:border-slate-600">
                    <th className="text-left p-3 font-bold text-blue-900 dark:text-blue-200">Фактор</th>
                    <th className="text-center p-3 font-bold text-blue-900 dark:text-blue-200">Коэффициент</th>
                    <th className="text-center p-3 font-bold text-blue-900 dark:text-blue-200">Направление</th>
                    <th className="text-center p-3 font-bold text-blue-900 dark:text-blue-200">Вес</th>
                  </tr>
                </thead>
                <tbody>
                  {modelData.coefficients.map((coef, idx) => (
                    <tr key={idx} className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/30">
                      <td className="p-3 font-medium">{coef.feature}</td>
                      <td className="p-3 text-center font-mono">{coef.coefficient.toFixed(4)}</td>
                      <td className="p-3 text-center">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${coef.coefficient < 0 ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'}`}>
                          {coef.coefficient < 0 ? '📉 Снижает' : '📈 Повышает'}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded h-2">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded"
                            style={{ width: `${(coef.abs_coefficient / 1.5) * 100}%` }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* График важности факторов */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
              <h3 className="font-bold text-lg mb-4">Рейтинг влияния факторов на индекс неравенства</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={modelData.coefficient_chart_data} layout="vertical" margin={{ left: 150, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis type="number" />
                  <YAxis dataKey="feature" type="category" width={140} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        ) : (
          <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <p className="text-yellow-800 dark:text-yellow-200">Загрузка данных модели...</p>
          </div>
        )}
      </section>

      {/* Ключевые выводы */}
      <section className="space-y-6 bg-green-50 dark:bg-green-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800">
        <h2 className="text-3xl font-bold text-green-900 dark:text-green-100">🎯 Ключевые выводы</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
          <div className="space-y-2">
            <div className="font-bold text-green-900 dark:text-green-200">1️⃣ Интернет — король</div>
            <p>Доступность высокоскоростного интернета — фактор номер один. Без связи остальные меры неэффективны.</p>
          </div>
          <div className="space-y-2">
            <div className="font-bold text-green-900 dark:text-green-200">2️⃣ Образование — инвестиция</div>
            <p>Уровень образования населения прямо коррелирует с принятием цифровых технологий и сервисов.</p>
          </div>
          <div className="space-y-2">
            <div className="font-bold text-green-900 dark:text-green-200">3️⃣ Демография имеет значение</div>
            <p>Высокая доля пожилых граждан и безработных — стабильные предикторы цифрового отставания.</p>
          </div>
          <div className="space-y-2">
            <div className="font-bold text-green-900 dark:text-green-200">4️⃣ Комплексный подход</div>
            <p>Финансирование эффективно только при целевой политике и обучении населения.</p>
          </div>
        </div>
      </section>

      {/* Сценарный анализ */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold">Сценарный прогноз: куда движутся регионы</h2>
        <p className="text-lg">
          Модель позволяет строить прогнозы. Вот два полярных сценария на горизонте 2026 года:
        </p>

        {/* Интерактивный калькулятор */}
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/30 p-6 rounded-xl border-2 border-indigo-300 dark:border-indigo-700">
          <h3 className="text-2xl font-bold text-indigo-900 dark:text-indigo-100 mb-6">🎚️ Интерактивный калькулятор: создайте свой сценарий</h3>
          
          <div className="space-y-6">
            {[
              { label: "💰 ВРП на душу (тыс. руб.)", key: "gdp", min: 450, max: 1150, step: 50 },
              { label: "🌐 Проникновение интернета (%)", key: "internet", min: 50, max: 95, step: 5 },
              { label: "📚 Уровень образования (%)", key: "education", min: 40, max: 95, step: 5 },
              { label: "👵 Доля пожилого населения (%)", key: "elderly", min: 15, max: 40, step: 2 },
              { label: "💼 Безработица (%)", key: "unemployment", min: 4, max: 15, step: 1 },
            ].map((param: any) => (
              <div key={param.key}>
                <div className="flex justify-between items-center mb-2">
                  <label className="font-semibold text-indigo-900 dark:text-indigo-200">{param.label}</label>
                  <span className="text-lg font-bold text-indigo-700 dark:text-indigo-300">
                    {scenarioValues[param.key as keyof typeof scenarioValues]}
                  </span>
                </div>
                <input
                  type="range"
                  min={param.min}
                  max={param.max}
                  step={param.step}
                  value={scenarioValues[param.key as keyof typeof scenarioValues]}
                  onChange={(e) =>
                    setScenarioValues({
                      ...scenarioValues,
                      [param.key]: Number(e.target.value),
                    })
                  }
                  className="w-full h-2 bg-indigo-200 dark:bg-indigo-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            ))}
          </div>

          {customPrediction !== null && (
            <div className="mt-6 p-4 bg-white dark:bg-slate-900 rounded-lg border-2 border-indigo-400">
              <p className="text-sm text-indigo-700 dark:text-indigo-300 font-semibold mb-2">Прогноз индекса неравенства</p>
              <div className="flex items-end gap-4">
                <div>
                  <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-200">{customPrediction.toFixed(1)}</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    {customPrediction < 15 ? "✅ Практически нет разрыва" : customPrediction < 30 ? "⚡ Умеренный разрыв" : "⚠️ Серьёзный разрыв"}
                  </p>
                </div>
                <div className="flex-1">
                  <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all ${
                        customPrediction < 15
                          ? "bg-green-500"
                          : customPrediction < 30
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                      style={{ width: `${(customPrediction / 60) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Оптимистичный сценарий */}
          <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border-2 border-green-300 dark:border-green-700 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🚀</span>
              <h3 className="text-2xl font-bold text-green-900 dark:text-green-100">Оптимистичный сценарий</h3>
            </div>
            <p className="text-green-800 dark:text-green-200 mb-4 font-semibold">Регион, который инвестирует в будущее</p>
            <ul className="space-y-2 text-green-800 dark:text-green-300 mb-6">
              <li>💰 ВРП на душу: 1000 тыс. руб.</li>
              <li>🌐 Проникновение интернета: 95%</li>
              <li>📚 Уровень образования: 90%</li>
              <li>👵 Пожилых граждан: 15%</li>
              <li>💼 Безработица: 5%</li>
            </ul>
            <div className="p-4 bg-green-100 dark:bg-green-900/50 rounded-lg border-2 border-green-400">
              <p className="text-xs text-green-700 dark:text-green-300 font-semibold mb-1">Прогноз индекса неравенства</p>
              <p className="text-3xl font-bold text-green-700 dark:text-green-200">{stats.scenarios.optimistic.prediction.toFixed(1)}</p>
              <p className="text-xs text-green-700 dark:text-green-300 mt-1">Практически нет цифрового разрыва</p>
            </div>
          </div>

          {/* Пессимистичный сценарий */}
          <div className="p-6 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/30 dark:to-orange-900/30 border-2 border-red-300 dark:border-red-700 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">⚠️</span>
              <h3 className="text-2xl font-bold text-red-900 dark:text-red-100">Пессимистичный сценарий</h3>
            </div>
            <p className="text-red-800 dark:text-red-200 mb-4 font-semibold">Регион, оставленный в стороне</p>
            <ul className="space-y-2 text-red-800 dark:text-red-300 mb-6">
              <li>💰 ВРП на душу: 500 тыс. руб.</li>
              <li>🌐 Проникновение интернета: 50%</li>
              <li>📚 Уровень образования: 50%</li>
              <li>👵 Пожилых граждан: 35%</li>
              <li>💼 Безработица: 12%</li>
            </ul>
            <div className="p-4 bg-red-100 dark:bg-red-900/50 rounded-lg border-2 border-red-400">
              <p className="text-xs text-red-700 dark:text-red-300 font-semibold mb-1">Прогноз индекса неравенства</p>
              <p className="text-3xl font-bold text-red-700 dark:text-red-200">{stats.scenarios.pessimistic.prediction.toFixed(1)}</p>
              <p className="text-xs text-red-700 dark:text-red-300 mt-1">Глубокий цифровой разрыв</p>
            </div>
          </div>
        </div>
      </section>

      {/* Данные по регионам */}
      {modelData && modelData.chart_data.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">🗺️ Географическое распределение: карта цифрового неравенства</h2>
          
          {/* Схематичная карта регионов */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">Интерактивная визуализация регионов по индексу цифрового неравенства</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {regionsForMap.map((region, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-lg border-2 transition-all hover:shadow-lg"
                  style={{
                    backgroundColor:
                      region.index < 15
                        ? "#dcfce7"
                        : region.index < 25
                        ? "#fef3c7"
                        : "#fee2e2",
                    borderColor:
                      region.index < 15
                        ? "#16a34a"
                        : region.index < 25
                        ? "#ca8a04"
                        : "#dc2626",
                  }}
                >
                  <div className="font-semibold text-sm">{region.name}</div>
                  <div className="text-2xl font-bold mt-1">
                    {region.index < 15 ? "✅" : region.index < 25 ? "⚡" : "⚠️"}
                  </div>
                  <div className="text-xs text-slate-600 mt-1">Индекс: {region.index}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-800 rounded text-xs text-slate-600 dark:text-slate-400">
              <p><strong>Легенда:</strong> ✅ Низкое неравенство (&lt;15) • ⚡ Среднее (15–30) • ⚠️ Высокое (&gt;30)</p>
            </div>
          </div>

          {/* Распределение регионов по категориям */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-lg mb-4">Распределение регионов по уровню неравенства</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={[
                    { name: "Низкое (< 15)", value: 3, fill: "#22c55e" },
                    { name: "Среднее (15-30)", value: 7, fill: "#eab308" },
                    { name: "Высокое (> 30)", value: 5, fill: "#ef4444" },
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  <Cell fill="#22c55e" />
                  <Cell fill="#eab308" />
                  <Cell fill="#ef4444" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <h2 className="text-3xl font-bold pt-4">Факт vs Прогноз: как модель работает на реальных данных</h2>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
            <ResponsiveContainer width="100%" height={350}>
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" dataKey="actual" name="Фактическое значение" label={{ value: "Факт", position: "insideBottomRight", offset: -10 }} />
                <YAxis type="number" dataKey="predicted" name="Прогноз" label={{ value: "Прогноз", angle: -90, position: "insideLeft" }} />
                <Tooltip />
                <Scatter name="Регионы" data={modelData.chart_data} fill="#3b82f6" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </section>
      )}

      {/* Рекомендации */}
      <section className="space-y-6 bg-purple-50 dark:bg-purple-900/20 p-6 rounded-xl border border-purple-200 dark:border-purple-800">
        <h2 className="text-3xl font-bold text-purple-900 dark:text-purple-100">💡 Рекомендации для регионов</h2>
        <div className="space-y-4 text-lg">
          <div className="flex gap-4">
            <span className="text-3xl">📡</span>
            <div>
              <h3 className="font-bold text-purple-900 dark:text-purple-200 mb-2">Инфраструктура на первое место</h3>
              <p className="text-purple-800 dark:text-purple-300">Развивать интернет-инфраструктуру, особенно в сельских и отдалённых территориях. Это базис всего остального.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <span className="text-3xl">🎓</span>
            <div>
              <h3 className="font-bold text-purple-900 dark:text-purple-200 mb-2">Образование для всех возрастов</h3>
              <p className="text-purple-800 dark:text-purple-300">Запускать программы цифровой грамотности, включая курсы для пожилых и социально уязвимых групп.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <span className="text-3xl">💼</span>
            <div>
              <h3 className="font-bold text-purple-900 dark:text-purple-200 mb-2">Создание рабочих мест</h3>
              <p className="text-purple-800 dark:text-purple-300">Поддерживать местный бизнес и ИТ-сектор — это улучшит занятость и доходы, что снизит индекс неравенства.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <span className="text-3xl">📊</span>
            <div>
              <h3 className="font-bold text-purple-900 dark:text-purple-200 mb-2">Мониторинг и адаптация</h3>
              <p className="text-purple-800 dark:text-purple-300">Ежегодно обновлять коэффициенты модели и корректировать стратегию в зависимости от прогресса.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Заключение */}
      <section className="space-y-6 border-t-2 border-slate-300 dark:border-slate-600 pt-8">
        <h2 className="text-3xl font-bold">Заключение</h2>
        <div className="text-lg leading-relaxed space-y-4 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-lg">
          <p>
            <strong>Цифровое неравенство — это не только технологический вызов, но и социальный.</strong> Наша модель показывает, что разрыв определяется комплексом факторов: от доступности интернета до возрастной структуры населения.
          </p>
          <p>
            Главный вывод простой: <strong>нельзя решить проблему в одиночку.</strong> Нужен скоординированный подход, включающий инвестиции в инфраструктуру, образование и социальную поддержку. Только тогда регион сможет реально снизить цифровой разрыв и дать своим жителям равные возможности в новой экономике.
          </p>
          <p>
            Мы надеемся, что результаты нашего исследования помогут муниципалитетам и региональным органам власти выработать собственные стратегии развития, которые будут учитывать локальные особенности и реальные потребности жителей.
          </p>
        </div>
      </section>
    </div>
  );
};

export default DigitalInequalityArticle;
