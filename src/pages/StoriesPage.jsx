/**
 * StoriesPage.jsx — /stories
 * Dedicated page for all Real Wedding stories and editorial inspiration.
 */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { REAL_WEDDINGS } from '../data/mockData.js';
import StoryCard from '../components/ui/StoryCard.jsx';

export default function StoriesPage() {
  const [activeTab, setActiveTab] = useState('All');
  const tabs = ['All', 'Traditional Weddings', 'Destination', 'Intimate', 'Engagement'];

  const filteredStories = activeTab === 'All' 
    ? REAL_WEDDINGS 
    : REAL_WEDDINGS; // In a real app, filter based on story tags/categories

  return (
    <div className="min-h-screen bg-[#FAF8F5] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#8E4A49] mb-3">Inspiration</p>
          <h1 className="font-serif text-4xl md:text-5xl text-[#1C1917] mb-4">Real Weddings & Editorial</h1>
          <p className="text-[#78716C] text-lg">
            Explore beautiful celebrations and discover the talented vendors who brought them to life.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                activeTab === tab
                  ? 'bg-[#1C1917] text-white border-[#1C1917]'
                  : 'bg-white text-[#78716C] border-[#EAE3DA] hover:border-[#D4C5B9] hover:text-[#1C1917]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Featured Story */}
        <div className="mb-16">
          <div className="relative rounded-3xl overflow-hidden aspect-[2/1] md:aspect-[21/9] bg-[#1C1917] group cursor-pointer">
            <img 
              src={REAL_WEDDINGS[0].heroImage} 
              alt="Featured Wedding" 
              className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-bold uppercase tracking-widest rounded-full mb-4">
                Featured Story
              </span>
              <h2 className="font-serif text-3xl md:text-5xl text-white mb-3">{REAL_WEDDINGS[0].couple}</h2>
              <p className="text-white/80 md:text-lg max-w-xl mb-6">
                A beautiful {REAL_WEDDINGS[0].season.toLowerCase()} celebration in {REAL_WEDDINGS[0].location}, blending traditional elements with modern elegance.
              </p>
              <button className="px-6 py-3 bg-white text-[#1C1917] text-sm font-semibold rounded-full hover:bg-[#F4EFEA] transition-colors">
                Read Full Story
              </button>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStories.map(story => (
            <StoryCard key={story.id} story={story} />
          ))}
          {filteredStories.map(story => (
            <StoryCard key={`${story.id}-dup`} story={story} />
          ))}
        </div>

        {/* Load More */}
        <div className="mt-16 text-center">
          <button className="px-8 py-3 border-2 border-[#1C1917] text-[#1C1917] text-sm font-semibold rounded-full hover:bg-[#1C1917] hover:text-white transition-colors">
            Load More Stories
          </button>
        </div>

      </div>
    </div>
  );
}
