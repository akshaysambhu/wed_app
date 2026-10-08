/**
 * Navbar.jsx — Global navigation
 * Links: Vendors, Stories, Shortlist, Finalised, Discussion, How It Works
 * Right side: Search, Connect Partner, Start Planning
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { usePlanning } from '../../context/PlanningContext.jsx';

export default function Navbar() {
  const { shortlistItems, finalisedItems, discussionOpen, openDiscussion, unreadCount } = usePlanning();

  return (
    <nav className="fixed w-full z-50 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#EAE3DA] transition-all duration-300">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="font-serif text-2xl font-semibold tracking-tight text-[#1C1917] hover:opacity-80 transition-opacity">
              PLAN MY MOMENTS
            </Link>
          </div>

          {/* Center Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link to="/vendors" className="text-sm font-medium text-[#44403C] hover:text-[#6B3037] transition-colors">
              Vendors
            </Link>
            <Link to="/stories" className="text-sm font-medium text-[#44403C] hover:text-[#6B3037] transition-colors">
              Stories
            </Link>
            
            <Link to="/shortlist" className="relative text-sm font-medium text-[#44403C] hover:text-[#6B3037] transition-colors flex items-center gap-1.5">
              Shortlist
              {shortlistItems.length > 0 && (
                <span className="bg-[#8E4A49] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {shortlistItems.length}
                </span>
              )}
            </Link>
            
            <Link to="/finalised" className="relative text-sm font-medium text-[#44403C] hover:text-[#6B3037] transition-colors flex items-center gap-1.5">
              Finalised
              {finalisedItems.length > 0 && (
                <span className="bg-[#1C1917] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {finalisedItems.length}
                </span>
              )}
            </Link>

            <Link to="/discussion" className="text-sm font-medium text-[#44403C] hover:text-[#6B3037] transition-colors">
              Discussion
            </Link>

            <Link to="/how-it-works" className="text-sm font-medium text-[#44403C] hover:text-[#6B3037] transition-colors">
              How It Works
            </Link>
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center space-x-5">
            <button className="text-[#44403C] hover:text-[#6B3037] transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            
            <button 
              onClick={() => openDiscussion()}
              className="text-sm font-medium text-[#1C1917] flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-6 h-6 rounded-full bg-[#EAE3DA] flex items-center justify-center text-[10px]">
                👤
              </div>
              Connect Partner
              {unreadCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-[#6B3037]" />
              )}
            </button>

            <Link 
              to="/crew-builder" 
              className="bg-[#1C1917] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[#34302C] transition-colors shadow-sm"
            >
              Start Planning
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
