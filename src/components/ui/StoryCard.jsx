/**
 * StoryCard.jsx — Reusable real wedding story card
 * Used across: RealWeddingsSection, StoriesPage, SearchOverlay
 */
import React from 'react';
import { usePlanning } from '../../context/PlanningContext.jsx';

export default function StoryCard({ story, onClick, compact = false }) {
  const { openModal } = usePlanning();

  const handleClick = () => {
    if (onClick) onClick(story);
    else openModal('realWedding', story);
  };

  if (compact) {
    return (
      <button
        onClick={handleClick}
        className="flex items-center gap-3 bg-[#FDFBF7] border border-[#EAE3DA] rounded-xl p-3 hover:shadow-sm transition-shadow text-left w-full"
      >
        <img src={story.heroImage} alt={`${story.couple} wedding`} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
        <div className="min-w-0">
          <p className="font-semibold text-sm text-[#1C1917] truncate">{story.couple}</p>
          <p className="text-xs text-[#78716C]">{story.location} · {story.guests}</p>
        </div>
      </button>
    );
  }

  return (
    <div className="group cursor-pointer" onClick={handleClick}>
      <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#EAE3DA] mb-4">
        <img
          src={story.heroImage}
          alt={`${story.couple} wedding`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="text-white text-xs font-medium border border-white/40 px-4 py-2 rounded-lg backdrop-blur-sm hover:bg-white/10">
            View Full Story →
          </button>
        </div>
        {/* Season badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded-full text-[11px] bg-white/90 text-[#1C1917] font-medium">
            {story.season}
          </span>
        </div>
      </div>
      <div>
        <p className="text-xs text-[#8E4A49] font-semibold mb-1 uppercase tracking-wider">{story.location}</p>
        <h3 className="font-serif text-xl text-[#1C1917] mb-1">{story.couple}</h3>
        <p className="text-xs text-[#78716C]">{story.guests}</p>
      </div>
    </div>
  );
}
