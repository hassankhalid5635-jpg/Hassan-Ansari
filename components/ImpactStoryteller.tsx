
import React, { useState } from 'react';
import { generateFieldReport } from '../services/geminiService';
import { DonationPackage } from '../types';

interface FieldReportProps {
  selectedPackage: DonationPackage | null;
  onAction?: () => void;
}

const FieldReportGenerator: React.FC<FieldReportProps> = ({ selectedPackage, onAction }) => {
  const [name, setName] = useState('');
  const [report, setReport] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRequest = async () => {
    if (!selectedPackage || !name) return;
    setLoading(true);
    const result = await generateFieldReport(name, selectedPackage.childrenFed, selectedPackage.title);
    setReport(result);
    setLoading(false);
  };

  return (
    <section id="impact" className="py-24 bg-slate-900 text-white rounded-[3rem] overflow-hidden relative border border-slate-800">
      <div className="absolute top-0 right-0 w-1/4 h-full bg-indigo-500/5 blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <div className="inline-block px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-6">
          Impact Verification System
        </div>
        <h2 className="text-3xl md:text-5xl font-black mb-6">Request Field Mission Report</h2>
        <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto">
          Verify how your contribution transforms lives. Enter your name below to receive a personalized update from our active field operations.
        </p>

        <div className="flex flex-col md:flex-row gap-4 mb-12 max-w-2xl mx-auto">
          <input 
            type="text" 
            placeholder="Enter Donor Name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-grow bg-slate-950/50 border-slate-800 border rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-white placeholder:text-slate-600 font-medium"
          />
          <button 
            onClick={handleRequest}
            disabled={!name || !selectedPackage || loading}
            className="bg-white text-slate-950 hover:bg-indigo-50 disabled:opacity-30 disabled:cursor-not-allowed px-10 py-4 rounded-2xl font-black transition-all shadow-2xl"
          >
            {loading ? 'Fetching Field Update...' : 'Request Report'}
          </button>
        </div>

        {report && (
          <div className="p-8 md:p-12 bg-white/5 border border-white/10 rounded-[2.5rem] text-left animate-in fade-in zoom-in duration-700 backdrop-blur-md">
            <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-black text-white text-lg">Mission Update: Verified</h4>
                  <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Ref: NH-2024-OFFICIAL</p>
                </div>
              </div>
              <div className="hidden sm:block text-right">
                <div className="text-[10px] font-black text-indigo-400 uppercase tracking-tighter">Report Status</div>
                <div className="text-emerald-400 font-bold flex items-center gap-1.5 justify-end">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  LIVE
                </div>
              </div>
            </div>
            
            <p className="text-slate-300 leading-relaxed text-lg md:text-xl font-medium italic">
              {report}
            </p>

            <div className="mt-8 pt-8 border-t border-white/10 flex flex-wrap gap-6 items-center justify-between">
              <div className="flex items-center gap-3">
                 <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800"></div>
                    ))}
                 </div>
                 <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Signed by Field Coordinators</span>
              </div>
              <button 
                onClick={onAction}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-black text-sm transition-all shadow-xl shadow-indigo-900/40"
              >
                Confirm Impact
              </button>
            </div>
          </div>
        )}
        
        {!selectedPackage && !report && (
          <div className="text-indigo-400/50 font-bold flex items-center justify-center gap-3 text-sm uppercase tracking-widest">
            <svg className="w-5 h-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            Select an impact package to access reports
          </div>
        )}
      </div>
    </section>
  );
};

export default FieldReportGenerator;
