// Plan My Moments - Authentic Curated Mock Data

export const INSPIRATIONS = [
  {
    id: "insp-1",
    title: "Backwater Sunset Vows",
    category: "Ceremony",
    couple: "Anjali & Rohan",
    location: "Kumarakom, Kerala",
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85",
    aspect: "tall",
    vendorTags: [
      { role: "Photographer", name: "Northlight Studios", handle: "@northlightstudios" },
      { role: "Venue", name: "Cedar Hall Kumarakom", handle: "@cedarhall" },
      { role: "Decor", name: "Petal & Stem", handle: "@petalandstem" }
    ],
    notesCount: 2,
    description: "An intimate mandap constructed over the serene waters of Lake Vembanad with open skies and floating jasmine diyas."
  },
  {
    id: "insp-2",
    title: "Hand-Embroidered Raw Silk Lehenga",
    category: "Bridal",
    couple: "Anjali & Rohan",
    location: "Kochi, Kerala",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85",
    aspect: "normal",
    vendorTags: [
      { role: "Bridal Wear", name: "Sabyasachi Heritage", handle: "@sabyasachiofficial" },
      { role: "Makeup", name: "Mira Varma Artistry", handle: "@miravarma_mua" }
    ],
    notesCount: 1,
    description: "Deep madder-red silk with antique gold zardozi embroidery, paired with heirloom temple jewellery."
  },
  {
    id: "insp-3",
    title: "Eucalyptus & Brass Candelabra Table",
    category: "Reception",
    couple: "Maya & Alex",
    location: "Goa",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85",
    aspect: "wide",
    vendorTags: [
      { role: "Decor & Styling", name: "Wildflower Tales", handle: "@wildflowertales" },
      { role: "Florals", name: "Petal & Stem", handle: "@petalandstem" }
    ],
    notesCount: 3,
    description: "Long community feast tables adorned with olive branches, seeded eucalyptus, and warm beeswax candlelight."
  },
  {
    id: "insp-4",
    title: "Artisanal Coastal Dessert Platter",
    category: "Food",
    couple: "Maya & Alex",
    location: "Goa",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1000&q=85",
    aspect: "tall",
    vendorTags: [
      { role: "Catering", name: "Gather & Graze", handle: "@gatherandgraze" }
    ],
    notesCount: 1,
    description: "Cardamom-spiced tender coconut panna cotta, jaggery caramel tartlets, and fresh seasonal figs."
  },
  {
    id: "insp-5",
    title: "The Heritage Courtyard at Dusk",
    category: "Venues",
    couple: "Asha & Arun",
    location: "Kochi",
    image: "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=1200&q=85",
    aspect: "normal",
    vendorTags: [
      { role: "Venue", name: "Willow House", handle: "@willowhousekochi" },
      { role: "Lighting", name: "Lumen Artistry", handle: "@lumenartistry" }
    ],
    notesCount: 2,
    description: "Centuries-old rain tree strung with warm fairy lights and brass hurricane lanterns in a traditional Kerala courtyard."
  },
  {
    id: "insp-6",
    title: "Quiet Glance Before the Reception",
    category: "Couples",
    couple: "Nikhil & Sneha",
    location: "Kumarakom",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85",
    aspect: "tall",
    vendorTags: [
      { role: "Photographer", name: "Northlight Studios", handle: "@northlightstudios" },
      { role: "Outfits", name: "Raw Mango", handle: "@raw_mango" }
    ],
    notesCount: 0,
    description: "Candid emotional moment between Nikhil and Sneha under the sheltered veranda as twilight set in."
  },
  {
    id: "insp-7",
    title: "Letterpress Handmade Linen Invitations",
    category: "Details",
    couple: "Asha & Arun",
    location: "Kochi",
    image: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1000&q=85",
    aspect: "normal",
    vendorTags: [
      { role: "Invitations", name: "The Paper Foundry", handle: "@thepaperfoundry" }
    ],
    notesCount: 1,
    description: "Deckle-edged cotton rag paper with blind debossed botanical motifs and antique bronze wax seal."
  },
  {
    id: "insp-8",
    title: "Open Flame Live Grills & Mezze",
    category: "Food",
    couple: "Anjali & Rohan",
    location: "Kumarakom",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=85",
    aspect: "wide",
    vendorTags: [
      { role: "Catering", name: "Gather & Graze", handle: "@gatherandgraze" }
    ],
    notesCount: 2,
    description: "Interactive chef station featuring spiced tiger prawns, smoked heirloom carrots, and saffron flatbreads."
  },
  {
    id: "insp-9",
    title: "Bridal Veil & Morning Light",
    category: "Bridal",
    couple: "Maya & Alex",
    location: "Goa",
    image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1000&q=85",
    aspect: "tall",
    vendorTags: [
      { role: "Photographer", name: "Cinematic Frames", handle: "@cinematicframes" },
      { role: "Makeup", name: "Aura by Simran", handle: "@aurabysimran" }
    ],
    notesCount: 1,
    description: "Sunlight filtering through Belgian tulle veil during bridal preparations at dawn."
  }
];

