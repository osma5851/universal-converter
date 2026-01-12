'use client';

import { useState, useEffect } from 'react';
import { Category, Unit, convert, formatNumber } from '@/lib/units';
import { useLanguage } from '@/contexts/LanguageContext';
import { getCategoryName } from '@/lib/translations';
import UnitSelector from './UnitSelector';
import { ArrowRightLeft, Copy, Check, RotateCcw } from 'lucide-react';

interface ConversionCardProps {
  category: Category;
}

export default function ConversionCard({ category }: ConversionCardProps) {
  const [fromUnit, setFromUnit] = useState<Unit>(category.units[0]);
  const [toUnit, setToUnit] = useState<Unit>(category.units[1] || category.units[0]);
  const [fromValue, setFromValue] = useState<string>('1');
  const [result, setResult] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const { language, t, isRTL } = useLanguage();

  useEffect(() => {
    // Reset units when category changes
    setFromUnit(category.units[0]);
    setToUnit(category.units[1] || category.units[0]);
    setFromValue('1');
  }, [category]);

  useEffect(() => {
    if (fromValue === '' || isNaN(parseFloat(fromValue))) {
      setResult('');
      return;
    }
    const numValue = parseFloat(fromValue);
    const converted = convert(numValue, fromUnit, toUnit);
    setResult(formatNumber(converted));
  }, [fromValue, fromUnit, toUnit]);

  const handleSwap = () => {
    const tempUnit = fromUnit;
    setFromUnit(toUnit);
    setToUnit(tempUnit);
    if (result) {
      setFromValue(result);
    }
  };

  const handleReset = () => {
    setFromValue('1');
    setFromUnit(category.units[0]);
    setToUnit(category.units[1] || category.units[0]);
  };

  const handleCopy = async () => {
    if (result) {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in">
      <div className="bg-white/60 backdrop-blur-sm rounded-3xl shadow-medium p-6 sm:p-8 border border-cream-200">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-display font-semibold text-slate-800">
              {getCategoryName(language, category.id)} {t('converter')}
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              {t('convertBetween')} {category.units.length} {t('differentUnits')}
            </p>
          </div>
          <button
            onClick={handleReset}
            className="p-2 rounded-xl bg-cream-100 hover:bg-cream-200 text-slate-500 hover:text-slate-700 transition-all duration-200"
            title={t('reset')}
          >
            <RotateCcw size={20} />
          </button>
        </div>

        {/* Conversion Interface */}
        <div className={`grid grid-cols-1 lg:grid-cols-[1fr,auto,1fr] gap-6 items-end ${isRTL ? 'lg:grid-cols-[1fr,auto,1fr]' : ''}`}>
          {/* From Section */}
          <div className="space-y-4">
            <UnitSelector
              units={category.units}
              selectedUnit={fromUnit}
              onSelect={setFromUnit}
              label={t('from')}
            />
            <div className="relative">
              <input
                type="number"
                value={fromValue}
                onChange={(e) => setFromValue(e.target.value)}
                placeholder={t('enterValue')}
                dir="ltr"
                className={`w-full px-4 py-4 text-2xl font-semibold text-slate-800 
                         bg-white rounded-xl border-2 border-transparent
                         shadow-soft focus:shadow-medium focus:border-coral-400
                         outline-none transition-all duration-200
                         placeholder:text-slate-300
                         ${isRTL ? 'text-right pr-4 pl-16' : 'text-left pl-4 pr-16'}`}
              />
              <span className={`absolute top-1/2 -translate-y-1/2 text-coral-500 font-medium ${isRTL ? 'left-4' : 'right-4'}`}>
                {fromUnit.symbol}
              </span>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center lg:pb-4">
            <button
              onClick={handleSwap}
              className="p-4 rounded-full bg-gradient-to-br from-coral-400 to-coral-500 
                       text-white shadow-glow hover:shadow-lg 
                       hover:scale-110 active:scale-95
                       transition-all duration-200"
              title={t('swapUnits')}
            >
              <ArrowRightLeft size={24} />
            </button>
          </div>

          {/* To Section */}
          <div className="space-y-4">
            <UnitSelector
              units={category.units}
              selectedUnit={toUnit}
              onSelect={setToUnit}
              label={t('to')}
            />
            <div className="relative group">
              <div className={`w-full px-4 py-4 text-2xl font-semibold 
                            bg-gradient-to-br from-sage-400/10 to-sage-500/10 
                            rounded-xl border-2 border-sage-400/30
                            min-h-[68px] flex items-center justify-between
                            ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span className={`${result ? 'text-slate-800' : 'text-slate-300'}`} dir="ltr">
                  {result || t('result')}
                </span>
                <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className="text-sage-600 font-medium">
                    {toUnit.symbol}
                  </span>
                  {result && (
                    <button
                      onClick={handleCopy}
                      className="p-2 rounded-lg bg-white/50 hover:bg-white 
                               text-slate-400 hover:text-sage-600
                               opacity-0 group-hover:opacity-100
                               transition-all duration-200"
                      title={t('copyResult')}
                    >
                      {copied ? <Check size={18} /> : <Copy size={18} />}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Conversion Formula */}
        {result && fromValue && (
          <div className="mt-8 pt-6 border-t border-cream-200">
            <p className="text-center text-slate-500" dir="ltr">
              <span className="font-semibold text-coral-500">{fromValue}</span>
              <span className="mx-1">{fromUnit.symbol}</span>
              <span className="mx-2">=</span>
              <span className="font-semibold text-sage-600">{result}</span>
              <span className="mx-1">{toUnit.symbol}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
