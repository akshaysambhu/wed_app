/**
 * PrivatePlanning.jsx
 * New explainer section for Private Couple Planning
 */
import React from 'react';
import { usePlanning } from '../../context/PlanningContext.jsx';

export default function PrivatePlanning() {
  const { openDiscussion } = usePlanning();

  return (
    <section className="py-24 bg-[#F5ECE8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Mockup visual */}
          <div className="w-full lg:w-1/2 relative">
            <div className="aspect-[4/5] bg-[#FAF8F5] rounded-[2rem] border-8 border-white shadow-2xl overflow-hidden flex flex-col">
              <div className="bg-[#1C1917] px-4 py-3 flex items-center gap-3 shrink-0">
                <div className="w-8 h-8 bg-[#8C7E72] rounded-full flex items-center justify-center text-white text-xs font-bold">R</div>
                <div>
                  <p className="text-white text-sm font-semibold leading-none">Rohan</p>
                  <p className="text-[#A39081] text-[10px]">Couple Discussion</p>
                </div>
              </div>
              <div className="flex-1 p-5 space-y-4 bg-[#FAF8F5]">
                {/* Mock bubbles */}
                <div className="flex flex-row gap-2 max-w-[80%]">
                  <div className="bg-[#F4EFEA] text-[#1C1917] px-3.5 py-2.5 rounded-2xl rounded-bl-sm text-sm border border-[#EAE3DA]">
                    Hey! Look at this venue I found.
                    <div className="mt-2 flex gap-2 items-center bg-white rounded-lg p-2 border border-[#EAE3DA]">
                      <div className="w-10 h-10 bg-gray-200 rounded overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1519741497674-611481863552?w=100&q=80" alt="venue" className="w-full h-full object-cover"/>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#1C1917]">Cedar Hall</p>
                        <p className="text-[10px] text-[#78716C]">Kochi, Kerala</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row-reverse gap-2 max-w-[80%] ml-auto">
                  <div className="bg-[#6B3037] text-white px-3.5 py-2.5 rounded-2xl rounded-br-sm text-sm">
                    Wow, it's beautiful. Should we shortlist it?
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decoration */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#E8D4CF] rounded-full blur-3xl opacity-60 mix-blend-multiply" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#D4C5B9] rounded-full blur-3xl opacity-60 mix-blend-multiply" />
          </div>

          {/* Content */}
          <div className="w-full lg:w-1/2">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#8E4A49] mb-4">Private Couple Planning</p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#1C1917] mb-6">Plan together.</h2>
            <p className="text-lg text-[#57534E] mb-8 leading-relaxed">
              Because the best decisions are made together. Use our built-in Messenger to:
            </p>
            
            <ul className="space-y-4 mb-10">
              {['Save ideas', 'Discuss vendors', 'Share inspiration', 'Make decisions', 'Build your crew together'].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#1C1917] text-white flex items-center justify-center shrink-0">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                  </div>
                  <span className="text-[#44403C] font-medium">{item}</span>
                </li>
              ))}
            </ul>

            <button 
              onClick={() => openDiscussion()}
              className="px-8 py-4 bg-[#1C1917] text-white font-semibold rounded-full hover:bg-[#34302C] transition-colors inline-flex items-center gap-2"
            >
              <span className="text-lg">💬</span> Connect Partner
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
