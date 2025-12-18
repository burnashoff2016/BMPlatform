import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

import { Card, CardDescription, CardTitle } from "../ui/card";
import { Button } from "../ui/button";

type TaskCardProps = {
  task: {
    slug: string;
    title: string;
    short_description: string;
    task_number: number;
    methodology_block: string;
    results_block: string;
    data_block: string;
    conclusion_block: string;
  };
};

const TaskCard = ({ task }: TaskCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const [firstParagraph] = task.short_description.split("\n\n");
  const highlights = [
    { label: "Данные", content: task.data_block },
    { label: "Методология", content: task.methodology_block },
    { label: "Результаты", content: task.results_block },
    { label: "Выводы", content: task.conclusion_block },
  ];
  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-center justify-between text-sm font-semibold text-brand-600 dark:text-brand-400">
        <span>Задание {task.task_number}</span>
        <span className="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">кейc</span>
      </div>
      <CardTitle>{task.title}</CardTitle>
      <CardDescription>{firstParagraph}</CardDescription>
      {expanded && (
        <div className="mt-2 space-y-3 rounded-2xl bg-slate-50/70 p-4 text-sm text-slate-600 dark:bg-slate-900/60 dark:text-slate-300">
          {highlights.map((section) => (
            <div key={section.label}>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">{section.label}</p>
              <p className="mt-1 whitespace-pre-line leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>
      )}
      <div className="mt-2 flex flex-col gap-3 border-t border-dashed border-slate-200 pt-3 text-xs text-slate-500 dark:border-slate-700 dark:text-slate-400">
        <Button
          variant="ghost"
          className="self-start px-0 text-sm text-brand-600 hover:text-brand-700"
          onClick={() => setExpanded((prev) => !prev)}
        >
          <span className="inline-flex items-center gap-1">
            {expanded ? "Скрыть детали" : "Показать детали"}
            <ChevronDown className={expanded ? "rotate-180 transition" : "transition"} size={16} />
          </span>
        </Button>
        <Button asChild>
          <Link to={`/tasks/${task.slug}`}>Перейти на страницу кейса</Link>
        </Button>
      </div>
    </Card>
  );
};

export default TaskCard;
