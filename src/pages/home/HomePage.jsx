/**
 * HomePage.jsx
 * Layout wrapper that assembles all homepage sections in order.
 * Each section is an independent component in pages/home/.
 */
import React from 'react';
import HeroSection from './Hero.jsx';
import InspirationSection from './InspirationSection.jsx';
import RealWeddingsSection from './RealWeddingsSection.jsx';
import PeopleBehindMoments from './PeopleBehindMoments.jsx';
import VendorDiscovery from './VendorDiscovery.jsx';
import VenueDiscovery from './VenueDiscovery.jsx';
import ServicesDiscovery from './ServicesDiscovery.jsx';
import SaveDecideLater from './SaveDecideLater.jsx';
import NotesSection from './NotesSection.jsx';
import DashboardPreview from './DashboardPreview.jsx';
import CompareSection from './CompareSection.jsx';
import JourneyStages from './JourneyStages.jsx';
import MoreMomentsMasonry from './MoreMomentsMasonry.jsx';
import FinalCTA from './FinalCTA.jsx';

export default function HomePage() {
  return (
    <main>
      {/* 1. Hero — Cinematic entry with search */}
      <HeroSection />

      {/* 2. Inspiration — Masonry grid with category filters */}
      <InspirationSection />

      {/* 3. Real Weddings — Editorial story cards */}
      <RealWeddingsSection />

      {/* 4. People Behind the Moments — Vendor spotlight */}
      <PeopleBehindMoments />

      {/* 5. Vendor Discovery — Browsable vendor cards */}
      <VendorDiscovery />

      {/* 6. Venue Discovery — Venue cards */}
      <VenueDiscovery />

      {/* 7. Services Discovery — Service category grid */}
      <ServicesDiscovery />

      {/* 8. Save & Decide Later — Feature explainer */}
      <SaveDecideLater />

      {/* 9. Couple Notes — Planning workspace */}
      <NotesSection />

      {/* 10. Dashboard Preview — Planning progress */}
      <DashboardPreview />

      {/* 11. Compare — Side by side vendor comparison */}
      <CompareSection />

      {/* 12. Journey — Discover → Save → Discuss → Plan */}
      <JourneyStages />

      {/* 13. More Moments — Continuous discovery masonry */}
      <MoreMomentsMasonry />

      {/* 14. Final CTA — Sign up */}
      <FinalCTA />
    </main>
  );
}
