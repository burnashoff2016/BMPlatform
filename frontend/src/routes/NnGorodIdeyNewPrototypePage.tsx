import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { 
  Lightbulb, 
  Users, 
  MapPin, 
  ThumbsUp, 
  MessageCircle, 
  Eye, 
  TrendingUp, 
  Star, 
  Filter, 
  Search,
  Menu,
  X,
  CheckCircle
} from "lucide-react";

interface Idea {
  id: number;
  title: string;
  description: string;
  category: string;
  author: string;
  likes: number;
  comments: number;
  views: number;
  status: "Новая" | "Обсуждается" | "Одобренная" | "Реализуется" | "Реализована";
  district: string;
  date: string;
  tags: string[];
}

const NnGorodIdeyNewPrototypePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'popular' | 'new' | 'discussed'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);
  
  const [newIdeaTitle, setNewIdeaTitle] = useState("");
  const [newIdeaDescription, setNewIdeaDescription] = useState("");
  const [newIdeaCategory, setNewIdeaCategory] = useState("Городская среда");
  const [newIdeaDistrict, setNewIdeaDistrict] = useState("Ленинский");
  const [newIdeaTags, setNewIdeaTags] = useState("");

  // Статичные данные для прототипа
  const initialIdeas: Idea[] = [
    {
      id: 1,
      title: "Развитие велодорожек в центре Нижнего Новгорода",
      description: "Создание безопасной и удобной велосипедной инфраструктуры, соединяющей ключевые районы города. Предполагается установка специальных дорожек, парковок для велосипедов и вело-инфраструктуры.",
      category: "Транспорт",
      author: "Алексей Петров",
      likes: 245,
      comments: 32,
      views: 1200,
      status: "Реализуется",
      district: "Советский",
      date: "2024-11-15",
      tags: ["безопасность", "экология", "мобильность"]
    },
    {
      id: 2,
      title: "Создание цифровой платформы для участия в городских проектах",
      description: "Разработка мобильного приложения и веб-портала, где жители могут предлагать идеи, голосовать за лучшие из них и отслеживать прогресс реализации.",
      category: "Цифровые сервисы",
      author: "Мария Соколова",
      likes: 412,
      comments: 56,
      views: 2100,
      status: "Реализована",
      district: "Нижегородский",
      date: "2024-10-20",
      tags: ["инновации", "участие", "доступность"]
    },
    {
      id: 3,
      title: "Развитие системы раздельного сбора мусора",
      description: "Внедрение современной системы сортировки отходов с установкой специальных контейнеров и образовательными программами для жителей.",
      category: "Экология",
      author: "Дмитрий Иванов",
      likes: 189,
      comments: 28,
      views: 850,
      status: "Обсуждается",
      district: "Канавинский",
      date: "2024-12-01",
      tags: ["экология", "переработка", "образование"]
    },
    {
      id: 4,
      title: "Создание зеленой зоны на набережной",
      description: "Организация парка с зонами отдыха, детскими площадками, велодорожками и зонами для занятий спортом на Волге.",
      category: "Городская среда",
      author: "Елена Козлова",
      likes: 367,
      comments: 45,
      views: 1800,
      status: "Одобренная",
      district: "Пролетарский",
      date: "2024-11-25",
      tags: ["отдых", "здоровье", "экология"]
    },
    {
      id: 5,
      title: "Установка бесплатных Wi-Fi точек в парках",
      description: "Обеспечение бесплатного доступа к интернету в общественных пространствах города, особенно в парках и скверах.",
      category: "Цифровые сервисы",
      author: "Иван Смирнов",
      likes: 156,
      comments: 18,
      views: 720,
      status: "Новая",
      district: "Сормовский",
      date: "2024-12-05",
      tags: ["цифра", "доступ", "связь"]
    },
    {
      id: 6,
      title: "Организация фестиваля уличного искусства",
      description: "Ежегодное мероприятие, посвященное уличному искусству: граффити, уличному театру, перформансам и другим формам уличного самовыражения.",
      category: "Культура",
      author: "Анна Волкова",
      likes: 298,
      comments: 41,
      views: 1500,
      status: "Реализуется",
      district: "Ленинский",
      date: "2024-11-30",
      tags: ["культура", "творчество", "мероприятия"]
    }
  ];

  const categories = [
    "Все", "Городская среда", "Транспорт", "Культура", "Экология", "Цифровые сервисы", "Безопасность", "Образование"
  ];

  const districts = [
    "Все", "Ленинский", "Советский", "Нижегородский", "Сормовский", 
    "Пролетарский", "Канавинский", "Автозаводский", "Московский"
  ];

  const getIdeaStatusColor = (status: Idea["status"]) => {
    switch (status) {
      case "Новая": return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
      case "Обсуждается": return "bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-200";
      case "Одобренная": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-200";
      case "Реализуется": return "bg-purple-100 text-purple-800 dark:bg-purple-700 dark:text-purple-200";
      case "Реализована": return "bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  const filteredIdeas = initialIdeas.filter(idea => {
    const matchesCategory = selectedCategory === 'Все' || idea.category === selectedCategory;
    const matchesSearch = idea.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         idea.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddIdea = (e: React.FormEvent) => {
    e.preventDefault();
    if (newIdeaTitle.trim() && newIdeaDescription.trim()) {
      // В прототипе просто сбрасываем формы и закрываем форму
      setNewIdeaTitle("");
      setNewIdeaDescription("");
      setNewIdeaCategory("Городская среда");
      setNewIdeaDistrict("Ленинский");
      setNewIdeaTags("");
      setShowForm(false);
      // В реальном приложении здесь будет отправка на бэкенд
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Шапка */}
      <header className="bg-white dark:bg-slate-800 shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <Lightbulb className="h-8 w-8 text-orange-500 mr-2" />
                <span className="text-xl font-bold text-slate-800 dark:text-white">Город Идей</span>
              </div>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#" className="text-slate-800 dark:text-white hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium">Главная</a>
                <a href="#" className="text-slate-600 dark:text-slate-300 hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium">Идеи</a>
                <a href="#" className="text-slate-600 dark:text-slate-300 hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium">Рейтинг</a>
                <a href="#" className="text-slate-600 dark:text-slate-300 hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium">О проекте</a>
              </div>
            </div>
            
            <div className="hidden md:block">
              <Button 
                onClick={() => setShowForm(true)}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center"
              >
                <Lightbulb className="h-4 w-4 mr-2" />
                Предложить идею
              </Button>
            </div>
            
            <div className="-mr-2 flex items-center md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none"
              >
                {mobileMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Мобильное меню */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#" className="text-slate-800 dark:text-white hover:text-orange-500 block px-3 py-2 rounded-md text-base font-medium">Главная</a>
              <a href="#" className="text-slate-600 dark:text-slate-300 hover:text-orange-500 block px-3 py-2 rounded-md text-base font-medium">Идеи</a>
              <a href="#" className="text-slate-600 dark:text-slate-300 hover:text-orange-500 block px-3 py-2 rounded-md text-base font-medium">Рейтинг</a>
              <a href="#" className="text-slate-600 dark:text-slate-300 hover:text-orange-500 block px-3 py-2 rounded-md text-base font-medium">О проекте</a>
              <Button 
                onClick={() => {
                  setShowForm(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full mt-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center"
              >
                <Lightbulb className="h-4 w-4 mr-2" />
                Предложить идею
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Основной контент */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Приветственный баннер */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-8 mb-8 text-white shadow-xl"
        >
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Ваш голос формирует будущее Нижнего Новгорода</h1>
            <p className="text-lg md:text-xl mb-6 opacity-90">
              Делитесь идеями, участвуйте в обсуждениях, отслеживайте реализацию проектов.
              Вместе мы создаем лучший город для жизни!
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={() => setShowForm(true)}
                className="bg-white text-orange-500 hover:bg-slate-100 font-bold py-3 px-6 rounded-lg flex items-center"
              >
                <Lightbulb className="h-5 w-5 mr-2" />
                Подать идею
              </Button>
              <Button 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white hover:text-orange-500 font-bold py-3 px-6 rounded-lg"
              >
                Как это работает
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Статистика */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md flex flex-col items-center text-center"
          >
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mb-3">
              <Lightbulb className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white">1,248</h3>
            <p className="text-slate-600 dark:text-slate-300">Идей подано</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md flex flex-col items-center text-center"
          >
            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full mb-3">
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white">156</h3>
            <p className="text-slate-600 dark:text-slate-300">Реализовано</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md flex flex-col items-center text-center"
          >
            <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full mb-3">
              <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white">8,420</h3>
            <p className="text-slate-600 dark:text-slate-300">Активных участников</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md flex flex-col items-center text-center"
          >
            <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-full mb-3">
              <TrendingUp className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white">24.7%</h3>
            <p className="text-slate-600 dark:text-slate-300">Удовлетворенность</p>
          </motion.div>
        </div>

        {/* Поиск и фильтры */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <Input
                type="text"
                placeholder="Поиск идей..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-2 bg-white dark:bg-slate-700 text-slate-800 dark:text-white"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Фильтры
              </Button>
            </div>
          </div>
        </div>

        {/* Навигация по вкладкам */}
        <div className="flex border-b border-slate-200 dark:border-slate-700 mb-6">
          {[
            { id: 'all', label: 'Все идеи', count: initialIdeas.length },
            { id: 'popular', label: 'Популярные', count: initialIdeas.filter(i => i.likes > 200).length },
            { id: 'new', label: 'Новые', count: initialIdeas.filter(i => new Date(i.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length },
            { id: 'discussed', label: 'Обсуждаемые', count: initialIdeas.filter(i => i.comments > 20).length },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'text-orange-500 border-b-2 border-orange-500'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab.label} <span className="text-slate-500 dark:text-slate-400">({tab.count})</span>
            </button>
          ))}
        </div>

        {/* Список идей */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredIdeas.map((idea, index) => (
            <motion.div
              key={idea.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className="h-full flex flex-col bg-white dark:bg-slate-800 shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl font-bold text-slate-800 dark:text-white">
                      {idea.title}
                    </CardTitle>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getIdeaStatusColor(idea.status)}`}>
                      {idea.status}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    {idea.district} • {idea.date}
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-3">
                    {idea.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {idea.tags.map((tag, idx) => (
                      <span key={idx} className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center text-sm text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        <span>{idea.likes}</span>
                      </div>
                      <div className="flex items-center">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        <span>{idea.comments}</span>
                      </div>
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        <span>{idea.views}</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-amber-500 mr-1" />
                      <span className="text-amber-600 dark:text-amber-400">{(idea.likes / 10).toFixed(1)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Форма добавления идеи (модальное окно) */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Предложить идею</h2>
                  <button 
                    onClick={() => setShowForm(false)}
                    className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                
                <form onSubmit={handleAddIdea} className="space-y-6">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Название идеи
                    </label>
                    <Input
                      id="title"
                      type="text"
                      value={newIdeaTitle}
                      onChange={(e) => setNewIdeaTitle(e.target.value)}
                      placeholder="Введите заголовок идеи"
                      required
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Описание идеи
                    </label>
                    <Textarea
                      id="description"
                      value={newIdeaDescription}
                      onChange={(e) => setNewIdeaDescription(e.target.value)}
                      placeholder="Подробно опишите вашу идею, её преимущества и возможную реализацию..."
                      required
                      rows={5}
                      className="w-full"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Категория
                      </label>
                      <select
                        id="category"
                        value={newIdeaCategory}
                        onChange={(e) => setNewIdeaCategory(e.target.value)}
                        className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md text-slate-800 dark:text-white"
                      >
                        {categories.slice(1).map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="district" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Район
                      </label>
                      <select
                        id="district"
                        value={newIdeaDistrict}
                        onChange={(e) => setNewIdeaDistrict(e.target.value)}
                        className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md text-slate-800 dark:text-white"
                      >
                        {districts.slice(1).map(district => (
                          <option key={district} value={district}>{district}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="tags" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Теги (через запятую)
                    </label>
                    <Input
                      id="tags"
                      type="text"
                      value={newIdeaTags}
                      onChange={(e) => setNewIdeaTags(e.target.value)}
                      placeholder="например: экология, транспорт, инновации"
                      className="w-full"
                    />
                  </div>
                  
                  <div className="flex justify-end gap-3 pt-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setShowForm(false)}
                      className="px-6"
                    >
                      Отмена
                    </Button>
                    <Button 
                      type="submit" 
                      className="bg-orange-500 hover:bg-orange-600 px-6"
                    >
                      Отправить идею
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </main>

      {/* Футер */}
      <footer className="bg-slate-800 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center">
                <Lightbulb className="h-8 w-8 text-orange-500 mr-2" />
                <span className="text-xl font-bold">Город Идей</span>
              </div>
              <p className="mt-4 text-slate-400">
                Платформа электронного участия для жителей Нижнего Новгорода
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Платформа</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-400 hover:text-white">Как это работает</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white">Правила участия</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white">Реализованные проекты</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white">Статистика</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Ресурсы</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-400 hover:text-white">Блог</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white">Документация</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white">API</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white">Открытые данные</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Контакты</h3>
              <ul className="space-y-2">
                <li className="text-slate-400">info@nn-gorodidey.ru</li>
                <li className="text-slate-400">+7 (831) 123-45-67</li>
                <li className="text-slate-400">г. Нижний Новгород</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-slate-700 text-center text-slate-400">
            <p>© 2025 Город Идей. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NnGorodIdeyNewPrototypePage;