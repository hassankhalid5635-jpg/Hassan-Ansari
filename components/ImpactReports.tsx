
import React from 'react';
import { MONTHLY_REPORTS } from '../constants';

const ImpactReports: React.FC = () => {
  return (
    <section id="reports" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <div className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest mb-4">
              Monthly Field Updates
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Verified <span className="text-emerald-600">Impact</span> Reports</h2>
          </div>
          <p className="text-slate-500 font-medium max-w-xs text-sm">
            We document every mission. Browse our latest monthly updates directly from the field.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {MONTHLY_REPORTS.map((report, idx) => (
            <div key={idx} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-[2.5rem] mb-6 aspect-square">
                <img 
                  src={report.image} 
                  alt={report.location} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                  <span className="text-white font-bold text-sm">View Full Gallery →</span>
                </div>
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl">
                  <span className="text-[10px] font-black text-slate-900 uppercase tracking-tighter">{report.month}</span>
                </div>
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">{report.location}</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">
                {report.update}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactReports;
