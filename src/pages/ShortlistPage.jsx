/**
 * ShortlistPage.jsx — /shortlist
 * Shows all shortlisted vendors grouped by category.
 * Features: category tabs, vendor cards, Finalise button, Discuss button,
 * empty state, and "Looking for something else?" section.
 */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePlanning } from '../context/PlanningContext.jsx';
import ShortlistButton from '../components/ui/ShortlistButton.jsx';
import DiscussButton from '../components/ui/DiscussButton.jsx';
import StatusBadge from '../components/ui/StatusBadge.jsx';

// Group shortlisted items by category
function groupByCategory(items) {
  return items.reduce((acc, item) => {
    const cat = item.category || 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});
}

function ShortlistVendorCard({ vendor }) {
  const { finaliseVendor, isFinalised } = usePlanning();
  const finalised = isFinalised(vendor.id);
  const profileLink = vendor.id === 'vendor-1' ? '/vendor/stories-by-amal' : `/vendor/${vendor.id}`;

  return (
    <div className="bg-white border border-[#EAE3DA] rounded-2xl overflow-hidden hover:shadow-md transition-all duration-200 group">
      <div className="flex gap-4 p-4">
        {/* Image */}
        <div className="w-24 h-24 rounded-xl overflow-hidden bg-[#F4EFEA] flex-shrink-0">
          <img src={vendor.image} alt={vendor.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-[11px] text-[#8E4A49] font-semibold uppercase tracking-wider">{vendor.category}</p>
              <h3 className="font-serif text-lg text-[#1C1917] mt-0.5">{vendor.name}</h3>
              <p className="text-xs text-[#78716C]">📍 {vendor.location}</p>
            </div>
            {finalised && <StatusBadge status="finalised" />}
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
        <ShortlistButton vendor={vendor} />
        <DiscussButton item={vendor} type="vendor" />
        {!finalised ? (
          <button
            onClick={() => finaliseVendor(vendor)}
            className="flex items-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-xl bg-[#1C1917] text-white hover:bg-[#34302C] transition-colors"
          >
            ✓ Finalise
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

function LookingForSomethingElse() {
  const [query, setQuery] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const suggestions = ['Traditional Chenda Team', 'Live Violinist', 'Wedding Car Decoration', 'Fireworks Display', 'Mehendi Artist'];

  if (submitted) {
    return (
      <div className="text-center py-10">
        <div className="w-14 h-14 bg-[#F4EFEA] rounded-full flex items-center justify-center text-2xl mx-auto mb-4">📋</div>
        <h3 className="font-serif text-xl text-[#1C1917] mb-2">Request Posted!</h3>
        <p className="text-sm text-[#78716C]">
          Your request for <strong>"{query}"</strong> has been posted. Matching vendors will reach out to you.
        </p>
        <button onClick={() => { setSubmitted(false); setQuery(''); }}
          className="mt-4 text-sm text-[#6B3037] hover:underline">Post another request</button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-start gap-4 mb-6">
        <div className="w-10 h-10 rounded-full bg-[#F4EFEA] flex items-center justify-center text-lg flex-shrink-0">🔍</div>
        <div>
          <h3 className="font-serif text-xl text-[#1C1917] mb-1">Looking for something else?</h3>
          <p className="text-sm text-[#78716C]">
            Need a service not listed above? Describe what you're looking for and we'll search the marketplace — or post a request for vendors to find you.
          </p>
        </div>
      </div>

      {/* Search input */}
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="e.g. Traditional Chenda Team, Live Violinist, Wedding Fireworks..."
          className="flex-1 border border-[#D4C5B9] rounded-xl px-4 py-3 text-sm text-[#1C1917] focus:outline-none focus:border-[#6B3037] transition-colors placeholder:text-[#D4C5B9]"
        />
        <button
          onClick={() => query.trim() && setSubmitted(true)}
          className="px-5 py-3 bg-[#6B3037] text-white text-sm font-medium rounded-xl hover:bg-[#52242A] transition-colors"
        >
          Search
        </button>
      </div>

      {/* Suggestion pills */}
      <div className="flex flex-wrap gap-2">
        <p className="text-xs text-[#A39081] w-full">Popular requests:</p>
        {suggestions.map(s => (
          <button
            key={s}
            onClick={() => setQuery(s)}
            className="text-xs text-[#6B5E53] bg-[#F4EFEA] border border-[#EAE3DA] px-3 py-1.5 rounded-full hover:border-[#6B3037] hover:text-[#6B3037] transition-colors"
          >
            {s}
          </button>
        ))}
      </div>

      {query && (
        <div className="mt-5 p-4 bg-[#F4EFEA] rounded-xl border border-[#EAE3DA]">
          <p className="text-sm text-[#57534E] mb-3">
            No vendors found for <strong>"{query}"</strong> in our directory yet.
          </p>
          <button
            onClick={() => setSubmitted(true)}
            className="px-4 py-2.5 bg-[#1C1917] text-white text-xs font-semibold rounded-xl hover:bg-[#34302C] transition-colors"
          >
            📢 Post a Request to Marketplace
          </button>
        </div>
      )}
    </div>
  );
}

export default function ShortlistPage() {
  const { shortlistItems } = usePlanning();
  const [activeCategory, setActiveCategory] = useState('All');

  const grouped = groupByCategory(shortlistItems);
  const categories = ['All', ...Object.keys(grouped)];

  const visibleItems = activeCategory === 'All'
    ? shortlistItems
    : (grouped[activeCategory] || []);

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
              <p className="text-[#78716C] mt-2 text-sm">
                {shortlistItems.length > 0
                  ? `${shortlistItems.length} vendor${shortlistItems.length !== 1 ? 's' : ''} you are considering — discuss, compare and finalise your crew.`
                  : "Vendors you are considering for your event will appear here."}
              </p>

            </div>
            {!isEmpty && (
              <Link to="/finalised"
                className="flex items-center gap-2 px-5 py-2.5 bg-[#1C1917] text-white text-sm font-medium rounded-xl hover:bg-[#34302C] transition-colors">
                View My Crew →
              </Link>
            )}
          </div>
        </div>

        {/* Empty state */}
        {isEmpty ? (
          <div className="text-center py-20 bg-white border border-[#EAE3DA] rounded-3xl">
            <div className="text-5xl mb-4">📋</div>
            <h2 className="font-serif text-2xl text-[#1C1917] mb-3">Your shortlist is empty</h2>
            <p className="text-[#78716C] text-sm max-w-sm mx-auto mb-8">
              Browse vendors and click <strong>"+ Shortlist"</strong> on any vendor to add them here. You can shortlist multiple vendors per category and compare them before deciding.
            </p>
            <Link to="/" className="px-6 py-3 bg-[#6B3037] text-white text-sm font-medium rounded-xl hover:bg-[#52242A] transition-colors">
              Discover Vendors →
            </Link>
          </div>
        ) : (
          <>
            {/* Category tabs */}
            {categories.length > 2 && (
              <div className="flex gap-2 flex-wrap mb-8">
                {categories.map(cat => (
                  <button key={cat} onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                      activeCategory === cat
                        ? 'bg-[#1C1917] text-white border-[#1C1917]'
                        : 'bg-white text-[#78716C] border-[#D4C5B9] hover:border-[#1C1917]'
                    }`}>
                    {cat}
                    {cat !== 'All' && grouped[cat] && (
                      <span className="ml-1.5 text-[10px] opacity-70">({grouped[cat].length})</span>
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Vendor grid */}
            {activeCategory === 'All' ? (
              <div className="space-y-10">
                {Object.entries(grouped).map(([category, vendors]) => (
                  <div key={category}>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="font-serif text-xl text-[#1C1917]">{category}</h2>
                      <span className="text-xs text-[#A39081]">{vendors.length} option{vendors.length !== 1 ? 's' : ''}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {vendors.map(v => <ShortlistVendorCard key={v.id} vendor={v} />)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {visibleItems.map(v => <ShortlistVendorCard key={v.id} vendor={v} />)}
              </div>
            )}

            {/* CTA strip */}
            <div className="mt-10 bg-[#1C1917] rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-white font-serif text-lg mb-1">Ready to decide?</p>
                <p className="text-[#A39081] text-sm">Finalise vendors to build your official event crew.</p>
              </div>
              <Link to="/finalised"
                className="px-6 py-3 bg-[#6B3037] text-white text-sm font-semibold rounded-xl hover:bg-[#52242A] transition-colors whitespace-nowrap">
                View My Crew →
              </Link>
            </div>
          </>
        )}

        {/* Looking for something else */}
        <div className="mt-16 bg-[#FDFBF7] border border-[#EAE3DA] rounded-3xl p-8">
          <LookingForSomethingElse />
        </div>
      </div>
    </div>
  );
}
