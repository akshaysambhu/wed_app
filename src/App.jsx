import React from 'react';
import { usePlanning } from './context/PlanningContext.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import InspirationSection from './components/InspirationSection.jsx';
import RealWeddingsSection from './components/RealWeddingsSection.jsx';
import PeopleBehindMoments from './components/PeopleBehindMoments.jsx';
import VendorDiscovery from './components/VendorDiscovery.jsx';
import VenueDiscovery from './components/VenueDiscovery.jsx';
import ServicesDiscovery from './components/ServicesDiscovery.jsx';
import SaveDecideLater from './components/SaveDecideLater.jsx';
import NotesSection from './components/NotesSection.jsx';
import DashboardPreview from './components/DashboardPreview.jsx';
import CompareSection from './components/CompareSection.jsx';
import JourneyStages from './components/JourneyStages.jsx';
import MoreMomentsMasonry from './components/MoreMomentsMasonry.jsx';
import FinalCTA from './components/FinalCTA.jsx';
import Footer from './components/Footer.jsx';

// Modals
import SavedDrawer from './components/modals/SavedDrawer.jsx';
import CompareModal from './components/modals/CompareModal.jsx';
import NotesDrawer from './components/modals/NotesDrawer.jsx';
import RealWeddingModal from './components/modals/RealWeddingModal.jsx';
import SearchOverlay from './components/modals/SearchOverlay.jsx';
import DashboardModal from './components/modals/DashboardModal.jsx';
import ItemDetailModal from './components/modals/ItemDetailModal.jsx';

export default function App() {
  const { activeModal, toast } = usePlanning();

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1917] font-sans selection:bg-[#E8D4CF] selection:text-[#6B3037] relative">
      {/* Global Navigation */}
      <Navbar />

      {/* Main Content Layout */}
      <main>
        {/* Section 2: Hero */}
        <Hero />

        {/* Section 3: Start with Inspiration */}
        <InspirationSection />

        {/* Section 4: Real Weddings */}
        <RealWeddingsSection />

        {/* Section 5: Discover the People Behind the Moments */}
        <PeopleBehindMoments />

        {/* Section 6: Vendor Discovery */}
        <VendorDiscovery />

        {/* Section 7: Venue Discovery */}
        <VenueDiscovery />

        {/* Section 8: Services Discovery */}
        <ServicesDiscovery />

        {/* Section 9: Save It Now, Decide Later */}
        <SaveDecideLater />

        {/* Section 10: Notes / Couple Planning */}
        <NotesSection />

        {/* Section 11: Planning Dashboard Preview */}
        <DashboardPreview />

        {/* Section 12: Compare Before You Choose */}
        <CompareSection />

        {/* Section 13: From Inspiration to Action */}
        <JourneyStages />

        {/* Section 14: Continuous Discovery Masonry */}
        <MoreMomentsMasonry />

        {/* Section 15: Final CTA */}
        <FinalCTA />
      </main>

      {/* Section 16: Footer */}
      <Footer />

      {/* Active Modal Controllers */}
      {activeModal?.type === 'saved' && <SavedDrawer />}
      {activeModal?.type === 'compare' && <CompareModal />}
      {activeModal?.type === 'notes' && <NotesDrawer />}
      {activeModal?.type === 'realWedding' && <RealWeddingModal />}
      {activeModal?.type === 'search' && <SearchOverlay />}
      {activeModal?.type === 'dashboard' && <DashboardModal />}
      {activeModal?.type === 'itemDetail' && <ItemDetailModal />}

      {/* Floating Interactive Toast Message */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounceIn">
          <div className="bg-[#1C1917] text-white text-xs px-4 py-3 rounded-2xl shadow-2xl flex items-center space-x-2.5 border border-[#34302C]">
            <span className="w-2 h-2 rounded-full bg-[#8E4A49]"></span>
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}
