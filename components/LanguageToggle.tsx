'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Languages } from 'lucide-react';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-2 
                 bg-white/80 backdrop-blur-sm rounded-full shadow-soft 
                 hover:shadow-medium hover:bg-white
                 transition-all duration-300 group"
      title={language === 'en' ? 'Switch to Arabic' : 'التبديل إلى الإنجليزية'}
    >
      <Languages size={18} className="text-coral-500 group-hover:rotate-12 transition-transform" />
      <span className="font-medium text-slate-700">
        {language === 'en' ? 'العربية' : 'English'}
      </span>
    </button>
  );
}
