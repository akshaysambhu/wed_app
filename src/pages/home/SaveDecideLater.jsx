import React from 'react';
import { usePlanning } from '../../context/PlanningContext.jsx';

export default function SaveDecideLater() {
  const { openModal } = usePlanning();

  const steps = [
    {
      num: '01',
      title: 'Photo Inspiration',
      subtitle: 'Browse without pressure',
      icon: '🖼️',
      detail: 'You see an ethereal candlelight dinner photo that speaks to you.'
    },
    {
      num: '02',
      title: '♡ Saved',
      subtitle: 'One-click collection',
      icon: '♡',
      detail: 'Instantly saved into your private joint wedding folder.'
    },
    {
      num: '03',
      title: '＋ Our Note',
      subtitle: 'Context preserved',
      icon: '✏️',
      detail: '"Love this lighting. Ask if our photographer can recreate it."'
    },
    {
      num: '04',
      title: 'Shortlist',
      subtitle: 'Group top options',
      icon: '📑',
      detail: 'Tag Petal & Stem and Northlight Studios to your shortlist.'
    },
    {
      num: '05',
      title: 'Compare Side-by-Side',
      subtitle: 'Clear, quiet clarity',
      icon: '⚖️',
      detail: 'Review pricing, availability, and deliverables together.'
    },
    {
      num: '06',
      title: 'Confident Decision',
      subtitle: 'Turn ideas into a plan',
      icon: '✓',
      detail: 'Move from uncertainty to celebration with calm certainty.'
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-[#FAF8F5] border-t border-[#EAE3DA] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-[#8C7E72] font-semibold mb-2 block">
            07 · The Product Philosophy
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1C1917] tracking-tight">
            You don't have to decide today.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#57534E] leading-relaxed">
            Save the ideas you love. Come back later. Discuss them with your partner. Add a note about what caught your eye. Compare your favourites when you're ready.
          </p>
        </div>

        {/* Visual Pipeline Progression Graphic */}
        <div className="bg-white rounded-3xl border border-[#EAE3DA] p-6 sm:p-10 lg:p-12 shadow-sm mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 relative">
            {steps.map((st, idx) => (
              <div
                key={st.num}
                className="relative bg-[#FAF8F5] p-5 rounded-2xl border border-[#EAE3DA] flex flex-col justify-between group hover:border-[#D4C5B9] hover:shadow-md transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl">{st.icon}</span>
                    <span className="text-xs font-mono font-medium text-[#A39081]">{st.num}</span>
                  </div>
                  <h3 className="font-serif text-base font-semibold text-[#1C1917] mb-1">
                    {st.title}
                  </h3>
                  <span className="text-[11px] font-medium text-[#8E4A49] block mb-2">
                    {st.subtitle}
                  </span>
                  <p className="text-xs text-[#57534E] leading-relaxed">
                    {st.detail}
                  </p>
                </div>

                {/* Arrow to Next Step on Large Screens */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 text-[#A39081]">
                    <svg className="w-5 h-5 bg-white rounded-full p-0.5 border border-[#EAE3DA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Interactive Demonstration Banner */}
          <div className="mt-10 p-5 rounded-2xl bg-[#F5ECE8] border border-[#E8D4CF] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3.5">
              <span className="p-2.5 rounded-full bg-white text-[#8E4A49] shadow-sm">
                💭
              </span>
              <div>
                <span className="text-xs font-semibold text-[#6B3037] uppercase tracking-wider block">
                  Live Planning Flow
                </span>
                <p className="text-xs sm:text-sm text-[#44403C]">
                  “We save dozens of ideas, discuss them on the weekend, and shortlist only the ones that match our mood.”
                </p>
              </div>
            </div>

            <button
              onClick={() => openModal('notes')}
              className="px-5 py-2.5 bg-[#6B3037] hover:bg-[#52242A] text-white text-xs font-medium rounded-xl transition-colors whitespace-nowrap shadow-sm"
            >
              Try Partner Notes →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
