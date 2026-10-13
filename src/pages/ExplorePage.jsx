/**
 * ExplorePage.jsx — /explore & /search
 * Global Search & Explore Page for Plan My Moments
 *
 * SPECIFICATION:
 * - Search across: Vendors, Venues, Services, Stories, Photos, Packages, Requests
 * - Search example: “Wedding photographer Kochi”
 * - Show grouped results
 * - Filters: Location, Event, Service, Price, Rating, Availability
 * - Sort: Recommended, Highest Rated, Most Reviewed, Newest, Price
 * - Every relevant result supports: View, Shortlist, Discuss
 */
import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { usePlanning } from '../context/PlanningContext.jsx';
import { STORIES_BY_AMAL } from '../data/vendorData.js';
import { VENDORS, VENUES, REAL_WEDDINGS, INSPIRATIONS, VENDOR_CATEGORIES } from '../data/mockData.js';

// ── DATA CATALOG ────────────────────────────────────────────────────────────

// 1. VENDORS
const ALL_VENDORS = [
  {
    id: 'stories-by-amal',
    name: 'Stories by Amal',
    category: 'Photography',
    subCategory: 'Candid & Natural Light',
    location: 'Kochi, Kerala',
    city: 'Kochi',
    rating: 4.9,
    reviewsCount: 128,
    priceFormatted: 'From ₹45,000',
    priceRaw: 45000,
    priceUnit: 'per event',
    image: STORIES_BY_AMAL.heroImage,
    slug: 'stories-by-amal',
    eventTypes: ['Wedding', 'Ceremony', 'Pre-Wedding', 'Reception'],
    availability: 'Accepting 2026/2027',
    responseTime: '< 2 hours',
    featured: true,
    description: 'Natural, emotional, and timeless wedding photography focusing on quiet glances and genuine laughter.',
    tags: ['Wedding photographer Kochi', 'Candid', 'Kerala', 'Natural Light', 'Fine Art'],
  },
  ...VENDORS.map(v => ({
    ...v,
    city: v.location.includes('Kochi') ? 'Kochi' : v.location.includes('Ernakulam') ? 'Ernakulam' : v.location.includes('Goa') ? 'Goa' : v.location.includes('Kumarakom') ? 'Kumarakom' : 'Kerala',
    eventTypes: ['Wedding', 'Reception', 'Ceremony'],
    availability: 'Accepting 2026/2027',
    responseTime: '< 2 hours',
    slug: v.id === 'vendor-1' ? 'stories-by-amal' : v.id,
    tags: [v.name, v.category, v.location, v.style || '', 'Wedding'],
  })),
];

// 2. VENUES
const ALL_VENUES = [
  {
    id: 'venue-1',
    name: 'Cedar Hall',
    category: 'Venue',
    subCategory: 'Lakeside Lawn & Heritage Pavilion',
    location: 'Kumarakom, Kerala',
    city: 'Kumarakom',
    rating: 4.9,
    reviewsCount: 74,
    priceFormatted: 'From ₹2,20,000',
    priceRaw: 220000,
    priceUnit: 'per day',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=85',
    capacity: '200–800 guests',
    eventTypes: ['Wedding', 'Reception', 'Ceremony', 'Welcome Party'],
    availability: 'Accepting 2026/2027',
    responseTime: '< 3 hours',
    featured: true,
    description: 'Manicured waterfront lawns, vintage teak pillars, and panoramic backwater sunset vistas.',
    tags: ['Venue Kumarakom', 'Lakeside', 'Waterfront', 'Outdoor Wedding', 'Lawn'],
  },
  {
    id: 'venue-2',
    name: 'Willow House',
    category: 'Venue',
    subCategory: 'Restored Dutch Courtyard',
    location: 'Kochi, Kerala',
    city: 'Kochi',
    rating: 4.8,
    reviewsCount: 52,
    priceFormatted: 'From ₹1,80,000',
    priceRaw: 180000,
    priceUnit: 'per day',
    image: 'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=800&q=85',
    capacity: '100–500 guests',
    eventTypes: ['Wedding', 'Reception', 'Sangeet'],
    availability: 'Accepting 2026/2027',
    responseTime: '< 2 hours',
    featured: true,
    description: 'Exposed brick arches, ancient rain trees, and intimate shaded courtyards in historic Fort Kochi.',
    tags: ['Venue Kochi', 'Heritage', 'Courtyard', 'Fort Kochi', 'Colonial'],
  },
  {
    id: 'venue-3',
    name: 'Casa do Mar',
    category: 'Venue',
    subCategory: 'Clifftop Oceanfront Villa',
    location: 'South Goa',
    city: 'Goa',
    rating: 4.9,
    reviewsCount: 68,
    priceFormatted: 'From ₹3,10,000',
    priceRaw: 310000,
    priceUnit: 'per day',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=85',
    capacity: '150–350 guests',
    eventTypes: ['Wedding', 'Reception', 'Welcome Party'],
    availability: 'Available This Season',
    responseTime: '< 4 hours',
    featured: false,
    description: 'Dramatic clifftop lawn overlooking the Arabian Sea with Portuguese colonial architecture.',
    tags: ['Venue Goa', 'Beach Wedding', 'Oceanfront', 'Clifftop', 'Destination'],
  },
];

