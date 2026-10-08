/**
 * CrewBuilderPage.jsx — /crew-builder
 * The guided vendor discovery funnel.
 */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { VENDORS } from '../data/mockData.js';
import VendorCard from '../components/ui/VendorCard.jsx';
import { usePlanning } from '../context/PlanningContext.jsx';

export default function CrewBuilderPage() {
  const navigate = useNavigate();
  const { shortlistItems } = usePlanning();
  
  // Mock data representing what was passed from the homepage
  const [eventDetails, setEventDetails] = useState({
    type: 'Wedding',
    location: 'Kochi',
    date: '18 September 2027',
    guests: '500+'
  });
  
  const [isEditingHeader, setIsEditingHeader] = useState(false);

  // Requirements passed from homepage
  const requirements = [
    { id: 'venue', label: 'Venue' },
    { id: 'photography', label: 'Photography' },
    { id: 'catering', label: 'Catering' },
    { id: 'makeup', label: 'Makeup' }
  ];

  const [activeReqIndex, setActiveReqIndex] = useState(1); // 1 = Photography (0-indexed is venue)
  
  // Filters & Sort state
  const [sortBy, setSortBy] = useState('Recommended');
  
  const activeReq = requirements[activeReqIndex];
  
  // Fake filtering based on active requirement
  const currentVendors = VENDORS.filter(v => 
    activeReq.id === 'photography' ? v.category === 'Photography' : 
    activeReq.id === 'makeup' ? v.category === 'Makeup' :
    activeReq.id === 'venue' ? v.category === 'Venue' :
    v.category === 'Photography' // Fallback
  );

  // Calculate shortlist summary
  const summaryCounts = requirements.reduce((acc, req) => {
    // Just mock matching categories
    let cat = req.label;
    if(req.id === 'venue') cat = 'Venue';
    acc[req.id] = shortlistItems.filter(item => item.category === cat).length;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-[#FAF8F5] pt-20 pb-40">
      
      {/* 1. Dynamic Header */}
      <div className="bg-[#1C1917] text-white pt-10 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="text-[#A39081] text-xs uppercase tracking-widest font-semibold mb-2">Planning your</p>
              <h1 className="font-serif text-4xl md:text-5xl mb-4">{eventDetails.type}</h1>
              
              {isEditingHeader ? (
                <div className="flex flex-wrap gap-3 items-center mt-4 bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/20">
                  <input 
                    type="text" value={eventDetails.location} onChange={e => setEventDetails({...eventDetails, location: e.target.value})}
                    className="bg-transparent border-b border-white/30 text-white focus:outline-none focus:border-white px-2 py-1 text-sm w-32"
                    placeholder="Location"
                  />
                  <input 
                    type="text" value={eventDetails.date} onChange={e => setEventDetails({...eventDetails, date: e.target.value})}
                    className="bg-transparent border-b border-white/30 text-white focus:outline-none focus:border-white px-2 py-1 text-sm w-40"
                    placeholder="Date"
                  />
                  <input 
                    type="text" value={eventDetails.guests} onChange={e => setEventDetails({...eventDetails, guests: e.target.value})}
                    className="bg-transparent border-b border-white/30 text-white focus:outline-none focus:border-white px-2 py-1 text-sm w-24"
                    placeholder="Guests"
                  />
                  <button onClick={() => setIsEditingHeader(false)} className="text-xs font-semibold bg-white text-[#1C1917] px-4 py-2 rounded-full">Save</button>
                </div>
              ) : (
                <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
                  <span className="flex items-center gap-1.5"><span className="text-[#A39081]">📍</span> {eventDetails.location}</span>
                  <span className="text-white/30">•</span>
                  <span className="flex items-center gap-1.5"><span className="text-[#A39081]">📅</span> {eventDetails.date}</span>
                  <span className="text-white/30">•</span>
                  <span className="flex items-center gap-1.5"><span className="text-[#A39081]">👥</span> {eventDetails.guests} Guests</span>
                  
                  <button onClick={() => setIsEditingHeader(true)} className="ml-4 text-xs text-[#A39081] hover:text-white underline decoration-white/30 underline-offset-4">
                    Edit Details
                  </button>
                </div>
              )}
            </div>
            
            <div className="text-right">
              <p className="text-xs text-[#A39081] mb-2 font-medium">Progress</p>
              <div className="text-xl font-serif">
                <span className="text-white">{activeReqIndex + 1}</span>
                <span className="text-[#A39081]"> / {requirements.length} requirements</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Horizontal Requirement Navigation */}
      <div className="bg-white border-b border-[#EAE3DA] sticky top-20 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto hide-scrollbar">
            {requirements.map((req, index) => {
              const isActive = index === activeReqIndex;
              const hasShortlisted = summaryCounts[req.id] > 0;
              return (
                <button
                  key={req.id}
                  onClick={() => setActiveReqIndex(index)}
                  className={`flex-shrink-0 px-6 py-5 border-b-2 text-sm font-medium transition-colors relative flex items-center gap-2 ${
                    isActive 
                      ? 'border-[#6B3037] text-[#1C1917]' 
                      : 'border-transparent text-[#78716C] hover:text-[#1C1917]'
                  }`}
                >
                  {req.label}
                  {hasShortlisted && (
                    <span className="w-5 h-5 rounded-full bg-[#E8D4CF] text-[#6B3037] text-[10px] font-bold flex items-center justify-center">
                      {summaryCounts[req.id]}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        
        {/* Discovery Header */}
        <div className="mb-10">
          <h2 className="font-serif text-3xl md:text-4xl text-[#1C1917] mb-3">Find your {activeReq.label.toLowerCase()}.</h2>
          <p className="text-[#78716C] text-lg">Explore {activeReq.label.toLowerCase()} professionals available for your celebration.</p>
        </div>

        {/* Toolbar: Sort & Filters (No Compare) */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
          <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
            <button className="px-4 py-2 bg-white border border-[#EAE3DA] rounded-full text-xs font-semibold text-[#44403C] hover:bg-[#FDFBF7] flex items-center gap-2 flex-shrink-0">
              Location ▾
            </button>
            <button className="px-4 py-2 bg-white border border-[#EAE3DA] rounded-full text-xs font-semibold text-[#44403C] hover:bg-[#FDFBF7] flex items-center gap-2 flex-shrink-0">
              Price ▾
            </button>
            <button className="px-4 py-2 bg-white border border-[#EAE3DA] rounded-full text-xs font-semibold text-[#44403C] hover:bg-[#FDFBF7] flex items-center gap-2 flex-shrink-0">
              Rating ▾
            </button>
            <button className="px-4 py-2 bg-white border border-[#EAE3DA] rounded-full text-xs font-semibold text-[#44403C] hover:bg-[#FDFBF7] flex items-center gap-2 flex-shrink-0">
              Style ▾
            </button>
          </div>
          
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs font-medium text-[#78716C]">Sort by:</span>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-sm font-semibold text-[#1C1917] focus:outline-none border-b border-[#D4C5B9] pb-1 cursor-pointer"
            >
              <option>Recommended</option>
              <option>Highest Rated</option>
              <option>Most Reviewed</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest</option>
            </select>
          </div>
        </div>

        {/* Vendor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {currentVendors.length > 0 ? (
             currentVendors.map(vendor => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))
          ) : (
            <div className="col-span-full py-12 text-center bg-white border border-[#EAE3DA] rounded-2xl">
              <p className="text-[#78716C]">No vendors found for {activeReq.label} currently.</p>
            </div>
          )}
        </div>
        
        {/* Navigation bottom */}
        <div className="flex justify-between items-center border-t border-[#EAE3DA] pt-8">
          <button 
            disabled={activeReqIndex === 0}
            onClick={() => setActiveReqIndex(activeReqIndex - 1)}
            className="text-sm font-semibold text-[#78716C] hover:text-[#1C1917] disabled:opacity-30"
          >
            ← Previous
          </button>
          {activeReqIndex < requirements.length - 1 ? (
             <button 
              onClick={() => setActiveReqIndex(activeReqIndex + 1)}
              className="px-6 py-3 bg-[#1C1917] text-white text-sm font-semibold rounded-full hover:bg-[#34302C] transition-colors"
            >
              Next: {requirements[activeReqIndex + 1].label} →
            </button>
          ) : (
             <button 
              onClick={() => navigate('/shortlist')}
              className="px-6 py-3 bg-[#6B3037] text-white text-sm font-semibold rounded-full hover:bg-[#52242A] transition-colors"
            >
              Finish Discovery →
            </button>
          )}
        </div>

      </div>

      {/* Sticky Crew Summary Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#EAE3DA] shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-40 transform transition-transform duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#A39081] mb-1">Your Crew Shortlist</p>
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  {requirements.map(req => (
                    <span key={req.id} className="text-sm font-medium text-[#1C1917]">
                      {req.label}: <span className={summaryCounts[req.id] > 0 ? 'text-[#6B3037] font-bold' : 'text-[#78716C]'}>{summaryCounts[req.id]}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <button 
              onClick={() => navigate('/shortlist')}
              className="w-full md:w-auto px-8 py-3.5 bg-[#6B3037] text-white text-sm font-semibold rounded-xl hover:bg-[#52242A] transition-colors whitespace-nowrap"
            >
              Review My Shortlist →
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
