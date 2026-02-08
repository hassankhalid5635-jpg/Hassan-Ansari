
import React, { useState } from 'react';
import { DonationPackage } from '../types';
import { initiateSecurePayProDonation } from '../services/paymentService';

interface CheckoutModalProps {
  pkg: DonationPackage;
  onClose: () => void;
  // Added onSuccess to fix the 'Property onSuccess does not exist' error in App.tsx
  onSuccess?: () => void;
}

// Added onSuccess to destructor
const CheckoutModal: React.FC<CheckoutModalProps> = ({ pkg, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [donorName, setDonorName] = useState('');

  const handleDonationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await initiateSecurePayProDonation(pkg.price, pkg.title, donorName);

    if (result.success && result.payment_url) {
      // Call onSuccess callback if it exists before redirecting to payment gateway
      if (onSuccess) {
        onSuccess();
      }
      // PRODUCTION REDIRECT: To official PayPro Hosted Checkout
      window.location.href = result.payment_url;
    } else {
      setLoading(false);
      setError(result.error || "PayPro connection failed. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={onClose}></div>
      
      <div className="relative bg-white w-full max-w-lg rounded-[3rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-10">
          <div className="flex justify-between items-start mb-8">
            <h3 className="text-3xl font-black text-slate-900 tracking-tighter">Support RAF</h3>
            <button onClick={onClose} className="p-2 text-slate-400 hover:bg-slate-100 rounded-full">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <form onSubmit={handleDonationSubmit}>
            <div className="bg-emerald-50 rounded-3xl p-6 mb-8 border border-emerald-100">
              <div className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">Package Selection</div>
              <div className="flex justify-between items-center">
                <span className="text-xl font-black text-slate-900">{pkg.title}</span>
                <span className="text-2xl font-black text-emerald-600">${pkg.price}</span>
              </div>
            </div>

            <div className="space-y-4 mb-10">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Donor Name (For Receipts)</label>
              <input 
                type="text" 
                placeholder="Full Name"
                required
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 px-6 py-4 rounded-2xl outline-none focus:border-emerald-500 transition-all font-bold"
              />
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-600 text-xs font-bold rounded-xl border border-red-100">
                {error}
              </div>
            )}

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white py-5 rounded-2xl font-black text-lg transition-all shadow-xl shadow-emerald-200"
            >
              {loading ? 'Initializing PayPro...' : `Pay $${pkg.price} Securely`}
            </button>
          </form>

          <p className="mt-8 text-center text-slate-400 text-[10px] font-bold uppercase tracking-widest">
            SECURE PAYPRO GATEWAY HANDSHAKE
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
