/**
 * CommunityRequestsPage.jsx — /community-requests & /post-request
 * Plan My Moments Community Requests page
 *
 * SPECIFICATION:
 * Purpose: Customers can post requests for services they cannot find.
 *
 * FEED:
 * - Visual social-style request feed.
 * - Each request:
 *   - Customer profile (avatar, name, badge)
 *   - Event type (Wedding, Birthday, etc.)
 *   - Location
 *   - Date
 *   - Requirement
 *   - Description
 *   - Budget
 *   - Optional image
 *   - Time posted
 * - Example: “Looking for a traditional Kerala Chenda team for my wedding reception in Kochi.”
 * - Actions: Interested, Message, Save
 *
 * VENDOR RESPONSE:
 * - Vendors or relevant users can message the customer.
 * - Messages must enter a private conversation.
 *
 * CUSTOMER ACTIONS:
 * - If someone responds:
 *   - View profile
 *   - Discuss
 *   - Shortlist
 *   - Finalise
 *
 * PRIVACY:
 * - Only information intentionally posted to the request feed is public.
 * - Private planning information remains private.
 */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usePlanning } from '../context/PlanningContext.jsx';

// ── SEED COMMUNITY REQUESTS ─────────────────────────────────────────────────

const INITIAL_REQUESTS = [
  {
    id: 'req-chenda-kochi',
    customer: {
      name: 'Anjali & Midhun',
      username: '@anjali_midhun',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      badge: 'Verified Couple · Dec 2026',
    },
    eventType: 'Wedding Reception',
    eventIcon: '💍',
    location: 'Kochi, Kerala',
    date: 'Dec 14, 2026',
    requirement: 'Looking for a traditional Kerala Chenda team for my wedding reception in Kochi.',
    description: 'We need an authentic 8 to 10 member traditional Kerala Chenda Melam / Singari Melam troupe to welcome our guests and perform a 45-minute high-energy set as the couple enters the waterfront reception lawn. Traditional Kasavu attire required.',
    budget: '₹35,000 – ₹50,000',
    budgetRaw: 45000,
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=85',
    timePosted: '2 hours ago',
    interestedCount: 24,
    saved: false,
    responses: [
      {
        id: 'resp-1',
        vendorId: 'travancore-rhythms',
        vendorName: 'Travancore Rhythm Ensemble',
        category: 'Traditional Music & Chenda Melam',
        location: 'Fort Kochi, Kerala',
        rating: 4.9,
        reviewsCount: 38,
        priceFormatted: '₹40,000 (10 Artists)',
        priceRaw: 40000,
        avatar: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=200&q=80',
        image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80',
        message: 'Namaskaram Anjali & Midhun! We are a dedicated 10-artist Panchari & Singari Melam group based in Kochi. We perform in pristine Kasavu mundu with traditional brass cymbals. We have Dec 14 open for your waterfront lawn entry!',
        time: '45 mins ago',
      },
      {
        id: 'resp-2',
        vendorId: 'kochi-melam-artists',
        vendorName: 'Kochi Melam Artists',
        category: 'Chenda & Nadaswaram',
        location: 'Ernakulam, Kerala',
        rating: 4.8,
        reviewsCount: 29,
        priceFormatted: '₹38,000 (8 Artists)',
        priceRaw: 38000,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=600&q=80',
        message: 'Hello! We specialize in ceremonial couple entrances and energetic fusion beats. Can provide 8 chenda artists + 2 ilathalam cymbal players. Proposal PDF sent to your private inbox.',
        time: '1 hour ago',
      },
    ],
  },
  {
    id: 'req-jazz-goa',
    customer: {
      name: 'Maya & Alex',
      username: '@maya_alex',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
      badge: 'Couple Planning · Jan 2027',
    },
    eventType: 'Cocktail & Sangeet',
    eventIcon: '🎷',
    location: 'South Goa',
    date: 'Jan 22, 2027',
    requirement: 'Seeking a 5-piece live jazz & saxophone band for beachfront cocktail evening in Goa.',
    description: 'Looking for a smooth retro and contemporary jazz band with female vocalist, upright bass, keys, drums, and saxophone for our sunset seaside cocktail party. 3-hour duration.',
    budget: '₹60,000 – ₹85,000',
    budgetRaw: 75000,
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=900&q=85',
    timePosted: '5 hours ago',
    interestedCount: 18,
    saved: false,
    responses: [
      {
        id: 'resp-jazz-1',
        vendorId: 'saltwater-jazz',
        vendorName: 'Saltwater Jazz Collective',
        category: 'Live Entertainment',
        location: 'Panaji, Goa',
        rating: 4.9,
        reviewsCount: 44,
        priceFormatted: '₹70,000 (5-Piece Band)',
        priceRaw: 70000,
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
        message: 'Hey Maya & Alex! We are a Goa-based acoustic jazz quintet. We play vintage bossa nova, swing, and modern covers tailored for sunset cocktails. We would love to play for you.',
        time: '3 hours ago',
      },
    ],
  },
  {
    id: 'req-sadhya-ernakulam',
    customer: {
      name: 'Rahul & Pooja',
      username: '@rahul_pooja',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
      badge: 'Verified Couple · Nov 2026',
    },
    eventType: 'Wedding Lunch',
    eventIcon: '🍛',
    location: 'Ernakulam, Kerala',
    date: 'Nov 18, 2026',
    requirement: 'Need an authentic pure vegetarian Travancore 24-dish Sadhya team for 500 guests.',
    description: 'Grand traditional Kerala wedding feast served on fresh banana leaves with pure ghee payasam, live spiced filter coffee station, and experienced service team in traditional veshti.',
    budget: '₹650 – ₹800 / guest',
    budgetRaw: 70000,
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=900&q=85',
    timePosted: '1 day ago',
    interestedCount: 31,
    saved: true,
    responses: [
      {
        id: 'resp-sadhya-1',
        vendorId: 'gather-and-graze',
        vendorName: 'Gather & Graze',
        category: 'Catering & Culinary Design',
        location: 'Ernakulam, Kerala',
        rating: 4.8,
        reviewsCount: 61,
        priceFormatted: '₹680 / guest (24 Courses)',
        priceRaw: 68000,
        avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=200&q=80',
        image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=600&q=80',
        message: 'Hello Rahul! Our heritage catering wing specializes in authentic 24-course Travancore Sadhya with organic ingredients sourced directly from local farmers. Includes brass dinnerware & live filter coffee counter.',
        time: '18 hours ago',
      },
    ],
  },
];

