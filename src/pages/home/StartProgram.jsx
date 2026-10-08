/**
 * StartProgram.jsx
 * Select the event type directly on the homepage.
 */
import React from 'react';

const EVENT_TYPES = [
  { id: 'wedding', label: 'Wedding', icon: '💍' },
  { id: 'birthday', label: 'Birthday', icon: '🎂' },
  { id: 'baptism', label: 'Baptism', icon: '🕊️' },
  { id: 'engagement', label: 'Engagement', icon: '✨' },
  { id: 'anniversary', label: 'Anniversary', icon: '🥂' },
  { id: 'other', label: 'Other Celebrations', icon: '🎉' },
];

export default function StartProgram({ selectedProgram, onSelectProgram }) {
  return (
    <section id="start-program" className="py-24 bg-[#FAF8F5]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="mb-12">
          <h2 className="font-serif text-4xl md:text-5xl text-[#1C1917] mb-4">What are you planning?</h2>
          <p className="text-[#78716C] text-lg max-w-2xl mx-auto">
            Start with the moment. We'll help you build everything around it.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {EVENT_TYPES.map(type => {
            const isSelected = selectedProgram === type.id;
            return (
              <button
                key={type.id}
                onClick={() => onSelectProgram(type.id)}
                className={`flex flex-col items-center justify-center p-8 rounded-3xl border-2 transition-all duration-300 ${
                  isSelected 
                    ? 'border-[#6B3037] bg-[#F5ECE8] shadow-md transform -translate-y-1' 
                    : 'border-[#EAE3DA] bg-white hover:border-[#D4C5B9] hover:bg-[#FDFBF7]'
                }`}
              >
                <span className="text-4xl mb-4">{type.icon}</span>
                <span className={`font-semibold ${isSelected ? 'text-[#6B3037]' : 'text-[#44403C]'}`}>
                  {type.label}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}