export const REAL_WEDDINGS = [
  {
    id: "rw-1",
    couple: "Anjali & Rohan",
    location: "Kumarakom, Kerala",
    guests: "350 guests",
    season: "Winter Celebration",
    story: "A 3-day slow-living backwater wedding inspired by Kerala's waterways, minimalist brass decor, and bespoke coastal dining.",
    heroImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=85"
    ],
    vendors: {
      venue: { name: "Cedar Hall", category: "Venue", location: "Kumarakom" },
      photographer: { name: "Northlight Studios", category: "Photography", rating: 4.9 },
      videographer: { name: "Paperkite Films", category: "Videography", rating: 4.8 },
      catering: { name: "Gather & Graze", category: "Catering", rating: 4.7 },
      decoration: { name: "Petal & Stem", category: "Decoration", rating: 4.8 },
      makeup: { name: "Mira Varma Artistry", category: "Makeup", rating: 4.9 }
    },
    highlights: ["Floating Mandap Ceremony", "Farm-to-Table Sadhya Fusion", "Sunset Houseboat Welcome Party"]
  },
  {
    id: "rw-2",
    couple: "Maya & Alex",
    location: "Goa",
    guests: "220 guests",
    season: "Spring Coastal",
    story: "An effortless seaside celebration that blended Portuguese colonial architecture with tropical botanical aesthetics and open-air jazz.",
    heroImage: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=85"
    ],
    vendors: {
      venue: { name: "Casa do Mar", category: "Venue", location: "South Goa" },
      photographer: { name: "Cinematic Frames", category: "Photography", rating: 4.9 },
      videographer: { name: "Saltwater Stories", category: "Videography", rating: 4.9 },
      catering: { name: "Gather & Graze", category: "Catering", rating: 4.7 },
      decoration: { name: "Wildflower Tales", category: "Decoration", rating: 4.8 },
      makeup: { name: "Aura by Simran", category: "Makeup", rating: 4.9 }
    },
    highlights: ["Clifftop Vows at Sundown", "Live Portuguese Brass Band", "Handcrafted Mezcal & Feni Bar"]
  },
  {
    id: "rw-3",
    couple: "Asha & Arun",
    location: "Kochi",
    guests: "600 guests",
    season: "Autumn Heritage",
    story: "Deeply rooted heritage celebration set across a Dutch colonial warehouse, honoring classical music, jasmine garlands, and grand culinary feasts.",
    heroImage: "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=85"
    ],
    vendors: {
      venue: { name: "Willow House", category: "Venue", location: "Kochi" },
      photographer: { name: "Northlight Studios", category: "Photography", rating: 4.9 },
      videographer: { name: "Paperkite Films", category: "Videography", rating: 4.8 },
      catering: { name: "Grand Travancore Feast", category: "Catering", rating: 4.9 },
      decoration: { name: "Petal & Stem", category: "Decoration", rating: 4.8 },
      makeup: { name: "Mira Varma Artistry", category: "Makeup", rating: 4.9 }
    },
    highlights: ["Sopana Sangeetham Welcoming", "Traditional 32-dish Sadhya", "Over 10,000 Hand-strung Mogra Flowers"]
  },
  {
    id: "rw-4",
    couple: "Nikhil & Sneha",
    location: "Kumarakom",
    guests: "280 guests",
    season: "Monsoon Serenade",
    story: "A cozy monsoon wedding embracing gentle rain showers, emerald green lawns, brass sambrani censers, and warm candlelit dinners.",
    heroImage: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=85"
    ],
    vendors: {
      venue: { name: "Cedar Hall", category: "Venue", location: "Kumarakom" },
      photographer: { name: "Lumen & Lace", category: "Photography", rating: 4.8 },
      videographer: { name: "Paperkite Films", category: "Videography", rating: 4.8 },
      catering: { name: "Gather & Graze", category: "Catering", rating: 4.7 },
      decoration: { name: "Petal & Stem", category: "Decoration", rating: 4.8 },
      makeup: { name: "Aura by Simran", category: "Makeup", rating: 4.9 }
    },
    highlights: ["Glass Canopy Over the Lawn", "Spice-infused Hot Toddies", "Acoustic Sitar & Cello Duet"]
  }
];

