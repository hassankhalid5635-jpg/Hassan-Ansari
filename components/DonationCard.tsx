
import React from 'react';
import { DonationPackage } from '../types';

interface DonationCardProps {
  pkg: DonationPackage;
  onSelect: (pkg: DonationPackage) => void;
  onDonate: (pkg: DonationPackage) => void;
  isSelected: boolean;
}

const DonationCard: React.FC<DonationCardProps> = ({ pkg, onSelect, onDonate, isSelected }) => {
  const getColors = (color: string) => {
    switch (color) {
      case 'emerald': return 'bg-emerald-50 border-emerald-100 text-emerald-600';
      case 'purple': return 'bg-purple-50 border-purple-100 text-purple-600';
      case 'orange': return 'bg-orange-50 border-orange-100 text-orange-600';
      case 'blue': return 'bg-blue-50 border-blue-100 text-blue-600';
      default: return 'bg-slate-50 border-slate-100 text-slate-600';
    }
  };

  return (
    <div 
      className={`relative flex flex-col p-8 rounded-[2.5rem] border-2 transition-all duration-500 cursor-pointer hover:shadow-2xl hover:-translate-y-2 group h-full ${
        isSelected ? 'border-teal-600 bg-white shadow-xl scale-[1.02]' : 'border-slate-100 bg-white hover:border-teal-200'
      }`}
      onClick={() => onSelect(pkg)}
    >
      {pkg.tag && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-teal-600 text-white px-6 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-lg shadow-teal-200">
          {pkg.tag}
        </div>
      )}

      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 border transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ${getColors(pkg.color)}`}>
        <span className="text-2xl font-black">${pkg.price}</span>
      </div>

      <h3 className="text-2xl font-black mb-3 text-slate-900">{pkg.title}</h3>
      <p className="text-slate-500 text-sm mb-8 leading-relaxed">
        {pkg.description}
      </p>

      <div className="space-y-4 mb-10">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold">✓</div>
          <span className="text-sm font-bold text-slate-700">Feeds {pkg.childrenFed} Children</span>
        </div>
        {pkg.benefits.map((benefit, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-xs font-bold">✓</div>
            <span className="text-sm font-medium text-slate-500">{benefit}</span>
          </div>
        ))}
      </div>

      <button 
        onClick={(e) => { e.stopPropagation(); onDonate(pkg); }}
        className={`w-full py-4 rounded-2xl font-bold text-sm transition-all mt-auto ${
          isSelected 
            ? 'bg-teal-600 text-white shadow-lg shadow-teal-100 hover:bg-teal-700' 
            : 'bg-slate-900 text-white hover:bg-black'
        }`}
      >
        Donate Now
      </button>
    </div>
  );
};

export default DonationCard;
