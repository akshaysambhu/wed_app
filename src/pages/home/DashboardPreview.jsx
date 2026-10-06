import React from 'react';
import { usePlanning } from '../../context/PlanningContext.jsx';

export default function DashboardPreview() {
  const { dashboardState, savedItems, compareItems, notes, openModal } = usePlanning();

  return (
    <section id="plan" className="py-20 md:py-28 bg-[#FAF8F5] border-t border-[#EAE3DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest text-[#8C7E72] font-semibold mb-2 block">
            09 · The Planning Workspace
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1C1917] tracking-tight">
            Turn your ideas into a plan.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#57534E] leading-relaxed">
            Discovery is only the beginning. Effortlessly manage your timeline, coordinate joint tasks, finalize vendor quotes, and monitor decisions in one calm, unified space.
          </p>
        </div>

        {/* Dashboard Preview Interface Container */}
        <div className="bg-white rounded-3xl border border-[#EAE3DA] shadow-xl overflow-hidden p-6 sm:p-8 lg:p-10">
          {/* Top Wedding Overview Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-[#F4EFEA] gap-6">
            <div>
              <div className="flex items-center space-x-2 text-xs text-[#8E4A49] font-semibold uppercase tracking-wider mb-1">
                <span className="w-2 h-2 rounded-full bg-[#8E4A49]"></span>
                <span>Active Joint Workspace</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#1C1917]">
                {dashboardState.weddingName}
              </h3>
              <p className="text-xs sm:text-sm text-[#8C7E72] mt-0.5">
                {dashboardState.weddingDate} · <span className="text-[#1C1917] font-semibold">{dashboardState.daysRemaining} days to go</span>
              </p>
            </div>

            {/* Progress Bar & Meter */}
            <div className="flex items-center space-x-4 bg-[#FAF8F5] p-3.5 sm:p-4 rounded-2xl border border-[#EAE3DA]">
              <div className="relative w-14 h-14 flex items-center justify-center">
                <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-[#EAE3DA]"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-[#8E4A49]"
                    strokeDasharray={`${dashboardState.completionPercentage}, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute text-xs font-bold text-[#1C1917]">
                  {dashboardState.completionPercentage}%
                </span>
              </div>
              <div>
                <span className="block text-xs font-semibold text-[#1C1917]">Planning Progress</span>
                <span className="text-[11px] text-[#8C7E72]">Milestones on track</span>
              </div>
            </div>
          </div>

          {/* Interactive Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 my-8">
            {/* Card 1: Tasks */}
            <div
              onClick={() => openModal('dashboard')}
              className="p-4 rounded-2xl bg-[#FAF8F5] hover:bg-[#F4EFEA] border border-[#EAE3DA] transition-all cursor-pointer group"
            >
              <span className="text-xs text-[#8C7E72] block">Tasks</span>
              <div className="font-serif text-2xl font-semibold text-[#1C1917] mt-1 group-hover:text-[#6B3037]">
                {dashboardState.metrics.tasksRemaining} <span className="text-xs font-sans font-normal text-[#8C7E72]">remaining</span>
              </div>
              <span className="text-[10px] text-[#8E4A49] font-medium block mt-1">2 due this week</span>
            </div>

            {/* Card 2: Decisions */}
            <div
              onClick={() => openModal('dashboard')}
              className="p-4 rounded-2xl bg-[#FAF8F5] hover:bg-[#F4EFEA] border border-[#EAE3DA] transition-all cursor-pointer group"
            >
              <span className="text-xs text-[#8C7E72] block">Decisions</span>
              <div className="font-serif text-2xl font-semibold text-[#1C1917] mt-1 group-hover:text-[#6B3037]">
                {dashboardState.metrics.decisionsPending} <span className="text-xs font-sans font-normal text-[#8C7E72]">pending</span>
              </div>
              <span className="text-[10px] text-[#A39081] font-medium block mt-1">Awaiting partner input</span>
            </div>

            {/* Card 3: Saved */}
            <div
              onClick={() => openModal('saved')}
              className="p-4 rounded-2xl bg-[#FAF8F5] hover:bg-[#F4EFEA] border border-[#EAE3DA] transition-all cursor-pointer group"
            >
              <span className="text-xs text-[#8C7E72] block">Saved</span>
              <div className="font-serif text-2xl font-semibold text-[#1C1917] mt-1 group-hover:text-[#6B3037]">
                {Math.max(savedItems.length, dashboardState.metrics.savedInspirations)} <span className="text-xs font-sans font-normal text-[#8C7E72]">moments</span>
              </div>
              <span className="text-[10px] text-[#8E4A49] font-medium block mt-1">Click to view items</span>
            </div>

            {/* Card 4: Shortlisted */}
            <div
              onClick={() => openModal('compare')}
              className="p-4 rounded-2xl bg-[#FAF8F5] hover:bg-[#F4EFEA] border border-[#EAE3DA] transition-all cursor-pointer group"
            >
              <span className="text-xs text-[#8C7E72] block">Shortlisted</span>
              <div className="font-serif text-2xl font-semibold text-[#1C1917] mt-1 group-hover:text-[#6B3037]">
                {Math.max(compareItems.length, dashboardState.metrics.shortlistedVendors)} <span className="text-xs font-sans font-normal text-[#8C7E72]">vendors</span>
              </div>
              <span className="text-[10px] text-[#6B3037] font-medium block mt-1">Ready to compare</span>
            </div>

            {/* Card 5: Notes */}
            <div
              onClick={() => openModal('notes')}
              className="p-4 rounded-2xl bg-[#FAF8F5] hover:bg-[#F4EFEA] border border-[#EAE3DA] transition-all cursor-pointer group"
            >
              <span className="text-xs text-[#8C7E72] block">Notes</span>
              <div className="font-serif text-2xl font-semibold text-[#1C1917] mt-1 group-hover:text-[#6B3037]">
                {Math.max(notes.length, dashboardState.metrics.notesTotal)} <span className="text-xs font-sans font-normal text-[#8C7E72]">notes</span>
              </div>
              <span className="text-[10px] text-[#78716C] font-medium block mt-1">Shared with partner</span>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-6 border-t border-[#F4EFEA] flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-[#8C7E72]">
              Synced in real time across both partners’ phones and laptops.
            </span>
            <button
              onClick={() => openModal('dashboard')}
              className="w-full sm:w-auto px-6 py-3 bg-[#1C1917] hover:bg-[#34302C] text-white text-xs font-medium rounded-full shadow-md transition-all flex items-center justify-center space-x-2"
            >
              <span>Continue Planning</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
