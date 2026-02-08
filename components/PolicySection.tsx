
import React from 'react';

const PolicySection: React.FC = () => {
  const policies = [
    {
      title: "Privacy Policy",
      icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
      description: "We protect your data with 256-bit encryption. Your personal information is never shared with third parties or advertisers.",
      details: ["SSL Secured Transactions", "No Data Reselling", "GDPR & CCPA Compliant"]
    },
    {
      title: "Donation Terms",
      icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
      description: "100% of your donation is used for field operations. We maintain a zero-admin-fee policy for donor-restricted funds.",
      details: ["Refundable within 30 days", "Tax Deductible Receipts", "Zero Hidden Charges"]
    },
    {
      title: "Transparency",
      icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
      description: "We believe in radical transparency. Every meal provided is logged in our verifiable global impact ledger.",
      details: ["Real-time Field Audits", "Annual Impact Reports", "Verified Beneficiaries"]
    }
  ];

  return (
    <section id="policies" className="py-24 px-6 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full bg-teal-100 text-teal-700 text-[10px] font-black uppercase tracking-widest mb-4">
            Trust & Compliance
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">Our Commitment to <span className="text-teal-600">Integrity</span></h2>
          <p className="text-slate-500 max-w-2xl mx-auto font-medium">
            At RAF, trust is our most valuable asset. We maintain the highest standards of accountability in every grain of rice and every dollar donated.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {policies.map((policy, idx) => (
            <div key={idx} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 group">
              <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600 mb-8 group-hover:bg-teal-600 group-hover:text-white transition-all">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={policy.icon} />
                </svg>
              </div>
              <h3 className="text-xl font-black mb-4 text-slate-900">{policy.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-8">
                {policy.description}
              </p>
              <ul className="space-y-3">
                {policy.details.map((detail, i) => (
                  <li key={i} className="flex items-center gap-3 text-xs font-bold text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
                Registered 501(c)(3) Organization | EIN: 12-3456789
            </p>
        </div>
      </div>
    </section>
  );
};

export default PolicySection;
