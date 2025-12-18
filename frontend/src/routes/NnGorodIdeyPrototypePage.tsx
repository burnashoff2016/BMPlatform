import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Loader2, Lightbulb, Send } from "lucide-react";

interface Idea {
  id: number;
  title: string;
  description: string;
  category: string;
  author: string;
  likes: number;
  status: "Новая" | "В работе" | "Реализована";
}

const initialIdeas: Idea[] = [
  { id: 1, title: "Улучшение парка 'Швейцария'", description: "Предложение по добавлению новых зон отдыха и детских площадок, а также обновлению инфраструктуры.", category: "Городская среда", author: "Анна Иванова", likes: 120, status: "В работе" },
  { id: 2, title: "Развитие велодорожек", description: "Создание безопасных и удобных велодорожек, соединяющих ключевые районы города.", category: "Транспорт", author: "Петр Сидоров", likes: 95, status: "Новая" },
  { id: 3, title: "Фестиваль уличного искусства", description: "Организация ежегодного фестиваля для поддержки местных художников и оживления городских пространств.", category: "Культура", author: "Мария Смирнова", likes: 150, status: "Реализована" },
  { id: 4, title: "Система раздельного сбора мусора", description: "Внедрение комплексной системы раздельного сбора отходов в каждом районе города.", category: "Экология", author: "Иван Козлов", likes: 80, status: "Новая" },
  { id: 5, title: "Бесплатный Wi-Fi в общественных местах", description: "Обеспечение бесплатного доступа к интернету в парках, скверах и на остановках общественного транспорта.", category: "Цифровые сервисы", author: "Елена Новикова", likes: 110, status: "В работе" },
  { id: 6, title: "Программа 'Зеленый двор'", description: "Инициатива по озеленению дворовых территорий и созданию мини-садов с участием жителей.", category: "Городская среда", author: "Дмитрий Орлов", likes: 70, status: "Новая" },
];

