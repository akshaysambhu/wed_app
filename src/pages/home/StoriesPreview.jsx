/**
 * StoriesPreview.jsx
 * Stories preview on homepage with Discuss attachments.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { REAL_WEDDINGS } from '../../data/mockData.js';
import StoryCard from '../../components/ui/StoryCard.jsx';
import { usePlanning } from '../../context/PlanningContext.jsx';

export default function StoriesPreview() {
  const { openDiscussion } = usePlanning();
  const stories = REAL_WEDDINGS.slice(0, 3); // Just show a few

  const handleDiscuss = (story) => {
    openDiscussion({ type: 'story', item: story });
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl text-[#1C1917] mb-3">Real celebrations. Real inspiration.</h2>
            <p className="text-[#78716C] text-lg">Explore beautiful moments and discuss ideas with your partner.</p>
          </div>
          <Link to="/stories" className="text-sm font-semibold text-[#6B3037] hover:underline whitespace-nowrap">
            View All Stories →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map(story => (
            <div key={story.id} className="group relative rounded-2xl overflow-hidden bg-[#FAF8F5] border border-[#EAE3DA]">
              <div className="aspect-[4/5] overflow-hidden">
                <img 
                  src={story.heroImage || story.image} 
                  alt={story.couple} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="font-serif text-2xl text-white mb-1">{story.couple}</h3>
                <p className="text-white/80 text-sm mb-4">📍 {story.location} · {story.season}</p>
                
                <div className="flex items-center gap-2">
                  <button className="flex-1 py-2.5 bg-white text-[#1C1917] text-xs font-semibold rounded-xl hover:bg-[#F4EFEA] transition-colors">
                    View Story
                  </button>
                  <button className="px-4 py-2.5 bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-semibold rounded-xl hover:bg-white/30 transition-colors">
                    Save
                  </button>
                  <button 
                    onClick={() => handleDiscuss(story)}
                    className="px-4 py-2.5 bg-[#6B3037] text-white text-xs font-semibold rounded-xl hover:bg-[#52242A] transition-colors"
                  >
                    Discuss
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