// 3. SERVICES
const ALL_SERVICES = [
  {
    id: 'srv-photo',
    name: 'Wedding Photography & Editorial Portraits',
    category: 'Photography',
    serviceType: 'Photography',
    location: 'Kochi, Kerala',
    city: 'Kochi',
    rating: 4.9,
    reviewsCount: 148,
    priceFormatted: 'From ₹45,000',
    priceRaw: 45000,
    image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=85',
    eventTypes: ['Wedding', 'Ceremony', 'Pre-Wedding', 'Reception'],
    availability: 'Accepting 2026/2027',
    description: 'Candid storytelling, natural light ceremonies, high-resolution galleries, and fine art lay-flat albums.',
    tags: ['Wedding photographer Kochi', 'Photography', 'Editorial', 'Portraits', 'Kerala'],
  },
  {
    id: 'srv-video',
    name: 'Cinematic Videography & Aerial Drone',
    category: 'Videography',
    serviceType: 'Videography',
    location: 'Kochi & Goa',
    city: 'Kochi',
    rating: 4.9,
    reviewsCount: 96,
    priceFormatted: 'From ₹65,000',
    priceRaw: 65000,
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=85',
    eventTypes: ['Wedding', 'Reception', 'Ceremony'],
    availability: 'Accepting 2026/2027',
    description: '4K feature films, cinematic trailers, emotional teasers, and licensed aerial drone perspectives.',
    tags: ['Videography', 'Cinematography', 'Drone', '4K Film', 'Kochi'],
  },
  {
    id: 'srv-cater',
    name: 'Artisanal Catering & Traditional Sadhya',
    category: 'Catering',
    serviceType: 'Catering',
    location: 'Ernakulam, Kerala',
    city: 'Ernakulam',
    rating: 4.8,
    reviewsCount: 82,
    priceFormatted: 'From ₹650 / guest',
    priceRaw: 65000,
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=85',
    eventTypes: ['Wedding', 'Reception'],
    availability: 'Accepting 2026/2027',
    description: 'Multi-course Travancore Sadhya, coastal seafood grills, craft mocktail bars, and artisanal dessert stations.',
    tags: ['Catering', 'Sadhya', 'Food', 'Feast', 'Ernakulam', 'Kerala'],
  },
  {
    id: 'srv-decor',
    name: 'Bespoke Floral & Spatial Design',
    category: 'Decoration',
    serviceType: 'Decoration',
    location: 'Kochi, Kerala',
    city: 'Kochi',
    rating: 4.8,
    reviewsCount: 110,
    priceFormatted: 'From ₹65,000',
    priceRaw: 65000,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=85',
    eventTypes: ['Wedding', 'Reception', 'Ceremony'],
    availability: 'Accepting 2026/2027',
    description: 'Mandap styling, tablescapes with brass candelabras, sustainable foam-free florals, and ambient lighting.',
    tags: ['Decoration', 'Florals', 'Mandap', 'Lighting', 'Kochi'],
  },
  {
    id: 'srv-makeup',
    name: 'Bridal Glow & Hair Artistry',
    category: 'Makeup',
    serviceType: 'Makeup',
    location: 'Kochi, Kerala',
    city: 'Kochi',
    rating: 4.9,
    reviewsCount: 104,
    priceFormatted: 'From ₹35,000',
    priceRaw: 35000,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=85',
    eventTypes: ['Wedding', 'Reception', 'Pre-Wedding'],
    availability: 'Accepting 2026/2027',
    description: 'Skin-first dewy bridal looks, saree draping, hair extension styling, and pre-wedding skin trials.',
    tags: ['Makeup', 'Bridal', 'Glow', 'Hair', 'Kochi'],
  },
];

// 4. STORIES (Real Weddings)
const ALL_STORIES = REAL_WEDDINGS.map(w => ({
  id: w.id,
  name: `${w.couple}’s Wedding`,
  couple: w.couple,
  category: 'Story',
  location: w.location,
  city: w.location.includes('Kochi') ? 'Kochi' : w.location.includes('Kumarakom') ? 'Kumarakom' : 'Goa',
  season: w.season,
  guests: w.guests,
  rating: 4.9,
  reviewsCount: 42,
  priceFormatted: 'From ₹85,000',
  priceRaw: 85000,
  image: w.heroImage,
  eventTypes: ['Wedding', 'Reception', 'Ceremony'],
  availability: 'View Full Story',
  description: w.story,
  highlights: w.highlights,
  tags: [w.couple, 'Real Wedding', w.location, w.season, 'Story', 'Wedding photographer Kochi'],
}));

// 5. PHOTOS (Inspirations)
const ALL_PHOTOS = INSPIRATIONS.map(i => ({
  id: i.id,
  name: i.title,
  title: i.title,
  category: 'Photo',
  subCategory: i.category,
  location: i.location,
  city: i.location.includes('Kochi') ? 'Kochi' : i.location.includes('Kumarakom') ? 'Kumarakom' : 'Goa',
  rating: 4.9,
  reviewsCount: 38,
  priceFormatted: 'Inspiration',
  priceRaw: 50000,
  image: i.image,
  couple: i.couple,
  eventTypes: [i.category === 'Bridal' ? 'Pre-Wedding' : i.category === 'Reception' ? 'Reception' : 'Ceremony'],
  availability: 'Curated Item',
  description: i.description,
  tags: [i.title, i.category, i.location, 'Photo', 'Inspiration', 'Wedding photographer Kochi'],
}));

