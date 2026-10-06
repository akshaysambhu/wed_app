import React, { useState, useEffect } from 'react';
import { usePlanning } from '../../context/PlanningContext.jsx';

export default function Navbar() {
  const { savedItems, compareItems, openModal } = usePlanning();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [discoverDropdown, setDiscoverDropdown] = useState(false);
  const [vendorsDropdown, setVendorsDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF8F5]/95 backdrop-blur-md shadow-sm border-b border-[#EAE3DA] py-3.5'
            : 'bg-gradient-to-b from-[#FAF8F5]/90 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#"
              className="flex items-center space-x-2 group focus:outline-none"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <span className="font-serif text-2xl sm:text-3xl tracking-tight text-[#1C1917] group-hover:text-[#6B3037] transition-colors">
                Plan My Moments
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-7 text-[14.5px] font-medium text-[#44403C]">
              {/* Discover Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setDiscoverDropdown(true)}
                onMouseLeave={() => setDiscoverDropdown(false)}
              >
                <button
                  className="flex items-center space-x-1 hover:text-[#1C1917] transition-colors py-1 focus:outline-none"
                  onClick={() => scrollTo('inspiration')}
                >
                  <span>Discover</span>
                  <svg className="w-3.5 h-3.5 text-[#8C7E72]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {discoverDropdown && (
                  <div className="absolute top-full left-0 w-52 bg-[#FAF8F5] border border-[#EAE3DA] shadow-xl rounded-xl py-2 mt-1 animate-fadeIn">
                    <a
                      href="#stories"
                      onClick={(e) => { e.preventDefault(); scrollTo('more-moments'); setDiscoverDropdown(false); }}
                      className="block px-4 py-2 hover:bg-[#F4EFEA] text-[#1C1917] transition-colors"
                    >
                      Stories & Editorial
                    </a>
                    <a
                      href="#real-weddings"
                      onClick={(e) => { e.preventDefault(); scrollTo('real-weddings'); setDiscoverDropdown(false); }}
                      className="block px-4 py-2 hover:bg-[#F4EFEA] text-[#1C1917] transition-colors"
                    >
                      Real Weddings
                    </a>
                    <a
                      href="#inspiration"
                      onClick={(e) => { e.preventDefault(); scrollTo('inspiration'); setDiscoverDropdown(false); }}
                      className="block px-4 py-2 hover:bg-[#F4EFEA] text-[#1C1917] transition-colors"
                    >
                      Visual Inspiration
                    </a>
                  </div>
                )}
              </div>

              {/* Vendors Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setVendorsDropdown(true)}
                onMouseLeave={() => setVendorsDropdown(false)}
              >
                <button
                  className="flex items-center space-x-1 hover:text-[#1C1917] transition-colors py-1 focus:outline-none"
                  onClick={() => scrollTo('vendors')}
                >
                  <span>Vendors</span>
                  <svg className="w-3.5 h-3.5 text-[#8C7E72]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {vendorsDropdown && (
                  <div className="absolute top-full left-0 w-56 bg-[#FAF8F5] border border-[#EAE3DA] shadow-xl rounded-xl py-2 mt-1 animate-fadeIn">
                    {['Photography', 'Videography', 'Catering', 'Decoration', 'Makeup', 'Entertainment', 'All Vendors'].map((cat) => (
                      <a
                        key={cat}
                        href="#vendors"
                        onClick={(e) => { e.preventDefault(); scrollTo('vendors'); setVendorsDropdown(false); }}
                        className="block px-4 py-1.5 hover:bg-[#F4EFEA] text-[#1C1917] transition-colors"
                      >
                        {cat}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <a
                href="#venues"
                onClick={(e) => { e.preventDefault(); scrollTo('venues'); }}
                className="hover:text-[#1C1917] transition-colors"
              >
                Venues
              </a>

              <a
                href="#services"
                onClick={(e) => { e.preventDefault(); scrollTo('services'); }}
                className="hover:text-[#1C1917] transition-colors"
              >
                Services
              </a>

              <a
                href="#plan"
                onClick={(e) => { e.preventDefault(); openModal('dashboard'); }}
                className="hover:text-[#1C1917] transition-colors flex items-center space-x-1"
              >
                <span>Plan</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#8E4A49]"></span>
              </a>
            </nav>

            {/* Right Action Icons & CTAs */}
            <div className="flex items-center space-x-3 sm:space-x-5">
              {/* Search Icon */}
              <button
                onClick={() => openModal('search')}
                className="p-2 text-[#44403C] hover:text-[#1C1917] hover:bg-[#F4EFEA] rounded-full transition-colors flex items-center space-x-1.5 text-sm"
                title="Search moments, vendors, venues"
                aria-label="Search"
              >
                <svg className="w-4 h-4 text-[#8C7E72]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="hidden md:inline font-normal text-xs text-[#8C7E72]">Search</span>
              </button>

              {/* Compare Pill (if items exist) */}
              {compareItems.length > 0 && (
                <button
                  onClick={() => openModal('compare')}
                  className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium text-[#6B3037] bg-[#F5ECE8] border border-[#E8D4CF] rounded-full hover:bg-[#EEDCD6] transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span>Compare ({compareItems.length})</span>
                </button>
              )}

              {/* Saved Favourites Icon with live counter */}
              <button
                onClick={() => openModal('saved')}
                className="relative p-2 text-[#44403C] hover:text-[#1C1917] hover:bg-[#F4EFEA] rounded-full transition-colors flex items-center space-x-1"
                aria-label="View Saved Moments"
              >
                <svg className="w-5 h-5 text-[#8E4A49]" fill={savedItems.length > 0 ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="hidden sm:inline text-xs font-medium text-[#44403C]">Saved</span>
                {savedItems.length > 0 && (
                  <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white bg-[#8E4A49] rounded-full">
                    {savedItems.length}
                  </span>
                )}
              </button>

              {/* Sign In */}
              <button
                onClick={() => openModal('notes')}
                className="hidden sm:block text-xs font-medium text-[#44403C] hover:text-[#1C1917] transition-colors"
              >
                Sign In
              </button>

              {/* Primary CTA */}
              <button
                onClick={() => openModal('dashboard')}
                className="px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium tracking-wide text-white bg-[#1C1917] hover:bg-[#34302C] active:scale-95 rounded-full shadow-sm hover:shadow transition-all"
              >
                Start Planning
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-[#1C1917] focus:outline-none"
                aria-label="Toggle Navigation Menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-down Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FAF8F5] border-b border-[#EAE3DA] px-6 pt-4 pb-6 space-y-3 animate-fadeIn">
            <div className="flex flex-col space-y-2 text-base text-[#1C1917]">
              <button onClick={() => scrollTo('inspiration')} className="text-left py-2 font-medium">Discover Inspiration</button>
              <button onClick={() => scrollTo('real-weddings')} className="text-left py-2 font-medium">Real Weddings</button>
              <button onClick={() => scrollTo('vendors')} className="text-left py-2 font-medium">Vendors Directory</button>
              <button onClick={() => scrollTo('venues')} className="text-left py-2 font-medium">Venues</button>
              <button onClick={() => scrollTo('services')} className="text-left py-2 font-medium">Planning Services</button>
              <button onClick={() => { setMobileMenuOpen(false); openModal('dashboard'); }} className="text-left py-2 font-medium flex items-center justify-between">
                <span>Our Wedding Plan</span>
                <span className="text-xs bg-[#8E4A49] text-white px-2 py-0.5 rounded-full">62%</span>
              </button>
              <button onClick={() => { setMobileMenuOpen(false); openModal('notes'); }} className="text-left py-2 font-medium">
                Couple Notes & Decisions
              </button>
            </div>

            <div className="pt-4 border-t border-[#EAE3DA] flex items-center justify-between">
              <button
                onClick={() => { setMobileMenuOpen(false); openModal('saved'); }}
                className="flex items-center space-x-2 text-sm text-[#8E4A49] font-medium"
              >
                <span>Saved Moments ({savedItems.length})</span>
              </button>
              <button
                onClick={() => { setMobileMenuOpen(false); openModal('compare'); }}
                className="text-sm text-[#6B3037] font-medium"
              >
                Compare ({compareItems.length})
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
