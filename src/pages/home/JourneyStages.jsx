import React from 'react';
import { usePlanning } from '../../context/PlanningContext.jsx';

export default function JourneyStages() {
  const { openModal } = usePlanning();

  const stages = [
    {
      num: '01',
      title: 'Discover',
      tag: 'Dream & Browse',
      description: 'Find an image, real wedding or aesthetic theme that captures your imagination without feeling pressured to hire immediately.',
      icon: '✨'
    },
    {
      num: '02',
      title: 'Save',
      tag: 'One-Click Collection',
      description: 'Keep the things you love in one organized, beautiful visual folder that syncs seamlessly with your partner.',
      icon: '♡'
    },
    {
      num: '03',
      title: 'Discuss',
      tag: 'Shared Notes',
      description: 'Add private thoughts, read partner remarks, and remember why a particular lighting setup or mandap caught your eye.',
      icon: '💬'
    },
    {
      num: '04',
      title: 'Decide',
      tag: 'Side-by-Side Clarity',
      description: 'Shortlist top candidates, compare deliverable scopes, pricing tiers, and dates with complete transparency.',
      icon: '⚖️'
    },
    {
      num: '05',
      title: 'Plan',
      tag: 'Seamless Execution',
      description: 'Request formal quotes, manage booking milestones, and coordinate tasks through your unified wedding workspace.',
      icon: '📋'
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-[#FAF8F5] border-t border-[#EAE3DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-[#8C7E72] font-semibold mb-2 block">
            11 · The Holistic Journey
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1C1917] tracking-tight">
            From “I love this” to <br />
            <span className="italic font-light text-[#6B3037]">“Let’s make it happen.”</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#57534E] leading-relaxed">
            Planning a celebration isn’t a transactional checklist. It’s an organic journey of discovery, alignment, and calm decision-making.
          </p>
        </div>

        {/* 5 Stages Grid / Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative">
          {stages.map((st, idx) => (
            <div
              key={st.num}
              className="bg-white p-6 rounded-3xl border border-[#EAE3DA] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl">{st.icon}</span>
                  <span className="font-serif text-lg font-bold text-[#8E4A49]">{st.num}</span>
                </div>
                <span className="text-[11px] uppercase tracking-wider font-semibold text-[#8C7E72] block mb-1">
                  {st.tag}
                </span>
                <h3 className="font-serif text-xl font-medium text-[#1C1917] mb-2 group-hover:text-[#6B3037] transition-colors">
                  {st.title}
                </h3>
                <p className="text-xs text-[#57534E] leading-relaxed">
                  {st.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#F4EFEA] flex items-center justify-between text-[11px] text-[#A39081]">
                <span>Stage {idx + 1} of 5</span>
                <span>→</span>
              </div>
            </div>
          ))}
        </div>

        {/* Central Callout Banner */}
        <div className="mt-12 text-center">
          <button
            onClick={() => openModal('dashboard')}
            className="px-8 py-3.5 bg-[#1C1917] hover:bg-[#34302C] text-white text-xs sm:text-sm font-medium rounded-full shadow-md hover:shadow-lg transition-all"
          >
            Start Your Journey With Us
          </button>
        </div>
      </div>
    </section>
  );
}
