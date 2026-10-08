/**
 * PlanningJourney.jsx
 * Visual steps of the planning journey.
 */
import React from 'react';

export default function PlanningJourney() {
  const steps = [
    { num: '1', title: 'Choose' },
    { num: '2', title: 'Discover' },
    { num: '3', title: 'Shortlist' },
    { num: '4', title: 'Discuss' },
    { num: '5', title: 'Finalise' },
    { num: '6', title: 'Book' },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-serif text-3xl md:text-4xl text-[#1C1917] mb-16">The Planning Journey</h2>
        
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
          {steps.map((step, index) => (
            <React.Fragment key={step.num}>
              <div className="flex flex-col items-center group">
                <div className="w-16 h-16 rounded-full bg-[#FAF8F5] border border-[#EAE3DA] flex items-center justify-center text-xl font-serif text-[#1C1917] mb-3 group-hover:bg-[#6B3037] group-hover:text-white group-hover:border-[#6B3037] transition-all duration-300">
                  {step.num}
                </div>
                <span className="text-sm font-semibold text-[#44403C] uppercase tracking-wider">{step.title}</span>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block w-8 border-t-2 border-dashed border-[#D4C5B9] mt-[-2rem]"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