export const VENDORS = [
  {
    id: "vendor-1",
    name: "Northlight Studios",
    category: "Photography",
    subCategory: "Candid & Editorial",
    location: "Kochi, Kerala",
    rating: 4.9,
    reviewsCount: 128,
    priceFormatted: "From ₹85,000",
    priceRaw: 85000,
    priceUnit: "per day",
    image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=85",
    featured: true,
    style: "Editorial, Documentary, Soft Natural Light",
    experience: "9 years (240+ weddings)",
    deliverables: "Full gallery 800+ edited shots, handcrafted linen album, 4-min cinematic teaser",
    availability: "Booking for Winter 2026 / Spring 2027",
    realWeddingsCount: 14,
    description: "Northlight Studios crafts heirloom visual stories that focus on quiet glances, authentic joy, and timeless aesthetic compositions."
  },
  {
    id: "vendor-2",
    name: "Gather & Graze",
    category: "Catering",
    subCategory: "Artisanal & Farm-to-Table",
    location: "Ernakulam, Kerala",
    rating: 4.7,
    reviewsCount: 61,
    priceFormatted: "From ₹650/guest",
    priceRaw: 650,
    priceUnit: "per guest",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=85",
    featured: true,
    style: "Coastal Contemporary, Seasonal Local Produce, Interactive Live Cooking",
    experience: "6 years (150+ celebrations)",
    deliverables: "Custom multi-course menu design, cocktail pairings, artisanal bread & cheese bars, full table service",
    availability: "Available for select weekend bookings",
    realWeddingsCount: 19,
    description: "Gather & Graze elevates wedding dining into an unforgettable sensory feast, sourcing directly from organic regional farms and fishermen."
  },
  {
    id: "vendor-3",
    name: "Petal & Stem",
    category: "Decoration",
    subCategory: "Botanical & Spatial Design",
    location: "Kochi, Kerala",
    rating: 4.8,
    reviewsCount: 96,
    priceFormatted: "From ₹65,000",
    priceRaw: 65000,
    priceUnit: "per event",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=85",
    featured: true,
    style: "Minimalist Botanical, Sculptural Florals, Sustainable Styling",
    experience: "7 years (180+ installations)",
    deliverables: "3D visual mockups, ceremony mandap styling, table scapes, atmospheric lighting & bespoke prop sourcing",
    availability: "Accepting 3 weddings per month",
    realWeddingsCount: 22,
    description: "Petal & Stem avoids wasteful floral foam in favor of sustainable, sculptural floral installations that honor the venue's natural character."
  },
  {
    id: "vendor-4",
    name: "Cinematic Frames",
    category: "Photography",
    subCategory: "Cinematography & Fine Art",
    location: "Goa & Mumbai",
    rating: 4.9,
    reviewsCount: 142,
    priceFormatted: "From ₹95,000",
    priceRaw: 95000,
    priceUnit: "per day",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=85",
    featured: false,
    style: "Cinematic, High Dynamic Range, Golden Hour Fine Art",
    experience: "11 years (310+ weddings)",
    deliverables: "4K Cinema camera package, aerial drone coverage, 15-min feature film, complete RAW archives",
    availability: "Select dates open",
    realWeddingsCount: 18,
    description: "Cinematic Frames treats every wedding as an award-worthy documentary, capturing subtle tears and euphoric midnight dance floors."
  },
  {
    id: "vendor-5",
    name: "Lumen & Lace",
    category: "Photography",
    subCategory: "Fine Art Film & Digital",
    location: "Bangalore & Kochi",
    rating: 4.8,
    reviewsCount: 88,
    priceFormatted: "From ₹90,000",
    priceRaw: 90000,
    priceUnit: "per day",
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=85",
    featured: false,
    style: "Analog Medium Format Film & Digital Hybrid",
    experience: "8 years (190+ weddings)",
    deliverables: "Color graded film scans, 600+ high-res images, fine art leather album",
    availability: "Limited winter availability",
    realWeddingsCount: 11,
    description: "Specializing in the luminous tones of true analog film, Lumen & Lace creates soft, poetic visual memories."
  },
  {
    id: "vendor-6",
    name: "Mira Varma Artistry",
    category: "Makeup",
    subCategory: "Bridal Glow & Hair Art",
    location: "Kochi, Kerala",
    rating: 4.9,
    reviewsCount: 104,
    priceFormatted: "From ₹35,000",
    priceRaw: 35000,
    priceUnit: "per look",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=85",
    featured: true,
    style: "Skin-First Dewy Glow, Traditional & Contemporary Hair",
    experience: "10 years (350+ brides)",
    deliverables: "Pre-wedding skin consultation, HD airbrush application, hair extension styling, touch-up kit",
    availability: "Advance booking required",
    realWeddingsCount: 25,
    description: "Mira enhances natural beauty with weightless, enduring makeup that looks stunning both in person and on camera."
  }
];

