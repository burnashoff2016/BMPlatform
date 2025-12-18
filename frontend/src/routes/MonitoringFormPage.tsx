import { useState } from "react";
import { Link } from "react-router-dom";

import { Card, CardDescription, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { api } from "../lib/api";

const MonitoringFormPage = () => {
  const [form, setForm] = useState({
    age: 30,
    gender: "Женщина",
    employment_type: "Работаю",
    life_quality_score: 6,
    intent_to_leave: "Не определился",
    comment: "",
  });
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await api.post("/forms/monitoring-kostroma", form);
      setStatus("Спасибо! Ваш голос учтён в отчёте BM CaseFlow.");
      setForm((prev) => ({ ...prev, comment: "" }));
    } catch (error) {
      setStatus("Не удалось отправить форму, попробуйте позже.");
    }
  };

  return (
    <div className="space-y-10">
      <div className="rounded-3xl bg-gradient-to-r from-brand-600 via-indigo-600 to-slate-900 p-8 text-white">
        <p className="text-sm uppercase tracking-[0.5em] text-white/70">BM CaseFlow</p>
        <h1 className="mt-3 text-3xl font-semibold">Форма опроса жителей Костромской области</h1>
        <p className="mt-4 max-w-3xl text-lg text-white/80">
          Эта веб-форма использовалась для сбора 218 ответов по заданию «Мониторинг общественного мнения». Заполните поля так,
          как это делали участники исследования — результат мгновенно появится в аналитических карточках BM CaseFlow.
        </p>
        <Button variant="ghost" className="mt-4 text-white hover:text-white" asChild>
          <Link to="/tasks/monitoring-kostroma">← Назад к кейсу</Link>
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardTitle>Что измеряем</CardTitle>
          <CardDescription className="mb-4">
            Пять шкал качества жизни, статус занятости, свободный комментарий и намерение уехать.
          </CardDescription>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Ответы сразу агрегируются на витрине BM CaseFlow и используются в кейсе №2.
          </p>
        </Card>
        <Card>
          <CardTitle>Почему это важно</CardTitle>
          <CardDescription className="mb-4">
            38% жителей планируют переезд. Мы отслеживаем динамику, чтобы вовремя предложить адресные меры.
          </CardDescription>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Все визуализации обновляются автоматически и используются на занятиях как основа для коммуникационных решений.
          </p>
        </Card>
        <Card>
          <CardTitle>Обратная связь</CardTitle>
          <CardDescription className="mb-4">
            После отправки формы вы увидите подтверждение. При необходимости можно отправить несколько ответов подряд.
          </CardDescription>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Так имитируется поток реальных жителей и формируется насыщенная статистика.
          </p>
        </Card>
      </div>

      <Card>
        <form className="grid gap-6 md:grid-cols-2" onSubmit={handleSubmit}>
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-widest text-slate-400">Возраст</label>
            <Input
              type="number"
              min={16}
              max={90}
              value={form.age}
              onChange={(e) => setForm((prev) => ({ ...prev, age: Number(e.target.value) }))}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-widest text-slate-400">Пол</label>
            <Input value={form.gender} onChange={(e) => setForm((prev) => ({ ...prev, gender: e.target.value }))} />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-widest text-slate-400">Статус занятости</label>
            <Input
              value={form.employment_type}
              onChange={(e) => setForm((prev) => ({ ...prev, employment_type: e.target.value }))}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-widest text-slate-400">Оценка качества жизни (1–10)</label>
            <Input
              type="number"
              min={1}
              max={10}
              value={form.life_quality_score}
              onChange={(e) => setForm((prev) => ({ ...prev, life_quality_score: Number(e.target.value) }))}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-widest text-slate-400">Намерение уехать</label>
            <Input value={form.intent_to_leave} onChange={(e) => setForm((prev) => ({ ...prev, intent_to_leave: e.target.value }))} />
          </div>
          <div className="md:col-span-2">
            <label className="mb-1 block text-xs font-semibold uppercase tracking-widest text-slate-400">Комментарий</label>
            <Textarea
              rows={4}
              value={form.comment}
              onChange={(e) => setForm((prev) => ({ ...prev, comment: e.target.value }))}
              placeholder="Расскажите, что влияет на ваше решение оставить или покинуть регион"
            />
          </div>
          <div className="md:col-span-2 flex items-center justify-between">
            <Button type="submit">Отправить ответ</Button>
            {status && <p className="text-sm text-slate-500 dark:text-slate-300">{status}</p>}
          </div>
        </form>
      </Card>
    </div>
  );
};

export default MonitoringFormPage;
