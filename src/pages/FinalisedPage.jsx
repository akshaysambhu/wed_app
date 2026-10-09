/**
 * FinalisedPage.jsx — /finalised
 * "These are the vendors we have chosen."
 */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePlanning } from '../context/PlanningContext.jsx';
import { VENDORS } from '../data/mockData.js';
import FinalisedCard from '../components/planning/FinalisedCard.jsx';
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

// Required service slots — in a real app these come from the couple's plan
const REQUIRED_SERVICES = ['Photography', 'Venue', 'Catering', 'Makeup', 'Music', 'Decoration'];

// ─── Stats row ────────────────────────────────────────────────────────────────
function CrewStats({ items }) {
  const approved = items.filter(i => i.status === 'approved').length;
  const waiting = items.filter(i => i.status === 'waiting').length;
  const rejected = items.filter(i => i.status === 'rejected').length;

  return (
    <div className="grid grid-cols-3 gap-4 mb-10">
      {[
        { label: 'Approved', count: approved, cls: 'border-emerald-200 bg-emerald-50 text-emerald-700' },
        { label: 'Waiting', count: waiting, cls: 'border-amber-200 bg-amber-50 text-amber-700' },
        { label: 'Rejected', count: rejected, cls: 'border-red-200 bg-red-50 text-red-700' },
      ].map(s => (
        <div key={s.label} className={`rounded-2xl border p-5 text-center ${s.cls.split(' ').slice(0, 2).join(' ')}`}>
          <p className={`text-3xl font-serif font-semibold mb-1 ${s.cls.split(' ')[2]}`}>{s.count}</p>
          <p className="text-xs font-medium text-[#78716C]">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

// ─── "Looking for something else?" — same as Shortlist, reused inline ────────
function LookingForSomethingElse() {
  const { toggleShortlist, isShortlisted } = usePlanning();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(null);
  const [query, setQuery] = useState('');
  const [postSubmitted, setPostSubmitted] = useState(false);
  const [postForm, setPostForm] = useState({
    what: '', eventType: '', location: '', date: '', budget: '', description: '', contactPreference: 'phone',
  });

  const examples = ['Chenda Team', 'Live Violinist', 'Wedding Car Decoration', 'Traditional Photographer', 'Drone Show'];
  const searchResults = query.trim().length > 1
    ? VENDORS.filter(v =>
        v.name.toLowerCase().includes(query.toLowerCase()) ||
        v.category.toLowerCase().includes(query.toLowerCase()) ||
        v.location.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handlePostSubmit = (e) => { e.preventDefault(); setPostSubmitted(true); };
  const reset = () => { setOpen(false); setMode(null); setQuery(''); setPostSubmitted(false); setPostForm({ what:'', eventType:'', location:'', date:'', budget:'', description:'', contactPreference:'phone' }); };

  return (
    <div className="bg-[#FDFBF7] border border-[#EAE3DA] rounded-3xl p-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h3 className="font-serif text-2xl text-[#1C1917] mb-1">Looking for something else?</h3>
          <p className="text-sm text-[#78716C]">Shortlist is the main place — but you can still search or post from here.</p>
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

      {open && (
        <div className="mt-8 border-t border-[#EAE3DA] pt-8">
          {mode === null && (
            <div>
              <p className="font-semibold text-[#1C1917] mb-2">What are you looking for?</p>
              <input
                autoFocus type="text"
                placeholder="e.g. Chenda Team, Live Violinist, Drone Show..."
                value={query} onChange={e => setQuery(e.target.value)}
                className="w-full bg-white border border-[#EAE3DA] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#6B3037] mb-4"
              />
              <div className="flex flex-wrap gap-2 mb-6">
                {examples.map(ex => (
                  <button key={ex} onClick={() => setQuery(ex)} className="text-xs text-[#6B5E53] bg-[#F4EFEA] border border-[#EAE3DA] px-3 py-1.5 rounded-full hover:border-[#6B3037]">{ex}</button>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button onClick={() => setMode('search')} className="flex-1 py-3 bg-white border-2 border-[#1C1917] text-[#1C1917] text-sm font-semibold rounded-xl hover:bg-[#F4EFEA]">🔍 Search Marketplace</button>
                <button onClick={() => setMode('post')} className="flex-1 py-3 bg-[#6B3037] text-white text-sm font-semibold rounded-xl hover:bg-[#52242A]">📢 Post a Request</button>
                <button onClick={reset} className="py-3 px-4 border border-[#EAE3DA] text-[#78716C] text-sm rounded-xl hover:bg-[#F4EFEA]">Cancel</button>
              </div>
            </div>
          )}

          {mode === 'search' && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <button onClick={() => setMode(null)} className="text-xs text-[#78716C] hover:text-[#1C1917]">← Back</button>
                <h4 className="font-semibold text-[#1C1917]">Search Marketplace</h4>
              </div>
              <input autoFocus type="text" placeholder="Search vendors…" value={query} onChange={e => setQuery(e.target.value)}
                className="w-full bg-white border border-[#EAE3DA] rounded-full px-4 py-3 text-sm focus:outline-none focus:border-[#6B3037] mb-4"
              />
              {query.trim().length > 1 && (
                searchResults.length > 0 ? (
                  <div className="space-y-3">
                    {searchResults.map(v => {
                      const sl = isShortlisted(v.id);
                      return (
                        <div key={v.id} className="flex items-center gap-4 bg-white border border-[#EAE3DA] rounded-xl p-3">
                          <img src={v.image} alt={v.name} className="w-14 h-14 rounded-lg object-cover" />
                          <div className="flex-1 min-w-0">
                            <p className="text-[11px] text-[#8E4A49] font-semibold uppercase">{v.category}</p>
                            <p className="font-semibold text-sm text-[#1C1917] truncate">{v.name}</p>
                            <p className="text-xs text-[#78716C]">📍 {v.location} · ★ {v.rating}</p>
                          </div>
                          <button onClick={() => toggleShortlist(v)}
                            className={`flex-shrink-0 px-4 py-2 text-xs font-semibold rounded-xl border transition-colors ${sl ? 'bg-[#6B3037] text-white border-[#6B3037]' : 'bg-white border-[#EAE3DA] text-[#1C1917] hover:border-[#6B3037]'}`}
                          >{sl ? '✓ Shortlisted' : '+ Add to Shortlist'}</button>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-white border border-[#EAE3DA] rounded-2xl">
                    <p className="text-[#78716C] text-sm mb-4">No vendors found for "<strong>{query}</strong>"</p>
                    <button onClick={() => setMode('post')} className="px-6 py-2.5 bg-[#6B3037] text-white text-xs font-semibold rounded-xl hover:bg-[#52242A]">Post a Custom Request →</button>
                  </div>
                )
              )}
            </div>
          )}

          {mode === 'post' && !postSubmitted && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <button onClick={() => setMode(null)} className="text-xs text-[#78716C] hover:text-[#1C1917]">← Back</button>
                <h4 className="font-semibold text-[#1C1917]">Post a Custom Request</h4>
              </div>
              <form onSubmit={handlePostSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-[#1C1917] mb-2">What do you need?</label>
                  <input required type="text" placeholder="e.g. 5-piece Chenda team, Drone show…"
                    value={postForm.what} onChange={e => setPostForm({...postForm, what: e.target.value})}
                    className="w-full bg-white border border-[#EAE3DA] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#6B3037]"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-[#1C1917] mb-2">Event Type</label>
                    <select required value={postForm.eventType} onChange={e => setPostForm({...postForm, eventType: e.target.value})}
                      className="w-full bg-white border border-[#EAE3DA] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#6B3037]"
                    >
                      <option value="">Select…</option>
                      {['Wedding','Engagement','Birthday','Anniversary','Baptism','Baby Shower','Other'].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#1C1917] mb-2">Location</label>
                    <input required type="text" placeholder="e.g. Kochi, Kerala"
                      value={postForm.location} onChange={e => setPostForm({...postForm, location: e.target.value})}
                      className="w-full bg-white border border-[#EAE3DA] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#6B3037]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#1C1917] mb-2">Date</label>
                    <input required type="date" value={postForm.date} onChange={e => setPostForm({...postForm, date: e.target.value})}
                      className="w-full bg-white border border-[#EAE3DA] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#6B3037]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#1C1917] mb-2">Budget (Optional)</label>
                    <input type="text" placeholder="e.g. ₹20,000 – ₹50,000"
                      value={postForm.budget} onChange={e => setPostForm({...postForm, budget: e.target.value})}
                      className="w-full bg-white border border-[#EAE3DA] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#6B3037]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1C1917] mb-2">Description</label>
                  <textarea required rows={3} placeholder="Tell vendors what you need…"
                    value={postForm.description} onChange={e => setPostForm({...postForm, description: e.target.value})}
                    className="w-full bg-white border border-[#EAE3DA] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#6B3037] resize-none"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="submit" className="px-8 py-3.5 bg-[#6B3037] text-white text-sm font-semibold rounded-xl hover:bg-[#52242A]">Post Request</button>
                  <button type="button" onClick={reset} className="px-4 py-3.5 border border-[#EAE3DA] text-[#78716C] text-sm rounded-xl hover:bg-[#F4EFEA]">Cancel</button>
                </div>
              </form>
            </div>
          )}

          {mode === 'post' && postSubmitted && (
            <div className="text-center py-10">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">✓</div>
              <h4 className="font-serif text-2xl text-[#1C1917] mb-2">Request Posted!</h4>
              <p className="text-[#78716C] text-sm max-w-md mx-auto mb-6">Vendors will reach out based on your contact preference.</p>
              <button onClick={reset} className="px-6 py-2.5 bg-[#1C1917] text-white text-sm font-semibold rounded-xl hover:bg-[#34302C]">Done</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function FinalisedPage() {
  const { finalisedItems } = usePlanning();
  const grouped = groupByCategory(finalisedItems);
  const isEmpty = finalisedItems.length === 0;

  // Services summary
  const finalisedCategories = Object.keys(grouped);
  const finalisedCount = finalisedCategories.length;
  const totalRequired = REQUIRED_SERVICES.length;
  const stillNeeded = REQUIRED_SERVICES.filter(s => !finalisedCategories.includes(s));
  const isCrewComplete = stillNeeded.length === 0 && finalisedItems.every(i => i.status === 'approved');

  return (
    <div className="min-h-screen bg-[#FAF8F5] pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-xs text-[#78716C] mb-4">
            <Link to="/" className="hover:text-[#6B3037]">Home</Link>
            <span className="text-[#D4C5B9]">/</span>
            <Link to="/shortlist" className="hover:text-[#6B3037]">My Shortlist</Link>
            <span className="text-[#D4C5B9]">/</span>
            <span className="text-[#1C1917] font-medium">Finalised Crew</span>
          </div>

          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#8E4A49] mb-2">Event Planning</p>
              <h1 className="font-serif text-4xl md:text-5xl text-[#1C1917]">Our Finalised Crew</h1>
              <p className="text-[#78716C] mt-2 text-sm">The team we've chosen for our celebration.</p>
            </div>
            <Link
              to="/shortlist"
              className="flex items-center gap-2 px-5 py-2.5 border-2 border-[#D4C5B9] text-[#1C1917] text-sm font-medium rounded-xl hover:border-[#1C1917] transition-colors"
            >
              ← Back to Shortlist
            </Link>
          </div>
        </div>

        {/* Empty state */}
        {isEmpty ? (
          <div className="text-center py-20 bg-white border border-[#EAE3DA] rounded-3xl mb-12">
            <div className="text-5xl mb-4">👥</div>
            <h2 className="font-serif text-2xl text-[#1C1917] mb-3">No vendors finalised yet</h2>
            <p className="text-[#78716C] text-sm max-w-sm mx-auto mb-8">
              Shortlist vendors first, then click <strong>"✓ Move to Finalised"</strong> on the ones you've decided on.
            </p>
            <Link
              to="/shortlist"
              className="px-6 py-3 bg-[#6B3037] text-white text-sm font-medium rounded-xl hover:bg-[#52242A] transition-colors"
            >
              Go to Shortlist →
            </Link>
          </div>
        ) : (
          <>
            {/* Stats */}
            <CrewStats items={finalisedItems} />

            {/* Summary progress banner */}
            <div className={`rounded-2xl p-5 mb-10 border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
              isCrewComplete
                ? 'bg-emerald-50 border-emerald-200'
                : 'bg-[#FDFBF7] border-[#EAE3DA]'
            }`}>
              <div>
                <p className={`text-sm font-bold mb-1 ${isCrewComplete ? 'text-emerald-700' : 'text-[#1C1917]'}`}>
                  {isCrewComplete ? '🎉 Your Crew Is Complete!' : `${finalisedCount} of ${totalRequired} services finalised`}
                </p>
                {!isCrewComplete && (
                  <p className="text-xs text-[#78716C]">
                    {stillNeeded.length} service{stillNeeded.length !== 1 ? 's' : ''} still needed:
                    {' '}<span className="font-semibold text-[#44403C]">{stillNeeded.join(', ')}</span>
                  </p>
                )}
              </div>
              {!isCrewComplete ? (
                <Link
                  to="/shortlist"
                  className="flex-shrink-0 px-5 py-2.5 bg-[#1C1917] text-white text-sm font-semibold rounded-xl hover:bg-[#34302C] transition-colors"
                >
                  Continue Building My Crew →
                </Link>
              ) : (
                <div className="flex flex-wrap gap-3">
                  <button className="px-5 py-2.5 bg-white border border-emerald-300 text-emerald-700 text-sm font-semibold rounded-xl hover:bg-emerald-50 transition-colors">
                    🗓 Check Availability
                  </button>
                  <button className="px-5 py-2.5 bg-white border border-emerald-300 text-emerald-700 text-sm font-semibold rounded-xl hover:bg-emerald-50 transition-colors">
                    ✉️ Request Quotes
                  </button>
                  <button className="px-5 py-2.5 bg-emerald-600 text-white text-sm font-semibold rounded-xl hover:bg-emerald-700 transition-colors">
                    🚀 Start Booking
                  </button>
                </div>
              )}
            </div>

            {/* Status legend */}
            <div className="flex flex-wrap gap-3 mb-8">
              <p className="text-xs text-[#A39081] w-full">Status key:</p>
              <StatusBadge status="waiting" />
              <StatusBadge status="approved" />
              <StatusBadge status="rejected" />
            </div>

            {/* Crew by category */}
            <div className="space-y-10">
              {Object.entries(grouped).map(([category, vendors]) => (
                <div key={category}>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-serif text-xl text-[#1C1917]">{category}</h2>
                    <div className="flex gap-2">
                      {vendors.map(v => (
                        <StatusBadge key={v.id} status={v.status || 'waiting'} />
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    {vendors.map(v => <FinalisedCard key={v.id} vendor={v} />)}
                  </div>
                </div>
              ))}
            </div>

            {/* Progress summary bottom bar */}
            <div className="mt-12 bg-[#1C1917] rounded-2xl p-7">
              <div className="flex items-start justify-between flex-wrap gap-4 mb-5">
                <div>
                  <p className="text-white font-serif text-xl mb-1">Crew Progress</p>
                  <p className="text-[#A39081] text-sm">
                    {finalisedItems.filter(i => i.status === 'approved').length} of {finalisedItems.length} vendors approved
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-serif text-white">
                    {finalisedItems.length > 0
                      ? Math.round((finalisedItems.filter(i => i.status === 'approved').length / finalisedItems.length) * 100)
                      : 0}%
                  </p>
                  <p className="text-xs text-[#78716C]">Crew confirmed</p>
                </div>
              </div>
              <div className="bg-[#34302C] rounded-full h-2 overflow-hidden mb-5">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-700"
                  style={{
                    width: `${finalisedItems.length > 0
                      ? Math.round((finalisedItems.filter(i => i.status === 'approved').length / finalisedItems.length) * 100)
                      : 0}%`
                  }}
                />
              </div>
              <div className="flex gap-3 flex-wrap">
                <Link
                  to="/shortlist"
                  className="px-5 py-2.5 border border-white/20 text-white text-sm font-medium rounded-xl hover:bg-white/10 transition-colors"
                >
                  Add more vendors
                </Link>
                <button className="px-5 py-2.5 bg-[#6B3037] text-white text-sm font-medium rounded-xl hover:bg-[#52242A] transition-colors">
                  Request Quotes →
                </button>
              </div>
            </div>
          </>
        )}

        {/* Looking for something else — at bottom */}
        <div className="mt-16">
          <LookingForSomethingElse />
        </div>
      </div>
    </div>
  );
}
