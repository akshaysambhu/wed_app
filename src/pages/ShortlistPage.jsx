/**
 * ShortlistPage.jsx — /shortlist
 * Shows all shortlisted vendors grouped by service category.
 * "Shortlist" = options we are considering.
 */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePlanning } from '../context/PlanningContext.jsx';
import { VENDORS } from '../data/mockData.js';
import StatusBadge from '../components/ui/StatusBadge.jsx';

// ─── Helpers ──────────────────────────────────────────────────────────────────
function groupByCategory(items) {
  return items.reduce((acc, item) => {
    const cat = item.category || 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});
}

// Decision statuses for mock display
const DECISION_STATUSES = {
  waiting: { label: 'Waiting for approval', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  approved: { label: 'Approved', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  rejected: { label: 'Rejected', color: 'bg-red-50 text-red-700 border-red-200' },
};

// ─── Vendor card inside the shortlist ────────────────────────────────────────
function ShortlistVendorCard({ vendor }) {
  const { finaliseVendor, isFinalised, toggleShortlist, openDiscussion } = usePlanning();
  const finalised = isFinalised(vendor.id);

  // Mock decision status — in real app this would come from state
  const decisionStatus = vendor.decisionStatus || null;

  const profileLink = vendor.slug
    ? `/vendor/${vendor.slug}`
    : vendor.id === 'vendor-1'
    ? '/vendor/stories-by-amal'
    : `/vendor/${vendor.id}`;

  const handleDiscuss = () => {
    openDiscussion({
      type: 'vendor',
      item: {
        id: vendor.id,
        name: vendor.name,
        category: vendor.category,
        location: vendor.location,
        image: vendor.image,
        rating: vendor.rating,
        priceFormatted: vendor.priceFormatted,
        slug: vendor.slug,
      },
    });
  };

  const handleRemove = () => {
    toggleShortlist(vendor); // toggleShortlist removes if already shortlisted
  };

  return (
    <div className="bg-white border border-[#EAE3DA] rounded-2xl overflow-hidden hover:shadow-md transition-all duration-200 group">
      <div className="flex gap-4 p-4">
        {/* Image */}
        <div className="w-24 h-24 rounded-xl overflow-hidden bg-[#F4EFEA] flex-shrink-0">
          <img
            src={vendor.image}
            alt={vendor.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[11px] text-[#8E4A49] font-semibold uppercase tracking-wider">{vendor.category}</p>
              <h3 className="font-serif text-lg text-[#1C1917] mt-0.5 truncate">{vendor.name}</h3>
              <p className="text-xs text-[#78716C]">📍 {vendor.location}</p>
            </div>
            <div className="flex flex-col items-end gap-1.5 shrink-0">
              {finalised && <StatusBadge status="finalised" />}
              {decisionStatus && DECISION_STATUSES[decisionStatus] && (
                <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${DECISION_STATUSES[decisionStatus].color}`}>
                  {DECISION_STATUSES[decisionStatus].label}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 mt-2 text-xs">
            <span className="flex items-center gap-1">
              <span className="text-[#6B3037]">★</span>
              <span className="font-medium text-[#1C1917]">{vendor.rating}</span>
              <span className="text-[#A39081]">({vendor.reviewsCount})</span>
            </span>
            <span className="text-[#D4C5B9]">·</span>
            <span className="font-semibold text-[#1C1917]">{vendor.priceFormatted}</span>
          </div>
        </div>
      </div>

      {/* Action row */}
      <div className="border-t border-[#F4EFEA] px-4 py-3 flex items-center gap-2 flex-wrap">
        <button
          onClick={handleDiscuss}
          className="flex items-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-xl bg-[#1C1917] text-white hover:bg-[#34302C] transition-colors"
        >
          💬 Discuss
        </button>

        <button
          onClick={handleRemove}
          className="flex items-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-xl border border-[#EAE3DA] text-[#78716C] hover:border-red-300 hover:text-red-600 hover:bg-red-50 transition-colors"
        >
          ✕ Remove
        </button>

        {!finalised ? (
          <button
            onClick={() => finaliseVendor(vendor)}
            className="flex items-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-xl bg-[#6B3037] text-white hover:bg-[#52242A] transition-colors"
          >
            ✓ Move to Finalised
          </button>
        ) : (
          <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-700">
            ✓ Added to Crew
          </span>
        )}

        <Link to={profileLink} className="text-xs text-[#6B3037] font-medium hover:underline ml-auto">
          View Profile →
        </Link>
      </div>
    </div>
  );
}

// ─── "Looking for something else?" inline widget ──────────────────────────────
function LookingForSomethingElse() {
  const { toggleShortlist, isShortlisted } = usePlanning();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(null); // null | 'search' | 'post'
  const [query, setQuery] = useState('');
  const [postForm, setPostForm] = useState({
    what: '',
    eventType: '',
    location: '',
    date: '',
    budget: '',
    description: '',
    contactPreference: 'phone',
  });
  const [postSubmitted, setPostSubmitted] = useState(false);

  const examples = ['Chenda Team', 'Live Violinist', 'Wedding Car Decoration', 'Traditional Photographer', 'Drone Show'];

  // Simple mock search — filters from VENDORS by query
  const searchResults = query.trim().length > 1
    ? VENDORS.filter(v =>
        v.name.toLowerCase().includes(query.toLowerCase()) ||
        v.category.toLowerCase().includes(query.toLowerCase()) ||
        v.location.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handlePostSubmit = (e) => {
    e.preventDefault();
    setPostSubmitted(true);
  };

  return (
    <div className="bg-[#FDFBF7] border border-[#EAE3DA] rounded-3xl p-8">
      {/* Header row */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h3 className="font-serif text-2xl text-[#1C1917] mb-1">Looking for something else?</h3>
          <p className="text-sm text-[#78716C]">
            Can't find a service you need? Search for it or ask our community.
          </p>
        </div>
        {!open && (
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 px-6 py-3.5 bg-[#1C1917] text-white text-sm font-semibold rounded-xl hover:bg-[#34302C] transition-colors whitespace-nowrap"
          >
            ＋ Look for something else
          </button>
        )}
      </div>

      {/* Expanded area */}
      {open && (
        <div className="mt-8 border-t border-[#EAE3DA] pt-8">

          {/* Step 1: choose mode */}
          {mode === null && (
            <div>
              <p className="font-semibold text-[#1C1917] mb-2">What are you looking for?</p>
              <input
                autoFocus
                type="text"
                placeholder="e.g. Chenda Team, Live Violinist, Drone Show..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="w-full bg-white border border-[#EAE3DA] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#6B3037] text-[#1C1917] mb-4"
              />

              {/* Example tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {examples.map(ex => (
                  <button
                    key={ex}
                    onClick={() => setQuery(ex)}
                    className="text-xs text-[#6B5E53] bg-[#F4EFEA] border border-[#EAE3DA] px-3 py-1.5 rounded-full hover:border-[#6B3037] transition-colors"
                  >
                    {ex}
                  </button>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setMode('search')}
                  className="flex-1 py-3 bg-white border-2 border-[#1C1917] text-[#1C1917] text-sm font-semibold rounded-xl hover:bg-[#F4EFEA] transition-colors"
                >
                  🔍 Search Marketplace
                </button>
                <button
                  onClick={() => setMode('post')}
                  className="flex-1 py-3 bg-[#6B3037] text-white text-sm font-semibold rounded-xl hover:bg-[#52242A] transition-colors"
                >
                  📢 Post a Request
                </button>
                <button
                  onClick={() => { setOpen(false); setMode(null); setQuery(''); }}
                  className="py-3 px-4 border border-[#EAE3DA] text-[#78716C] text-sm rounded-xl hover:bg-[#F4EFEA] transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Mode: Search Marketplace */}
          {mode === 'search' && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <button onClick={() => setMode(null)} className="text-xs text-[#78716C] hover:text-[#1C1917]">← Back</button>
                <h4 className="font-semibold text-[#1C1917]">Search Marketplace</h4>
              </div>
              <div className="relative mb-6">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A39081]">🔍</span>
                <input
                  autoFocus
                  type="text"
                  placeholder="Search vendors, services, locations…"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  className="w-full bg-white border border-[#EAE3DA] rounded-full pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-[#6B3037]"
                />
              </div>

              {query.trim().length > 1 && (
                <>
                  {searchResults.length > 0 ? (
                    <div className="space-y-3">
                      <p className="text-xs font-semibold text-[#78716C] uppercase tracking-wider">{searchResults.length} vendors found</p>
                      {searchResults.map(v => {
                        const alreadyShortlisted = isShortlisted(v.id);
                        return (
                          <div key={v.id} className="flex items-center gap-4 bg-white border border-[#EAE3DA] rounded-xl p-3 hover:shadow-sm transition-shadow">
                            <img src={v.image} alt={v.name} className="w-14 h-14 rounded-lg object-cover flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-[11px] text-[#8E4A49] font-semibold uppercase tracking-wider">{v.category}</p>
                              <p className="font-semibold text-sm text-[#1C1917] truncate">{v.name}</p>
                              <p className="text-xs text-[#78716C]">📍 {v.location} · ★ {v.rating}</p>
                            </div>
                            <button
                              onClick={() => toggleShortlist(v)}
                              className={`flex-shrink-0 px-4 py-2 text-xs font-semibold rounded-xl border transition-colors ${
                                alreadyShortlisted
                                  ? 'bg-[#6B3037] text-white border-[#6B3037]'
                                  : 'bg-white border-[#EAE3DA] text-[#1C1917] hover:border-[#6B3037] hover:text-[#6B3037]'
                              }`}
                            >
                              {alreadyShortlisted ? '✓ Shortlisted' : '+ Add to Shortlist'}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8 bg-white border border-[#EAE3DA] rounded-2xl">
                      <p className="text-[#78716C] text-sm mb-4">No vendors found for "<strong>{query}</strong>"</p>
                      <button
                        onClick={() => setMode('post')}
                        className="px-6 py-2.5 bg-[#6B3037] text-white text-xs font-semibold rounded-xl hover:bg-[#52242A] transition-colors"
                      >
                        Post a Custom Request Instead →
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* Mode: Post a Request */}
          {mode === 'post' && !postSubmitted && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <button onClick={() => setMode(null)} className="text-xs text-[#78716C] hover:text-[#1C1917]">← Back</button>
                <h4 className="font-semibold text-[#1C1917]">Post a Custom Request</h4>
              </div>

              <form onSubmit={handlePostSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-[#1C1917] mb-2">What do you need?</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. 5-piece Chenda team, Live violinist, Drone show…"
                    value={postForm.what}
                    onChange={e => setPostForm({...postForm, what: e.target.value})}
                    className="w-full bg-white border border-[#EAE3DA] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#6B3037]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-[#1C1917] mb-2">Event Type</label>
                    <select
                      required
                      value={postForm.eventType}
                      onChange={e => setPostForm({...postForm, eventType: e.target.value})}
                      className="w-full bg-white border border-[#EAE3DA] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#6B3037] text-[#1C1917]"
                    >
                      <option value="">Select event type…</option>
                      <option>Wedding</option>
                      <option>Engagement</option>
                      <option>Birthday</option>
                      <option>Anniversary</option>
                      <option>Baptism</option>
                      <option>Baby Shower</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#1C1917] mb-2">Location</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Kochi, Kerala"
                      value={postForm.location}
                      onChange={e => setPostForm({...postForm, location: e.target.value})}
                      className="w-full bg-white border border-[#EAE3DA] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#6B3037]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#1C1917] mb-2">Date</label>
                    <input
                      required
                      type="date"
                      value={postForm.date}
                      onChange={e => setPostForm({...postForm, date: e.target.value})}
                      className="w-full bg-white border border-[#EAE3DA] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#6B3037]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#1C1917] mb-2">Budget (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. ₹20,000 – ₹50,000"
                      value={postForm.budget}
                      onChange={e => setPostForm({...postForm, budget: e.target.value})}
                      className="w-full bg-white border border-[#EAE3DA] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#6B3037]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#1C1917] mb-2">Description</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell vendors exactly what you need — duration, style, venue, guest count..."
                    value={postForm.description}
                    onChange={e => setPostForm({...postForm, description: e.target.value})}
                    className="w-full bg-white border border-[#EAE3DA] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#6B3037] resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#1C1917] mb-2">Optional Image</label>
                  <div className="w-full border-2 border-dashed border-[#EAE3DA] rounded-xl px-4 py-6 text-center text-sm text-[#A39081] hover:border-[#D4C5B9] cursor-pointer">
                    📎 Upload a reference image (optional)
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#1C1917] mb-2">Contact Preference</label>
                  <div className="flex gap-3">
                    {['phone', 'email', 'in-app'].map(opt => (
                      <label key={opt} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="contactPreference"
                          value={opt}
                          checked={postForm.contactPreference === opt}
                          onChange={() => setPostForm({...postForm, contactPreference: opt})}
                          className="accent-[#6B3037]"
                        />
                        <span className="text-sm text-[#44403C] capitalize">{opt === 'in-app' ? 'In-App Message' : opt.charAt(0).toUpperCase() + opt.slice(1)}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 md:flex-none px-8 py-3.5 bg-[#6B3037] text-white text-sm font-semibold rounded-xl hover:bg-[#52242A] transition-colors"
                  >
                    Post Request
                  </button>
                  <button
                    type="button"
                    onClick={() => { setMode(null); setPostSubmitted(false); }}
                    className="px-4 py-3.5 border border-[#EAE3DA] text-[#78716C] text-sm rounded-xl hover:bg-[#F4EFEA]"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Post success state */}
          {mode === 'post' && postSubmitted && (
            <div className="text-center py-10">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">✓</div>
              <h4 className="font-serif text-2xl text-[#1C1917] mb-2">Request Posted!</h4>
              <p className="text-[#78716C] text-sm max-w-md mx-auto mb-6">
                We've notified verified vendors in your area. You'll receive proposals based on your contact preference.
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => { setOpen(false); setMode(null); setQuery(''); setPostSubmitted(false); setPostForm({ what:'', eventType:'', location:'', date:'', budget:'', description:'', contactPreference:'phone' }); }}
                  className="px-6 py-2.5 bg-[#1C1917] text-white text-sm font-semibold rounded-xl hover:bg-[#34302C] transition-colors"
                >
                  Done
                </button>
                <button
                  onClick={() => { setPostSubmitted(false); setPostForm({ what:'', eventType:'', location:'', date:'', budget:'', description:'', contactPreference:'phone' }); }}
                  className="px-6 py-2.5 border border-[#EAE3DA] text-[#1C1917] text-sm font-semibold rounded-xl hover:bg-[#F4EFEA] transition-colors"
                >
                  Post Another
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ShortlistPage() {
  const { shortlistItems } = usePlanning();
  const [activeCategory, setActiveCategory] = useState('All');

  const grouped = groupByCategory(shortlistItems);
  const categories = ['All', ...Object.keys(grouped)];
  const visibleItems = activeCategory === 'All' ? shortlistItems : (grouped[activeCategory] || []);
  const isEmpty = shortlistItems.length === 0;

  return (
    <div className="min-h-screen bg-[#FAF8F5] pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-xs text-[#78716C] mb-4">
            <Link to="/" className="hover:text-[#6B3037] transition-colors">Home</Link>
            <span className="text-[#D4C5B9]">/</span>
            <span className="text-[#1C1917] font-medium">My Shortlist</span>
          </div>

          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#8E4A49] mb-2">Your Planning</p>
              <h1 className="font-serif text-4xl md:text-5xl text-[#1C1917]">My Shortlist</h1>
              <p className="text-[#78716C] mt-2 text-sm">Everything you're considering for your celebration.</p>

              {/* Prominent count */}
              {shortlistItems.length > 0 && (
                <div className="mt-4 inline-flex items-center gap-2 bg-[#F5ECE8] border border-[#E8D4CF] px-4 py-2 rounded-full">
                  <span className="w-5 h-5 rounded-full bg-[#6B3037] text-white text-[10px] font-bold flex items-center justify-center">{shortlistItems.length}</span>
                  <span className="text-sm font-semibold text-[#6B3037]">
                    {shortlistItems.length} vendor{shortlistItems.length !== 1 ? 's' : ''} shortlisted
                  </span>
                </div>
              )}
            </div>

            {!isEmpty && (
              <Link
                to="/finalised"
                className="flex items-center gap-2 px-5 py-2.5 bg-[#1C1917] text-white text-sm font-medium rounded-xl hover:bg-[#34302C] transition-colors"
              >
                View My Crew →
              </Link>
            )}
          </div>
        </div>

        {/* Empty state */}
        {isEmpty ? (
          <div className="text-center py-20 bg-white border border-[#EAE3DA] rounded-3xl mb-8">
            <div className="text-5xl mb-4">📋</div>
            <h2 className="font-serif text-2xl text-[#1C1917] mb-3">Your shortlist is empty</h2>
            <p className="text-[#78716C] text-sm max-w-sm mx-auto mb-8">
              Browse vendors and click <strong>"+ Shortlist"</strong> on any vendor to add them here.
            </p>
            <Link to="/vendors" className="px-6 py-3 bg-[#6B3037] text-white text-sm font-medium rounded-xl hover:bg-[#52242A] transition-colors">
              Discover Vendors →
            </Link>
          </div>
        ) : (
          <>
            {/* Category tabs */}
            {categories.length > 2 && (
              <div className="flex gap-2 flex-wrap mb-8">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                      activeCategory === cat
                        ? 'bg-[#1C1917] text-white border-[#1C1917]'
                        : 'bg-white text-[#78716C] border-[#D4C5B9] hover:border-[#1C1917]'
                    }`}
                  >
                    {cat}
                    {cat !== 'All' && grouped[cat] && (
                      <span className="ml-1.5 text-[10px] opacity-70">({grouped[cat].length})</span>
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Vendor list — grouped by service */}
            {activeCategory === 'All' ? (
              <div className="space-y-10">
                {Object.entries(grouped).map(([category, vendors]) => (
                  <div key={category}>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h2 className="font-serif text-xl text-[#1C1917]">{category}</h2>
                        <p className="text-xs text-[#A39081] mt-0.5">{vendors.length} shortlisted</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {vendors.map(v => <ShortlistVendorCard key={v.id} vendor={v} />)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-xs text-[#A39081]">{visibleItems.length} shortlisted</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {visibleItems.map(v => <ShortlistVendorCard key={v.id} vendor={v} />)}
                </div>
              </div>
            )}

            {/* Move to crew CTA */}
            <div className="mt-10 bg-[#1C1917] rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-white font-serif text-lg mb-1">Ready to decide?</p>
                <p className="text-[#A39081] text-sm">Finalise vendors to build your official event crew.</p>
              </div>
              <Link
                to="/finalised"
                className="px-6 py-3 bg-[#6B3037] text-white text-sm font-semibold rounded-xl hover:bg-[#52242A] transition-colors whitespace-nowrap"
              >
                View My Crew →
              </Link>
            </div>
          </>
        )}

        {/* Looking for something else — always at bottom */}
        <div className="mt-16">
          <LookingForSomethingElse />
        </div>
      </div>
    </div>
  );
}
