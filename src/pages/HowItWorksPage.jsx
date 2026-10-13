/**
 * HowItWorksPage.jsx — /how-it-works
 * Premium How It Works explainer page for Plan My Moments
 *
 * SPECIFICATION:
 * Headline:
 * “From an idea to a moment worth remembering.”
 *
 * Show the journey:
 * 01 Choose Your Moment (Wedding, Birthday, Baptism, Engagement, Anniversary or another celebration)
 * 02 Build Your Crew (Tell us what services you need)
 * 03 Discover (Find relevant vendors)
 * 04 Shortlist (Save multiple options)
 * 05 Discuss (Talk privately with your partner)
 * 06 Finalise (Choose the vendors you want)
 * 07 Check Availability (See whether they are available)
 * 08 Book (Request quotes, hold dates and book)
 *
 * PRIVATE PLANNING: Explain the Messenger-style discussion
 * COMMUNITY REQUESTS: Explain “If you can’t find what you need, ask the community.”
 * FINAL CTA: “Start Planning”
 */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePlanning } from '../context/PlanningContext.jsx';

export default function HowItWorksPage() {
  const { openDiscussion } = usePlanning();
  const [activeStep, setActiveStep] = useState('01');

  // The 8 Journey Steps
  const journeySteps = [
    {
      number: '01',
      title: 'Choose Your Moment',
      description: 'Choose Wedding, Birthday, Baptism, Engagement, Anniversary or another celebration.',
      details: 'Start by choosing the occasion you are celebrating. Whether it’s an intimate backwaters wedding, an energetic 1st birthday, a traditional baptism, an engagement soiree, or a milestone anniversary, your journey begins with tailored planning templates designed specifically for that celebration.',
      icon: '✨',
      badge: 'Step 1 · The Occasion',
      examples: ['Wedding', 'Birthday', 'Baptism', 'Engagement', 'Anniversary', 'Custom Event'],
      actionText: 'Choose Event Type',
      actionLink: '/start-planning',
    },
    {
      number: '02',
      title: 'Build Your Crew',
      description: 'Tell us what services you need.',
      details: 'Select the exact creative categories your event calls for. Choose from Wedding Photography, Venues, Artisanal Catering & Sadhya, Floral & Spatial Decor, Bridal Hair & Makeup, Live Entertainment, or Wedding Rentals. No rigid bundles or unwanted extras — you assemble only the crew you need.',
      icon: '👥',
      badge: 'Step 2 · Service Scope',
      examples: ['Photography', 'Venue', 'Catering', 'Decoration', 'Makeup', 'Music'],
      actionText: 'Build Your Crew',
      actionLink: '/crew-builder',
    },
    {
      number: '03',
      title: 'Discover',
      description: 'Find relevant vendors.',
      details: 'Explore hundreds of curated regional vendors across Kochi, Kumarakom, Ernakulam, and Goa. Filter by location, budget tier, aesthetic style, verified couple ratings, and real portfolio galleries. Every vendor on Plan My Moments is vetted for reliability and craft.',
      icon: '🔍',
      badge: 'Step 3 · Curated Search',
      examples: ['Verified Portfolios', 'Real Past Weddings', 'Transparent Pricing', 'Verified Reviews'],
      actionText: 'Explore Marketplace',
      actionLink: '/explore',
    },
    {
      number: '04',
      title: 'Shortlist',
      description: 'Save multiple options.',
      details: 'Add standout photographers, venues, and caterers to your Shortlist with one click. Shortlist means “options we are considering” — giving you and your partner a clutter-free space to compare packages, prices, and deliverables before making any final commitments.',
      icon: '📋',
      badge: 'Step 4 · Evaluation',
      examples: ['Side-by-side comparison', 'Price breakdown', 'Package inclusions', 'Quick discuss'],
      actionText: 'View My Shortlist',
      actionLink: '/shortlist',
    },
    {
      number: '05',
      title: 'Discuss',
      description: 'Talk privately with your partner.',
      details: 'Planning is best done together. Use our built-in floating Messenger discussion to exchange thoughts in real time. Attach vendors, venues, packages, or inspiration photos directly into chat messages, and view full vendor portfolios without ever leaving the conversation.',
      icon: '💬',
      badge: 'Step 5 · Couple Alignment',
      examples: ['Private couple chat', 'Inline card attachments', 'In-discussion preview', 'Partner connected'],
      actionText: 'Try Discussion',
      isDiscussionAction: true,
    },
    {
      number: '06',
      title: 'Finalise',
      description: 'Choose the vendors you want.',
      details: 'When you are both aligned, move your favorite vendors into your Finalised Crew. Track your confirmed team across every service category with clear visual decision status badges: Waiting for Approval, Approved, or Rejected.',
      icon: '🎯',
      badge: 'Step 6 · Crew Confirmation',
      examples: ['Our Finalised Crew', 'Shared decision badges', 'Crew progress tracker', 'Move to booking'],
      actionText: 'View Finalised Crew',
      actionLink: '/finalised',
    },
    {
      number: '07',
      title: 'Check Availability',
      description: 'See whether they are available.',
      details: 'Check real-time calendar availability for your chosen date range across all finalised vendors. See peak season availability for winter and spring weekends upfront — avoiding endless back-and-forth phone calls or sudden booking clashes.',
      icon: '📅',
      badge: 'Step 7 · Live Schedule',
      examples: ['Live season calendar', 'Response time < 2h', 'Hold dates', 'Alternative dates'],
      actionText: 'Check Dates',
      actionLink: '/explore?q=Accepting+2026',
    },
    {
      number: '08',
      title: 'Book',
      description: 'Request quotes, hold dates and book.',
      details: 'Request transparent itemized quotes, review exact payment schedules (e.g. 20% advance booking deposit), secure your event dates, and sign off on your dream crew. Everything is tracked in one coordinated celebration dashboard.',
      icon: '🔒',
      badge: 'Step 8 · Confirmation',
      examples: ['Itemized quotes', '20% advance hold', 'Direct vendor contracts', 'Milestone reminders'],
      actionText: 'Start Planning',
      actionLink: '/start-planning',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] pt-24 pb-20 font-sans selection:bg-[#E8D4CF] selection:text-[#6B3037]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── BREADCRUMB ──────────────────────────────────────────────────── */}
        <nav className="mb-6 text-xs text-[#78716C] flex items-center gap-2" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-[#6B3037] transition-colors">Home</Link>
          <span className="text-[#D4C5B9]">/</span>
          <span className="text-[#1C1917] font-medium">How It Works</span>
        </nav>

        {/* ── HERO & HEADLINE ─────────────────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-[#F5ECE8] text-[#8E4A49] mb-4 shadow-2xs">
            <span>✨</span>
            <span>The Plan My Moments Journey</span>
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#1C1917] tracking-tight leading-tight mb-6">
            From an idea to a moment worth remembering.
          </h1>
          <p className="text-base sm:text-lg text-[#57534E] leading-relaxed max-w-2xl mx-auto">
            Great celebrations don't happen by chance — they happen when two people have a clear path to discover, discuss, and build together without stress.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/start-planning"
              className="px-8 py-3.5 bg-[#1C1917] hover:bg-[#6B3037] text-white font-semibold text-sm rounded-full shadow-lg transition-all hover:scale-102 active:scale-98"
            >
              Start Planning
            </Link>
            <a
              href="#journey"
              className="px-6 py-3.5 bg-white hover:bg-[#FAF8F5] text-[#1C1917] font-semibold text-sm rounded-full border border-[#EAE3DA] transition-colors"
            >
              Explore the 8 Steps ↓
            </a>
          </div>
        </div>

        {/* ── 8-STEP JOURNEY SECTION ──────────────────────────────────────── */}
        <section id="journey" className="mb-24 scroll-mt-24">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#8E4A49] block mb-2">
              Step-by-step roadmap
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1917] font-bold">
              The 8 stages of your celebration journey
            </h2>
            <p className="text-xs sm:text-sm text-[#78716C] mt-2">
              From choosing your occasion to the moment you confirm your dream crew.
            </p>
          </div>

          {/* Stepped Interactive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {journeySteps.map((step) => {
              const isSelected = activeStep === step.number;
              return (
                <div
                  key={step.number}
                  onClick={() => setActiveStep(step.number)}
                  className={`bg-white rounded-3xl p-7 sm:p-8 border transition-all duration-300 relative flex flex-col justify-between cursor-pointer group ${
                    isSelected
                      ? 'border-[#6B3037] ring-2 ring-[#6B3037]/15 shadow-xl -translate-y-1'
                      : 'border-[#EAE3DA] hover:border-[#6B3037]/40 hover:shadow-md'
                  }`}
                >
                  <div>
                    {/* Top Row: Number, Icon, Badge */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-3">
                        <span className="w-12 h-12 rounded-2xl bg-[#1C1917] group-hover:bg-[#6B3037] text-white font-serif text-xl font-bold flex items-center justify-center transition-colors shadow-sm">
                          {step.number}
                        </span>
                        <span className="text-2xl">{step.icon}</span>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-[#FAF8F5] text-[#8E4A49] border border-[#EAE3DA] px-3 py-1 rounded-full">
                        {step.badge}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-2xl font-bold text-[#1C1917] mb-2 leading-tight group-hover:text-[#6B3037] transition-colors">
                      {step.title}
                    </h3>

                    {/* Headline sentence per spec */}
                    <p className="text-sm font-semibold text-[#8E4A49] mb-3 leading-snug">
                      {step.description}
                    </p>

                    {/* Deeper explanation */}
                    <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed mb-5">
                      {step.details}
                    </p>

                    {/* Example chips */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {step.examples.map((ex, i) => (
                        <span
                          key={i}
                          className="text-[11px] bg-[#FAF8F5] text-[#1C1917] px-2.5 py-1 rounded-lg border border-[#EAE3DA] font-medium"
                        >
                          {ex}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-4 border-t border-[#F4EFEA] flex items-center justify-between">
                    <span className="text-xs text-[#78716C]">
                      Stage {parseInt(step.number, 10)} of 8
                    </span>
                    {step.isDiscussionAction ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openDiscussion();
                        }}
                        className="text-xs font-bold text-[#6B3037] hover:underline flex items-center gap-1"
                      >
                        <span>💬</span>
                        <span>{step.actionText} →</span>
                      </button>
                    ) : (
                      <Link
                        to={step.actionLink}
                        className="text-xs font-bold text-[#6B3037] hover:underline flex items-center gap-1"
                      >
                        <span>{step.actionText} →</span>
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── PRIVATE PLANNING SECTION ────────────────────────────────────── */}
        <section className="mb-24 bg-white rounded-3xl p-8 sm:p-12 border border-[#EAE3DA] shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FAF6F0] rounded-full blur-3xl opacity-60 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#F5ECE8] text-[#8E4A49] mb-4">
                <span>💬</span>
                <span>Private Couple Planning</span>
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1917] font-bold tracking-tight mb-4 leading-tight">
                Messenger-style private discussions, built right into the platform.
              </h2>
              <p className="text-sm sm:text-base text-[#57534E] leading-relaxed mb-6">
                Planning a major event shouldn’t involve scattered WhatsApp screenshots, lost links, and disjointed conversations. Plan My Moments includes an interactive Facebook Messenger-style couple chat window anchored in the bottom-right corner of your screen.
              </p>

              {/* 4 Feature Points */}
              <div className="space-y-4 mb-8">
                {[
                  {
                    title: 'Inline Attachments Inside Messages',
                    desc: 'When you share a vendor, venue, package, or photo, the card belongs directly to that message bubble with thumbnail, price, and rating.',
                  },
                  {
                    title: 'In-Discussion Scrollable Vendor Preview',
                    desc: 'Click "View" on any attached vendor to inspect their Hero, About, Services, Portfolio, Packages, Reviews, and Availability without ever leaving the conversation.',
                  },
                  {
                    title: 'Connected Partner Sync',
                    desc: 'Connect with your partner via username search (@alex123), private invite link, or QR code for end-to-end synchronized planning.',
                  },
                  {
                    title: 'Zero Public Exposure',
                    desc: 'Your discussions, shared notes, and vendor votes are 100% private to you and your connected partner. Nobody else can see them.',
                  },
                ].map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#6B3037] text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      ✓
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#1C1917]">{feat.title}</h4>
                      <p className="text-xs text-[#78716C] mt-0.5 leading-relaxed">{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => openDiscussion()}
                  className="px-6 py-3 bg-[#1C1917] hover:bg-[#6B3037] text-white font-semibold text-xs sm:text-sm rounded-2xl shadow-md transition-all flex items-center gap-2 active:scale-95"
                >
                  <span>💬</span>
                  <span>Try Couple Messenger</span>
                </button>
                <Link
                  to="/connect-partner"
                  className="px-5 py-3 bg-[#FAF8F5] hover:bg-[#F4EFEA] text-[#1C1917] font-semibold text-xs sm:text-sm rounded-2xl border border-[#EAE3DA] transition-colors"
                >
                  Connect Your Partner →
                </Link>
              </div>
            </div>

            {/* Right Visual Mockup: The Floating Messenger Preview */}
            <div className="lg:col-span-5">
              <div className="bg-[#FAF8F5] rounded-3xl p-5 border border-[#EAE3DA] shadow-xl max-w-sm mx-auto">
                {/* Mock Header */}
                <div className="bg-[#1C1917] text-white p-3 rounded-2xl flex items-center justify-between mb-3 shadow-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#8C7E72] flex items-center justify-center text-xs font-bold">
                      R
                    </div>
                    <div>
                      <p className="text-xs font-bold leading-none">Our Planning</p>
                      <p className="text-[10px] text-emerald-400 mt-0.5">Partner connected · Private</p>
                    </div>
                  </div>
                  <div className="flex gap-1 text-[#A39081]">
                    <span className="w-3 h-3 rounded-full bg-white/20 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-white/20 inline-block" />
                  </div>
                </div>

                {/* Privacy Badge */}
                <div className="bg-[#FAF6F0] p-2 rounded-xl text-[10px] text-[#78716C] mb-3 text-center border border-[#EAE3DA]">
                  🔒 Only you and your connected partner can see this.
                </div>

                {/* Mock Chat Stream */}
                <div className="space-y-2.5">
                  <div className="flex flex-col items-start max-w-[85%]">
                    <div className="bg-white p-2.5 rounded-2xl rounded-bl-xs text-xs text-[#1C1917] border border-[#EAE3DA] shadow-2xs">
                      Hey! Have you seen Stories by Amal? The candid photography style is stunning.
                    </div>
                  </div>

                  <div className="flex flex-col items-end max-w-[85%] ml-auto">
                    <div className="bg-[#6B3037] text-white p-2.5 rounded-2xl rounded-br-xs text-xs shadow-2xs">
                      I love it! The natural light shots are breathtaking.
                      <div className="mt-2 bg-white text-[#1C1917] p-2 rounded-xl border border-[#EAE3DA] flex items-center gap-2">
                        <img
                          src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=100&q=80"
                          alt="Amal"
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div className="min-w-0 flex-1 text-left">
                          <p className="text-[11px] font-bold truncate">Stories by Amal</p>
                          <p className="text-[9px] text-[#78716C]">Photography · Kochi · ★ 4.9</p>
                        </div>
                        <span className="text-[10px] bg-[#1C1917] text-white px-2 py-0.5 rounded-md font-semibold">
                          View
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mock Composer */}
                <div className="mt-4 pt-3 border-t border-[#EAE3DA] flex items-center gap-2">
                  <span className="text-sm">📎</span>
                  <div className="flex-1 bg-white px-3 py-1.5 rounded-xl border border-[#EAE3DA] text-[11px] text-[#78716C]">
                    Message your partner…
                  </div>
                  <div className="w-7 h-7 rounded-xl bg-[#6B3037] text-white flex items-center justify-center text-xs">
                    ➤
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── COMMUNITY REQUESTS SECTION ──────────────────────────────────── */}
        <section className="mb-24 bg-[#1C1917] text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="absolute -bottom-10 -right-10 w-80 h-80 bg-[#6B3037] rounded-full blur-3xl opacity-40 pointer-events-none" />

          <div className="max-w-3xl relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-amber-300 mb-4 backdrop-blur-xs">
              <span>📢</span>
              <span>Community Marketplace</span>
            </span>

            {/* Exact Client Specification Sentence */}
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight mb-4 leading-tight">
              “If you can’t find what you need, ask the community.”
            </h2>

            <p className="text-sm sm:text-base text-stone-300 leading-relaxed mb-8">
              Every celebration has unique, niche requirements — a traditional 16-dish Travancore Sadhya chef, an acoustic sitar & cello instrumental duo, vintage car transport, or sustainable foam-free floral installations.
            </p>

            {/* How Community Requests Work: 3 Steps */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xs">
                <span className="text-xl mb-1.5 block">✍️</span>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">1. Post Requirement</h4>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Describe what you need, your event date, location, and budget range.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xs">
                <span className="text-xl mb-1.5 block">📬</span>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">2. Receive Proposals</h4>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Verified regional specialists reach out with itemized custom proposals.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xs">
                <span className="text-xl mb-1.5 block">🤝</span>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">3. Discuss & Hire</h4>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Attach proposals to your couple discussion and finalise with confidence.
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/post-request"
                className="px-7 py-3.5 bg-white hover:bg-stone-100 text-[#1C1917] font-semibold text-xs sm:text-sm rounded-full transition-all shadow-md active:scale-95"
              >
                Post a Custom Request
              </Link>
              <Link
                to="/explore?q=Request"
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm rounded-full transition-colors"
              >
                Browse Community Requests →
              </Link>
            </div>
          </div>
        </section>

        {/* ── FINAL CTA SECTION ───────────────────────────────────────────── */}
        <section className="bg-gradient-to-br from-[#6B3037] to-[#451C22] rounded-3xl p-10 sm:p-16 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />

          <div className="max-w-2xl mx-auto relative z-10">
            <span className="text-3xl mb-3 inline-block">💍</span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight mb-4">
              Ready to make your moment worth remembering?
            </h2>
            <p className="text-sm sm:text-base text-stone-200 mb-8 leading-relaxed">
              Start with your occasion, build your dream crew, and make decisions together in one beautiful private workspace.
            </p>

            {/* Exact Client Specification Button: “Start Planning” */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/start-planning"
                className="w-full sm:w-auto px-9 py-4 bg-white text-[#6B3037] font-bold text-base rounded-full shadow-xl hover:bg-[#FAF8F5] transition-all hover:scale-105 active:scale-95"
              >
                Start Planning
              </Link>
              <Link
                to="/explore"
                className="w-full sm:w-auto px-7 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm rounded-full border border-white/20 transition-all"
              >
                Explore All Vendors
              </Link>
            </div>

            <p className="text-[11px] text-stone-300 mt-6">
              Free to explore · No credit card required · 100% private couple collaboration
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
