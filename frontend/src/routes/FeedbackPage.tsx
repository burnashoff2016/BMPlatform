import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageCircle, 
  Mail, 
  MessageSquare, 
  Send, 
  Heart, 
  Star,
  User,
  Phone
} from 'lucide-react';

const FeedbackPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const contactMethods = [
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Telegram",
      contacts: [
        { label: "@burnashov_artem", value: "@burnashov_artem" },
        { label: "@m1n1mm", value: "@m1n1mm" }
      ],
      desc: "Быстрая связь в мессенджере"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Электронная почта",
      contacts: [
        { label: "burnashoff2016@yandex.ru", value: "burnashoff2016@yandex.ru" }
      ],
      desc: "Для формальных обращений"
    }
  ];

  const feedbackTypes = [
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Отзывы",
      desc: "Поделитесь своим мнением о платформе",
      color: "text-blue-500"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Предложения",
      desc: "Предложите улучшения функционала",
      color: "text-green-500"
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Поддержка",
      desc: "Нужна помощь с использованием",
      color: "text-yellow-500"
    }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the form data to a backend
    alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 mb-4">
            Обратная связь
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Мы всегда рады вашим комментариям, предложениям и замечаниям. 
            Свяжитесь с нами удобным для вас способом
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Methods */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center space-x-3 mb-6">
                <Phone className="w-6 h-6 text-indigo-500" />
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Контактные данные</h2>
              </div>
              
              <div className="space-y-6">
                {contactMethods.map((method, index) => (
                  <div key={index} className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-300">
                        {method.icon}
                      </div>
                      <h3 className="font-semibold text-lg text-slate-800 dark:text-white">{method.title}</h3>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 text-sm mb-3">{method.desc}</p>
                    <div className="space-y-2">
                      {method.contacts.map((contact, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-slate-700 dark:text-slate-300">
                          <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                          <span className="text-sm">{contact.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Feedback Types */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center space-x-3 mb-6">
                <Heart className="w-6 h-6 text-pink-500" />
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Что вы можете сообщить</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {feedbackTypes.map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="p-4 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-lg text-center"
                  >
                    <div className={`${item.color} mb-3 flex justify-center`}>
                      {item.icon}
                    </div>
                    <h3 className="font-semibold text-slate-800 dark:text-white mb-1">{item.title}</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Feedback Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-200 dark:border-slate-700 sticky top-8">
              <div className="flex items-center space-x-3 mb-6">
                <MessageSquare className="w-6 h-6 text-green-500" />
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Отправить сообщение</h2>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Имя <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-slate-400" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-3 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                        placeholder="Ваше имя"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-slate-400" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-3 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Тема <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  >
                    <option value="">Выберите тему</option>
                    <option value="feedback">Отзыв о платформе</option>
                    <option value="support">Техническая поддержка</option>
                    <option value="suggestion">Предложение улучшения</option>
                    <option value="bug">Сообщить об ошибке</option>
                    <option value="other">Другое</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Сообщение <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-3 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                    placeholder="Опишите ваш вопрос или предложение..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
                >
                  <Send className="w-5 h-5" />
                  <span>Отправить сообщение</span>
                </button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white text-center">
            <div className="text-3xl font-bold">24/7</div>
            <div className="text-blue-100">Поддержка</div>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white text-center">
            <div className="text-3xl font-bold">100%</div>
            <div className="text-green-100">Ответы</div>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-6 text-white text-center">
            <div className="text-3xl font-bold">24ч</div>
            <div className="text-purple-100">Обработка</div>
          </div>
          <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl p-6 text-white text-center">
            <div className="text-3xl font-bold">98%</div>
            <div className="text-amber-100">Удовлетворенность</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FeedbackPage;