// 6. PACKAGES
const ALL_PACKAGES = [
  {
    id: 'pkg-story',
    name: 'Story Package',
    vendorName: 'Stories by Amal',
    category: 'Package',
    serviceType: 'Photography',
    location: 'Kochi, Kerala',
    city: 'Kochi',
    rating: 4.9,
    reviewsCount: 128,
    priceFormatted: '₹45,000',
    priceRaw: 45000,
    duration: '6 hours',
    image: STORIES_BY_AMAL.heroImage,
    eventTypes: ['Wedding', 'Ceremony'],
    availability: 'Accepting 2026/2027',
    description: '6 hours coverage, 1 lead photographer, 300+ edited photographs, 48-hour preview gallery.',
    tags: ['Story Package', 'Stories by Amal', 'Photography', 'Kochi', 'Wedding photographer Kochi'],
  },
  {
    id: 'pkg-chapter',
    name: 'Chapter Package',
    vendorName: 'Stories by Amal',
    category: 'Package',
    serviceType: 'Photography',
    location: 'Kochi, Kerala',
    city: 'Kochi',
    rating: 4.9,
    reviewsCount: 128,
    priceFormatted: '₹75,000',
    priceRaw: 75000,
    duration: 'Full day (10–12 hrs)',
    image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=85',
    eventTypes: ['Wedding', 'Reception', 'Ceremony'],
    availability: 'Accepting 2026/2027',
    description: 'Full day (10–12 hrs), 2 photographers, 600+ edited photographs, handcrafted lay-flat linen album.',
    tags: ['Chapter Package', 'Stories by Amal', 'Full Day', 'Photography', 'Kochi', 'Wedding photographer Kochi'],
  },
  {
    id: 'pkg-legacy',
    name: 'Legacy Package',
    vendorName: 'Stories by Amal',
    category: 'Package',
    serviceType: 'Photography',
    location: 'Kochi, Kerala',
    city: 'Kochi',
    rating: 4.9,
    reviewsCount: 128,
    priceFormatted: '₹1,20,000',
    priceRaw: 120000,
    duration: '3-Day Multi-Event',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=85',
    eventTypes: ['Wedding', 'Reception', 'Pre-Wedding', 'Ceremony'],
    availability: 'Accepting 2026/2027',
    description: 'Multi-day coverage, 3 photographers + 4K drone cinematography, 1000+ edits, 2 luxury heirloom albums.',
    tags: ['Legacy Package', 'Stories by Amal', 'Multi Day', 'Drone', 'Wedding photographer Kochi'],
  },
  {
    id: 'pkg-sadhya',
    name: 'Heritage Classic Sadhya',
    vendorName: 'Gather & Graze',
    category: 'Package',
    serviceType: 'Catering',
    location: 'Ernakulam, Kerala',
    city: 'Ernakulam',
    rating: 4.8,
    reviewsCount: 61,
    priceFormatted: '₹650 / guest',
    priceRaw: 65000,
    duration: 'Full Service',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=85',
    eventTypes: ['Wedding'],
    availability: 'Accepting 2026/2027',
    description: '12 courses authentic Travancore feast, brass dinnerware, spiced filter coffee counter, uniform staff.',
    tags: ['Catering Package', 'Sadhya', 'Gather & Graze', 'Ernakulam', 'Feast'],
  },
  {
    id: 'pkg-mandap',
    name: 'Bespoke Botanical Mandap',
    vendorName: 'Petal & Stem',
    category: 'Package',
    serviceType: 'Decoration',
    location: 'Kochi, Kerala',
    city: 'Kochi',
    rating: 4.8,
    reviewsCount: 96,
    priceFormatted: '₹85,000',
    priceRaw: 85000,
    duration: 'Full Installation',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=85',
    eventTypes: ['Ceremony', 'Wedding'],
    availability: 'Accepting 2026/2027',
    description: 'Sustainable floral arch, aisle styling with floating brass urlis, atmospheric lanterns, and 3D mockup.',
    tags: ['Mandap Package', 'Petal & Stem', 'Decor', 'Kochi', 'Florals'],
  },
];

// 7. REQUESTS
const ALL_REQUESTS = [
  {
    id: 'req-1',
    name: 'Candid photographer for 2-day wedding in Kochi',
    title: 'Seeking candid photographer in Kochi with natural light focus for Dec 2026',
    category: 'Request',
    serviceType: 'Photography',
    location: 'Kochi, Kerala',
    city: 'Kochi',
    rating: 5.0,
    reviewsCount: 8,
    priceFormatted: 'Budget: ₹80,000 – ₹1,20,000',
    priceRaw: 100000,
    date: 'Dec 12–14, 2026',
    image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=85',
    eventTypes: ['Wedding', 'Ceremony', 'Pre-Wedding'],
    availability: 'Open for Proposals',
    description: 'We are looking for an unobtrusive candid photographer who values genuine family moments over stiff poses. Waterfront mandap ceremony in Kochi.',
    tags: ['Wedding photographer Kochi', 'Candid', 'Custom Request', 'Dec 2026'],
  },
  {
    id: 'req-2',
    name: 'Lakeside lawn venue with outside catering',
    title: 'Lakeside lawn venue in Kumarakom with outside catering allowed for 350 guests',
    category: 'Request',
    serviceType: 'Venue',
    location: 'Kumarakom, Kerala',
    city: 'Kumarakom',
    rating: 4.9,
    reviewsCount: 5,
    priceFormatted: 'Budget: ₹2,50,000',
    priceRaw: 250000,
    date: 'Jan 2027',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=85',
    eventTypes: ['Wedding', 'Reception'],
    availability: 'Open for Proposals',
    description: 'Need a lakefront outdoor venue with sunset views, private pier, bridal suites, and flexible curfew.',
    tags: ['Venue Request', 'Kumarakom', 'Lakeside', 'Custom Request'],
  },
  {
    id: 'req-3',
    name: 'Traditional 16-dish Sadhya with live filter coffee',
    title: 'Traditional Kerala Sadhya for 500 guests with live hot filter coffee station',
    category: 'Request',
    serviceType: 'Catering',
    location: 'Ernakulam, Kerala',
    city: 'Ernakulam',
    rating: 4.8,
    reviewsCount: 12,
    priceFormatted: 'Budget: ₹700 / guest',
    priceRaw: 70000,
    date: 'Nov 2026',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=85',
    eventTypes: ['Wedding'],
    availability: 'Open for Proposals',
    description: 'Authentic pure vegetarian traditional sadhya served on plantain leaves with brass tableware.',
    tags: ['Catering Request', 'Sadhya', 'Ernakulam', 'Custom Request'],
  },
];

// ── COMPONENT ───────────────────────────────────────────────────────────────

