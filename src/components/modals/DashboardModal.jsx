import React, { useState } from 'react';
import { usePlanning } from '../../context/PlanningContext.jsx';

export default function DashboardModal() {
  const { dashboardState, toggleTask, closeModal, openModal, savedItems, compareItems, notes } = usePlanning();
  const [newTaskInput, setNewTaskInput] = useState('');

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskInput.trim()) return;
    alert(`Task "${newTaskInput.trim()}" added to your wedding checklist.`);
    setNewTaskInput('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm p-4 sm:p-6 lg:p-8 flex items-center justify-center animate-fadeIn">
      <div className="bg-[#FAF8F5] border border-[#EAE3DA] rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-6 border-b border-[#EAE3DA] bg-white flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-2 rounded-full bg-[#F5ECE8] text-[#8E4A49]">
                📋
              </span>
              <div>
                <h3 className="font-serif text-xl font-semibold text-[#1C1917]">
                  {dashboardState.weddingName}
                </h3>
                <span className="text-xs text-[#8C7E72]">
                  {dashboardState.weddingDate} · {dashboardState.daysRemaining} days remaining
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={closeModal}
            className="p-2 text-[#8C7E72] hover:text-[#1C1917] rounded-full hover:bg-[#F4EFEA] transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-[#EAE3DA]">
              <span className="text-xs text-[#8C7E72]">Planning Status</span>
              <span className="font-serif text-2xl font-bold text-[#8E4A49] block mt-1">62% Done</span>
              <span className="text-[10px] text-[#A39081]">On schedule</span>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-[#EAE3DA]">
              <span className="text-xs text-[#8C7E72]">Saved Inspirations</span>
              <span className="font-serif text-2xl font-bold text-[#1C1917] block mt-1">{savedItems.length} items</span>
              <button onClick={() => { closeModal(); openModal('saved'); }} className="text-[10px] text-[#8E4A49] font-medium">View Saved →</button>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-[#EAE3DA]">
              <span className="text-xs text-[#8C7E72]">Shortlisted Vendors</span>
              <span className="font-serif text-2xl font-bold text-[#1C1917] block mt-1">{compareItems.length} pros</span>
              <button onClick={() => { closeModal(); openModal('compare'); }} className="text-[10px] text-[#6B3037] font-medium">Compare →</button>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-[#EAE3DA]">
              <span className="text-xs text-[#8C7E72]">Joint Notes</span>
              <span className="font-serif text-2xl font-bold text-[#1C1917] block mt-1">{notes.length} notes</span>
              <button onClick={() => { closeModal(); openModal('notes'); }} className="text-[10px] text-[#8E4A49] font-medium">See Notes →</button>
            </div>
          </div>

          {/* Interactive Checklist */}
          <div className="bg-white p-6 rounded-2xl border border-[#EAE3DA]">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-serif text-lg font-medium text-[#1C1917]">
                Milestone Tasks
              </h4>
              <span className="text-xs text-[#8C7E72]">Click checkbox to toggle status</span>
            </div>

            <div className="space-y-3">
              {dashboardState.tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                    task.completed
                      ? 'bg-[#FAF8F5] border-[#EAE3DA] text-[#8C7E72] line-through'
                      : 'bg-white border-[#EAE3DA] hover:border-[#D4C5B9] text-[#1C1917]'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => {}}
                      className="rounded text-[#8E4A49] focus:ring-[#8E4A49]"
                    />
                    <span className="text-xs sm:text-sm font-medium">{task.title}</span>
                  </div>
                  <span className="text-[11px] text-[#A39081]">
                    {task.completed ? 'Completed' : 'Pending'}
                  </span>
                </div>
              ))}
            </div>

            {/* Quick Add Task */}
            <form onSubmit={handleAddTask} className="mt-4 flex gap-2">
              <input
                type="text"
                value={newTaskInput}
                onChange={(e) => setNewTaskInput(e.target.value)}
                placeholder="Add a new wedding planning task..."
                className="flex-1 text-xs px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#EAE3DA] text-[#1C1917] focus:outline-none focus:border-[#8E4A49]"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#1C1917] hover:bg-[#34302C] text-white text-xs font-medium rounded-xl whitespace-nowrap"
              >
                Add Task
              </button>
            </form>
          </div>

          {/* Pending Decisions List */}
          <div className="bg-white p-6 rounded-2xl border border-[#EAE3DA]">
            <h4 className="font-serif text-lg font-medium text-[#1C1917] mb-4">
              Pending Partner Decisions
            </h4>

            <div className="space-y-3">
              {dashboardState.pendingDecisions.map((dec) => (
                <div key={dec.id} className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EAE3DA] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-semibold text-[#1C1917] block">{dec.title}</span>
                    <span className="text-[11px] text-[#8C7E72]">Options: {dec.options.join(', ')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] px-2.5 py-1 rounded-full bg-[#F5ECE8] text-[#8E4A49] font-medium">
                      {dec.status}
                    </span>
                    <button
                      onClick={() => {
                        closeModal();
                        openModal('notes', { targetItem: { title: dec.title } });
                      }}
                      className="text-xs text-[#1C1917] hover:text-[#8E4A49] font-medium"
                    >
                      Discuss →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
