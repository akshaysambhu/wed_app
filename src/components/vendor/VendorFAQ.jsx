import React, { useState } from 'react';

export default function VendorFAQ({ faqs }) {
  const [open, setOpen] = useState(null);

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-[#8E4A49] mb-2">Common Questions</p>
      <h2 className="font-serif text-3xl md:text-4xl text-[#1C1917] mb-10">Frequently Asked</h2>

      <div className="max-w-3xl space-y-3">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className={`border rounded-2xl overflow-hidden transition-all duration-200 ${
              open === i ? 'border-[#6B3037] shadow-sm' : 'border-[#EAE3DA] hover:border-[#D4C5B9]'
            } bg-[#FDFBF7]`}
          >
            <button
              className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span className={`font-medium text-sm leading-snug ${open === i ? 'text-[#6B3037]' : 'text-[#1C1917]'}`}>
                {faq.q}
              </span>
              <span className={`flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center text-xs transition-all duration-200 ${
                open === i
                  ? 'bg-[#6B3037] border-[#6B3037] text-white rotate-0'
                  : 'border-[#D4C5B9] text-[#A39081]'
              }`}>
                {open === i ? '−' : '+'}
              </span>
            </button>

            <div
              className={`px-6 overflow-hidden transition-all duration-300 ${
                open === i ? 'max-h-64 pb-6' : 'max-h-0'
              }`}
            >
              <p className="text-sm text-[#57534E] leading-relaxed">{faq.a}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
