import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Shield, 
  Bell, 
  Palette,
  Globe,
  Mail,
  Phone,
  X,
  Save,
  Check
} from 'lucide-react';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    name: "Руководитель",
    email: "burnashoff2016@yandex.ru",
    bio: "Администратор платформы",
    title: "Администратор",
    phone: "+7 (XXX) XXX-XX-XX",
    location: "Москва, Россия"
  });
  
  const [securityData, setSecurityData] = useState({
    twoFactor: false,
    passwordExpiry: true,
    autoLogout: true,
    sessionTimeout: 30
  });
  
  const [preferences, setPreferences] = useState({
    darkMode: true,
    notifications: true,
    emailUpdates: true,
    language: 'ru',
    dateFormat: 'DD/MM/YYYY',
    timezone: 'Europe/Moscow'
  });
  
  const [isSaved, setIsSaved] = useState(false);

  const handleProfileChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleSecurityChange = (field: string, value: boolean | number) => {
    setSecurityData(prev => ({ ...prev, [field]: value }));
  };

  const handlePreferenceChange = (field: string, value: any) => {
    setPreferences(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // In a real app, this would save to a backend
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
    console.log("Settings saved:", { profileData, securityData, preferences });
  };

  const tabs = [
    { id: 'profile', label: 'Профиль', icon: User },
    { id: 'security', label: 'Безопасность', icon: Shield },
    { id: 'notifications', label: 'Уведомления', icon: Bell },
    { id: 'appearance', label: 'Внешний вид', icon: Palette },
    { id: 'preferences', label: 'Предпочтения', icon: Globe }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 mb-4">
            Настройки
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Управляйте своими настройками профиля, безопасности и предпочтениями
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:col-span-1"
          >
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 border border-slate-200 dark:border-slate-700 sticky top-8">
              <div className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                        activeTab === tab.id
                          ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                          : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-200 dark:border-slate-700">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="space-y-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      Р
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Профиль</h2>
                      <p className="text-slate-600 dark:text-slate-400">Управление информацией вашего профиля</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                        Полное имя
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={profileData.name}
                          onChange={(e) => handleProfileChange('name', e.target.value)}
                          className="w-full px-4 py-3 pl-10 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                          placeholder="Введите ваше имя"
                        />
                        <User className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                        Должность
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={profileData.title}
                          onChange={(e) => handleProfileChange('title', e.target.value)}
                          className="w-full px-4 py-3 pl-10 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                          placeholder="Введите вашу должность"
                        />
                        <Shield className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                        Адрес электронной почты
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => handleProfileChange('email', e.target.value)}
                          className="w-full px-4 py-3 pl-10 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                          placeholder="your@email.com"
                        />
                        <Mail className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                        Номер телефона
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) => handleProfileChange('phone', e.target.value)}
                          className="w-full px-4 py-3 pl-10 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                          placeholder="+7 (XXX) XXX-XX-XX"
                        />
                        <Phone className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                        О себе
                      </label>
                      <textarea
                        value={profileData.bio}
                        onChange={(e) => handleProfileChange('bio', e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                        placeholder="Расскажите немного о себе..."
                      ></textarea>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Безопасность</h2>
                    <p className="text-slate-600 dark:text-slate-400">Настройки безопасности аккаунта</p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                      <div>
                        <h3 className="font-semibold text-slate-800 dark:text-white">Двухфакторная аутентификация</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Добавьте дополнительный уровень защиты</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={securityData.twoFactor}
                          onChange={(e) => handleSecurityChange('twoFactor', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                      <div>
                        <h3 className="font-semibold text-slate-800 dark:text-white">Смена пароля</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Требовать смену пароля каждые 90 дней</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={securityData.passwordExpiry}
                          onChange={(e) => handleSecurityChange('passwordExpiry', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                      <div>
                        <h3 className="font-semibold text-slate-800 dark:text-white">Автоматический выход</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Выходить после периода неактивности</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={securityData.autoLogout}
                          onChange={(e) => handleSecurityChange('autoLogout', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>

                    <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                      <div>
                        <h3 className="font-semibold text-slate-800 dark:text-white mb-2">Таймаут сессии</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">Период неактивности до автоматического выхода</p>
                      </div>
                      <div className="flex space-x-3">
                        {[15, 30, 60].map((minutes) => (
                          <label key={minutes} className="inline-flex items-center">
                            <input
                              type="radio"
                              name="sessionTimeout"
                              checked={securityData.sessionTimeout === minutes}
                              onChange={() => handleSecurityChange('sessionTimeout', minutes)}
                              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300"
                            />
                            <span className="ml-2 text-sm text-slate-700 dark:text-slate-300">{minutes} мин</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Appearance Tab */}
              {activeTab === 'appearance' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Внешний вид</h2>
                    <p className="text-slate-600 dark:text-slate-400">Настройте тему и внешний вид интерфейса</p>
                  </div>

                  <div className="space-y-6">
                    <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-slate-800 dark:text-white">Темная тема</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400">Использовать темную цветовую схему</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={preferences.darkMode}
                            onChange={(e) => handlePreferenceChange('darkMode', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                        </label>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                      <div>
                        <h3 className="font-semibold text-slate-800 dark:text-white mb-2">Цветовая схема</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">Выберите предпочитаемую цветовую схему</p>
                      </div>
                      <div className="flex space-x-3">
                        {[
                          { name: 'Синяя', colors: ['from-blue-500', 'to-indigo-600'] },
                          { name: 'Фиолетовая', colors: ['from-purple-500', 'to-violet-600'] },
                          { name: 'Зеленая', colors: ['from-emerald-500', 'to-teal-600'] },
                          { name: 'Розовая', colors: ['from-pink-500', 'to-rose-600'] },
                        ].map((scheme) => (
                          <div key={scheme.name} className="flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${scheme.colors[0]} ${scheme.colors[1]} mb-2`}></div>
                            <span className="text-xs text-slate-700 dark:text-slate-300">{scheme.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Preferences Tab */}
              {activeTab === 'preferences' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Предпочтения</h2>
                    <p className="text-slate-600 dark:text-slate-400">Настройте поведение платформы под себя</p>
                  </div>

                  <div className="space-y-6">
                    <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-slate-800 dark:text-white">Язык интерфейса</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400">Выберите язык для интерфейса</p>
                        </div>
                        <select
                          value={preferences.language}
                          onChange={(e) => handlePreferenceChange('language', e.target.value)}
                          className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                        >
                          <option value="ru">Русский</option>
                          <option value="en">English</option>
                          <option value="de">Deutsch</option>
                        </select>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-slate-800 dark:text-white">Формат даты</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400">Предпочтительный формат отображения дат</p>
                        </div>
                        <select
                          value={preferences.dateFormat}
                          onChange={(e) => handlePreferenceChange('dateFormat', e.target.value)}
                          className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                        >
                          <option value="DD/MM/YYYY">ДД/ММ/ГГГГ (25/12/2024)</option>
                          <option value="MM/DD/YYYY">ММ/ДД/ГГГГ (12/25/2024)</option>
                          <option value="YYYY-MM-DD">ГГГГ-ММ-ДД (2024-12-25)</option>
                        </select>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-slate-800 dark:text-white">Часовой пояс</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400">Часовой пояс для отображения времени</p>
                        </div>
                        <select
                          value={preferences.timezone}
                          onChange={(e) => handlePreferenceChange('timezone', e.target.value)}
                          className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                        >
                          <option value="Europe/Moscow">Москва (UTC+3)</option>
                          <option value="Europe/London">Лондон (UTC+0)</option>
                          <option value="America/New_York">Нью-Йорк (UTC-5)</option>
                          <option value="Asia/Tokyo">Токио (UTC+9)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Save Button */}
              <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-end space-x-3">
                  <button
                    type="button"
                    className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center space-x-2"
                  >
                    <X className="w-4 h-4" />
                    <span>Отмена</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all flex items-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Сохранить</span>
                  </button>
                  {isSaved && (
                    <div className="flex items-center text-green-600 dark:text-green-400">
                      <Check className="w-5 h-5 mr-1" />
                      <span>Сохранено!</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
