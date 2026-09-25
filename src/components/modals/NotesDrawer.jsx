import React, { useState } from 'react';
import { usePlanning } from '../../context/PlanningContext.jsx';

export default function NotesDrawer() {
  const { notes, addNote, closeModal, activeModal } = usePlanning();
  const [filterTab, setFilterTab] = useState('all');
  const [author, setAuthor] = useState('Anjali');
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [isDecision, setIsDecision] = useState(false);

  // If opened with a specific item context
  const targetItem = activeModal?.data?.targetItem;
  const initialTarget = targetItem ? (targetItem.title || targetItem.name) : 'General Planning';

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!noteContent.trim()) return;

    addNote({
      author: isDecision ? 'Both of Us' : author,
      title: noteTitle.trim() || (isDecision ? 'Shared Agreement' : 'Couple Thought'),
      content: noteContent.trim(),
      targetTitle: initialTarget,
      isDecision: isDecision
    });

    setNoteTitle('');
    setNoteContent('');
    setIsDecision(false);
  };

  const filteredNotes = notes.filter((n) => {
    if (filterTab === 'all') return true;
    if (filterTab === 'anjali') return n.author === 'Anjali';
    if (filterTab === 'rohan') return n.author === 'Rohan';
    if (filterTab === 'decisions') return n.isDecision || n.type === 'shared_decision';
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-lg bg-[#FAF8F5] border-l border-[#EAE3DA] shadow-2xl flex flex-col justify-between animate-slideLeft">
          {/* Header */}
          <div className="p-6 border-b border-[#EAE3DA] bg-white flex items-center justify-between shrink-0">
            <div>
              <div className="flex items-center space-x-2">
                <span className="p-2 rounded-full bg-[#F5ECE8] text-[#8E4A49]">
                  ✏️
                </span>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-[#1C1917]">
                    Couple Notes & Decisions
                  </h3>
                  <span className="text-xs text-[#8C7E72]">
                    Private shared space for Anjali & Rohan
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={closeModal}
              className="p-2 text-[#8C7E72] hover:text-[#1C1917] rounded-full hover:bg-[#F4EFEA] transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Filter Tabs */}
          <div className="px-6 pt-4 pb-2 border-b border-[#EAE3DA] bg-[#FAF8F5] flex space-x-2 overflow-x-auto text-xs font-medium">
            {[
              { id: 'all', label: `All (${notes.length})` },
              { id: 'anjali', label: "Anjali's Notes" },
              { id: 'rohan', label: "Rohan's Notes" },
              { id: 'decisions', label: 'Decisions ✦' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterTab(tab.id)}
                className={`px-3 py-1.5 rounded-full transition-all whitespace-nowrap ${
                  filterTab === tab.id
                    ? 'bg-[#1C1917] text-white shadow-sm'
                    : 'bg-white text-[#57534E] hover:bg-[#EAE3DA] border border-[#EAE3DA]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Notes Stream */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {filteredNotes.length === 0 ? (
              <div className="text-center py-12 text-[#8C7E72] text-xs">
                No notes found in this tab. Add a note below!
              </div>
            ) : (
              filteredNotes.map((n) => (
                <div
                  key={n.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    n.isDecision || n.type === 'shared_decision'
                      ? 'bg-[#F5ECE8] border-[#E8D4CF] border-l-4 border-l-[#6B3037]'
                      : n.author === 'Anjali'
                      ? 'bg-white border-[#EAE3DA] border-l-4 border-l-[#8E4A49]'
                      : 'bg-white border-[#EAE3DA] border-l-4 border-l-[#44403C]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span
                        className={`w-5 h-5 rounded-full text-white text-[10px] flex items-center justify-center font-bold ${
                          n.isDecision || n.type === 'shared_decision'
                            ? 'bg-[#6B3037]'
                            : n.author === 'Anjali'
                            ? 'bg-[#8E4A49]'
                            : 'bg-[#44403C]'
                        }`}
                      >
                        {n.author[0]}
                      </span>
                      <span className="font-semibold text-xs text-[#1C1917]">{n.author}</span>
                      {n.isDecision && (
                        <span className="px-2 py-0.5 rounded-full bg-[#6B3037] text-white text-[9px] uppercase font-bold tracking-wider">
                          Decision
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-[#8C7E72]">{n.date}</span>
                  </div>

                  <div className="text-[11px] font-medium text-[#8C7E72] mb-1">
                    Regarding: <span className="text-[#1C1917]">{n.targetTitle}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#44403C] leading-relaxed">
                    {n.content}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* Form to Post New Note */}
          <div className="p-6 border-t border-[#EAE3DA] bg-white">
            <form onSubmit={handleAddNote} className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#1C1917]">
                  Add Note regarding: <span className="text-[#8E4A49]">{initialTarget}</span>
                </span>
                <div className="flex items-center space-x-1.5">
                  <span className="text-[#8C7E72]">Author:</span>
                  <select
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="text-xs bg-[#FAF8F5] border border-[#EAE3DA] rounded px-2 py-1 focus:outline-none"
                  >
                    <option value="Anjali">Anjali</option>
                    <option value="Rohan">Rohan</option>
                  </select>
                </div>
              </div>

              <textarea
                rows={2}
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                placeholder="Write your note or question for your partner..."
                className="w-full text-xs p-3 rounded-xl bg-[#FAF8F5] border border-[#EAE3DA] text-[#1C1917] placeholder-[#A8A29E] focus:outline-none focus:border-[#8E4A49]"
              />

              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 text-xs text-[#57534E] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isDecision}
                    onChange={(e) => setIsDecision(e.target.checked)}
                    className="rounded text-[#6B3037] focus:ring-[#6B3037]"
                  />
                  <span>Mark as Our Shared Decision</span>
                </label>

                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1C1917] hover:bg-[#34302C] text-white text-xs font-medium rounded-xl transition-colors"
                >
                  Save Note
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
