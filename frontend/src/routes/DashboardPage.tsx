import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { AlertTriangle, BarChart3, MapPin, Wifi } from "lucide-react";

import TaskCard from "../components/tasks/TaskCard";
import { Card, CardDescription, CardTitle } from "../components/ui/card";
import { api } from "../lib/api";

type TaskOut = {
  id: number;
  slug: string;
  title: string;
  short_description: string;
  task_number: number;
  theory_block: string;
  methodology_block: string;
  data_block: string;
  results_block: string;
  conclusion_block: string;
  links_block: string;
};

const DashboardPage = () => {
  const { data: tasks, isLoading } = useQuery<TaskOut[]>({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await api.get<TaskOut[]>("/tasks");
      return response.data;
    },
  });

  const { data: monitoring } = useQuery({
    queryKey: ["metrics", "monitoring"],
    queryFn: async () => (await api.get("/data/monitoring-kostroma")).data,
  });

  const { data: crowdsourcing } = useQuery({
    queryKey: ["metrics", "crowdsourcing"],
    queryFn: async () => (await api.get("/data/crowdsourcing-roads")).data,
  });

  const { data: kpi } = useQuery({
    queryKey: ["metrics", "kpi"],
    queryFn: async () => (await api.get("/data/kpi-suzdal")).data,
  });

  const { data: inequality } = useQuery({
    queryKey: ["metrics", "inequality"],
    queryFn: async () => (await api.get("/data/digital-inequality")).data,
  });

  const kpiHighlight = useMemo(() => {
    if (!kpi?.monthly?.length) return null;
    const last = kpi.monthly[kpi.monthly.length - 1];
    return {
      month: last.month,
      conversion: last.conversion_rate,
      satisfaction: last.satisfaction_score,
    };
  }, [kpi]);

  const digitalLeader = useMemo(() => {
    if (!inequality?.regions?.length) return null;
    return [...inequality.regions].sort((a, b) => a.digital_inequality_index - b.digital_inequality_index)[0];
  }, [inequality]);

  const topIssue = crowdsourcing?.issues_by_type?.[0];
  const busiestDistrict = crowdsourcing?.issues_by_district?.[0];

  const highlightCards = [
    {
      title: "Индекс качества жизни",
      value: monitoring ? `${monitoring.average_score} баллов` : "—",
      hint: monitoring ? `Намерены уехать ${monitoring.intent_share}% жителей` : "",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      title: "Главная дорожная проблема",
      value: topIssue ? topIssue.issue_type : "—",
      hint: busiestDistrict ? `Особенно в районе ${busiestDistrict.district}` : "",
      icon: <AlertTriangle className="h-5 w-5" />,
    },
    {
      title: "Лучший месяц по KPI",
      value: kpiHighlight ? kpiHighlight.month : "—",
      hint: kpiHighlight ? `Конверсия ${Math.round(kpiHighlight.conversion * 100)}%` : "",
      icon: <MapPin className="h-5 w-5" />,
    },
    {
      title: "Лидер по цифровому неравенству",
      value: digitalLeader ? digitalLeader.region : "—",
      hint: digitalLeader ? `Индекс ${digitalLeader.digital_inequality_index}` : "",
      icon: <Wifi className="h-5 w-5" />,
    },
  ];

  return (
    <div className="space-y-12">
      <section
        id="overview"
        className="rounded-3xl bg-gradient-to-r from-brand-600 via-indigo-600 to-slate-900 p-8 text-white shadow-card"
      >
        <p className="text-sm uppercase tracking-[0.5em] text-white/70">BM CaseFlow</p>
        <h2 className="mt-3 text-3xl font-semibold">
          Платформа работ по предмету «Информационно-аналитические технологии государственного и муниципального управления»
        </h2>
        <p className="mt-4 max-w-4xl text-lg text-white/80">
          BM CaseFlow соединяет восемь тематических заданий: от мониторинга общественного мнения до оценки
          правового регулирования цифровых услуг. В дашборде собраны ключевые показатели, свежие отклики пользователей и
          ссылки на методические материалы, чтобы преподаватель видел прогресс каждой команды в режиме реального времени.
        </p>
        <p className="mt-6 rounded-2xl bg-white/10 px-4 py-2 text-sm tracking-wide text-white/90">
          Разработчики BM CaseFlow: Бурнашов Артем и Маклаева Мария.
        </p>
      </section>

      <section id="metrics" className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Пульс ключевых направлений</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            данные обновляются в реальном времени после отправки форм
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {highlightCards.map((card) => (
            <Card key={card.title} className="relative overflow-hidden">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base leading-tight">{card.title}</CardTitle>
                <span className="rounded-full bg-slate-100 p-2 text-brand-600 dark:bg-slate-800">
                  {card.icon}
                </span>
              </div>
              <p className="mt-4 text-2xl font-semibold leading-snug text-slate-900 dark:text-white">
                {card.value}
              </p>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-snug break-words">
                {card.hint}
              </p>
            </Card>
          ))}
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardTitle>Кострома: настроение жителей</CardTitle>
            <CardDescription className="mb-4">
              Средняя оценка и доля желающих уехать берутся из живой формы мониторинга.
            </CardDescription>
            <p className="text-4xl font-semibold text-brand-600">
              {monitoring ? `${monitoring.average_score}` : "—"}
              <span className="ml-2 text-base text-slate-500 dark:text-slate-400">из 10</span>
            </p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {monitoring ? `${monitoring.intent_share}% респондентов задумываются об отъезде` : "Нет данных"}
            </p>
          </Card>
          <Card>
            <CardTitle>Обратная связь по цифровым услугам Суздаля</CardTitle>
            <CardDescription className="mb-4">
              Форма KPI фиксирует конверсию и удовлетворённость по каждому месяцу.
            </CardDescription>
            {kpiHighlight ? (
              <div className="flex flex-wrap gap-6">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Последний месяц</p>
                  <p className="text-2xl font-semibold">{kpiHighlight.month}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Конверсия</p>
                  <p className="text-2xl font-semibold">{Math.round(kpiHighlight.conversion * 100)}%</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Удовлетворённость</p>
                  <p className="text-2xl font-semibold">{kpiHighlight.satisfaction}</p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-slate-500 dark:text-slate-400">Данные ещё не загружены</p>
            )}
          </Card>
        </div>
      </section>

      <section id="cases" className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold">Кейсы и методологии</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              краткое содержание всех заданий доступно прямо в дашборде
            </p>
          </div>
        </div>
        {isLoading ? (
          <p className="text-center text-slate-500">Загружаем задания...</p>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            {tasks?.map((task) => {
              // Если это задача 14, заменяем её на новую задачу "Мобильность 360"
              if (task.task_number === 14) {
                const mobilityTask = {
                  ...task,
                  slug: "mobility-360",
                  title: "Мобильность 360: Революция в городской транспортной системе Санкт-Петербурга",
                  short_description: "Комплексный анализ проблемы транспортного коллапса мегаполиса и предложение интегрированного решения через создание единой цифровой экосистемы городской мобильности",
                  task_number: 14
                };
                return <TaskCard key={task.id} task={mobilityTask} />;
              }
              return <TaskCard key={task.id} task={task} />;
            })}
          </div>
        )}
      </section>

    </div>
  );
};

export default DashboardPage;
