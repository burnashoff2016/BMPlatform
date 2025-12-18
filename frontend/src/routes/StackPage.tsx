import { motion } from 'framer-motion';
import { 
  Code, 
  Zap, 
  Database, 
  HardDrive,
  Globe,
  Shield,
  Cpu,
  Server
} from 'lucide-react';

const StackPage = () => {
  const techCategories = [
    {
      title: "Frontend",
      icon: <Globe className="w-8 h-8" />,
      description: "Адаптивный пользовательский интерфейс",
      technologies: [
        { name: "React", version: "19.x", description: "Библиотека для создания пользовательских интерфейсов" },
        { name: "TypeScript", version: "5.x", description: "Язык программирования с типизацией" },
        { name: "TailwindCSS", version: "3.x", description: "Фреймворк для стилизации компонентов" },
        { name: "Vite", version: "5.x", description: "Быстрая сборка проектов" },
      ],
      color: "from-blue-500 to-indigo-600"
    },
    {
      title: "Backend",
      icon: <Server className="w-8 h-8" />,
      description: "Мощная серверная логика",
      technologies: [
        { name: "FastAPI", version: "0.115", description: "Современный фреймворк для веб-API" },
        { name: "SQLAlchemy", version: "2.x", description: "ORM для работы с базами данных" },
        { name: "JWT Auth", version: "latest", description: "Безопасная аутентификация" },
        { name: "Uvicorn", version: "0.30", description: "ASGI сервер" },
      ],
      color: "from-emerald-500 to-teal-600"
    },
    {
      title: "Анализ данных",
      icon: <Database className="w-8 h-8" />,
      description: "Научные библиотеки для исследований",
      technologies: [
        { name: "Pandas", version: "2.x", description: "Обработка табличных данных" },
        { name: "Scikit-learn", version: "1.5", description: "Машинное обучение" },
        { name: "NumPy", version: "2.x", description: "Математические вычисления" },
        { name: "Matplotlib", version: "3.x", description: "Визуализация данных" },
      ],
      color: "from-amber-500 to-orange-600"
    },
    {
      title: "Инфраструктура",
      icon: <HardDrive className="w-8 h-8" />,
      description: "Инструменты развертывания",
      technologies: [
        { name: "Docker", version: "latest", description: "Контейнеризация приложений" },
        { name: "PostgreSQL", version: "16.x", description: "Надежная реляционная БД" },
        { name: "Redis", version: "7.x", description: "Кэширование данных" },
        { name: "Ngrok", version: "latest", description: "Туннелирование для демонстраций" },
      ],
      color: "from-purple-500 to-violet-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 mb-4">
            Технологический стек
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Современная GovTech-платформа, разработанная с использованием передовых технологий 
            для обеспечения высокой производительности и безопасности
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {techCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:shadow-2xl transition-all duration-300 h-full">
                <div className={`bg-gradient-to-r ${category.color} p-6 text-white`}>
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                      {category.icon}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{category.title}</h2>
                      <p className="opacity-90">{category.description}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="space-y-4">
                    {category.technologies.map((tech, techIndex) => (
                      <motion.div
                        key={techIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: (index * 0.1) + (techIndex * 0.05) }}
                        className="flex items-start space-x-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                      >
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-600 dark:to-slate-700 flex items-center justify-center">
                            <Cpu className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-800 dark:text-slate-200">
                            {tech.name} 
                            <span className="text-slate-500 dark:text-slate-400 text-sm ml-2">
                              v{tech.version}
                            </span>
                          </h3>
                          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                            {tech.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-center text-white"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Zap className="w-8 h-8" />
            <h2 className="text-2xl font-bold">Преимущества стека</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <Shield className="w-10 h-10 mx-auto mb-2" />
              <h3 className="font-semibold text-lg">Безопасность</h3>
              <p className="text-indigo-100">JWT-аутентификация и защита данных</p>
            </div>
            <div>
              <Code className="w-10 h-10 mx-auto mb-2" />
              <h3 className="font-semibold text-lg">Производительность</h3>
              <p className="text-indigo-100">Asynchronous FastAPI и оптимизированные запросы</p>
            </div>
            <div>
              <Database className="w-10 h-10 mx-auto mb-2" />
              <h3 className="font-semibold text-lg">Аналитика</h3>
              <p className="text-indigo-100">Машинное обучение и визуализация данных</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StackPage;