export default function ExplorePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const {
    isShortlisted,
    toggleShortlist,
    openDiscussion,
    openModal,
    showToast,
  } = usePlanning();

  // Search input query
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);

  // Active Category Group Tab
  // 'all' | 'vendors' | 'venues' | 'services' | 'stories' | 'photos' | 'packages' | 'requests'
  const [activeGroup, setActiveGroup] = useState('all');

  // Filters State
  const [filterLocation, setFilterLocation] = useState('all');
  const [filterEvent, setFilterEvent] = useState('all');
  const [filterService, setFilterService] = useState('all');
  const [filterPrice, setFilterPrice] = useState('all');
  const [filterRating, setFilterRating] = useState('all');
  const [filterAvailability, setFilterAvailability] = useState('all');

  // Sort State
  // 'recommended' | 'highest_rated' | 'most_reviewed' | 'newest' | 'price_low' | 'price_high'
  const [sortBy, setSortBy] = useState('recommended');

  // Quick search example click
  const handleQuickSearch = (term) => {
    setQuery(term);
    setSearchParams(term ? { q: term } : {});
  };

  // Sync state when URL param changes
  useEffect(() => {
    const qParam = searchParams.get('q') || '';
    setQuery(qParam);
  }, [searchParams]);

  // Submit search
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParams(query.trim() ? { q: query.trim() } : {});
  };

  // Reset all filters
  const handleResetFilters = () => {
    setFilterLocation('all');
    setFilterEvent('all');
    setFilterService('all');
    setFilterPrice('all');
    setFilterRating('all');
    setFilterAvailability('all');
    setSortBy('recommended');
  };

  // Matching algorithm for items
  const matchesSearch = (item, q) => {
    if (!q) return true;
    const cleanQ = q.toLowerCase().trim();
    const searchTerms = cleanQ.split(/\s+/);

    const targetString = [
      item.name || '',
      item.title || '',
      item.couple || '',
      item.category || '',
      item.subCategory || '',
      item.location || '',
      item.city || '',
      item.serviceType || '',
      item.description || '',
      item.vendorName || '',
      ...(item.tags || []),
    ].join(' ').toLowerCase();

    // Check if every search word is present or partial match
    return searchTerms.some(term => targetString.includes(term));
  };

  // Filter application
  const applyFilters = (items) => {
    return items.filter(item => {
      // 1. Text Search
      if (!matchesSearch(item, query)) return false;

      // 2. Location filter
      if (filterLocation !== 'all' && item.city !== filterLocation) {
        if (!item.location?.toLowerCase().includes(filterLocation.toLowerCase())) return false;
      }

      // 3. Event filter
      if (filterEvent !== 'all') {
        if (!item.eventTypes?.includes(filterEvent)) return false;
      }

      // 4. Service filter
      if (filterService !== 'all') {
        const itemCat = (item.category || item.serviceType || '').toLowerCase();
        if (!itemCat.includes(filterService.toLowerCase())) return false;
      }

      // 5. Price filter
      if (filterPrice !== 'all' && item.priceRaw) {
        if (filterPrice === 'under_50k' && item.priceRaw > 50000) return false;
        if (filterPrice === '50k_100k' && (item.priceRaw < 50000 || item.priceRaw > 100000)) return false;
        if (filterPrice === '100k_250k' && (item.priceRaw < 100000 || item.priceRaw > 250000)) return false;
        if (filterPrice === 'above_250k' && item.priceRaw < 250000) return false;
      }

      // 6. Rating filter
      if (filterRating !== 'all' && item.rating) {
        const minRating = parseFloat(filterRating);
        if (item.rating < minRating) return false;
      }

      // 7. Availability filter
      if (filterAvailability !== 'all') {
        if (filterAvailability === '2026_2027' && !item.availability?.includes('2026')) return false;
        if (filterAvailability === 'fast_response' && !item.responseTime?.includes('< 2')) return false;
      }

      return true;
    });
  };

  // Sort application
  const applySort = (items) => {
    return [...items].sort((a, b) => {
      if (sortBy === 'highest_rated') return (b.rating || 0) - (a.rating || 0);
      if (sortBy === 'most_reviewed') return (b.reviewsCount || 0) - (a.reviewsCount || 0);
      if (sortBy === 'price_low') return (a.priceRaw || 0) - (b.priceRaw || 0);
      if (sortBy === 'price_high') return (b.priceRaw || 0) - (a.priceRaw || 0);
      if (sortBy === 'newest') return (b.id || '').localeCompare(a.id || '');
      // 'recommended': default relevance match
      return 0;
    });
  };

  // Filtered & Sorted Lists
  const filteredVendors = useMemo(() => applySort(applyFilters(ALL_VENDORS)), [query, filterLocation, filterEvent, filterService, filterPrice, filterRating, filterAvailability, sortBy]);
  const filteredVenues = useMemo(() => applySort(applyFilters(ALL_VENUES)), [query, filterLocation, filterEvent, filterService, filterPrice, filterRating, filterAvailability, sortBy]);
  const filteredServices = useMemo(() => applySort(applyFilters(ALL_SERVICES)), [query, filterLocation, filterEvent, filterService, filterPrice, filterRating, filterAvailability, sortBy]);
  const filteredStories = useMemo(() => applySort(applyFilters(ALL_STORIES)), [query, filterLocation, filterEvent, filterService, filterPrice, filterRating, filterAvailability, sortBy]);
  const filteredPhotos = useMemo(() => applySort(applyFilters(ALL_PHOTOS)), [query, filterLocation, filterEvent, filterService, filterPrice, filterRating, filterAvailability, sortBy]);
  const filteredPackages = useMemo(() => applySort(applyFilters(ALL_PACKAGES)), [query, filterLocation, filterEvent, filterService, filterPrice, filterRating, filterAvailability, sortBy]);
  const filteredRequests = useMemo(() => applySort(applyFilters(ALL_REQUESTS)), [query, filterLocation, filterEvent, filterService, filterPrice, filterRating, filterAvailability, sortBy]);

  const totalCount = filteredVendors.length + filteredVenues.length + filteredServices.length + filteredStories.length + filteredPhotos.length + filteredPackages.length + filteredRequests.length;

  const hasActiveFilters = filterLocation !== 'all' || filterEvent !== 'all' || filterService !== 'all' || filterPrice !== 'all' || filterRating !== 'all' || filterAvailability !== 'all';

  // Universal Item Handlers: View, Shortlist, Discuss
  const handleView = (type, item) => {
    if (type === 'vendor' && item.slug) {
      navigate(`/vendor/${item.slug}`);
    } else if (type === 'story') {
      openModal('real_wedding', item);
    } else {
      openModal('item_detail', item);
    }
  };

  const handleShortlist = (item) => {
    toggleShortlist({
      id: item.id,
      name: item.name || item.title,
      category: item.category || item.serviceType || 'Curated',
      location: item.location || 'Kerala',
      rating: item.rating || 4.9,
      image: item.image,
      priceFormatted: item.priceFormatted,
    });
  };

  const handleDiscuss = (type, item) => {
    openDiscussion({
      type,
      item: {
        id: item.id,
        name: item.name || item.title,
        category: item.category || item.serviceType || 'Curated',
        location: item.location || 'Kerala',
        rating: item.rating || 4.9,
        reviewsCount: item.reviewsCount,
        startingPrice: item.priceFormatted,
        priceFormatted: item.priceFormatted,
        image: item.image,
        slug: item.slug,
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] pt-24 pb-20 font-sans selection:bg-[#E8D4CF] selection:text-[#6B3037]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── BREADCRUMB ──────────────────────────────────────────────────── */}
        <nav className="mb-6 text-xs text-[#78716C] flex items-center gap-2" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-[#6B3037] transition-colors">Home</Link>
          <span className="text-[#D4C5B9]">/</span>
          <span className="text-[#1C1917] font-medium">Explore & Search</span>
        </nav>

        {/* ── HEADER ──────────────────────────────────────────────────────── */}
        <div className="mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F5ECE8] text-[#8E4A49] mb-3">
            <span>🔍</span>
            <span>Global Search & Marketplace</span>
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#1C1917] font-bold tracking-tight mb-3">
            Explore celebration ideas, crew & services.
          </h1>
          <p className="text-sm sm:text-base text-[#57534E] max-w-3xl">
            Search across verified vendors, venues, service catalogs, real stories, high-res inspiration photos, package tiers, and couple planning requests.
          </p>
        </div>

        {/* ── SEARCH BAR & QUICK CHIPS ─────────────────────────────────────── */}
        <div className="bg-white p-4 sm:p-6 rounded-3xl border border-[#EAE3DA] shadow-md mb-8">
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-3">
            <div className="relative flex-1">
              <svg className="w-5 h-5 text-[#8C7E72] absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search across vendors, venues, services, stories, photos, packages, requests..."
                className="w-full pl-12 pr-10 py-3.5 bg-[#FAF8F5] border border-[#EAE3DA] rounded-2xl text-sm sm:text-base text-[#1C1917] placeholder:text-[#A8A29E] focus:outline-none focus:ring-2 focus:ring-[#6B3037]/20 focus:border-[#6B3037] transition-all"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => handleQuickSearch('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#78716C] hover:text-[#1C1917] p-1"
                >
                  ✕
                </button>
              )}
            </div>

            <button
              type="submit"
              className="px-6 py-3.5 bg-[#1C1917] hover:bg-[#6B3037] text-white font-semibold text-sm rounded-2xl shadow-md transition-all active:scale-95 flex-shrink-0"
            >
              Search
            </button>
          </form>

          {/* Quick example chips (Client specified: “Wedding photographer Kochi”) */}
          <div className="mt-4 flex flex-wrap items-center gap-2 pt-3 border-t border-[#F4EFEA] text-xs text-[#78716C]">
            <span className="font-semibold text-[#1C1917]">Search examples:</span>
            <button
              type="button"
              onClick={() => handleQuickSearch('Wedding photographer Kochi')}
              className={`px-3 py-1 rounded-full font-medium transition-all ${
                query.toLowerCase() === 'wedding photographer kochi'
                  ? 'bg-[#6B3037] text-white'
                  : 'bg-[#FAF8F5] hover:bg-[#F4EFEA] text-[#8E4A49] border border-[#EAE3DA]'
              }`}
            >
              ✨ “Wedding photographer Kochi”
            </button>
            <button
              type="button"
              onClick={() => handleQuickSearch('Lakeside Venue Kumarakom')}
              className="px-3 py-1 rounded-full bg-[#FAF8F5] hover:bg-[#F4EFEA] text-[#57534E] border border-[#EAE3DA] transition-all"
            >
              “Lakeside Venue Kumarakom”
            </button>
            <button
              type="button"
              onClick={() => handleQuickSearch('Artisanal Catering Ernakulam')}
              className="px-3 py-1 rounded-full bg-[#FAF8F5] hover:bg-[#F4EFEA] text-[#57534E] border border-[#EAE3DA] transition-all"
            >
              “Artisanal Catering Ernakulam”
            </button>
            <button
              type="button"
              onClick={() => handleQuickSearch('Bespoke Mandap Decor')}
              className="px-3 py-1 rounded-full bg-[#FAF8F5] hover:bg-[#F4EFEA] text-[#57534E] border border-[#EAE3DA] transition-all"
            >
              “Bespoke Mandap Decor”
            </button>
          </div>
        </div>

        {/* ── FILTERS & SORT CONTROLS ───────────────────────────────────────── */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#EAE3DA] mb-8 space-y-4 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Filter Pills Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 flex-1">
              
              {/* 1. Location */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#78716C] mb-1">Location</label>
                <select
                  value={filterLocation}
                  onChange={e => setFilterLocation(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#EAE3DA] rounded-xl px-2.5 py-1.5 text-xs text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#6B3037]"
                >
                  <option value="all">All Locations</option>
                  <option value="Kochi">Kochi</option>
                  <option value="Kumarakom">Kumarakom</option>
                  <option value="Ernakulam">Ernakulam</option>
                  <option value="Goa">Goa</option>
                </select>
              </div>

              {/* 2. Event */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#78716C] mb-1">Event</label>
                <select
                  value={filterEvent}
                  onChange={e => setFilterEvent(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#EAE3DA] rounded-xl px-2.5 py-1.5 text-xs text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#6B3037]"
                >
                  <option value="all">All Events</option>
                  <option value="Wedding">Wedding</option>
                  <option value="Reception">Reception</option>
                  <option value="Ceremony">Ceremony</option>
                  <option value="Pre-Wedding">Pre-Wedding</option>
                  <option value="Welcome Party">Welcome Party</option>
                </select>
              </div>

              {/* 3. Service */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#78716C] mb-1">Service</label>
                <select
                  value={filterService}
                  onChange={e => setFilterService(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#EAE3DA] rounded-xl px-2.5 py-1.5 text-xs text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#6B3037]"
                >
                  <option value="all">All Services</option>
                  <option value="Photography">Photography</option>
                  <option value="Videography">Videography</option>
                  <option value="Venue">Venue</option>
                  <option value="Catering">Catering</option>
                  <option value="Decoration">Decoration</option>
                  <option value="Makeup">Makeup</option>
                </select>
              </div>

              {/* 4. Price */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#78716C] mb-1">Price</label>
                <select
                  value={filterPrice}
                  onChange={e => setFilterPrice(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#EAE3DA] rounded-xl px-2.5 py-1.5 text-xs text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#6B3037]"
                >
                  <option value="all">All Budgets</option>
                  <option value="under_50k">Under ₹50,000</option>
                  <option value="50k_100k">₹50,000 – ₹1,00,000</option>
                  <option value="100k_250k">₹1,00,000 – ₹2,50,000</option>
                  <option value="above_250k">₹2,50,000+</option>
                </select>
              </div>

              {/* 5. Rating */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#78716C] mb-1">Rating</label>
                <select
                  value={filterRating}
                  onChange={e => setFilterRating(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#EAE3DA] rounded-xl px-2.5 py-1.5 text-xs text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#6B3037]"
                >
                  <option value="all">All Ratings</option>
                  <option value="4.8">4.8★ & above</option>
                  <option value="4.5">4.5★ & above</option>
                  <option value="4.0">4.0★ & above</option>
                </select>
              </div>

              {/* 6. Availability */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#78716C] mb-1">Availability</label>
                <select
                  value={filterAvailability}
                  onChange={e => setFilterAvailability(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#EAE3DA] rounded-xl px-2.5 py-1.5 text-xs text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#6B3037]"
                >
                  <option value="all">All Availability</option>
                  <option value="2026_2027">Accepting 2026/27</option>
                  <option value="fast_response">Responds &lt; 2h</option>
                </select>
              </div>

            </div>

            {/* Sort & Reset Actions */}
            <div className="flex items-center gap-3 pt-2 lg:pt-0 border-t lg:border-t-0 border-[#F4EFEA]">
              <div className="flex-1 lg:w-44">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#78716C] mb-1">Sort By</label>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#EAE3DA] rounded-xl px-3 py-1.5 text-xs font-semibold text-[#1C1917] focus:outline-none"
                >
                  <option value="recommended">Recommended</option>
                  <option value="highest_rated">Highest Rated</option>
                  <option value="most_reviewed">Most Reviewed</option>
                  <option value="newest">Newest</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                </select>
              </div>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="mt-4 px-3 py-1.5 bg-[#FAF8F5] hover:bg-[#F4EFEA] text-[#8E4A49] text-xs font-semibold rounded-xl border border-[#EAE3DA] transition-colors whitespace-nowrap"
                >
                  Reset
                </button>
              )}
            </div>

          </div>
        </div>

        {/* ── GROUPED RESULTS TABS ─────────────────────────────────────────── */}
        <div className="flex items-center justify-between gap-4 mb-6 pb-2 border-b border-[#EAE3DA] overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5">
            {[
              { id: 'all', label: 'All Results', count: totalCount },
              { id: 'vendors', label: 'Vendors', count: filteredVendors.length },
              { id: 'venues', label: 'Venues', count: filteredVenues.length },
              { id: 'services', label: 'Services', count: filteredServices.length },
              { id: 'stories', label: 'Stories', count: filteredStories.length },
              { id: 'photos', label: 'Photos', count: filteredPhotos.length },
              { id: 'packages', label: 'Packages', count: filteredPackages.length },
              { id: 'requests', label: 'Requests', count: filteredRequests.length },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveGroup(tab.id)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  activeGroup === tab.id
                    ? 'bg-[#1C1917] text-white shadow-xs'
                    : 'text-[#78716C] hover:bg-white hover:text-[#1C1917]'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  activeGroup === tab.id ? 'bg-white/20 text-white' : 'bg-[#EAE3DA] text-[#57534E]'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          <span className="text-xs text-[#78716C] whitespace-nowrap">
            Showing <strong>{totalCount}</strong> matches {query ? `for "${query}"` : ''}
          </span>
        </div>

        {/* ── ZERO RESULTS STATE ───────────────────────────────────────────── */}
        {totalCount === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#EAE3DA] my-8 shadow-sm">
            <span className="text-4xl mb-3 inline-block">🔍</span>
            <h3 className="font-serif text-2xl font-bold text-[#1C1917] mb-2">
              No exact matches found for "{query}"
            </h3>
            <p className="text-sm text-[#78716C] max-w-md mx-auto mb-6">
              Try adjusting your spelling, loosening filters, or click below to search for popular categories.
            </p>
            <button
              onClick={() => handleQuickSearch('Wedding photographer Kochi')}
              className="px-6 py-2.5 bg-[#1C1917] text-white text-xs font-semibold rounded-xl hover:bg-[#6B3037] transition-colors"
            >
              Try “Wedding photographer Kochi”
            </button>
          </div>
        )}

        {/* ── GROUPED RESULTS CONTAINER ────────────────────────────────────── */}
        <div className="space-y-12">

          {/* 1. VENDORS GROUP */}
          {(activeGroup === 'all' || activeGroup === 'vendors') && filteredVendors.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xl">📸</span>
                  <h2 className="text-xl font-bold text-[#1C1917]">Vendors</h2>
                  <span className="text-xs font-bold bg-[#EAE3DA] text-[#57534E] px-2 py-0.5 rounded-full">
                    {filteredVendors.length}
                  </span>
                </div>
                {activeGroup === 'all' && (
                  <button
                    onClick={() => setActiveGroup('vendors')}
                    className="text-xs font-semibold text-[#8E4A49] hover:underline"
                  >
                    View all {filteredVendors.length} vendors →
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVendors.slice(0, activeGroup === 'all' ? 3 : 50).map(item => (
                  <ResultCard
                    key={item.id}
                    item={item}
                    type="vendor"
                    isShortlisted={isShortlisted(item.id)}
                    onView={() => handleView('vendor', item)}
                    onShortlist={() => handleShortlist(item)}
                    onDiscuss={() => handleDiscuss('vendor', item)}
                  />
                ))}
              </div>
            </section>
          )}

          {/* 2. VENUES GROUP */}
          {(activeGroup === 'all' || activeGroup === 'venues') && filteredVenues.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🏛️</span>
                  <h2 className="text-xl font-bold text-[#1C1917]">Venues</h2>
                  <span className="text-xs font-bold bg-[#EAE3DA] text-[#57534E] px-2 py-0.5 rounded-full">
                    {filteredVenues.length}
                  </span>
                </div>
                {activeGroup === 'all' && (
                  <button
                    onClick={() => setActiveGroup('venues')}
                    className="text-xs font-semibold text-[#8E4A49] hover:underline"
                  >
                    View all {filteredVenues.length} venues →
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVenues.slice(0, activeGroup === 'all' ? 3 : 50).map(item => (
                  <ResultCard
                    key={item.id}
                    item={item}
                    type="venue"
                    isShortlisted={isShortlisted(item.id)}
                    onView={() => handleView('venue', item)}
                    onShortlist={() => handleShortlist(item)}
                    onDiscuss={() => handleDiscuss('venue', item)}
                  />
                ))}
              </div>
            </section>
          )}

          {/* 3. SERVICES GROUP */}
          {(activeGroup === 'all' || activeGroup === 'services') && filteredServices.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🛠️</span>
                  <h2 className="text-xl font-bold text-[#1C1917]">Services</h2>
                  <span className="text-xs font-bold bg-[#EAE3DA] text-[#57534E] px-2 py-0.5 rounded-full">
                    {filteredServices.length}
                  </span>
                </div>
                {activeGroup === 'all' && (
                  <button
                    onClick={() => setActiveGroup('services')}
                    className="text-xs font-semibold text-[#8E4A49] hover:underline"
                  >
                    View all {filteredServices.length} services →
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.slice(0, activeGroup === 'all' ? 3 : 50).map(item => (
                  <ResultCard
                    key={item.id}
                    item={item}
                    type="vendor"
                    isShortlisted={isShortlisted(item.id)}
                    onView={() => handleView('service', item)}
                    onShortlist={() => handleShortlist(item)}
                    onDiscuss={() => handleDiscuss('vendor', item)}
                  />
                ))}
              </div>
            </section>
          )}

          {/* 4. STORIES GROUP */}
          {(activeGroup === 'all' || activeGroup === 'stories') && filteredStories.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xl">💍</span>
                  <h2 className="text-xl font-bold text-[#1C1917]">Real Stories</h2>
                  <span className="text-xs font-bold bg-[#EAE3DA] text-[#57534E] px-2 py-0.5 rounded-full">
                    {filteredStories.length}
                  </span>
                </div>
                {activeGroup === 'all' && (
                  <button
                    onClick={() => setActiveGroup('stories')}
                    className="text-xs font-semibold text-[#8E4A49] hover:underline"
                  >
                    View all {filteredStories.length} stories →
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStories.slice(0, activeGroup === 'all' ? 3 : 50).map(item => (
                  <ResultCard
                    key={item.id}
                    item={item}
                    type="story"
                    isShortlisted={isShortlisted(item.id)}
                    onView={() => handleView('story', item)}
                    onShortlist={() => handleShortlist(item)}
                    onDiscuss={() => handleDiscuss('story', item)}
                  />
                ))}
              </div>
            </section>
          )}

          {/* 5. PHOTOS GROUP */}
          {(activeGroup === 'all' || activeGroup === 'photos') && filteredPhotos.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🖼️</span>
                  <h2 className="text-xl font-bold text-[#1C1917]">Inspiration Photos</h2>
                  <span className="text-xs font-bold bg-[#EAE3DA] text-[#57534E] px-2 py-0.5 rounded-full">
                    {filteredPhotos.length}
                  </span>
                </div>
                {activeGroup === 'all' && (
                  <button
                    onClick={() => setActiveGroup('photos')}
                    className="text-xs font-semibold text-[#8E4A49] hover:underline"
                  >
                    View all {filteredPhotos.length} photos →
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredPhotos.slice(0, activeGroup === 'all' ? 4 : 50).map(item => (
                  <PhotoResultCard
                    key={item.id}
                    item={item}
                    isShortlisted={isShortlisted(item.id)}
                    onView={() => handleView('photo', item)}
                    onShortlist={() => handleShortlist(item)}
                    onDiscuss={() => handleDiscuss('inspiration', item)}
                  />
                ))}
              </div>
            </section>
          )}

          {/* 6. PACKAGES GROUP */}
          {(activeGroup === 'all' || activeGroup === 'packages') && filteredPackages.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xl">📦</span>
                  <h2 className="text-xl font-bold text-[#1C1917]">Packages</h2>
                  <span className="text-xs font-bold bg-[#EAE3DA] text-[#57534E] px-2 py-0.5 rounded-full">
                    {filteredPackages.length}
                  </span>
                </div>
                {activeGroup === 'all' && (
                  <button
                    onClick={() => setActiveGroup('packages')}
                    className="text-xs font-semibold text-[#8E4A49] hover:underline"
                  >
                    View all {filteredPackages.length} packages →
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPackages.slice(0, activeGroup === 'all' ? 3 : 50).map(item => (
                  <ResultCard
                    key={item.id}
                    item={item}
                    type="package"
                    isShortlisted={isShortlisted(item.id)}
                    onView={() => handleView('package', item)}
                    onShortlist={() => handleShortlist(item)}
                    onDiscuss={() => handleDiscuss('package', item)}
                  />
                ))}
              </div>
            </section>
          )}

          {/* 7. REQUESTS GROUP */}
          {(activeGroup === 'all' || activeGroup === 'requests') && filteredRequests.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xl">📋</span>
                  <h2 className="text-xl font-bold text-[#1C1917]">Custom Requests</h2>
                  <span className="text-xs font-bold bg-[#EAE3DA] text-[#57534E] px-2 py-0.5 rounded-full">
                    {filteredRequests.length}
                  </span>
                </div>
                {activeGroup === 'all' && (
                  <button
                    onClick={() => setActiveGroup('requests')}
                    className="text-xs font-semibold text-[#8E4A49] hover:underline"
                  >
                    View all {filteredRequests.length} requests →
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRequests.slice(0, activeGroup === 'all' ? 3 : 50).map(item => (
                  <ResultCard
                    key={item.id}
                    item={item}
                    type="request"
                    isShortlisted={isShortlisted(item.id)}
                    onView={() => handleView('request', item)}
                    onShortlist={() => handleShortlist(item)}
                    onDiscuss={() => handleDiscuss('vendor', item)}
                  />
                ))}
              </div>
            </section>
          )}

        </div>

      </div>
    </div>
  );
}

// ── UNIVERSAL RESULT CARD WITH VIEW, SHORTLIST, DISCUSS ─────────────────────

function ResultCard({ item, type, isShortlisted, onView, onShortlist, onDiscuss }) {
  return (
    <div className="bg-white rounded-3xl border border-[#EAE3DA] overflow-hidden shadow-xs hover:shadow-xl hover:border-[#6B3037]/40 transition-all flex flex-col group">
      {/* Thumbnail */}
      <div className="h-48 sm:h-52 relative overflow-hidden bg-[#F4EFEA]">
        <img
          src={item.image}
          alt={item.name || item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-xs text-[#1C1917] px-2.5 py-1 rounded-full shadow-xs">
            {item.category || type}
          </span>
        </div>

        {/* Rating */}
        {item.rating && (
          <div className="absolute top-3 right-3 bg-[#1C1917]/80 backdrop-blur-xs text-amber-300 text-xs font-bold px-2 py-1 rounded-full shadow-xs flex items-center gap-1">
            <span>★</span>
            <span>{item.rating}</span>
            {item.reviewsCount && <span className="text-white/70 text-[10px]">({item.reviewsCount})</span>}
          </div>
        )}

        {/* Location & Details on bottom */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <p className="text-xs font-medium drop-shadow-sm flex items-center gap-1">
            <span>📍 {item.location || 'Kerala'}</span>
            {item.capacity && <span>• {item.capacity}</span>}
            {item.duration && <span>• {item.duration}</span>}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-base sm:text-lg text-[#1C1917] group-hover:text-[#6B3037] transition-colors leading-snug line-clamp-1">
            {item.name || item.title}
          </h3>

          {item.subCategory && (
            <p className="text-xs text-[#8E4A49] font-medium mt-0.5">{item.subCategory}</p>
          )}

          <p className="text-xs text-[#57534E] line-clamp-2 mt-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Price & Action row */}
        <div className="mt-5 pt-4 border-t border-[#F4EFEA]">
          <div className="flex items-center justify-between mb-3.5">
            <div>
              <p className="text-[10px] text-[#78716C] uppercase font-bold tracking-wider">Pricing / Budget</p>
              <p className="text-sm font-extrabold text-[#1C1917]">{item.priceFormatted || 'Custom quote'}</p>
            </div>
            {item.availability && (
              <span className="text-[10px] text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-semibold">
                ✓ {item.availability}
              </span>
            )}
          </div>

          {/* 3 ACTIONS: VIEW, SHORTLIST, DISCUSS (Mandatory Specification) */}
          <div className="grid grid-cols-3 gap-2">
            {/* 1. View */}
            <button
              type="button"
              onClick={onView}
              className="py-2 px-2 bg-[#FAF8F5] hover:bg-[#F4EFEA] text-[#1C1917] font-semibold text-xs rounded-xl border border-[#EAE3DA] transition-colors text-center"
              title="View full details"
            >
              View
            </button>

            {/* 2. Shortlist */}
            <button
              type="button"
              onClick={onShortlist}
              className={`py-2 px-2 text-xs font-semibold rounded-xl border transition-all text-center flex items-center justify-center gap-1 ${
                isShortlisted
                  ? 'bg-amber-50 text-amber-900 border-amber-300 font-bold'
                  : 'bg-[#FAF8F5] hover:bg-amber-50/50 text-[#1C1917] border-[#EAE3DA]'
              }`}
              title={isShortlisted ? 'Remove from Shortlist' : 'Add to Shortlist'}
            >
              <span>{isShortlisted ? '✓' : '+'}</span>
              <span>Shortlist</span>
            </button>

            {/* 3. Discuss */}
            <button
              type="button"
              onClick={onDiscuss}
              className="py-2 px-2 bg-[#1C1917] hover:bg-[#6B3037] text-white font-semibold text-xs rounded-xl transition-colors shadow-xs text-center flex items-center justify-center gap-1 active:scale-95"
              title="Discuss with partner in floating Messenger"
            >
              <span>💬</span>
              <span>Discuss</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

// ── PHOTO RESULT CARD (Grid-friendly for visual inspirations) ───────────────

function PhotoResultCard({ item, isShortlisted, onView, onShortlist, onDiscuss }) {
  return (
    <div className="bg-white rounded-2xl border border-[#EAE3DA] overflow-hidden shadow-xs hover:shadow-lg transition-all group flex flex-col">
      <div className="h-40 relative overflow-hidden bg-[#F4EFEA] cursor-pointer" onClick={onView}>
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 left-2">
          <span className="text-[9px] font-bold uppercase bg-black/60 text-white px-2 py-0.5 rounded-full backdrop-blur-xs">
            {item.subCategory || 'Photo'}
          </span>
        </div>
      </div>

      <div className="p-3 flex-1 flex flex-col justify-between">
        <div>
          <h4 className="font-bold text-xs text-[#1C1917] truncate leading-tight group-hover:text-[#6B3037]">
            {item.title}
          </h4>
          <p className="text-[10px] text-[#78716C] mt-0.5 truncate">📍 {item.location}</p>
        </div>

        {/* 3 Actions */}
        <div className="grid grid-cols-3 gap-1 mt-3 pt-2 border-t border-[#F4EFEA]">
          <button
            type="button"
            onClick={onView}
            className="py-1 bg-[#FAF8F5] hover:bg-[#F4EFEA] text-[#1C1917] text-[10px] font-medium rounded-lg text-center"
          >
            View
          </button>
          <button
            type="button"
            onClick={onShortlist}
            className={`py-1 text-[10px] font-semibold rounded-lg text-center ${
              isShortlisted ? 'bg-amber-100 text-amber-900 font-bold' : 'bg-[#FAF8F5] text-[#1C1917]'
            }`}
          >
            {isShortlisted ? '✓ Saved' : '+ Save'}
          </button>
          <button
            type="button"
            onClick={onDiscuss}
            className="py-1 bg-[#1C1917] hover:bg-[#6B3037] text-white text-[10px] font-semibold rounded-lg text-center"
          >
            Discuss
          </button>
        </div>
      </div>
    </div>
  );
}
