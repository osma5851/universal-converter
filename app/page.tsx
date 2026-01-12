'use client';

import { useState } from 'react';
import { categories } from '@/lib/units';
import CategorySelector from '@/components/CategorySelector';
import ConversionCard from '@/components/ConversionCard';
import { ArrowLeftRight, Sparkles } from 'lucide-react';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  return (
    <main className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      {/* Decorative Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-coral-400/10 rounded-full blur-3xl" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-sage-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-coral-400/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full shadow-soft mb-6">
            <Sparkles size={16} className="text-coral-500" />
            <span className="text-sm font-medium text-slate-600">
              Universal Unit Converter
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-slate-800 mb-4">
            Convert{' '}
            <span className="relative">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-coral-400 to-coral-500">
                Anything
              </span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                <path 
                  d="M2 8C50 2 150 2 198 8" 
                  stroke="url(#underline-gradient)" 
                  strokeWidth="3" 
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="underline-gradient" x1="0" y1="0" x2="200" y2="0">
                    <stop stopColor="#FF7F6E" />
                    <stop offset="1" stopColor="#FF6B57" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h1>
          
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Seamlessly convert between length, weight, volume, temperature, and more.
            <br className="hidden sm:block" />
            Fast, accurate, and beautifully simple.
          </p>
        </header>

        {/* Category Selection */}
        <section className="mb-10 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <CategorySelector
            categories={categories}
            selectedCategory={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </section>

        {/* Conversion Card */}
        <section key={selectedCategory.id}>
          <ConversionCard category={selectedCategory} />
        </section>

        {/* Quick Reference */}
        <section className="mt-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 border border-cream-200">
            <h3 className="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
              <ArrowLeftRight size={20} className="text-coral-500" />
              Quick Reference for {selectedCategory.name}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {selectedCategory.units.map((unit) => (
                <div 
                  key={unit.id}
                  className="px-4 py-3 bg-white/60 rounded-xl text-center hover:bg-white hover:shadow-soft transition-all duration-200"
                >
                  <span className="block text-sm font-medium text-slate-700">{unit.name}</span>
                  <span className="text-coral-500 font-semibold">{unit.symbol}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 text-center pb-8">
          <p className="text-sm text-slate-400">
            Built with ♥ using Next.js & Tailwind CSS
          </p>
        </footer>
      </div>
    </main>
  );
}
