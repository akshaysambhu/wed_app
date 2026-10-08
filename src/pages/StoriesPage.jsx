/**
 * StoriesPage.jsx — /stories
 * Pinterest-style visual discovery platform.
 */
import React, { useState } from 'react';
import { usePlanning } from '../context/PlanningContext.jsx';

// We'll mock some varied aspect ratio images for the masonry layout
const MOCK_MASONRY_ITEMS = [
  { id: 'm1', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80', couple: 'Priya & Rahul', title: 'Golden Evening Decor', aspect: 'portrait', category: 'Weddings', location: 'Kochi' },
  { id: 'm2', image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80', couple: 'Anya & Dev', title: 'Minimalist Mandap', aspect: 'landscape', category: 'Weddings', location: 'Goa' },
  { id: 'm3', image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80', couple: 'Sarah & John', title: 'Vintage Car Entry', aspect: 'square', category: 'Engagements', location: 'Mumbai' },
  { id: 'm4', image: 'https://images.unsplash.com/photo-1530103862676-de889279c1af?w=800&q=80', couple: 'Meera & Sid', title: 'Beachside Reception', aspect: 'portrait', category: 'Weddings', location: 'Kerala' },
  { id: 'm5', image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80', couple: 'Tanya', title: 'Boho 1st Birthday', aspect: 'landscape', category: 'Birthdays', location: 'Bangalore' },
  { id: 'm6', image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&q=80', couple: 'Neha & Arjun', title: 'Floral Ceiling', aspect: 'portrait', category: 'Weddings', location: 'Delhi' },
  { id: 'm7', image: 'https://images.unsplash.com/photo-1542042161784-26ab9e041e89?w=800&q=80', couple: 'Riya & Karan', title: 'Haldi Setup', aspect: 'square', category: 'Weddings', location: 'Jaipur' },
  { id: 'm8', image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80', couple: 'Anjali', title: 'Classic Baptism', aspect: 'portrait', category: 'Baptisms', location: 'Kochi' },
  { id: 'm9', image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80', couple: 'Sneha & Rohit', title: 'Sangeet Stage', aspect: 'landscape', category: 'Weddings', location: 'Udaipur' },
];

const CATEGORIES = ['All', 'Weddings', 'Birthdays', 'Engagements', 'Baptisms', 'Anniversaries', 'Baby Showers', 'Other Celebrations'];
const FILTERS = ['Location', 'Theme', 'Season', 'Guest Count', 'Venue', 'Services', 'Style', 'Budget'];

export default function StoriesPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { openDiscussion } = usePlanning();

  const handleDiscuss = (e, item) => {
    e.stopPropagation();
    openDiscussion({
      type: 'photo',
      item: {
        url: item.image,
        caption: item.title,
        id: item.id
      }
    });
  };

  const handleAction = (e, action) => {
    e.stopPropagation();
    alert(`${action} triggered!`);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] pt-24 pb-20">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Search */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <h1 className="font-serif text-5xl md:text-6xl text-[#1C1917] mb-6">Real people. Real moments.</h1>
          <div className="relative">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[#A39081] text-lg">🔍</span>
            <input 
              type="text" 
              placeholder="Search weddings, venues, styles, locations, vendors…" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#EAE3DA] rounded-full pl-14 pr-6 py-4 text-base focus:outline-none focus:border-[#6B3037] transition-colors shadow-sm"
            />
          </div>
        </div>

        {/* Categories (Horizontal Scroll) */}
        <div className="flex overflow-x-auto pb-4 mb-6 -mx-4 px-4 sm:mx-0 sm:px-0 gap-3 hide-scrollbar justify-center">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-6 py-2.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-[#1C1917] text-white border-[#1C1917]'
                  : 'bg-white text-[#78716C] border-[#EAE3DA] hover:border-[#D4C5B9] hover:text-[#1C1917]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Filters & Sort */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
          <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar w-full md:w-auto">
            {FILTERS.map(filter => (
              <button key={filter} className="px-4 py-2 bg-white border border-[#EAE3DA] rounded-full text-xs font-semibold text-[#44403C] hover:bg-[#FDFBF7] flex items-center gap-1.5 flex-shrink-0">
                {filter} ▾
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 shrink-0 self-start md:self-auto">
            <span className="text-xs font-medium text-[#78716C]">Sort by:</span>
            <select className="bg-transparent text-sm font-semibold text-[#1C1917] focus:outline-none border-b border-[#D4C5B9] pb-1 cursor-pointer">
              <option>Most Popular</option>
              <option>Newest</option>
              <option>Trending</option>
              <option>Recently Added</option>
            </select>
          </div>
        </div>

        {/* Masonry Feed */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {MOCK_MASONRY_ITEMS.map((item) => (
            <div
              key={item.id}
              className="break-inside-avoid relative group rounded-2xl overflow-hidden bg-[#EAE3DA] cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                style={{ aspectRatio: item.aspect === 'portrait' ? '3/4' : item.aspect === 'landscape' ? '4/3' : '1/1' }}
                loading="lazy"
              />
              
              {/* Pinterest-style Hover Overlay */}
              <div className="absolute inset-0 bg-black/40 transition-all duration-300 flex flex-col justify-between p-4 opacity-0 group-hover:opacity-100">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-2">
                    <button 
                      onClick={(e) => handleAction(e, 'Share')}
                      className="w-10 h-10 bg-white/20 backdrop-blur-md hover:bg-white/40 text-white rounded-full flex items-center justify-center transition-colors border border-white/30"
                    >
                      ➦
                    </button>
                    <button 
                      onClick={(e) => handleAction(e, 'Save')}
                      className="w-10 h-10 bg-white/20 backdrop-blur-md hover:bg-white/40 text-white rounded-full flex items-center justify-center transition-colors border border-white/30"
                    >
                      ♥
                    </button>
                  </div>
                  <button 
                    onClick={(e) => handleDiscuss(e, item)}
                    className="px-5 py-2.5 bg-[#6B3037] text-white text-xs font-bold rounded-full hover:bg-[#52242A] transition-colors shadow-lg flex items-center gap-2"
                  >
                    <span>💬</span> Discuss
                  </button>
                </div>
                
                <div className="flex justify-between items-end">
                  <div className="text-left">
                    <p className="text-white font-semibold text-sm drop-shadow-md">{item.title}</p>
                    <p className="text-white/80 text-xs drop-shadow-md">{item.couple}</p>
                  </div>
                  <button 
                    onClick={(e) => handleAction(e, 'View Story')}
                    className="px-4 py-2 bg-white text-[#1C1917] text-xs font-bold rounded-full hover:bg-[#F4EFEA] transition-colors"
                  >
                    View Story
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
