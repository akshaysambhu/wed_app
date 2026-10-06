import React, { useState } from 'react';
import { usePlanning } from '../../context/PlanningContext.jsx';

export default function NotesSection() {
  const { notes, addNote, openModal } = usePlanning();
  const [quickInput, setQuickInput] = useState('');
  const [authorName, setAuthorName] = useState('Anjali');

  const handleQuickAdd = (e) => {
    e.preventDefault();
    if (!quickInput.trim()) return;

    addNote({
      author: authorName,
      title: 'Homepage Reflection',
      content: quickInput.trim(),
      targetTitle: 'Our Joint Vision',
      isDecision: false
    });
    setQuickInput('');
  };

  return (
    <section id="notes" className="py-20 md:py-28 bg-[#FDFBF7] border-t border-[#EAE3DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Descriptive Editorial Content */}
          <div className="lg:col-span-5">
            <span className="text-xs uppercase tracking-widest text-[#8C7E72] font-semibold mb-2 block">
              08 · Collaborative Planning
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1C1917] tracking-tight leading-tight">
              Plan together, <br />
              <span className="italic font-light text-[#6B3037]">even when you’re apart.</span>
            </h2>
            <p className="mt-4 text-base text-[#57534E] leading-relaxed">
              Keep your thoughts, ideas and decisions in one place. Write private notes, share ideas with your partner and remember why you saved something.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start space-x-3 text-sm text-[#44403C]">
                <div className="w-5 h-5 rounded-full bg-[#FAF8F5] border border-[#EAE3DA] flex items-center justify-center shrink-0 mt-0.5 text-xs text-[#8E4A49]">
                  ✓
                </div>
                <div>
                  <strong className="text-[#1C1917] font-medium">My Notes:</strong> Private thoughts before sharing with your partner.
                </div>
              </div>

              <div className="flex items-start space-x-3 text-sm text-[#44403C]">
                <div className="w-5 h-5 rounded-full bg-[#FAF8F5] border border-[#EAE3DA] flex items-center justify-center shrink-0 mt-0.5 text-xs text-[#8E4A49]">
                  ✓
                </div>
                <div>
                  <strong className="text-[#1C1917] font-medium">Partner's Notes:</strong> See their reactions, questions, and preferred alternatives.
                </div>
              </div>

              <div className="flex items-start space-x-3 text-sm text-[#44403C]">
                <div className="w-5 h-5 rounded-full bg-[#FAF8F5] border border-[#EAE3DA] flex items-center justify-center shrink-0 mt-0.5 text-xs text-[#8E4A49]">
                  ✓
                </div>
                <div>
                  <strong className="text-[#1C1917] font-medium">Our Decisions:</strong> Tagged agreements so no details slip through the cracks.
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={() => openModal('notes')}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-[#1C1917] hover:bg-[#34302C] text-white text-xs font-medium rounded-full transition-all shadow-sm"
              >
                <span>See All Couple Notes ({notes.length})</span>
                <span>→</span>
              </button>
            </div>
          </div>

          {/* Right Column: Realistic Couple Notes UI Mockup */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#EAE3DA] p-6 sm:p-8 shadow-xl">
            {/* Header of the Mockup Card */}
            <div className="flex items-center justify-between pb-4 border-b border-[#F4EFEA] mb-6">
              <div className="flex items-center space-x-3">
                <span className="w-3 h-3 rounded-full bg-[#8E4A49]"></span>
                <span className="font-serif text-lg font-medium text-[#1C1917]">
                  Notes on: Eucalyptus & Brass Candelabra Table
                </span>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-[#FAF8F5] text-[#8C7E72] border border-[#EAE3DA]">
                Private to Anjali & Rohan
              </span>
            </div>

            {/* Note Cards Stack */}
            <div className="space-y-4 mb-6">
              {/* Note 1: Anjali */}
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border-l-4 border-l-[#8E4A49] border border-[#EAE3DA]">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center space-x-2">
                    <span className="w-6 h-6 rounded-full bg-[#8E4A49] text-white text-xs flex items-center justify-center font-medium">
                      A
                    </span>
                    <span className="font-semibold text-xs text-[#1C1917]">Anjali’s Note</span>
                  </div>
                  <span className="text-[11px] text-[#8C7E72]">2 days ago</span>
                </div>
                <p className="text-xs sm:text-sm text-[#44403C] leading-relaxed pl-8">
                  “I love this reception setup. Maybe something similar with low warm lighting for our evening dinner.”
                </p>
              </div>

              {/* Note 2: Rohan */}
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border-l-4 border-l-[#44403C] border border-[#EAE3DA]">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center space-x-2">
                    <span className="w-6 h-6 rounded-full bg-[#44403C] text-white text-xs flex items-center justify-center font-medium">
                      R
                    </span>
                    <span className="font-semibold text-xs text-[#1C1917]">Rohan’s Note</span>
                  </div>
                  <span className="text-[11px] text-[#8C7E72]">Yesterday</span>
                </div>
                <p className="text-xs sm:text-sm text-[#44403C] leading-relaxed pl-8">
                  “I like the lighting but prefer a simpler table design so guests can see each other across the table easily.”
                </p>
              </div>

              {/* Note 3: Shared Decision */}
              <div className="p-4 rounded-2xl bg-[#F5ECE8] border-l-4 border-l-[#6B3037] border border-[#E8D4CF]">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center space-x-2">
                    <span className="w-6 h-6 rounded-full bg-[#6B3037] text-white text-xs flex items-center justify-center font-medium">
                      ✦
                    </span>
                    <span className="font-semibold text-xs text-[#6B3037] uppercase tracking-wider">Our Decision</span>
                  </div>
                  <span className="text-[11px] text-[#8C7E72]">Today</span>
                </div>
                <p className="text-xs sm:text-sm text-[#1C1917] font-medium leading-relaxed pl-8">
                  “Shortlist Petal & Stem. Request a quote for minimalist botanical tablescape.”
                </p>
              </div>
            </div>

            {/* Live Interactive Note Input for the Prototype */}
            <form onSubmit={handleQuickAdd} className="pt-4 border-t border-[#F4EFEA] flex flex-col sm:flex-row gap-2">
              <div className="flex items-center space-x-2 shrink-0">
                <select
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="text-xs bg-[#FAF8F5] border border-[#EAE3DA] rounded-lg px-2 py-2 text-[#1C1917] focus:outline-none"
                >
                  <option value="Anjali">Anjali</option>
                  <option value="Rohan">Rohan</option>
                  <option value="Both of Us">Both of Us</option>
                </select>
              </div>
              <input
                type="text"
                value={quickInput}
                onChange={(e) => setQuickInput(e.target.value)}
                placeholder="Leave a quick note on this moment..."
                className="flex-1 text-xs px-3.5 py-2 bg-[#FAF8F5] border border-[#EAE3DA] rounded-lg text-[#1C1917] placeholder-[#A8A29E] focus:outline-none focus:border-[#8E4A49]"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#1C1917] hover:bg-[#34302C] text-white text-xs font-medium rounded-lg whitespace-nowrap transition-colors"
              >
                Post Note
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