const NnGorodIdeyPrototypePage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [newIdeaTitle, setNewIdeaTitle] = useState("");
  const [newIdeaDescription, setNewIdeaDescription] = useState("");
  const [newIdeaCategory, setNewIdeaCategory] = useState("Городская среда");

  useEffect(() => {
    // Simulate data fetching
    const timer = setTimeout(() => {
      setIdeas(initialIdeas);
      setLoading(false);
    }, 1500); // 1.5 seconds loading
    return () => clearTimeout(timer);
  }, []);

  const handleAddIdea = (e: React.FormEvent) => {
    e.preventDefault();
    if (newIdeaTitle.trim() && newIdeaDescription.trim()) {
      const newIdea: Idea = {
        id: ideas.length + 1,
        title: newIdeaTitle.trim(),
        description: newIdeaDescription.trim(),
        category: newIdeaCategory,
        author: "Анонимный пользователь", // For prototype
        likes: 0,
        status: "Новая",
      };
      setIdeas([...ideas, newIdea]);
      setNewIdeaTitle("");
      setNewIdeaDescription("");
      setNewIdeaCategory("Городская среда");
    }
  };

  const getStatusColor = (status: Idea["status"]) => {
    switch (status) {
      case "Новая":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "В работе":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "Реализована":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="min-h-screen bg-gradient-to-br from-[#1A2B4C] to-[#0F172A] text-white p-8 md:p-12"
    >
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row items-center justify-between mb-12">
          <motion.div variants={itemVariants}>
            <h1 className="text-5xl font-extrabold tracking-tight mb-4 md:mb-0 text-transparent bg-clip-text bg-gradient-to-r from-[#00C9A7] to-[#FF7F50]">
              Город Идей
            </h1>
            <p className="text-xl text-slate-300">Ваш голос формирует будущее Нижнего Новгорода</p>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Link to="/tasks/nn-gorod-idey">
              <Button className="bg-[#FF7F50] hover:bg-[#e66a40] text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out">
                <Lightbulb size={20} className="mr-2" /> Назад к концепции
              </Button>
            </Link>
          </motion.div>
        </header>

        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center h-96 text-slate-400"
          >
            <Loader2 className="h-16 w-16 animate-spin text-[#00C9A7]" />
            <p className="mt-4 text-xl">Загружаем свежие идеи...</p>
          </motion.div>
        ) : (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-16">
            <section>
              <motion.h2 variants={itemVariants} className="text-4xl font-bold mb-8 text-slate-100">
                Предложенные Идеи
              </motion.h2>
              <motion.div
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {ideas.map((idea) => (
                  <motion.div key={idea.id} variants={itemVariants}>
                    <Card className="bg-[#1A2B4C]/70 backdrop-blur-sm border border-slate-700 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out">
                      <CardHeader className="pb-4">
                        <CardTitle className="text-2xl font-bold text-[#00C9A7] flex items-center">
                          <Lightbulb size={24} className="mr-3 text-[#FF7F50]" />
                          {idea.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-slate-300 text-base">{idea.description}</p>
                        <div className="flex flex-wrap gap-2 items-center text-sm">
                          <span className="px-3 py-1 rounded-full bg-slate-700 text-slate-200 font-medium">
                            {idea.category}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(idea.status)}`}>
                            {idea.status}
                          </span>
                          <span className="text-slate-400">Автор: {idea.author}</span>
                          <span className="text-slate-400 ml-auto">❤️ {idea.likes}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </section>

            <section>
              <motion.h2 variants={itemVariants} className="text-4xl font-bold mb-8 text-slate-100">
                Предложите свою Идею
              </motion.h2>
              <motion.form
                variants={itemVariants}
                onSubmit={handleAddIdea}
                className="bg-[#1A2B4C]/70 backdrop-blur-sm border border-slate-700 p-8 rounded-xl shadow-xl space-y-6"
              >
                <div>
                  <label htmlFor="ideaTitle" className="block text-lg font-medium text-slate-200 mb-2">
                    Заголовок идеи
                  </label>
                  <Input
                    id="ideaTitle"
                    type="text"
                    value={newIdeaTitle}
                    onChange={(e) => setNewIdeaTitle(e.target.value)}
                    placeholder="Например: Создание нового сквера в центре города"
                    className="w-full p-3 bg-slate-800 border border-slate-600 rounded-md text-white placeholder-slate-500 focus:ring-2 focus:ring-[#00C9A7] focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="ideaDescription" className="block text-lg font-medium text-slate-200 mb-2">
                    Описание идеи
                  </label>
                  <Textarea
                    id="ideaDescription"
                    rows={5}
                    value={newIdeaDescription}
                    onChange={(e) => setNewIdeaDescription(e.target.value)}
                    placeholder="Подробно опишите вашу идею, ее преимущества и возможную реализацию..."
                    className="w-full p-3 bg-slate-800 border border-slate-600 rounded-md text-white placeholder-slate-500 focus:ring-2 focus:ring-[#00C9A7] focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="ideaCategory" className="block text-lg font-medium text-slate-200 mb-2">
                    Категория
                  </label>
                  <select
                    id="ideaCategory"
                    value={newIdeaCategory}
                    onChange={(e) => setNewIdeaCategory(e.target.value)}
                    className="w-full p-3 bg-slate-800 border border-slate-600 rounded-md text-white focus:ring-2 focus:ring-[#00C9A7] focus:border-transparent transition-all duration-200"
                  >
                    <option value="Городская среда">Городская среда</option>
                    <option value="Транспорт">Транспорт</option>
                    <option value="Культура">Культура</option>
                    <option value="Экология">Экология</option>
                    <option value="Цифровые сервисы">Цифровые сервисы</option>
                  </select>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#00C9A7] hover:bg-[#00a88a] text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out flex items-center justify-center"
                >
                  <Send size={20} className="mr-2" /> Отправить Идею
                </Button>
              </motion.form>
            </section>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default NnGorodIdeyPrototypePage;

