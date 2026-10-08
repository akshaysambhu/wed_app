/**
 * BuildCrew.jsx
 * Select services on the homepage.
 */
import React from 'react';
import { useNavigate } from 'react-router-dom';

const SERVICE_CATEGORIES = [
  { id: 'convention-centre', label: 'Convention Centre', icon: '🏛️' },
  { id: 'stage-decor', label: 'Stage & Décor', icon: '🌸' },
  { id: 'food', label: 'Food', icon: '🍽️' },
  { id: 'photography', label: 'Photography', icon: '📸' },
  { id: 'makeup', label: 'Makeup', icon: '💄' },
  { id: 'dress', label: 'Wedding Rental Dress', icon: '👗' },
  { id: 'ornaments', label: 'Wedding Rental Ornaments', icon: '💎' },
  { id: 'transport', label: 'Rental Cars / Bus', icon: '🚗' },
  { id: 'hampers', label: 'Hampers & Gifts', icon: '🎁' },
  { id: 'invitations', label: 'Invitation Cards', icon: '💌' },
  { id: 'cake', label: 'Cake', icon: '🍰' },
  { id: 'dj', label: 'DJ & Other Programs', icon: '🎵' },
  { id: 'sound', label: 'Audio / Sound', icon: '🎤' },
];

export default function BuildCrew({ selectedProgram, selectedServices, onToggleService }) {
  const navigate = useNavigate();

  const handleBuildCrew = () => {
    // In a real implementation, we would save the state to context here.
    // For now, we navigate to the crew-builder page
    navigate('/crew-builder');
  };

  return (
    <section className="py-24 bg-white border-t border-[#EAE3DA] animate-fadeIn">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12 text-center">
          <h2 className="font-serif text-4xl md:text-5xl text-[#1C1917] mb-4">Build your crew.</h2>
          <p className="text-[#78716C] text-lg max-w-2xl mx-auto">
            Choose the services you need for your celebration.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-12">
          {SERVICE_CATEGORIES.map(service => {
            const isSelected = selectedServices.includes(service.id);
            return (
              <button
                key={service.id}
                onClick={() => onToggleService(service.id)}
                className={`flex flex-col items-center justify-center gap-2 p-5 rounded-2xl border transition-all duration-200 text-center ${
                  isSelected 
                    ? 'border-[#6B3037] bg-[#F5ECE8] shadow-sm' 
                    : 'border-[#EAE3DA] bg-[#FAF8F5] hover:border-[#D4C5B9]'
                }`}
              >
                <span className="text-3xl">{service.icon}</span>
                <span className={`text-xs font-semibold ${isSelected ? 'text-[#6B3037]' : 'text-[#44403C]'}`}>
                  {service.label}
                </span>
                {isSelected && (
                  <div className="absolute top-2 right-2 w-4 h-4 bg-[#6B3037] rounded-full flex items-center justify-center text-white">
                    <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                  </div>
                )}
              </button>
            );
          })}
        </div>
        
        {/* Sticky-like bottom action */}
        <div className="bg-[#1C1917] rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <p className="text-white font-serif text-2xl mb-1">
              You've selected {selectedServices.length} service{selectedServices.length !== 1 ? 's' : ''}.
            </p>
            {selectedServices.length > 0 && (
              <p className="text-[#A39081] text-sm">
                {selectedServices.map(id => SERVICE_CATEGORIES.find(s => s.id === id)?.label).join(', ')}
              </p>
            )}
          </div>
          
          <button 
            onClick={handleBuildCrew}
            disabled={selectedServices.length === 0}
            className="w-full md:w-auto px-8 py-4 bg-[#6B3037] text-white text-base font-semibold rounded-full hover:bg-[#52242A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            Build My Crew 
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </button>
        </div>

      </div>
    </section>
  );
}
