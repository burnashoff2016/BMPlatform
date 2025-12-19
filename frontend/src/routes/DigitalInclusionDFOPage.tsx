import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  LineChart,
  Line
} from 'recharts';
import * as Tabs from "@radix-ui/react-tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Download, MapPin, TrendingUp, Users, BookOpen, FileText, Star, Award, Target, Globe, Monitor, Languages, MessageCircle } from 'lucide-react';
import { cn } from "../lib/utils";
import { api } from "../lib/api";
import { motion } from 'framer-motion';

interface Authority {
  region: number;
  authority_name: string;
  overall_score: number;
  technical_accessibility: number;
  content_language: number;
  information_support: number;
  legal_framework: number;
  feedback: number;
  education: number;
  position: number;
}

interface MapRegion {
  name: string;
  lat: number;
  lon: number;
  authority: string;
  score: number;
}

interface RadarData {
  direction: string;
  value: number;
}

interface RadarChartData {
  authority_name: string;
  radar_values: RadarData[];
}

interface ApiResponse {
  authorities: Authority[];
  map_data: MapRegion[];
  radar_charts_data: RadarChartData[];
  summary: {
    total_authorities: number;
    average_score: number;
    top_authority: string;
    bottom_authority: string;
  };
}

const DigitalInclusionDFOPage: React.FC = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/data/digital-inclusion-dfo');
        setData(response.data);
        setLoading(false);
      } catch (err: any) {
        if (err.response?.status === 401 || err.response?.data?.detail?.includes('Missing credentials')) {
          setError('Требуется авторизация. Пожалуйста, войдите в систему.');
        } else {
          setError('Ошибка загрузки данных: ' + (err.response?.data?.detail || err.message));
        }
        setLoading(false);
      }
    };

    fetchData();
  }, []);



  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-lg text-slate-600 dark:text-slate-400">Загрузка данных дашборда...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-8 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800 max-w-md">
          <p className="text-red-500 text-lg font-medium mb-2">Ошибка</p>
          <p className="text-red-700 dark:text-red-300">{error}</p>
          <Button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-red-600 hover:bg-red-700"
          >
            Повторить попытку
          </Button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-8 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 max-w-md">
          <p className="text-slate-500 dark:text-slate-400">Нет данных для отображения</p>
        </div>
      </div>
    );
  }

  // Функция для экспорта в PDF
  const handleExportPDF = async () => {
    try {
      const html2pdf = (await import('html2pdf.js')).default;
      
      // Получаем контент для экспорта
      const content = document.querySelector('.dashboard-content');
      
      if (!content) {
        alert('Не удалось найти контент для экспорта');
        return;
      }
      
      const element = document.createElement('div');
      element.innerHTML = content.innerHTML;
      element.style.position = 'absolute';
      element.style.left = '-9999px';
      document.body.appendChild(element);
      
      const options = {
        margin: [10, 5, 10, 5] as [number, number, number, number],
        filename: 'digital_inclusion_report.pdf',
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' as const }
      };
      
      html2pdf().set(options).from(element).save().finally(() => {
        document.body.removeChild(element);
      });
    } catch (error) {
      console.error('Ошибка при экспорте в PDF:', error);
      alert('Ошибка при экспорте в PDF. Попробуйте снова.');
    }
  };

  // Функция для экспорта в Excel
  const handleExportExcel = () => {
    try {
      // Подготавливаем данные для экспорта
      const headers = [
        'Место', 'Орган власти', 'Интегральный балл', 'Тех. доступность', 
        'Контент и языки', 'Инф. поддержка', 'Норм. база', 'Обратная связь', 'Образование'
      ];
      
      const csvContent = [
        headers.join(','),
        ...data.authorities.map(auth => 
          [
            auth.position,
            `"${auth.authority_name}"`,
            auth.overall_score,
            auth.technical_accessibility,
            auth.content_language,
            auth.information_support,
            auth.legal_framework,
            auth.feedback,
            auth.education
          ].join(',')
        )
      ].join('\n');
      
      // Создаем Blob и скачиваем файл
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', 'digital_inclusion_report.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Ошибка при экспорте в Excel:', error);
      alert('Ошибка при экспорте в Excel. Попробуйте снова.');
    }
  };

  // Данные для визуализации уровня вовлеченности по категориям
  const inclusionCategories = [
    { name: 'Тех. доступность', value: data.authorities.reduce((sum, auth) => sum + auth.technical_accessibility, 0) / data.authorities.length },
    { name: 'Контент & языки', value: data.authorities.reduce((sum, auth) => sum + auth.content_language, 0) / data.authorities.length },
    { name: 'Инф. поддержка', value: data.authorities.reduce((sum, auth) => sum + auth.information_support, 0) / data.authorities.length },
    { name: 'Норм. база', value: data.authorities.reduce((sum, auth) => sum + auth.legal_framework, 0) / data.authorities.length },
    { name: 'Обратная связь', value: data.authorities.reduce((sum, auth) => sum + auth.feedback, 0) / data.authorities.length },
    { name: 'Образование', value: data.authorities.reduce((sum, auth) => sum + auth.education, 0) / data.authorities.length },
  ];

  return (
    <div className="space-y-8 px-4 py-8">
      {/* Заголовок */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Цифровая инклюзивность органов власти ДФО
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
          Система мониторинга доступности информации для маломобильных групп населения и жителей удаленных территорий
        </p>
      </motion.div>

      {/* Статистика */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        <Card className="rounded-2xl shadow-lg border-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2 text-blue-700 dark:text-blue-300">
              <TrendingUp size={20} className="text-blue-600 dark:text-blue-400" /> Средний балл
            </CardTitle>
            <CardDescription className="text-slate-500 dark:text-slate-400">Средний уровень инклюзивности</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-700 dark:text-blue-300">{data.summary.average_score.toFixed(1)}</p>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              из 100 возможных баллов
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-lg border-0 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-slate-800 dark:to-slate-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2 text-green-700 dark:text-green-300">
              <Users size={20} className="text-green-600 dark:text-green-400" /> Органов власти
            </CardTitle>
            <CardDescription className="text-slate-500 dark:text-slate-400">Количество оцененных органов</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-700 dark:text-green-300">{data.summary.total_authorities}</p>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              в Дальневосточном ФО
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-lg border-0 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-slate-800 dark:to-slate-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2 text-purple-700 dark:text-purple-300">
              <Award size={20} className="text-purple-600 dark:text-purple-400" /> Лидер
            </CardTitle>
            <CardDescription className="text-slate-500 dark:text-slate-400">Лучший результат</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold text-purple-700 dark:text-purple-300 truncate">{data.summary.top_authority}</p>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              по итогам оценки
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-lg border-0 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2 text-amber-700 dark:text-amber-300">
              <Target size={20} className="text-amber-600 dark:text-amber-400" /> Рейтинг
            </CardTitle>
            <CardDescription className="text-slate-500 dark:text-slate-400">Позиции в системе</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-amber-700 dark:text-amber-300">{data.authorities.length}</p>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              органов в рейтинге
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Кнопки действий */}
      <div className="flex flex-wrap justify-center gap-4">
        <Button onClick={handleExportPDF} className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700">
          <Download size={16} />
          Экспорт в PDF
        </Button>
        <Button onClick={handleExportExcel} variant="outline" className="flex items-center gap-2">
          <Download size={16} />
          Экспорт в Excel
        </Button>
        <Link to="/digital-inclusion-report">
          <Button variant="outline" className="flex items-center gap-2">
            <FileText size={16} />
            Полный отчет
          </Button>
        </Link>
        <Button variant="outline" className="flex items-center gap-2">
          <Globe size={16} />
          Открыть вебинар
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <MessageCircle size={16} />
          Обратная связь
        </Button>
      </div>

      {/* Вкладки */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full"
      >
        <div className="dashboard-content">
        <Tabs.Root value={activeTab} onValueChange={setActiveTab} className="w-full">
          <Tabs.List className={cn("grid w-full grid-cols-5 lg:w-full mb-6 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl")}>
            <Tabs.Trigger 
              value="dashboard" 
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-medium transition data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm dark:data-[state=active]:bg-slate-700 dark:data-[state=active]:text-blue-400",
              )}
            >
              Дашборд
            </Tabs.Trigger>
            <Tabs.Trigger 
              value="rating" 
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-medium transition data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm dark:data-[state=active]:bg-slate-700 dark:data-[state=active]:text-blue-400",
              )}
            >
              Рейтинг
            </Tabs.Trigger>
            <Tabs.Trigger 
              value="analysis" 
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-medium transition data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm dark:data-[state=active]:bg-slate-700 dark:data-[state=active]:text-blue-400",
              )}
            >
              Анализ
            </Tabs.Trigger>
            <Tabs.Trigger 
              value="map" 
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-medium transition data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm dark:data-[state=active]:bg-slate-700 dark:data-[state=active]:text-blue-400",
              )}
            >
              Карта
            </Tabs.Trigger>
            <Tabs.Trigger 
              value="recommendations" 
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-medium transition data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm dark:data-[state=active]:bg-slate-700 dark:data-[state=active]:text-blue-400",
              )}
            >
              Рекомендации
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="dashboard" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="rounded-2xl shadow-lg border-0 bg-white dark:bg-slate-800/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="text-yellow-500" size={20} />
                    Рейтинг органов власти
                  </CardTitle>
                  <CardDescription>Сравнение по интегральному показателю</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[...data.authorities].sort((a, b) => b.overall_score - a.overall_score)}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 60,
                        }}
                        layout="horizontal"
                      >
                        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
                        <XAxis type="number" domain={[0, 100]} />
                        <YAxis 
                          dataKey="authority_name" 
                          type="category"
                          width={200}
                          tick={{ fontSize: 12 }}
                        />
                        <Tooltip 
                          formatter={(value) => [`${value}`, 'Балл']}
                          labelFormatter={(value) => `Орган власти: ${value}`}
                          contentStyle={{ 
                            backgroundColor: 'white', 
                            border: '1px solid #e2e8f0', 
                            borderRadius: '0.5rem',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                          }}
                        />
                        <Legend />
                        <Bar 
                          dataKey="overall_score" 
                          name="Интегральный показатель" 
                          fill="url(#colorUv)" 
                          radius={[0, 4, 4, 0]}
                        >
                          {data.authorities.map((_, index) => (
                            <stop key={`stop-${index}`} offset={`${(index / data.authorities.length) * 100}%`} stopColor="#4f46e5" />
                          ))}
                        </Bar>
                        <defs>
                          <linearGradient id="colorUv" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="5%" stopColor="#4f46e5" />
                            <stop offset="95%" stopColor="#818cf8" />
                          </linearGradient>
                        </defs>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-2xl shadow-lg border-0 bg-white dark:bg-slate-800/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Monitor className="text-green-500" size={20} />
                    Сравнение по направлениям
                  </CardTitle>
                  <CardDescription>Уровень по ключевым показателям</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[...data.authorities].sort((a, b) => b.overall_score - a.overall_score)}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 60,
                        }}
                        layout="horizontal"
                      >
                        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
                        <XAxis type="number" domain={[0, 100]} />
                        <YAxis 
                          dataKey="authority_name" 
                          type="category"
                          width={200}
                          tick={{ fontSize: 12 }}
                        />
                        <Tooltip 
                          formatter={(value) => [`${value}`, 'Балл']}
                          labelFormatter={(value) => `Орган власти: ${value}`}
                          contentStyle={{ 
                            backgroundColor: 'white', 
                            border: '1px solid #e2e8f0', 
                            borderRadius: '0.5rem',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                          }}
                        />
                        <Legend />
                        <Bar dataKey="technical_accessibility" name="Тех. доступность" fill="#10b981" radius={[0, 4, 4, 0]} />
                        <Bar dataKey="content_language" name="Контент и языки" fill="#f59e0b" radius={[0, 4, 4, 0]} />
                        <Bar dataKey="information_support" name="Инф. поддержка" fill="#ef4444" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Дополнительная визуализация по категориям */}
            <Card className="rounded-2xl shadow-lg border-0 bg-white dark:bg-slate-800/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="text-blue-500" size={20} />
                  Уровень инклюзивности по категориям
                </CardTitle>
                <CardDescription>Средние показатели по всем органам власти</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={inclusionCategories}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 60,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
                      <XAxis 
                        dataKey="name" 
                        angle={-45} 
                        textAnchor="end" 
                        height={70}
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis domain={[0, 100]} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #e2e8f0', 
                          borderRadius: '0.5rem',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                        }}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        name="Средний балл" 
                        stroke="#4f46e5" 
                        strokeWidth={2}
                        activeDot={{ r: 8 }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </Tabs.Content>

          <Tabs.Content value="rating" className="mt-6 space-y-6">
            <Card className="rounded-2xl shadow-lg border-0 bg-white dark:bg-slate-800/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="text-yellow-500" size={20} />
                  Детальный рейтинг
                </CardTitle>
                <CardDescription>Места органов власти по уровню цифровой инклюзивности</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                    <thead className="bg-slate-50 dark:bg-slate-800">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                          Место
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                          Орган власти
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                          Интегральный балл
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                          Тех. доступность
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                          Контент и языки
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                          Инф. поддержка
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                          Динамика
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
                      {[...data.authorities]
                        .sort((a, b) => a.position - b.position)
                        .map((authority, index) => (
                          <tr 
                            key={index} 
                            className={index % 2 === 0 ? 'bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700' : 'bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-750'}
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900 dark:text-slate-200">
                              <div className="flex items-center">
                                {authority.position === 1 && <span className="mr-2 text-yellow-500"><Star size={16} fill="currentColor" /></span>}
                                {authority.position === 2 && <span className="mr-2 text-gray-400"><Star size={16} fill="currentColor" /></span>}
                                {authority.position === 3 && <span className="mr-2 text-amber-700"><Star size={16} fill="currentColor" /></span>}
                                {authority.position}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-slate-200">
                              {authority.authority_name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <div className="flex items-center">
                                <span className="font-bold mr-2">{authority.overall_score.toFixed(1)}</span>
                                <div className="w-24 bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                                  <div 
                                    className={`h-2.5 rounded-full ${
                                      authority.overall_score >= 75 ? 'bg-green-500' : 
                                      authority.overall_score >= 60 ? 'bg-yellow-500' : 
                                      authority.overall_score >= 40 ? 'bg-orange-500' : 'bg-red-500'
                                    }`} 
                                    style={{ width: `${authority.overall_score}%` }}
                                  ></div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                              {authority.technical_accessibility}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                              {authority.content_language}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                              {authority.information_support}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                authority.overall_score >= 75 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 
                                authority.overall_score >= 60 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' : 
                                authority.overall_score >= 40 ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300' : 
                                'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                              }`}>
                                {authority.overall_score >= 75 ? 'Высокий' : 
                                 authority.overall_score >= 60 ? 'Хороший' : 
                                 authority.overall_score >= 40 ? 'Удовлетворительный' : 
                                 authority.overall_score >= 20 ? 'Низкий' : 'Критический'}
                              </span>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </Tabs.Content>

          <Tabs.Content value="analysis" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {data.radar_charts_data.map((chartData, index) => (
                <Card key={index} className="rounded-2xl shadow-lg border-0 bg-white dark:bg-slate-800/50 backdrop-blur">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target size={20} className="text-purple-500" />
                      {chartData.authority_name}
                    </CardTitle>
                    <CardDescription>Анализ по ключевым направлениям</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData.radar_values}>
                          <PolarGrid stroke="#e2e8f0" />
                          <PolarAngleAxis dataKey="direction" tick={{ fontSize: 12 }} />
                          <PolarRadiusAxis angle={30} domain={[0, 100]} />
                          <Radar
                            name={chartData.authority_name}
                            dataKey="value"
                            stroke="#4f46e5"
                            fill="#4f46e5"
                            fillOpacity={0.3}
                          />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'white', 
                              border: '1px solid #e2e8f0', 
                              borderRadius: '0.5rem',
                              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                            }}
                          />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Tabs.Content>

          <Tabs.Content value="map" className="mt-6 space-y-6">
            <Card className="rounded-2xl shadow-lg border-0 bg-white dark:bg-slate-800/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="text-red-500" size={20} />
                  Карта цифровой инклюзивности ДФО
                </CardTitle>
                <CardDescription>Уровень по регионам Дальневосточного федерального округа</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-800 dark:to-slate-900 rounded-xl flex items-center justify-center border border-slate-200 dark:border-slate-700 p-4">
                  <div className="text-center w-full">
                    <MapPin className="mx-auto h-16 w-16 text-slate-400" />
                    <h3 className="mt-4 text-xl font-bold text-slate-800 dark:text-white">Интерактивная карта ДФО</h3>
                    <p className="mt-2 text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                      Визуализация данных по регионам Дальневосточного федерального округа. 
                      Каждый регион отображает уровень цифровой инклюзивности органов власти.
                    </p>
                    
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                      {data.map_data.map((region, index) => (
                        <motion.div 
                          key={index} 
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-700 shadow-sm hover:shadow-md transition-shadow"
                        >
                          <h4 className="font-bold text-slate-900 dark:text-white">{region.name}</h4>
                          <p className="text-sm text-slate-500 dark:text-slate-300 mt-1">{region.authority}</p>
                          <div className="mt-3 flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Балл:</span>
                            <span className="font-bold text-lg">{region.score}</span>
                          </div>
                          <div className="mt-2 w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2.5">
                            <div 
                              className={`h-2.5 rounded-full ${
                                region.score >= 75 ? 'bg-green-500' : 
                                region.score >= 60 ? 'bg-yellow-500' : 
                                region.score >= 40 ? 'bg-orange-500' : 'bg-red-500'
                              }`} 
                              style={{ width: `${region.score}%` }}
                            ></div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Tabs.Content>

          <Tabs.Content value="recommendations" className="mt-6 space-y-6">
            <Card className="rounded-2xl shadow-lg border-0 bg-white dark:bg-slate-800/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="text-blue-500" size={20} />
                  Рекомендации по улучшению
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-bold text-xl text-slate-800 dark:text-white mb-4">Общие рекомендации</h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-6">
                    На основе анализа цифровой инклюзивности органов власти ДФО были разработаны 
                    следующие рекомендации для повышения доступности информации для маломобильных 
                    групп населения и жителей удаленных территорий.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="p-5 rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-lg">
                          <Monitor className="text-blue-600 dark:text-blue-300" size={20} />
                        </div>
                        <h4 className="font-bold text-blue-800 dark:text-blue-200">Техническая доступность</h4>
                      </div>
                      <ul className="space-y-2 text-blue-700 dark:text-blue-300">
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Обеспечить соответствие сайтов требованиям WCAG 2.1 уровня AA</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Разработать версию сайта для слабовидящих</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Обеспечить поддержку вспомогательных технологий</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Создать адаптивный дизайн с учетом низкой скорости интернета</span>
                        </li>
                      </ul>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      className="p-5 rounded-xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-green-100 dark:bg-green-800 rounded-lg">
                          <Languages className="text-green-600 dark:text-green-300" size={20} />
                        </div>
                        <h4 className="font-bold text-green-800 dark:text-green-200">Контент и языковая доступность</h4>
                      </div>
                      <ul className="space-y-2 text-green-700 dark:text-green-300">
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Предоставлять информацию на языках коренных малочисленных народов</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Использовать простой язык и визуальные пояснения</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Обеспечивать сурдоперевод и титры для видео-контента</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Предоставлять документы в печатных форматах</span>
                        </li>
                      </ul>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                      className="p-5 rounded-xl border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-purple-100 dark:bg-purple-800 rounded-lg">
                          <MessageCircle className="text-purple-600 dark:text-purple-300" size={20} />
                        </div>
                        <h4 className="font-bold text-purple-800 dark:text-purple-200">Информационная поддержка</h4>
                      </div>
                      <ul className="space-y-2 text-purple-700 dark:text-purple-300">
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Создать специализированные разделы для маломобильных групп</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Обеспечить доступность электронных услуг</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Организовать "горячие линии" с поддержкой сурдопереводчиков</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Создать офлайн-пункты доступа в удаленных районах</span>
                        </li>
                      </ul>
                    </motion.div>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="font-bold text-xl text-slate-800 dark:text-white mb-4">Рекомендации для конкретных органов</h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-6">
                    Ниже приведены конкретные рекомендации для каждого органа власти на основе их текущего уровня инклюзивности.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {data.authorities.map((authority, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <Card className="border-2 border-slate-200 dark:border-slate-700 h-full">
                          <CardHeader className="pb-3">
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle className="text-lg">{authority.authority_name}</CardTitle>
                                <CardDescription className="mt-1">
                                  Текущий уровень: {authority.overall_score.toFixed(1)} баллов (место {authority.position})
                                </CardDescription>
                              </div>
                              <div className="text-right">
                                <div className={`text-xl font-bold ${
                                  authority.overall_score >= 75 ? 'text-green-600' : 
                                  authority.overall_score >= 60 ? 'text-yellow-600' : 
                                  authority.overall_score >= 40 ? 'text-orange-600' : 'text-red-600'
                                }`}>
                                  {authority.overall_score.toFixed(1)}
                                </div>
                                <div className="h-1 w-16 bg-slate-200 rounded-full mt-1">
                                  <div 
                                    className={`h-1 rounded-full ${
                                      authority.overall_score >= 75 ? 'bg-green-500' : 
                                      authority.overall_score >= 60 ? 'bg-yellow-500' : 
                                      authority.overall_score >= 40 ? 'bg-orange-500' : 'bg-red-500'
                                    }`} 
                                    style={{ width: `${authority.overall_score}%` }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-medium text-slate-900 dark:text-white flex items-center gap-1">
                                  <Star size={16} className="text-yellow-500" /> Сильные стороны
                                </h4>
                                <ul className="mt-2 space-y-1 text-green-700 dark:text-green-300">
                                  <li className="flex items-start">
                                    <span className="mr-2">✓</span>
                                    <span>Тех. доступность: {authority.technical_accessibility}</span>
                                  </li>
                                  <li className="flex items-start">
                                    <span className="mr-2">✓</span>
                                    <span>Контент и языки: {authority.content_language}</span>
                                  </li>
                                  <li className="flex items-start">
                                    <span className="mr-2">✓</span>
                                    <span>Инф. поддержка: {authority.information_support}</span>
                                  </li>
                                </ul>
                              </div>
                              <div>
                                <h4 className="font-medium text-slate-900 dark:text-white flex items-center gap-1">
                                  <Target size={16} className="text-red-500" /> Области улучшения
                                </h4>
                                <ul className="mt-2 space-y-1 text-red-700 dark:text-red-300">
                                  <li className="flex items-start">
                                    <span className="mr-2">•</span>
                                    <span>Норм. база: {authority.legal_framework}</span>
                                  </li>
                                  <li className="flex items-start">
                                    <span className="mr-2">•</span>
                                    <span>Обратная связь: {authority.feedback}</span>
                                  </li>
                                  <li className="flex items-start">
                                    <span className="mr-2">•</span>
                                    <span>Образование: {authority.education}</span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Tabs.Content>
        </Tabs.Root>
        </div>
      </motion.div>
    </div>
  );
};

export default DigitalInclusionDFOPage;