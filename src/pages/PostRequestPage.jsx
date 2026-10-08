/**
 * PostRequestPage.jsx — /post-request
 * A dedicated page where couples can post custom requirements to the marketplace.
 * Vendors matching the requirement can then reach out with proposals.
 */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function PostRequestPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    budget: '',
    date: '',
    details: ''
  });

  const categories = [
    'Traditional Music (Chenda/Nadaswaram)',
    'Live Entertainment & Bands',
    'Specialty Lighting & Fireworks',
    'Luxury Car Rentals',
    'Custom Wedding Favours',
    'Destination Wedding Planners',
    'Other Custom Request'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(2); // Show success state
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {step === 1 ? (
          <div className="bg-white border border-[#EAE3DA] rounded-3xl p-6 md:p-10 shadow-sm animate-fadeIn">
            <div className="mb-8">
              <Link to="/shortlist" className="text-xs font-medium text-[#78716C] hover:text-[#1C1917] mb-4 inline-block">
                ← Back to Shortlist
              </Link>
              <h1 className="font-serif text-3xl md:text-4xl text-[#1C1917] mb-3">Post a Custom Request</h1>
              <p className="text-[#78716C] text-sm md:text-base">
                Can't find exactly what you're looking for? Describe your requirement and we'll notify specialized vendors who can bring your vision to life.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-[#1C1917] mb-2">What kind of service?</label>
                <select 
                  required
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value})}
                  className="w-full bg-[#FDFBF7] border border-[#EAE3DA] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#6B3037] text-[#1C1917]"
                >
                  <option value="">Select a category...</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-[#1C1917] mb-2">Request Title</label>
                <input 
                  required
                  type="text"
                  placeholder="e.g. 5-piece live jazz band for cocktail evening"
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full bg-[#FDFBF7] border border-[#EAE3DA] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#6B3037] text-[#1C1917]"
                />
              </div>

              {/* Grid: Budget & Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-[#1C1917] mb-2">Estimated Budget (Optional)</label>
                  <input 
                    type="text"
                    placeholder="e.g. ₹50,000 - ₹80,000"
                    value={formData.budget}
                    onChange={e => setFormData({...formData, budget: e.target.value})}
                    className="w-full bg-[#FDFBF7] border border-[#EAE3DA] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#6B3037] text-[#1C1917]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1C1917] mb-2">Required Date</label>
                  <input 
                    required
                    type="date"
                    value={formData.date}
                    onChange={e => setFormData({...formData, date: e.target.value})}
                    className="w-full bg-[#FDFBF7] border border-[#EAE3DA] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#6B3037] text-[#1C1917]"
                  />
                </div>
              </div>

              {/* Details */}
              <div>
                <label className="block text-sm font-semibold text-[#1C1917] mb-2">Detailed Description</label>
                <textarea 
                  required
                  rows={5}
                  placeholder="Tell vendors exactly what you envision. Include details like duration, specific styles, venue constraints, or guest count..."
                  value={formData.details}
                  onChange={e => setFormData({...formData, details: e.target.value})}
                  className="w-full bg-[#FDFBF7] border border-[#EAE3DA] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#6B3037] text-[#1C1917] resize-none"
                />
              </div>

              {/* Submit */}
              <div className="pt-4">
                <button 
                  type="submit"
                  className="w-full md:w-auto px-8 py-3.5 bg-[#6B3037] text-white text-sm font-semibold rounded-xl hover:bg-[#52242A] transition-colors"
                >
                  Post to Marketplace
                </button>
                <p className="text-xs text-[#A39081] mt-4 text-center md:text-left">
                  Your contact details remain private until you choose to respond to a vendor's proposal.
                </p>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-white border border-[#EAE3DA] rounded-3xl p-10 md:p-16 text-center shadow-sm animate-fadeIn">
            <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
              ✓
            </div>
            <h2 className="font-serif text-3xl text-[#1C1917] mb-3">Request Posted Successfully</h2>
            <p className="text-[#78716C] mb-8 max-w-md mx-auto">
              We've broadcasted your request to verified vendors in your region matching this category. You'll receive proposals in your inbox shortly.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => navigate('/shortlist')}
                className="px-6 py-3 border border-[#EAE3DA] text-[#1C1917] text-sm font-medium rounded-xl hover:bg-[#F4EFEA] transition-colors w-full sm:w-auto"
              >
                Back to Shortlist
              </button>
              <button 
                onClick={() => {
                  setFormData({ title: '', category: '', budget: '', date: '', details: '' });
                  setStep(1);
                }}
                className="px-6 py-3 bg-[#1C1917] text-white text-sm font-medium rounded-xl hover:bg-[#34302C] transition-colors w-full sm:w-auto"
              >
                Post Another Request
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