export const VENUES = [
  {
    id: "venue-1",
    name: "Cedar Hall",
    location: "Kumarakom, Kerala",
    capacity: "200–800 guests",
    priceFormatted: "From ₹2,20,000",
    priceRaw: 220000,
    rating: 4.9,
    reviewsCount: 74,
    style: "Lakeside Lawn & Heritage Pavilion",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=85",
    features: ["Private Waterfront Pier", "Bridal Suites", "Curfew: Midnight", "Outside Caterers Permitted"],
    description: "Spread along the tranquil backwaters of Kumarakom, Cedar Hall features manicured open lawns, vintage teak pillars, and panoramic sunset views."
  },
  {
    id: "venue-2",
    name: "Willow House",
    location: "Kochi, Kerala",
    capacity: "100–500 guests",
    priceFormatted: "From ₹1,80,000",
    priceRaw: 180000,
    rating: 4.8,
    reviewsCount: 52,
    style: "Colonial Courtyard & Glass Conservatory",
    image: "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=1000&q=85",
    features: ["Historic Dutch Courtyard", "Acoustic-Treated Ballroom", "Valet Parking for 150 Cars", "Bridal Dressing Salon"],
    description: "A restored 18th-century sanctuary in historic Fort Kochi featuring exposed brick arches, ancient rain trees, and intimate shaded courtyards."
  }
];