export default function CommunityRequestsPage() {
  const navigate = useNavigate();
  const {
    isShortlisted,
    toggleShortlist,
    isFinalised,
    finaliseVendor,
    openDiscussion,
    showToast,
  } = usePlanning();

  const [requests, setRequests] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('pmm_community_requests'));
      return stored && stored.length ? stored : INITIAL_REQUESTS;
    } catch {
      return INITIAL_REQUESTS;
    }
  });

  const [filterCategory, setFilterCategory] = useState('all');
  const [showPostComposer, setShowPostComposer] = useState(false);

  // Composer Form State
  const [formData, setFormData] = useState({
    eventType: 'Wedding Reception',
    location: 'Kochi, Kerala',
    date: '2026-12-14',
    requirement: '',
    description: '',
    budget: '',
    imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
  });

  // Responding Vendor Modal State
  const [activeRespondRequest, setActiveRespondRequest] = useState(null);
  const [vendorMessage, setVendorMessage] = useState('');
  const [vendorQuote, setVendorQuote] = useState('');

  // Selected Profile Preview Modal State
  const [previewProfile, setPreviewProfile] = useState(null);

  // Toggle Interested action
  const handleToggleInterested = (reqId) => {
    setRequests(prev => prev.map(req => {
      if (req.id === reqId) {
        const hasLiked = req.userLiked;
        return {
          ...req,
          userLiked: !hasLiked,
          interestedCount: hasLiked ? req.interestedCount - 1 : req.interestedCount + 1,
        };
      }
      return req;
    }));
    showToast('Updated your interest in this request!');
  };

  // Toggle Save action
  const handleToggleSave = (reqId) => {
    setRequests(prev => prev.map(req => {
      if (req.id === reqId) {
        const newSaved = !req.saved;
        showToast(newSaved ? 'Saved request to your collection' : 'Removed request from saved');
        return { ...req, saved: newSaved };
      }
      return req;
    }));
  };

  // Submit New Request to Feed
  const handleCreateRequest = (e) => {
    e.preventDefault();
    if (!formData.requirement.trim()) return;

    const newReq = {
      id: `req-${Date.now()}`,
      customer: {
        name: 'You & Partner',
        username: '@you_partner',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        badge: 'Verified Couple · 2026',
      },
      eventType: formData.eventType,
      eventIcon: formData.eventType.includes('Wedding') ? '💍' : formData.eventType.includes('Birthday') ? '🎂' : '✨',
      location: formData.location,
      date: formData.date ? new Date(formData.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Winter 2026',
      requirement: formData.requirement,
      description: formData.description || 'Custom wedding celebration requirement posted to the community feed.',
      budget: formData.budget || 'Open for quotes',
      budgetRaw: 50000,
      image: formData.imageUrl,
      timePosted: 'Just now',
      interestedCount: 1,
      saved: false,
      responses: [],
    };

    const updated = [newReq, ...requests];
    setRequests(updated);
    try { localStorage.setItem('pmm_community_requests', JSON.stringify(updated)); } catch {}

    setFormData({
      eventType: 'Wedding Reception',
      location: 'Kochi, Kerala',
      date: '2026-12-14',
      requirement: '',
      description: '',
      budget: '',
      imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
    });
    setShowPostComposer(false);
    showToast('Your custom request was published to the community feed! 🎉');
  };

  // Submit Vendor Response
  const handleSendVendorResponse = (e) => {
    e.preventDefault();
    if (!activeRespondRequest) return;

    const newResponse = {
      id: `resp-${Date.now()}`,
      vendorId: `vendor-${Date.now()}`,
      vendorName: 'Verified Regional Specialist',
      category: activeRespondRequest.eventType,
      location: activeRespondRequest.location,
      rating: 4.9,
      reviewsCount: 18,
      priceFormatted: vendorQuote ? `₹${vendorQuote}` : 'Tailored Quote',
      priceRaw: parseInt(vendorQuote, 10) || 45000,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      image: activeRespondRequest.image,
      message: vendorMessage || 'Hello! We reviewed your requirement and would love to provide our services for your celebration. Proposal attached.',
      time: 'Just now',
    };

    const updated = requests.map(req => {
      if (req.id === activeRespondRequest.id) {
        return {
          ...req,
          responses: [newResponse, ...(req.responses || [])],
        };
      }
      return req;
    });

    setRequests(updated);
    try { localStorage.setItem('pmm_community_requests', JSON.stringify(updated)); } catch {}

    setActiveRespondRequest(null);
    setVendorMessage('');
    setVendorQuote('');
    showToast('Your response has entered a private conversation with the customer! 🔒');
  };

  // Filtered Requests
  const filteredRequests = requests.filter(req => {
    if (filterCategory === 'all') return true;
    return req.eventType.toLowerCase().includes(filterCategory.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-[#FAF8F5] pt-24 pb-24 font-sans selection:bg-[#E8D4CF] selection:text-[#6B3037]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── BREADCRUMB ──────────────────────────────────────────────────── */}
        <nav className="mb-6 text-xs text-[#78716C] flex items-center gap-2" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-[#6B3037] transition-colors">Home</Link>
          <span className="text-[#D4C5B9]">/</span>
          <span className="text-[#1C1917] font-medium">Community Requests</span>
        </nav>

        {/* ── HEADER ──────────────────────────────────────────────────────── */}
        <div className="mb-10 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F5ECE8] text-[#8E4A49] mb-3">
              <span>📢</span>
              <span>Community Marketplace Feed</span>
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-[#1C1917] font-bold tracking-tight mb-2">
              Community Requests
            </h1>
            <p className="text-sm sm:text-base text-[#57534E] max-w-xl">
              Can't find a specific service? Post your custom request here. Regional vendors and artisans respond directly with tailored proposals.
            </p>
          </div>

          <button
            onClick={() => setShowPostComposer(prev => !prev)}
            className="px-6 py-3.5 bg-[#1C1917] hover:bg-[#6B3037] text-white font-semibold text-sm rounded-2xl shadow-lg transition-all flex items-center gap-2 flex-shrink-0 active:scale-95"
          >
            <span>✍️</span>
            <span>{showPostComposer ? 'Close Form' : 'Post a Request'}</span>
          </button>
        </div>

        {/* ── PRIVACY BANNER ──────────────────────────────────────────────── */}
        <div className="bg-[#FAF6F0] rounded-2xl p-4 border border-[#EAE3DA] mb-8 flex items-start gap-3">
          <span className="text-xl flex-shrink-0 mt-0.5">🔒</span>
          <div className="text-xs text-[#57534E] leading-relaxed">
            <strong className="text-[#1C1917] block mb-0.5">Community Feed Privacy Guarantee:</strong>
            Only information intentionally posted to the request feed is public. Your private couple discussions, internal budget breakdowns, shortlist voting, and personal planning information remain strictly private.
          </div>
        </div>

        {/* ── POST COMPOSER (Expandable Social Composer) ──────────────────── */}
        {showPostComposer && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE3DA] shadow-xl mb-10 animate-slideUp">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#F4EFEA]">
              <div className="flex items-center gap-2">
                <span className="text-xl">✍️</span>
                <h2 className="text-lg font-bold text-[#1C1917]">Create a Custom Request</h2>
              </div>
              <button
                onClick={() => setShowPostComposer(false)}
                className="text-xs text-[#78716C] hover:text-[#1C1917]"
              >
                ✕ Cancel
              </button>
            </div>

            <form onSubmit={handleCreateRequest} className="space-y-5">
              {/* Requirement Headline (Client example: “Looking for a traditional Kerala Chenda team for my wedding reception in Kochi.”) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1C1917] mb-1.5">
                  Requirement Headline *
                </label>
                <input
                  type="text"
                  required
                  value={formData.requirement}
                  onChange={e => setFormData({ ...formData, requirement: e.target.value })}
                  placeholder="e.g. Looking for a traditional Kerala Chenda team for my wedding reception in Kochi."
                  className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#EAE3DA] rounded-xl text-sm text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#6B3037]/20"
                />
                <button
                  type="button"
                  onClick={() => setFormData({
                    ...formData,
                    requirement: 'Looking for a traditional Kerala Chenda team for my wedding reception in Kochi.',
                    eventType: 'Wedding Reception',
                    location: 'Kochi, Kerala',
                    budget: '₹35,000 – ₹50,000',
                    description: 'We need an authentic 8 to 10 member traditional Kerala Chenda Melam / Singari Melam troupe to welcome our guests and perform a 45-minute high-energy set as the couple enters the waterfront reception lawn. Traditional Kasavu attire required.',
                  })}
                  className="text-[11px] text-[#8E4A49] font-semibold mt-1.5 hover:underline text-left block"
                >
                  ⚡ Auto-fill client example: “Looking for a traditional Kerala Chenda team for my wedding reception in Kochi.”
                </button>
              </div>

              {/* Grid: Event Type, Location, Date, Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1C1917] mb-1.5">
                    Event Type
                  </label>
                  <select
                    value={formData.eventType}
                    onChange={e => setFormData({ ...formData, eventType: e.target.value })}
                    className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#EAE3DA] rounded-xl text-xs text-[#1C1917] focus:outline-none"
                  >
                    <option value="Wedding Reception">Wedding Reception</option>
                    <option value="Wedding Ceremony">Wedding Ceremony</option>
                    <option value="Cocktail & Sangeet">Cocktail & Sangeet</option>
                    <option value="1st Birthday Celebration">1st Birthday Celebration</option>
                    <option value="Baptism Celebration">Baptism Celebration</option>
                    <option value="Engagement Soiree">Engagement Soiree</option>
                    <option value="Anniversary">Anniversary</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1C1917] mb-1.5">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Kochi, Kerala"
                    className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#EAE3DA] rounded-xl text-xs text-[#1C1917] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1C1917] mb-1.5">
                    Event Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#EAE3DA] rounded-xl text-xs text-[#1C1917] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1C1917] mb-1.5">
                    Budget
                  </label>
                  <input
                    type="text"
                    value={formData.budget}
                    onChange={e => setFormData({ ...formData, budget: e.target.value })}
                    placeholder="e.g. ₹40,000 – ₹60,000"
                    className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#EAE3DA] rounded-xl text-xs text-[#1C1917] focus:outline-none"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1C1917] mb-1.5">
                  Detailed Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Explain requirements in detail: artist count, duration, preferred style, constraints, timing..."
                  className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#EAE3DA] rounded-xl text-xs sm:text-sm text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#6B3037]/20"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <p className="text-[11px] text-[#78716C]">
                  🔒 Your private couple discussions remain strictly protected.
                </p>
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#6B3037] hover:bg-[#52242A] text-white font-semibold text-xs sm:text-sm rounded-xl shadow-md transition-all active:scale-95"
                >
                  Publish to Community Feed
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ── CATEGORY FILTER TABS ────────────────────────────────────────── */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto no-scrollbar pb-1">
          {[
            { id: 'all', label: 'All Requests', icon: '📢' },
            { id: 'wedding', label: 'Weddings', icon: '💍' },
            { id: 'cocktail', label: 'Cocktail & Sangeet', icon: '🎷' },
            { id: 'lunch', label: 'Catering & Feasts', icon: '🍛' },
            { id: 'birthday', label: 'Birthdays', icon: '🎂' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilterCategory(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                filterCategory === tab.id
                  ? 'bg-[#1C1917] text-white shadow-xs'
                  : 'bg-white text-[#78716C] hover:text-[#1C1917] border border-[#EAE3DA]'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* ── VISUAL SOCIAL-STYLE REQUEST FEED ────────────────────────────── */}
        <div className="space-y-8">
          {filteredRequests.map((req) => (
            <article
              key={req.id}
              className="bg-white rounded-3xl border border-[#EAE3DA] shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              {/* Header: Customer Profile & Time */}
              <div className="p-6 pb-4 flex items-start justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <img
                    src={req.customer.avatar}
                    alt={req.customer.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-[#EAE3DA] shadow-2xs"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm sm:text-base text-[#1C1917] leading-tight">
                        {req.customer.name}
                      </h3>
                      <span className="text-[10px] bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                        {req.customer.badge || 'Verified Couple'}
                      </span>
                    </div>
                    <p className="text-xs text-[#78716C] mt-0.5">
                      {req.customer.username} · Posted {req.timePosted}
                    </p>
                  </div>
                </div>

                {/* Event Type & Location Badges */}
                <div className="flex flex-col sm:flex-row items-end sm:items-center gap-1.5 text-right sm:text-left">
                  <span className="text-xs font-bold bg-[#FAF6F0] text-[#8E4A49] border border-[#EAE3DA] px-2.5 py-1 rounded-full">
                    {req.eventIcon || '✨'} {req.eventType}
                  </span>
                  <span className="text-xs font-medium text-[#78716C]">
                    📍 {req.location}
                  </span>
                </div>
              </div>

              {/* Body: Requirement Headline, Details, Meta Tags */}
              <div className="px-6 pb-4">
                {/* Requirement Headline (Client specified format) */}
                <h2 className="text-lg sm:text-xl font-bold text-[#1C1917] leading-snug mb-3 hover:text-[#6B3037] transition-colors">
                  “{req.requirement}”
                </h2>

                <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed mb-4">
                  {req.description}
                </p>

                {/* Tags row: Date & Budget */}
                <div className="flex flex-wrap items-center gap-2.5 text-xs">
                  <span className="inline-flex items-center gap-1.5 bg-[#FAF8F5] text-[#1C1917] px-3 py-1.5 rounded-xl border border-[#EAE3DA] font-semibold">
                    <span>📅 Event Date:</span>
                    <span>{req.date}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-[#FAF8F5] text-[#8E4A49] px-3 py-1.5 rounded-xl border border-[#EAE3DA] font-bold">
                    <span>💰 Budget:</span>
                    <span>{req.budget}</span>
                  </span>
                </div>
              </div>

              {/* Optional Visual Image */}
              {req.image && (
                <div className="px-6 pb-4">
                  <div className="h-64 sm:h-72 w-full rounded-2xl overflow-hidden bg-[#F4EFEA] relative group">
                    <img
                      src={req.image}
                      alt={req.requirement}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    />
                    <div className="absolute bottom-2.5 right-3 bg-black/60 text-white text-[10px] px-2.5 py-1 rounded-full backdrop-blur-xs">
                      Customer Reference Photo
                    </div>
                  </div>
                </div>
              )}

              {/* Feed Actions Bar: Interested, Message, Save (Exact Client Specification) */}
              <div className="px-6 py-3.5 bg-[#FAF8F5] border-t border-[#EAE3DA] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  {/* Action 1: Interested */}
                  <button
                    onClick={() => handleToggleInterested(req.id)}
                    className={`px-4 py-2 rounded-xl font-semibold transition-all flex items-center gap-1.5 active:scale-95 ${
                      req.userLiked
                        ? 'bg-[#6B3037] text-white shadow-xs'
                        : 'bg-white hover:bg-[#F4EFEA] text-[#1C1917] border border-[#EAE3DA]'
                    }`}
                  >
                    <span>{req.userLiked ? '❤️' : '🤍'}</span>
                    <span>Interested ({req.interestedCount})</span>
                  </button>

                  {/* Action 2: Message (Enters private conversation) */}
                  <button
                    onClick={() => {
                      setActiveRespondRequest(req);
                      setVendorMessage(`Hello ${req.customer.name}! We saw your request for: "${req.requirement}". We are available on ${req.date} and would love to provide our services. Here is our itemized proposal:`);
                    }}
                    className="px-4 py-2 bg-[#1C1917] hover:bg-[#6B3037] text-white rounded-xl font-semibold transition-all shadow-xs flex items-center gap-1.5 active:scale-95"
                  >
                    <span>💬</span>
                    <span>Message Customer</span>
                  </button>
                </div>

                {/* Action 3: Save */}
                <button
                  onClick={() => handleToggleSave(req.id)}
                  className={`px-3 py-2 rounded-xl font-semibold transition-colors flex items-center gap-1.5 ${
                    req.saved
                      ? 'text-amber-800 bg-amber-50 border border-amber-300'
                      : 'text-[#78716C] hover:text-[#1C1917] bg-white border border-[#EAE3DA]'
                  }`}
                >
                  <span>{req.saved ? '★' : '☆'}</span>
                  <span>{req.saved ? 'Saved' : 'Save'}</span>
                </button>
              </div>

              {/* ────────────────────────────────────────────────────────────
                  RESPONSES ACCORDION: CUSTOMER ACTIONS
                  "If someone responds: View profile, Discuss, Shortlist, Finalise"
                 ──────────────────────────────────────────────────────────── */}
              {req.responses && req.responses.length > 0 && (
                <div className="p-6 bg-[#FAF6F0] border-t border-[#EAE3DA]">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#1C1917]">
                        Proposals from Regional Specialists ({req.responses.length})
                      </h4>
                    </div>
                    <span className="text-[10px] text-[#8E4A49] font-semibold bg-white px-2 py-0.5 rounded-full border border-[#EAE3DA]">
                      Private Responses
                    </span>
                  </div>

                  <div className="space-y-3.5">
                    {req.responses.map(resp => {
                      const shortlisted = isShortlisted(resp.vendorId);
                      const finalised = isFinalised(resp.vendorId);

                      return (
                        <div
                          key={resp.id}
                          className="bg-white rounded-2xl p-4 sm:p-5 border border-[#EAE3DA] shadow-xs"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2.5">
                            <div className="flex items-center gap-3">
                              <img
                                src={resp.avatar}
                                alt={resp.vendorName}
                                className="w-10 h-10 rounded-full object-cover ring-1 ring-[#EAE3DA]"
                              />
                              <div>
                                <h5 className="font-bold text-sm text-[#1C1917] leading-tight flex items-center gap-1.5">
                                  <span>{resp.vendorName}</span>
                                  <span className="text-amber-700 text-xs">★ {resp.rating}</span>
                                </h5>
                                <p className="text-[11px] text-[#78716C]">
                                  {resp.category} · {resp.location} · {resp.time}
                                </p>
                              </div>
                            </div>

                            <div className="text-right">
                              <span className="text-xs font-extrabold text-[#6B3037] bg-[#FAF8F5] px-2.5 py-1 rounded-lg border border-[#EAE3DA] inline-block">
                                {resp.priceFormatted}
                              </span>
                            </div>
                          </div>

                          {/* Message Body */}
                          <p className="text-xs text-[#57534E] leading-relaxed bg-[#FAF8F5] p-3 rounded-xl border border-[#F4EFEA] mb-3.5 italic">
                            "{resp.message}"
                          </p>

                          {/* 4 CUSTOMER ACTIONS (Exact Client Specification):
                              1. View profile
                              2. Discuss
                              3. Shortlist
                              4. Finalise */}
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-[#F4EFEA]">
                            {/* 1. View profile */}
                            <button
                              onClick={() => setPreviewProfile(resp)}
                              className="py-1.5 px-2 bg-[#FAF8F5] hover:bg-[#F4EFEA] text-[#1C1917] text-xs font-semibold rounded-xl border border-[#EAE3DA] transition-colors text-center"
                            >
                              View profile
                            </button>

                            {/* 2. Discuss */}
                            <button
                              onClick={() => {
                                openDiscussion({
                                  type: 'vendor',
                                  item: {
                                    id: resp.vendorId,
                                    name: resp.vendorName,
                                    category: resp.category,
                                    location: resp.location,
                                    rating: resp.rating,
                                    startingPrice: resp.priceFormatted,
                                    image: resp.image,
                                  },
                                });
                              }}
                              className="py-1.5 px-2 bg-[#1C1917] hover:bg-[#6B3037] text-white text-xs font-semibold rounded-xl transition-colors text-center flex items-center justify-center gap-1"
                            >
                              <span>💬</span>
                              <span>Discuss</span>
                            </button>

                            {/* 3. Shortlist */}
                            <button
                              onClick={() => {
                                toggleShortlist({
                                  id: resp.vendorId,
                                  name: resp.vendorName,
                                  category: resp.category,
                                  location: resp.location,
                                  rating: resp.rating,
                                  priceFormatted: resp.priceFormatted,
                                  image: resp.image,
                                });
                              }}
                              className={`py-1.5 px-2 text-xs font-semibold rounded-xl border transition-all text-center ${
                                shortlisted
                                  ? 'bg-amber-50 text-amber-900 border-amber-300 font-bold'
                                  : 'bg-[#FAF8F5] hover:bg-amber-50/50 text-[#1C1917] border-[#EAE3DA]'
                              }`}
                            >
                              {shortlisted ? '✓ Shortlisted' : '+ Shortlist'}
                            </button>

                            {/* 4. Finalise */}
                            <button
                              onClick={() => {
                                if (finalised) {
                                  showToast(`${resp.vendorName} is already finalised in your crew`);
                                } else {
                                  finaliseVendor({
                                    id: resp.vendorId,
                                    name: resp.vendorName,
                                    category: resp.category,
                                    location: resp.location,
                                    rating: resp.rating,
                                    priceFormatted: resp.priceFormatted,
                                    image: resp.image,
                                  });
                                }
                              }}
                              className={`py-1.5 px-2 text-xs font-semibold rounded-xl border transition-all text-center ${
                                finalised
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold'
                                  : 'bg-[#6B3037] hover:bg-[#52242A] text-white border-transparent'
                              }`}
                            >
                              {finalised ? '✓ Finalised' : 'Finalise'}
                            </button>
                          </div>

                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>

      </div>

      {/* ── MODAL 1: VENDOR RESPONSE / PRIVATE CONVERSATION ─────────────── */}
      {activeRespondRequest && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs p-4 flex items-center justify-center animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#EAE3DA] shadow-2xl relative">
            <button
              onClick={() => setActiveRespondRequest(null)}
              className="absolute top-5 right-5 text-[#78716C] hover:text-[#1C1917] text-sm p-1"
            >
              ✕
            </button>

            <span className="text-xs font-bold uppercase tracking-wider text-[#8E4A49] block mb-1">
              Private Proposal
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1917] mb-2 leading-tight">
              Respond to {activeRespondRequest.customer.name}
            </h3>
            <p className="text-xs text-[#78716C] mb-5">
              “{activeRespondRequest.requirement}”
            </p>

            <div className="bg-[#FAF6F0] p-3 rounded-xl border border-[#EAE3DA] text-[11px] text-[#57534E] mb-5">
              🔒 <strong>Private Conversation:</strong> Your proposal and quotation enter a secure, private communication thread directly with the customer.
            </div>

            <form onSubmit={handleSendVendorResponse} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1C1917] mb-1">
                  Quote Amount (INR)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 40,000"
                  value={vendorQuote}
                  onChange={e => setVendorQuote(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#EAE3DA] rounded-xl text-sm font-semibold text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#6B3037]/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1C1917] mb-1">
                  Private Proposal Message *
                </label>
                <textarea
                  rows={4}
                  required
                  value={vendorMessage}
                  onChange={e => setVendorMessage(e.target.value)}
                  placeholder="Describe your service package, artist count, deliverables, and availability..."
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#EAE3DA] rounded-xl text-xs sm:text-sm text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#6B3037]/20"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveRespondRequest(null)}
                  className="px-4 py-2.5 text-xs text-[#78716C] hover:text-[#1C1917]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#6B3037] hover:bg-[#52242A] text-white font-semibold text-xs sm:text-sm rounded-xl shadow-md transition-all active:scale-95"
                >
                  Send Private Proposal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL 2: VENDOR PROFILE PREVIEW ──────────────────────────────── */}
      {previewProfile && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs p-4 flex items-center justify-center animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden border border-[#EAE3DA] shadow-2xl relative">
            <div className="h-36 relative bg-[#1C1917]">
              <img src={previewProfile.image} alt={previewProfile.vendorName} className="w-full h-full object-cover opacity-80" />
              <button
                onClick={() => setPreviewProfile(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center text-xs"
              >
                ✕
              </button>
              <div className="absolute -bottom-6 left-6">
                <img
                  src={previewProfile.avatar}
                  alt={previewProfile.vendorName}
                  className="w-16 h-16 rounded-full object-cover ring-4 ring-white shadow-md"
                />
              </div>
            </div>

            <div className="pt-9 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg text-[#1C1917]">{previewProfile.vendorName}</h3>
                  <p className="text-xs text-[#78716C]">{previewProfile.category} · 📍 {previewProfile.location}</p>
                </div>
                <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                  ★ {previewProfile.rating}
                </span>
              </div>

              <div className="mt-4 p-3 bg-[#FAF8F5] rounded-xl border border-[#EAE3DA]">
                <p className="text-[10px] text-[#78716C] uppercase font-bold">Quoted Pricing</p>
                <p className="text-base font-extrabold text-[#6B3037] mt-0.5">{previewProfile.priceFormatted}</p>
              </div>

              <p className="text-xs text-[#57534E] leading-relaxed mt-4">
                Verified regional artisan and celebration specialist. Over {previewProfile.reviewsCount || 20} successful celebrations coordinated across Kerala.
              </p>

              <div className="mt-6 flex items-center gap-2">
                <button
                  onClick={() => {
                    openDiscussion({
                      type: 'vendor',
                      item: {
                        id: previewProfile.vendorId,
                        name: previewProfile.vendorName,
                        category: previewProfile.category,
                        location: previewProfile.location,
                        rating: previewProfile.rating,
                        startingPrice: previewProfile.priceFormatted,
                        image: previewProfile.image,
                      },
                    });
                    setPreviewProfile(null);
                  }}
                  className="flex-1 py-2.5 bg-[#1C1917] hover:bg-[#6B3037] text-white text-xs font-semibold rounded-xl transition-colors text-center"
                >
                  💬 Discuss with Partner
                </button>
                <button
                  onClick={() => {
                    toggleShortlist({
                      id: previewProfile.vendorId,
                      name: previewProfile.vendorName,
                      category: previewProfile.category,
                      location: previewProfile.location,
                      rating: previewProfile.rating,
                      priceFormatted: previewProfile.priceFormatted,
                      image: previewProfile.image,
                    });
                    setPreviewProfile(null);
                  }}
                  className="py-2.5 px-4 bg-[#FAF8F5] hover:bg-amber-50 text-[#1C1917] text-xs font-semibold rounded-xl border border-[#EAE3DA] transition-colors"
                >
                  + Shortlist
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
