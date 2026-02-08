
import React, { useState, useEffect } from 'react';
import { DONATION_PACKAGES } from './constants';
import { DonationPackage } from './types';
import DonationCard from './components/DonationCard';
import FieldReportGenerator from './components/FieldReportGenerator';
import ReviewSection from './components/ReviewSection';
import PolicySection from './components/PolicySection';
import ImpactReports from './components/ImpactReports';
import CheckoutModal from './components/CheckoutModal';
import AnimatedCounter from './components/AnimatedCounter';

const LogoIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm">
    <rect width="40" height="40" rx="12" fill="#10b981" />
    <path d="M20 28C20 28 27 24 27 19C27 16.5 25.5 15 23.5 15C21.5 15 20 17 20 17C20 17 18.5 15 16.5 15C14.5 15 13 16.5 13 19C13 24 20 28 20 28Z" fill="white" />
    <circle cx="20" cy="22" r="8" stroke="white" strokeWidth="1.5" strokeDasharray="2 4" opacity="0.4" />
  </svg>
);

const App: React.FC = () => {
  const [selectedPkg, setSelectedPkg] = useState<DonationPackage | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToPackages = () => {
    document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDonate = (pkg: DonationPackage) => {
    setSelectedPkg(pkg);
    setShowCheckout(true);
  };

  const handleSelectPackage = (pkg: DonationPackage) => {
    setSelectedPkg(pkg);
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass py-4 shadow-sm' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <LogoIcon />
            <span className="text-2xl font-black tracking-tighter text-slate-900 group-hover:text-emerald-600 transition-colors">RAF</span>
          </div>
          <div className="hidden md:flex items-center gap-8 font-bold text-xs uppercase tracking-widest text-slate-600">
            <a href="#packages" className="hover:text-emerald-600 transition-colors">Packages</a>
            <a href="#reports" className="hover:text-emerald-600 transition-colors">Field Updates</a>
            <a href="#impact" className="hover:text-emerald-600 transition-colors">Impact Report</a>
          </div>
          <button 
            onClick={scrollToPackages}
            className="bg-emerald-600 text-white px-7 py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100"
          >
            Donate Now
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-48 pb-24 px-6 relative overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-100/40 rounded-full blur-[120px] animate-float-slow"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal-100/30 rounded-full blur-[100px] animate-float-slower"></div>
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10 w-full">
          <div className="relative">
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 px-4 py-2 rounded-full mb-8 text-emerald-700 text-[10px] font-black uppercase tracking-[0.2em]">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
              100% of Donation Reaches The Field
            </div>
            <h1 className="text-6xl md:text-8xl font-black leading-[0.9] mb-8 text-slate-900 tracking-tighter">
              One Donation. <br/> <span className="text-emerald-600">Many Lives Saved.</span>
            </h1>
            <p className="text-slate-500 text-lg md:text-xl leading-relaxed mb-10 max-w-lg font-medium">
              Join a community of <span className="text-emerald-600 font-bold"><AnimatedCounter target={50000} suffix="+" /></span> generous souls providing monthly rations to families in need.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={scrollToPackages}
                className="bg-emerald-600 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-emerald-700 transition-all shadow-2xl shadow-emerald-900/20"
              >
                Donate Now
              </button>
              <button 
                onClick={() => document.getElementById('reports')?.scrollIntoView({behavior: 'smooth'})}
                className="bg-white/80 backdrop-blur-sm border-2 border-slate-100 text-slate-700 px-10 py-5 rounded-2xl font-black text-lg hover:bg-white transition-all"
              >
                View Impact
              </button>
            </div>
          </div>
          
          <div className="relative">
             <div className="absolute -inset-10 bg-white/40 rounded-full blur-[100px] animate-pulse"></div>
             <img 
               src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop" 
               className="relative w-full aspect-[4/5] object-cover rounded-[4rem] shadow-2xl border-8 border-white" 
               alt="RAF Impact" 
             />
             <div className="absolute -bottom-10 -right-10 glass p-8 rounded-[2.5rem] shadow-2xl border-white/50 border animate-bounce-slow">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                  </div>
                  <div>
                    <div className="text-xs font-black text-emerald-600 uppercase tracking-widest">Ration Box</div>
                    <div className="text-slate-900 font-black text-sm">1 Family Helped</div>
                  </div>
                </div>
                <div className="text-slate-400 text-[10px] font-bold italic">Impact verified by RAF Field Ops</div>
             </div>
          </div>
        </div>
      </section>

      {/* Trust & Stats Ledger */}
      <section id="donors" className="py-24 px-6 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 text-center">
            <div className="p-8">
              <div className="text-5xl font-black text-slate-900 mb-2">
                <AnimatedCounter target={12450} suffix="+" />
              </div>
              <div className="text-xs font-black text-emerald-600 uppercase tracking-[0.3em]">Families Helped</div>
            </div>
            <div className="p-8 border-x border-slate-100">
              <div className="text-5xl font-black text-slate-900 mb-2">
                <AnimatedCounter target={45000} suffix="+" />
              </div>
              <div className="text-xs font-black text-emerald-600 uppercase tracking-[0.3em]">Monthly Rations</div>
            </div>
            <div className="p-8">
              <div className="text-5xl font-black text-slate-900 mb-2">
                <AnimatedCounter target={85} suffix="+" />
              </div>
              <div className="text-xs font-black text-emerald-600 uppercase tracking-[0.3em]">Cities Covered</div>
            </div>
            <div className="p-8 border-l border-slate-100 bg-emerald-50/30 rounded-3xl">
              <div className="text-5xl font-black text-emerald-600 mb-2">100%</div>
              <div className="text-xs font-black text-slate-900 uppercase tracking-[0.3em]">Usage Transparency</div>
            </div>
          </div>
        </div>
      </section>

      <ImpactReports />

      {/* Packages Section */}
      <section id="packages" className="py-32 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-20">
            <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">Choose Your <span className="text-emerald-600">Impact</span></h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
              Every donation provides immediate relief. Choose a package to start helping families today.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
            {DONATION_PACKAGES.map((pkg) => (
              <DonationCard 
                key={pkg.id} 
                pkg={pkg} 
                onSelect={handleSelectPackage} 
                onDonate={handleDonate}
                isSelected={selectedPkg?.id === pkg.id} 
              />
            ))}
          </div>

          <FieldReportGenerator selectedPackage={selectedPkg} onAction={() => selectedPkg && handleDonate(selectedPkg)} />
        </div>
      </section>

      <ReviewSection />
      
      <PolicySection />

      {/* Advanced Footer */}
      <footer className="bg-slate-950 text-white pt-32 pb-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-5 gap-16 mb-24">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-8">
                <LogoIcon />
                <span className="text-2xl font-black tracking-tighter italic text-white">RAF</span>
              </div>
              <p className="text-slate-500 leading-relaxed font-medium mb-10 max-w-sm">
                Registered 501(c)(3) NGO. Delivering nutrition and hope through transparent, verifiable field operations.
              </p>
            </div>
            <div>
              <h4 className="font-black text-xs uppercase tracking-[0.3em] mb-8 text-emerald-500">Navigation</h4>
              <ul className="space-y-4 text-slate-400 font-bold text-sm">
                <li><a href="#packages" className="hover:text-white transition-colors">Donation Packages</a></li>
                <li><a href="#reports" className="hover:text-white transition-colors">Impact Reports</a></li>
                <li><a href="#policies" className="hover:text-white transition-colors">Transparency Ledger</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-xs uppercase tracking-[0.3em] mb-8 text-emerald-500">Transparency</h4>
              <ul className="space-y-4 text-slate-400 font-bold text-sm">
                <li><a href="#policies" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#policies" className="hover:text-white transition-colors">Terms of Donation</a></li>
                <li><a href="#policies" className="hover:text-white transition-colors">Audit Reports</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-xs uppercase tracking-[0.3em] mb-8 text-emerald-500">Contact</h4>
              <div className="text-slate-400 font-bold text-sm space-y-2">
                <div className="text-white">HQ: 421 Bayberry Drive</div>
                <div>Fort Lauderdale, FL 33322</div>
                <div className="text-white pt-2">contact@raf-relief.org</div>
              </div>
            </div>
          </div>
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black uppercase tracking-widest text-slate-600">
            <p>© 2024 RAF. All Rights Reserved.</p>
            <div className="flex gap-8">
              <a href="#policies">Privacy</a>
              <a href="#policies">Terms</a>
              <a href="#policies">Impact</a>
            </div>
          </div>
        </div>
      </footer>

      {showCheckout && selectedPkg && (
        <CheckoutModal 
          pkg={selectedPkg} 
          onClose={() => setShowCheckout(false)} 
          onSuccess={() => setShowCheckout(false)} 
        />
      )}
    </div>
  );
};

export default App;