export const VENDOR_CATEGORIES = [
  { name: "Photography", count: "48 curated studios", icon: "Camera", image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=600&q=85" },
  { name: "Videography", count: "32 cinema teams", icon: "Video", image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=85" },
  { name: "Catering", count: "29 culinary artists", icon: "Utensils", image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=600&q=85" },
  { name: "Decoration", count: "38 spatial designers", icon: "Sparkles", image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=85" },
  { name: "Makeup", count: "42 beauty artists", icon: "Smile", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=85" },
  { name: "Entertainment", count: "24 live bands & DJs", icon: "Music", image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=600&q=85" },
  { name: "Florals", count: "21 bespoke florists", icon: "Flower2", image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=85" },
  { name: "Wedding Planning", count: "18 creative directors", icon: "CalendarCheck", image: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=600&q=85" }
];

export const SERVICE_DETAILS = {
  catering: {
    title: "Wedding Catering & Culinary Design",
    description: "Start with how you want your guests to taste and feel the celebration before selecting a vendor.",
    cuisines: ["Traditional Kerala Sadhya (Modernized)", "Coastal Seafood & Charcoal Grills", "Pan-Indian Royal Feasts", "Artisanal European Grazing Tables"],
    menus: ["Plated 5-Course Waterfront Dinner", "Interactive Chef Stations & Live Tawa", "Midnight Snack Bar & Chai Counter"],
    packages: [
      { name: "Heritage Classic", price: "₹650 / guest", items: "12 courses, brass dinnerware, spiced filter coffee counter" },
      { name: "Coastal Artisanal", price: "₹1,100 / guest", items: "Live grill stations, craft mocktails, artisanal dessert tables" },
      { name: "Bespoke Chef's Table", price: "₹1,850 / guest", items: "Plated multi-course, custom menu curation, sommelier service" }
    ],
    relatedWeddings: ["Anjali & Rohan", "Maya & Alex"],
    featuredCaterers: ["Gather & Graze", "Grand Travancore Feast"]
  }
};

export const INITIAL_NOTES = [
  {
    id: "note-1",
    author: "Anjali",
    type: "partner_note",
    title: "Reception Dining Vibe",
    content: "I love this reception setup at Cedar Hall. Maybe something similar with low warm lighting for our evening dinner.",
    targetTitle: "Eucalyptus & Brass Candelabra Table",
    date: "2 days ago"
  },
  {
    id: "note-2",
    author: "Rohan",
    type: "partner_note",
    title: "Lighting vs Table Size",
    content: "I like the lighting but prefer a simpler table design so guests can see each other across the table easily.",
    targetTitle: "Eucalyptus & Brass Candelabra Table",
    date: "Yesterday"
  },
  {
    id: "note-3",
    author: "Both of Us",
    type: "shared_decision",
    title: "Decorator Direction",
    content: "Decision: Shortlist Petal & Stem. Request a quote for minimalist botanical tablescape and warm candlelight.",
    targetTitle: "Petal & Stem",
    date: "Today",
    isDecision: true
  }
];

export const DASHBOARD_INITIAL_STATE = {
  weddingName: "Anjali & Rohan's Celebration",
  weddingDate: "December 12, 2026",
  daysRemaining: 164,
  completionPercentage: 62,
  metrics: {
    tasksRemaining: 8,
    decisionsPending: 3,
    savedInspirations: 24,
    shortlistedVendors: 7,
    notesTotal: 12
  },
  pendingDecisions: [
    { id: "dec-1", title: "Select primary photographer", options: ["Northlight Studios", "Cinematic Frames"], status: "Reviewing" },
    { id: "dec-2", title: "Finalize ceremony cocktail menu", options: ["Kokum Spritz vs Mango Chilli"], status: "Discussing with Rohan" },
    { id: "dec-3", title: "Confirm bridal jewellery trial date", options: ["Saturday Oct 14"], status: "Pending" }
  ],
  tasks: [
    { id: "task-1", title: "Request quote from Northlight Studios", completed: true },
    { id: "task-2", title: "Schedule walk-through at Cedar Hall", completed: true },
    { id: "task-3", title: "Compare catering options for Reception", completed: false },
    { id: "task-4", title: "Decide on invitation card calligraphy", completed: false }
  ]
};
