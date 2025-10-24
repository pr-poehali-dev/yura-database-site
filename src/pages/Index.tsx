import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type DataEntry = {
  id: number;
  title: string;
  description: string;
  category: string;
  type: string;
  status: string;
  date: string;
};

const mockData: DataEntry[] = [
  {
    id: 1,
    title: 'Финансовые показатели Q4 2024',
    description: 'Полный отчёт по финансовым результатам четвёртого квартала с аналитикой основных метрик',
    category: 'Финансы',
    type: 'Отчёт',
    status: 'Актуальный',
    date: '2024-10-15',
  },
  {
    id: 2,
    title: 'База клиентов CRM',
    description: 'Структурированная база данных клиентов с историей взаимодействий и сегментацией',
    category: 'Клиенты',
    type: 'База данных',
    status: 'Актуальный',
    date: '2024-10-20',
  },
  {
    id: 3,
    title: 'Маркетинговая аналитика',
    description: 'Данные по эффективности рекламных кампаний и ROI по каналам привлечения',
    category: 'Маркетинг',
    type: 'Аналитика',
    status: 'Актуальный',
    date: '2024-10-18',
  },
  {
    id: 4,
    title: 'Исследование рынка',
    description: 'Комплексное исследование целевой аудитории и конкурентного окружения',
    category: 'Исследования',
    type: 'Отчёт',
    status: 'Архивный',
    date: '2024-09-10',
  },
  {
    id: 5,
    title: 'Продуктовая аналитика',
    description: 'Метрики использования продукта, пользовательские сценарии и точки роста',
    category: 'Продукт',
    type: 'Аналитика',
    status: 'Актуальный',
    date: '2024-10-22',
  },
  {
    id: 6,
    title: 'HR метрики и статистика',
    description: 'Данные по персоналу, уровень удовлетворённости и показатели удержания',
    category: 'HR',
    type: 'Статистика',
    status: 'Актуальный',
    date: '2024-10-12',
  },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const categories = ['all', ...Array.from(new Set(mockData.map((d) => d.category)))];
  const types = ['all', ...Array.from(new Set(mockData.map((d) => d.type)))];
  const statuses = ['all', ...Array.from(new Set(mockData.map((d) => d.status)))];

  const filteredData = mockData.filter((entry) => {
    const matchesSearch =
      entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || entry.category === categoryFilter;
    const matchesType = typeFilter === 'all' || entry.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || entry.status === statusFilter;

    return matchesSearch && matchesCategory && matchesType && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Database" className="text-white" size={24} />
              </div>
              <h1 className="text-2xl font-bold text-foreground">DATABASE</h1>
            </div>
            <nav className="flex gap-6">
              <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                Главная
              </button>
              <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Каталог данных
              </button>
              <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                О проекте
              </button>
              <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Контакты
              </button>
            </nav>
          </div>

          <div className="relative">
            <Icon
              name="Search"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={20}
            />
            <Input
              type="text"
              placeholder="Поиск по базе данных..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 bg-background border-border"
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Фильтры</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Категория" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat === 'all' ? 'Все категории' : cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Тип" />
              </SelectTrigger>
              <SelectContent>
                {types.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type === 'all' ? 'Все типы' : type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Статус" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status === 'all' ? 'Все статусы' : status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground">
            Найдено записей: <span className="font-semibold text-foreground">{filteredData.length}</span>
          </p>
          <Button variant="outline" size="sm" onClick={() => {
            setSearchQuery('');
            setCategoryFilter('all');
            setTypeFilter('all');
            setStatusFilter('all');
          }}>
            <Icon name="X" size={16} className="mr-2" />
            Сбросить фильтры
          </Button>
        </div>

        <div className="grid gap-6">
          {filteredData.map((entry) => (
            <Card
              key={entry.id}
              className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer border-border bg-white"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-lg font-semibold text-foreground">{entry.title}</h3>
                    <Badge
                      variant={entry.status === 'Актуальный' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {entry.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{entry.description}</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Icon name="FolderOpen" size={14} />
                      <span>{entry.category}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Icon name="FileText" size={14} />
                      <span>{entry.type}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Icon name="Calendar" size={14} />
                      <span>{new Date(entry.date).toLocaleDateString('ru-RU')}</span>
                    </div>
                  </div>
                </div>
                <Button size="sm" className="shrink-0">
                  Открыть
                  <Icon name="ArrowRight" size={16} className="ml-2" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-16">
            <Icon name="SearchX" size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Ничего не найдено. Попробуйте изменить параметры поиска</p>
          </div>
        )}
      </main>

      <footer className="border-t bg-white mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 DATABASE. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
