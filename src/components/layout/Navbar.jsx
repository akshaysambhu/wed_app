import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { usePlanning } from '../../context/PlanningContext.jsx';

export default function Navbar() {
  const {
    savedItems, compareItems, openModal,
    shortlistItems, finalisedItems, openDiscussion,
  } = usePlanning();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [discoverDropdown, setDiscoverDropdown] = useState(false);
  const [vendorsDropdown, setVendorsDropdown] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    if (!isHome) { window.location.href = `/#${id}`; return; }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const CountBadge = ({ count, color = 'burgundy' }) => {
    if (!count) return null;
    const colors = {
      burgundy: 'bg-[#6B3037] text-white',
      dark: 'bg-[#1C1917] text-white',
      amber: 'bg-amber-500 text-white',
    };
    return (
      <span className={`inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold rounded-full ${colors[color]}`}>
        {count > 99 ? '99+' : count}
      </span>
    );
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF8F5]/95 backdrop-blur-md shadow-sm border-b border-[#EAE3DA] py-3'
            : 'bg-gradient-to-b from-[#FAF8F5]/90 to-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">

            {/* ── Logo ───────────────────────────────────── */}
            <Link to="/" className="flex items-center group focus:outline-none flex-shrink-0">
              <span className="font-serif text-2xl tracking-tight text-[#1C1917] group-hover:text-[#6B3037] transition-colors">
                Plan My Moments
              </span>
            </Link>

            {/* ── Desktop Nav ─────────────────────────────── */}
            <nav className="hidden lg:flex items-center gap-6 text-[13.5px] font-medium text-[#44403C]">

              {/* Discover dropdown */}
              <div className="relative" onMouseEnter={() => setDiscoverDropdown(true)} onMouseLeave={() => setDiscoverDropdown(false)}>
                <button className="flex items-center gap-1 hover:text-[#1C1917] transition-colors py-1" onClick={() => scrollTo('inspiration')}>
                  <span>Discover</span>
                  <svg className="w-3 h-3 text-[#A39081]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </button>
                {discoverDropdown && (
                  <div className="absolute top-full left-0 w-52 bg-[#FAF8F5] border border-[#EAE3DA] shadow-xl rounded-xl py-2 mt-1">
                    {[
                      { label: 'Stories & Editorial', id: 'more-moments' },
                      { label: 'Real Weddings', id: 'real-weddings' },
                      { label: 'Visual Inspiration', id: 'inspiration' },
                    ].map(item => (
                      <button key={item.id} onClick={() => { scrollTo(item.id); setDiscoverDropdown(false); }}
                        className="block w-full text-left px-4 py-2 hover:bg-[#F4EFEA] text-[#1C1917] text-sm transition-colors">
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Vendors dropdown */}
              <div className="relative" onMouseEnter={() => setVendorsDropdown(true)} onMouseLeave={() => setVendorsDropdown(false)}>
                <button className="flex items-center gap-1 hover:text-[#1C1917] transition-colors py-1" onClick={() => scrollTo('vendors')}>
                  <span>Vendors</span>
                  <svg className="w-3 h-3 text-[#A39081]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </button>
                {vendorsDropdown && (
                  <div className="absolute top-full left-0 w-52 bg-[#FAF8F5] border border-[#EAE3DA] shadow-xl rounded-xl py-2 mt-1">
                    {['Photography', 'Videography', 'Catering', 'Decoration', 'Makeup', 'Entertainment', 'All Vendors'].map(cat => (
                      <button key={cat} onClick={() => { scrollTo('vendors'); setVendorsDropdown(false); }}
                        className="block w-full text-left px-4 py-1.5 hover:bg-[#F4EFEA] text-[#1C1917] text-sm transition-colors">
                        {cat}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button onClick={() => scrollTo('venues')} className="hover:text-[#1C1917] transition-colors">Venues</button>

              {/* Shortlist with live count */}
              <Link to="/shortlist" className="flex items-center gap-1.5 hover:text-[#1C1917] transition-colors">
                <span>Shortlist</span>
                <CountBadge count={shortlistItems.length} color="burgundy" />
              </Link>

              {/* Finalised with live count */}
              <Link to="/finalised" className="flex items-center gap-1.5 hover:text-[#1C1917] transition-colors">
                <span>My Crew</span>
                <CountBadge count={finalisedItems.length} color="dark" />
              </Link>

              {/* Discussion */}
              <button
                onClick={() => openDiscussion()}
                className="flex items-center gap-1.5 hover:text-[#1C1917] transition-colors"
              >
                <span>Discussion</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </button>
            </nav>

            {/* ── Right Actions ───────────────────────────── */}
            <div className="flex items-center gap-2 sm:gap-3">

              {/* Search */}
              <button onClick={() => openModal('search')} title="Search"
                className="p-2 text-[#44403C] hover:text-[#1C1917] hover:bg-[#F4EFEA] rounded-full transition-colors flex items-center gap-1.5 text-sm">
                <svg className="w-4 h-4 text-[#8C7E72]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="hidden md:inline text-xs text-[#8C7E72] font-normal">Search</span>
              </button>

              {/* Compare pill */}
              {compareItems.length > 0 && (
                <button onClick={() => openModal('compare')}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#6B3037] bg-[#F5ECE8] border border-[#E8D4CF] rounded-full hover:bg-[#EEDCD6] transition-colors">
                  ⊕ Compare ({compareItems.length})
                </button>
              )}

              {/* Shortlist icon — mobile */}
              <Link to="/shortlist" className="relative lg:hidden p-2 rounded-full hover:bg-[#F4EFEA] transition-colors" title="Shortlist">
                <svg className="w-5 h-5 text-[#6B3037]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                {shortlistItems.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#6B3037] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {shortlistItems.length}
                  </span>
                )}
              </Link>

              {/* Saved heart */}
              <button onClick={() => openModal('saved')}
                className="relative p-2 text-[#44403C] hover:text-[#1C1917] hover:bg-[#F4EFEA] rounded-full transition-colors flex items-center gap-1">
                <svg className="w-5 h-5 text-[#8E4A49]" fill={savedItems.length > 0 ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="hidden sm:inline text-xs font-medium text-[#44403C]">Saved</span>
                {savedItems.length > 0 && (
                  <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold text-white bg-[#8E4A49] rounded-full">
                    {savedItems.length}
                  </span>
                )}
              </button>

              {/* Start Planning CTA */}
              <Link to="/start-planning"
                className="hidden sm:block px-4 py-2.5 text-xs font-semibold tracking-wide text-white bg-[#6B3037] hover:bg-[#52242A] rounded-full shadow-sm hover:shadow transition-all">
                Start Planning
              </Link>

              {/* Mobile hamburger */}
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 text-[#1C1917]" aria-label="Menu">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen
                    ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  }
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile Drawer ──────────────────────────────── */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FAF8F5] border-b border-[#EAE3DA] px-6 pt-4 pb-6 space-y-1">
            {[
              { label: 'Discover Inspiration', action: () => scrollTo('inspiration') },
              { label: 'Real Weddings', action: () => scrollTo('real-weddings') },
              { label: 'Vendors', action: () => scrollTo('vendors') },
              { label: 'Venues', action: () => scrollTo('venues') },
            ].map(item => (
              <button key={item.label} onClick={item.action}
                className="block w-full text-left py-3 font-medium text-[#1C1917] border-b border-[#F4EFEA] last:border-0">
                {item.label}
              </button>
            ))}

            {/* Shortlist & Finalised links */}
            <div className="pt-3 space-y-2">
              <Link to="/shortlist" className="flex items-center justify-between py-2.5 text-sm font-semibold text-[#6B3037]">
                <span>My Shortlist</span>
                <CountBadge count={shortlistItems.length} color="burgundy" />
              </Link>
              <Link to="/finalised" className="flex items-center justify-between py-2.5 text-sm font-semibold text-[#1C1917]">
                <span>My Final Crew</span>
                <CountBadge count={finalisedItems.length} color="dark" />
              </Link>
              <button onClick={() => openDiscussion()} className="flex items-center gap-2 py-2.5 text-sm font-medium text-[#44403C] w-full">
                💬 Open Discussion
              </button>
            </div>

            <div className="pt-3 border-t border-[#EAE3DA] flex items-center gap-3">
              <button onClick={() => { setMobileMenuOpen(false); openModal('saved'); }}
                className="flex-1 py-2.5 text-sm text-[#8E4A49] font-medium text-center bg-[#F5ECE8] rounded-xl">
                Saved ({savedItems.length})
              </button>
              <Link to="/start-planning" className="flex-1 py-2.5 text-sm text-white font-semibold text-center bg-[#6B3037] rounded-xl">
                Start Planning
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
