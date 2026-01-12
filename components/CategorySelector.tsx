'use client';

import { Category } from '@/lib/units';
import { useLanguage } from '@/contexts/LanguageContext';
import { getCategoryName } from '@/lib/translations';
import {
  Ruler,
  Scale,
  Beaker,
  Thermometer,
  Square,
  Gauge,
  Clock,
  HardDrive,
  Waves,
  Zap,
  LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Ruler,
  Scale,
  Beaker,
  Thermometer,
  Square,
  Gauge,
  Clock,
  HardDrive,
  Waves,
  Zap,
};

interface CategorySelectorProps {
  categories: Category[];
  selectedCategory: Category;
  onSelect: (category: Category) => void;
}

export default function CategorySelector({
  categories,
  selectedCategory,
  onSelect,
}: CategorySelectorProps) {
  const { language, t } = useLanguage();

  return (
    <div className="w-full">
      <h2 className="text-sm font-medium text-slate-500 mb-4 uppercase tracking-wider">
        {t('categories')}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-3 stagger-children">
        {categories.map((category, index) => {
          const Icon = iconMap[category.icon] || Ruler;
          const isSelected = category.id === selectedCategory.id;
          
          return (
            <button
              key={category.id}
              onClick={() => onSelect(category)}
              style={{ animationDelay: `${index * 0.05}s` }}
              className={`
                relative group flex flex-col items-center justify-center p-4 rounded-2xl
                transition-all duration-300 ease-out animate-fade-in opacity-0
                ${isSelected 
                  ? 'bg-gradient-to-br from-coral-400 to-coral-500 text-white shadow-glow scale-105' 
                  : 'bg-white/80 hover:bg-white text-slate-700 hover:text-coral-500 shadow-soft hover:shadow-medium hover:scale-105'
                }
              `}
            >
              <Icon 
                size={24} 
                className={`mb-2 transition-transform duration-300 ${isSelected ? 'animate-float' : 'group-hover:scale-110'}`} 
              />
              <span className="text-xs font-medium text-center leading-tight">
                {getCategoryName(language, category.id)}
              </span>
              {isSelected && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-coral-500 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
