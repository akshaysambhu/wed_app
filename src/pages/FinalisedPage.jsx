/**
 * FinalisedPage.jsx — /finalised
 * Shows the customer's finalised event crew with status badges,
 * status management, summary stats, and progress view.
 */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePlanning } from '../context/PlanningContext.jsx';
import FinalisedCard from '../components/planning/FinalisedCard.jsx';
import StatusBadge from '../components/ui/StatusBadge.jsx';

function groupByCategory(items) {
  return items.reduce((acc, item) => {
    const cat = item.category || 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});
}

function CrewStats({ items }) {
  const approved = items.filter(i => i.status === 'approved').length;
  const waiting = items.filter(i => i.status === 'waiting').length;
  const rejected = items.filter(i => i.status === 'rejected').length;

  return (
    <div className="grid grid-cols-3 gap-4 mb-10">
      {[
        { label: 'Approved', count: approved, status: 'approved', icon: '✓' },
        { label: 'Awaiting', count: waiting, status: 'waiting', icon: '⏳' },
        { label: 'Not Available', count: rejected, status: 'rejected', icon: '✕' },
      ].map(s => (
        <div key={s.label} className={`rounded-2xl border p-5 text-center ${
          s.status === 'approved' ? 'border-emerald-200 bg-emerald-50' :
          s.status === 'waiting' ? 'border-amber-200 bg-amber-50' :
          'border-red-200 bg-red-50'
        }`}>
          <p className={`text-3xl font-serif font-semibold mb-1 ${
            s.status === 'approved' ? 'text-emerald-700' :
            s.status === 'waiting' ? 'text-amber-700' :
            'text-red-700'
          }`}>{s.count}</p>
          <p className="text-xs font-medium text-[#78716C]">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

export default function FinalisedPage() {
  const { finalisedItems } = usePlanning();
  const grouped = groupByCategory(finalisedItems);
  const isEmpty = finalisedItems.length === 0;

  return (
    <div className="min-h-screen bg-[#FAF8F5] pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-xs text-[#78716C] mb-4">
            <Link to="/" className="hover:text-[#6B3037]">Home</Link>
            <span className="text-[#D4C5B9]">/</span>
            <Link to="/shortlist" className="hover:text-[#6B3037]">Shortlist</Link>
            <span className="text-[#D4C5B9]">/</span>
            <span className="text-[#1C1917] font-medium">My Crew</span>
          </div>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#8E4A49] mb-2">Event Planning</p>
              <h1 className="font-serif text-4xl md:text-5xl text-[#1C1917]">My Final Crew</h1>
              <p className="text-[#78716C] mt-2 text-sm">
                {finalisedItems.length > 0
                  ? `${finalisedItems.length} vendor${finalisedItems.length !== 1 ? 's' : ''} finalised for your event. Track approval status below.`
                  : 'Vendors you finalise from your shortlist will appear here.'}
              </p>
            </div>
            <Link to="/shortlist"
              className="flex items-center gap-2 px-5 py-2.5 border-2 border-[#D4C5B9] text-[#1C1917] text-sm font-medium rounded-xl hover:border-[#1C1917] transition-colors">
              ← Back to Shortlist
            </Link>
          </div>
        </div>

        {/* Empty state */}
        {isEmpty ? (
          <div className="text-center py-20 bg-white border border-[#EAE3DA] rounded-3xl">
            <div className="text-5xl mb-4">👥</div>
            <h2 className="font-serif text-2xl text-[#1C1917] mb-3">Your crew is empty</h2>
            <p className="text-[#78716C] text-sm max-w-sm mx-auto mb-8">
              Shortlist vendors first, then click <strong>"✓ Finalise"</strong> on the ones you've decided on. They'll appear here with their approval status.
            </p>
            <Link to="/shortlist"
              className="px-6 py-3 bg-[#6B3037] text-white text-sm font-medium rounded-xl hover:bg-[#52242A] transition-colors">
              Go to Shortlist →
            </Link>
          </div>
        ) : (
          <>
            {/* Stats */}
            <CrewStats items={finalisedItems} />

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

            {/* Progress summary */}
            <div className="mt-12 bg-[#1C1917] rounded-2xl p-7">
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div>
                  <p className="text-white font-serif text-xl mb-1">Crew Summary</p>
                  <p className="text-[#A39081] text-sm">
                    {finalisedItems.filter(i => i.status === 'approved').length} of {finalisedItems.length} vendors approved
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-serif text-white">
                    {Math.round((finalisedItems.filter(i => i.status === 'approved').length / finalisedItems.length) * 100)}%
                  </p>
                  <p className="text-xs text-[#78716C]">Crew confirmed</p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-5 bg-[#34302C] rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-700"
                  style={{
                    width: `${Math.round((finalisedItems.filter(i => i.status === 'approved').length / finalisedItems.length) * 100)}%`
                  }}
                />
              </div>

              <div className="mt-5 flex gap-3">
                <Link to="/shortlist"
                  className="px-5 py-2.5 border border-white/20 text-white text-sm font-medium rounded-xl hover:bg-white/10 transition-colors">
                  Add more vendors
                </Link>
                <button className="px-5 py-2.5 bg-[#6B3037] text-white text-sm font-medium rounded-xl hover:bg-[#52242A] transition-colors">
                  Request Quotes →
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
