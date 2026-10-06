/**
 * StartPlanningPage.jsx — /start-planning
 * Multi-step onboarding journey:
 * Step 1: Choose event type
 * Step 2: Select required services
 * Step 3: Event details (Date/Location/Guests)
 * Step 4: Ready to build crew
 */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const EVENT_TYPES = [
  { id: 'wedding', label: 'Wedding', icon: '💍' },
  { id: 'engagement', label: 'Engagement', icon: '✨' },
  { id: 'birthday', label: 'Birthday', icon: '🎂' },
  { id: 'baptism', label: 'Baptism', icon: '🕊️' },
  { id: 'anniversary', label: 'Anniversary', icon: '🥂' },
  { id: 'other', label: 'Other Celebration', icon: '🎉' },
];

const SERVICE_CATEGORIES = [
  { id: 'convention-centre', label: 'Convention Centre', icon: '🏛️' },
  { id: 'stage-decor', label: 'Stage & Décor', icon: '🌸' },
  { id: 'food', label: 'Food & Catering', icon: '🍽️' },
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

export default function StartPlanningPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  
  // State for selections
  const [eventType, setEventType] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const [eventDetails, setEventDetails] = useState({
    date: '',
    location: '',
    guests: ''
  });

  const toggleService = (id) => {
    setSelectedServices(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleComplete = () => {
    // In a real app, this would save to user profile/context
    // For now, just navigate to the homepage or vendors directory to start discovering
    navigate('/'); 
    // Ideally to a /vendors page with filters pre-set, but we'll send to home to use VendorDiscovery
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] pt-24 pb-20 font-sans text-[#1C1917]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between text-xs font-semibold text-[#A39081] uppercase tracking-wider mb-3">
            <span className={step >= 1 ? "text-[#6B3037]" : ""}>1. Event</span>
            <span className={step >= 2 ? "text-[#6B3037]" : ""}>2. Services</span>
            <span className={step >= 3 ? "text-[#6B3037]" : ""}>3. Details</span>
            <span className={step >= 4 ? "text-[#6B3037]" : ""}>4. Ready</span>
          </div>
          <div className="h-1.5 w-full bg-[#EAE3DA] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#6B3037] transition-all duration-500 ease-out" 
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* ── STEP 1: EVENT TYPE ──────────────────────────── */}
        {step === 1 && (
          <div className="animate-fadeIn">
            <h1 className="font-serif text-4xl text-[#1C1917] mb-3 text-center">What are you planning?</h1>
            <p className="text-center text-[#78716C] mb-10">Select the type of celebration to tailor your experience.</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {EVENT_TYPES.map(type => (
                <button
                  key={type.id}
                  onClick={() => { setEventType(type.id); setTimeout(() => setStep(2), 300); }}
                  className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all duration-200 ${
                    eventType === type.id 
                      ? 'border-[#6B3037] bg-[#F5ECE8]' 
                      : 'border-[#EAE3DA] bg-white hover:border-[#D4C5B9] hover:bg-[#FDFBF7]'
                  }`}
                >
                  <span className="text-4xl mb-3">{type.icon}</span>
                  <span className={`font-semibold ${eventType === type.id ? 'text-[#6B3037]' : 'text-[#44403C]'}`}>
                    {type.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── STEP 2: SERVICES ────────────────────────────── */}
        {step === 2 && (
          <div className="animate-fadeIn">
            <h1 className="font-serif text-4xl text-[#1C1917] mb-3 text-center">What services do you need?</h1>
            <p className="text-center text-[#78716C] mb-10">Select everything you need. You can always change this later.</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
              {SERVICE_CATEGORIES.map(service => {
                const isSelected = selectedServices.includes(service.id);
                return (
                  <button
                    key={service.id}
                    onClick={() => toggleService(service.id)}
                    className={`flex items-center gap-3 p-4 rounded-xl border transition-all duration-200 text-left ${
                      isSelected 
                        ? 'border-[#6B3037] bg-[#F5ECE8] shadow-sm' 
                        : 'border-[#EAE3DA] bg-white hover:border-[#D4C5B9]'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded flex items-center justify-center border flex-shrink-0 ${
                      isSelected ? 'bg-[#6B3037] border-[#6B3037] text-white' : 'border-[#D4C5B9] bg-white'
                    }`}>
                      {isSelected && <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>}
                    </div>
                    <div>
                      <span className="text-lg mr-1.5">{service.icon}</span>
                      <span className={`text-sm font-medium ${isSelected ? 'text-[#6B3037]' : 'text-[#44403C]'}`}>
                        {service.label}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
            
            <div className="flex items-center justify-between pt-6 border-t border-[#EAE3DA]">
              <button onClick={() => setStep(1)} className="text-sm font-medium text-[#78716C] hover:text-[#1C1917]">
                ← Back
              </button>
              <button 
                onClick={() => setStep(3)}
                disabled={selectedServices.length === 0}
                className="px-8 py-3 bg-[#1C1917] text-white text-sm font-semibold rounded-full hover:bg-[#34302C] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3: DETAILS ─────────────────────────────── */}
        {step === 3 && (
          <div className="animate-fadeIn">
            <h1 className="font-serif text-4xl text-[#1C1917] mb-3 text-center">Tell us a bit more</h1>
            <p className="text-center text-[#78716C] mb-10">This helps us match you with the right vendors and venues.</p>
            
            <div className="bg-white border border-[#EAE3DA] rounded-3xl p-8 max-w-xl mx-auto space-y-6">
              <div>
                <label className="block text-sm font-semibold text-[#1C1917] mb-2">When is the event?</label>
                <input 
                  type="date"
                  value={eventDetails.date}
                  onChange={e => setEventDetails({...eventDetails, date: e.target.value})}
                  className="w-full bg-[#FDFBF7] border border-[#EAE3DA] rounded-xl px-4 py-3 focus:outline-none focus:border-[#6B3037] text-[#1C1917]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-[#1C1917] mb-2">Where is the event?</label>
                <div className="relative">
                  <span className="absolute left-4 top-3.5 text-[#A39081]">📍</span>
                  <input 
                    type="text"
                    placeholder="e.g. Kochi, Kerala"
                    value={eventDetails.location}
                    onChange={e => setEventDetails({...eventDetails, location: e.target.value})}
                    className="w-full bg-[#FDFBF7] border border-[#EAE3DA] rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-[#6B3037] text-[#1C1917]"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-[#1C1917] mb-2">Estimated Guest Count</label>
                <select 
                  value={eventDetails.guests}
                  onChange={e => setEventDetails({...eventDetails, guests: e.target.value})}
                  className="w-full bg-[#FDFBF7] border border-[#EAE3DA] rounded-xl px-4 py-3 focus:outline-none focus:border-[#6B3037] text-[#1C1917]"
                >
                  <option value="">Select an estimate...</option>
                  <option value="under-100">Under 100</option>
                  <option value="100-300">100 - 300</option>
                  <option value="300-500">300 - 500</option>
                  <option value="500-1000">500 - 1000</option>
                  <option value="1000+">1000+</option>
                </select>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-8 max-w-xl mx-auto">
              <button onClick={() => setStep(2)} className="text-sm font-medium text-[#78716C] hover:text-[#1C1917]">
                ← Back
              </button>
              <button 
                onClick={() => setStep(4)}
                className="px-8 py-3 bg-[#1C1917] text-white text-sm font-semibold rounded-full hover:bg-[#34302C] transition-colors"
              >
                Next Step →
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 4: READY ───────────────────────────────── */}
        {step === 4 && (
          <div className="animate-fadeIn text-center py-10">
            <div className="w-20 h-20 bg-[#F5ECE8] text-[#6B3037] rounded-full flex items-center justify-center text-4xl mx-auto mb-6 shadow-sm border border-[#E8D4CF]">
              🎉
            </div>
            <h1 className="font-serif text-4xl md:text-5xl text-[#1C1917] mb-4">You're ready to start!</h1>
            <p className="text-[#57534E] text-lg max-w-lg mx-auto mb-10 leading-relaxed">
              We've saved your preferences. Now it's time to build the team behind your moment. Discover vendors, save your favourites, and discuss them with your partner.
            </p>
            
            <div className="bg-white border border-[#EAE3DA] rounded-2xl p-6 max-w-md mx-auto text-left mb-10 shadow-sm">
              <h3 className="font-semibold text-[#1C1917] mb-4 text-center">Your Planning Journey</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#1C1917] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                  <p className="text-sm text-[#44403C]"><strong>Discover & Shortlist</strong> vendors for the {selectedServices.length} services you need.</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#1C1917] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                  <p className="text-sm text-[#44403C]"><strong>Discuss</strong> options privately with your partner.</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#1C1917] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
                  <p className="text-sm text-[#44403C]"><strong>Finalise</strong> your event crew and request quotes.</p>
                </li>
              </ul>
            </div>
            
            <button 
              onClick={handleComplete}
              className="px-10 py-4 bg-[#6B3037] text-white text-base font-semibold rounded-full hover:bg-[#52242A] transition-all shadow-md hover:shadow-xl hover:-translate-y-1 inline-flex items-center gap-2"
            >
              Build My Crew 
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
