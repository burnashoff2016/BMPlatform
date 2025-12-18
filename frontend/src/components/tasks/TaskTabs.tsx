import * as Tabs from "@radix-ui/react-tabs";

import { cn } from "../../lib/utils";

type TaskTabsProps = {
  sections: {
    value: string;
    label: string;
    content: string;
  }[];
};

const TaskTabs = ({ sections }: TaskTabsProps) => (
  <Tabs.Root defaultValue={sections[0]?.value} className="w-full">
    <Tabs.List className="mb-4 flex flex-wrap gap-2">
      {sections.map((section) => (
        <Tabs.Trigger
          key={section.value}
          value={section.value}
          className={cn(
            "rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-500 transition data-[state=active]:border-brand-500 data-[state=active]:bg-brand-50 data-[state=active]:text-brand-700 dark:border-slate-700 dark:text-slate-300 dark:data-[state=active]:bg-slate-800 dark:data-[state=active]:text-brand-300",
          )}
        >
          {section.label}
        </Tabs.Trigger>
      ))}
    </Tabs.List>
    {sections.map((section) => (
      <Tabs.Content
        key={section.value}
        value={section.value}
        className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
      >
        {section.content.split("\n\n").map((paragraph, index) => (
          <p key={index} className="mb-4 text-slate-600 last:mb-0 dark:text-slate-300">
            {paragraph}
          </p>
        ))}
      </Tabs.Content>
    ))}
  </Tabs.Root>
);

export default TaskTabs;
