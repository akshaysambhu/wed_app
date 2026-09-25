import React from 'react';
import { usePlanning } from '../context/PlanningContext.jsx';

export default function Footer() {
  const { openModal } = usePlanning();

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1C1917] text-[#FAF8F5] pt-16 pb-12 border-t border-[#34302C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-[#34302C]">
          {/* Brand & Philosophy Column */}
          <div className="lg:col-span-2">
            <span className="font-serif text-2xl tracking-tight text-white block mb-4">
              Plan My Moments
            </span>
            <p className="text-xs sm:text-sm text-[#A8A29E] leading-relaxed max-w-sm mb-6">
              The modern ecosystem for discerning couples. Discover inspiration, explore real weddings, connect with verified professionals, and plan seamlessly together.
            </p>
            <div className="text-xs text-[#78716C] italic">
              “Planning starts long before the final decision.”
            </div>
          </div>

          {/* Column 1: Discover */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#D4C5B9] font-semibold mb-4">
              Discover
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A8A29E]">
              <li>
                <a href="#more-moments" onClick={(e) => { e.preventDefault(); scrollTo('more-moments'); }} className="hover:text-white transition-colors">
                  Stories & Editorial
                </a>
              </li>
              <li>
                <a href="#real-weddings" onClick={(e) => { e.preventDefault(); scrollTo('real-weddings'); }} className="hover:text-white transition-colors">
                  Real Weddings
                </a>
              </li>
              <li>
                <a href="#inspiration" onClick={(e) => { e.preventDefault(); scrollTo('inspiration'); }} className="hover:text-white transition-colors">
                  Visual Inspiration
                </a>
              </li>
              <li>
                <a href="#vendors" onClick={(e) => { e.preventDefault(); scrollTo('vendors'); }} className="hover:text-white transition-colors">
                  Vendors Directory
                </a>
              </li>
              <li>
                <a href="#venues" onClick={(e) => { e.preventDefault(); scrollTo('venues'); }} className="hover:text-white transition-colors">
                  Wedding Venues
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => { e.preventDefault(); scrollTo('services'); }} className="hover:text-white transition-colors">
                  Curated Services
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Plan */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#D4C5B9] font-semibold mb-4">
              Plan
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A8A29E]">
              <li>
                <button onClick={() => openModal('dashboard')} className="hover:text-white transition-colors text-left">
                  Planning Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => openModal('dashboard')} className="hover:text-white transition-colors text-left">
                  Checklist & Tasks
                </button>
              </li>
              <li>
                <button onClick={() => openModal('notes')} className="hover:text-white transition-colors text-left">
                  Couple Notes
                </button>
              </li>
              <li>
                <button onClick={() => openModal('saved')} className="hover:text-white transition-colors text-left">
                  Saved Favourites
                </button>
              </li>
              <li>
                <button onClick={() => openModal('compare')} className="hover:text-white transition-colors text-left">
                  Side-by-Side Comparison
                </button>
              </li>
              <li>
                <button onClick={() => openModal('dashboard')} className="hover:text-white transition-colors text-left">
                  Decision Log
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: For Vendors & Help */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#D4C5B9] font-semibold mb-4">
              For Vendors
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A8A29E] mb-6">
              <li>
                <a href="#join" onClick={(e) => { e.preventDefault(); alert("Vendor application portal is currently accepting submissions for 2026/2027."); }} className="hover:text-white transition-colors">
                  Join Plan My Moments
                </a>
              </li>
              <li>
                <a href="#login" onClick={(e) => { e.preventDefault(); alert("Vendor portal sign-in."); }} className="hover:text-white transition-colors">
                  Vendor Portal Login
                </a>
              </li>
              <li>
                <a href="#list" onClick={(e) => { e.preventDefault(); alert("Listing criteria: minimum 3 verified client reviews and published real wedding portfolios."); }} className="hover:text-white transition-colors">
                  Listing Criteria
                </a>
              </li>
            </ul>

            <h4 className="text-xs uppercase tracking-widest text-[#D4C5B9] font-semibold mb-3">
              Connect
            </h4>
            <div className="flex items-center space-x-3 text-[#A8A29E]">
              <span className="p-2 rounded-full bg-[#292524] hover:text-white cursor-pointer transition-colors text-xs">IG</span>
              <span className="p-2 rounded-full bg-[#292524] hover:text-white cursor-pointer transition-colors text-xs">PIN</span>
              <span className="p-2 rounded-full bg-[#292524] hover:text-white cursor-pointer transition-colors text-xs">FB</span>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#78716C] gap-4">
          <div>
            © {new Date().getFullYear()} Plan My Moments Inc. All rights reserved.
          </div>
          <div className="flex items-center space-x-6">
            <a href="#privacy" onClick={(e) => { e.preventDefault(); alert("Privacy Policy: Your saved wedding details and partner notes are strictly private."); }} className="hover:text-[#A8A29E] transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" onClick={(e) => { e.preventDefault(); alert("Terms of Service: Curated directory and booking ecosystem."); }} className="hover:text-[#A8A29E] transition-colors">
              Terms of Service
            </a>
            <a href="#accessibility" onClick={(e) => { e.preventDefault(); }} className="hover:text-[#A8A29E] transition-colors">
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
