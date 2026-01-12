'use client';

import { Unit } from '@/lib/units';
import { ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface UnitSelectorProps {
  units: Unit[];
  selectedUnit: Unit;
  onSelect: (unit: Unit) => void;
  label: string;
}

export default function UnitSelector({
  units,
  selectedUnit,
  onSelect,
  label,
}: UnitSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-medium text-slate-500 mb-2">
        {label}
      </label>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full flex items-center justify-between px-4 py-3 
          bg-white/80 hover:bg-white rounded-xl border-2 
          transition-all duration-200 text-left
          ${isOpen ? 'border-coral-400 shadow-medium' : 'border-transparent shadow-soft hover:shadow-medium'}
        `}
      >
        <div>
          <span className="font-medium text-slate-800">{selectedUnit.name}</span>
          <span className="ml-2 text-coral-500 font-semibold">({selectedUnit.symbol})</span>
        </div>
        <ChevronDown 
          size={20} 
          className={`text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-medium border border-cream-200 overflow-hidden animate-fade-in">
          <div className="max-h-64 overflow-y-auto">
            {units.map((unit) => (
              <button
                key={unit.id}
                onClick={() => {
                  onSelect(unit);
                  setIsOpen(false);
                }}
                className={`
                  w-full px-4 py-3 text-left transition-all duration-150
                  flex items-center justify-between
                  ${unit.id === selectedUnit.id 
                    ? 'bg-coral-50 text-coral-600' 
                    : 'hover:bg-cream-100 text-slate-700'
                  }
                `}
              >
                <span className="font-medium">{unit.name}</span>
                <span className={`text-sm ${unit.id === selectedUnit.id ? 'text-coral-500' : 'text-slate-400'}`}>
                  {unit.symbol}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
