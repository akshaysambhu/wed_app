/**
 * App.jsx — Root application with routing
 */
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { usePlanning } from './context/PlanningContext.jsx';

// Layout
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';

// Pages
import HomePage from './pages/home/HomePage.jsx';
import VendorPage from './pages/vendor/VendorPage.jsx';
import ShortlistPage from './pages/ShortlistPage.jsx';
import FinalisedPage from './pages/FinalisedPage.jsx';
import StartPlanningPage from './pages/StartPlanningPage.jsx';

// Modals
import SavedDrawer from './components/modals/SavedDrawer.jsx';
import CompareModal from './components/modals/CompareModal.jsx';
import NotesDrawer from './components/modals/NotesDrawer.jsx';
import RealWeddingModal from './components/modals/RealWeddingModal.jsx';
import SearchOverlay from './components/modals/SearchOverlay.jsx';
import DashboardModal from './components/modals/DashboardModal.jsx';
import ItemDetailModal from './components/modals/ItemDetailModal.jsx';
import DiscussionWindow from './components/discussion/DiscussionWindow.jsx';

// Pages without footer (vendor page has its own layout)
const NO_FOOTER_ROUTES = ['/vendor/'];

export default function App() {
  const { activeModal, toast } = usePlanning();

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1917] font-sans selection:bg-[#E8D4CF] selection:text-[#6B3037]">
      {/* Global Navigation */}
      <Navbar />

      {/* Page Routes */}
      <Routes>
        <Route path="/"               element={<HomePage />} />
        <Route path="/vendor/:id"     element={<VendorPage />} />
        <Route path="/shortlist"      element={<ShortlistPage />} />
        <Route path="/finalised"      element={<FinalisedPage />} />
        <Route path="/start-planning" element={<StartPlanningPage />} />
        {/* Phase 5 routes: /stories, /vendors, etc. */}
      </Routes>

      {/* Global Footer */}
      <Footer />

      {/* ── Modal Layer ───────────────────────────── */}
      {activeModal?.type === 'saved'       && <SavedDrawer />}
      {activeModal?.type === 'compare'     && <CompareModal />}
      {activeModal?.type === 'notes'       && <NotesDrawer />}
      {activeModal?.type === 'realWedding' && <RealWeddingModal />}
      {activeModal?.type === 'search'      && <SearchOverlay />}
      {activeModal?.type === 'dashboard'   && <DashboardModal />}
      {activeModal?.type === 'itemDetail'  && <ItemDetailModal />}

      {/* ── Toast ─────────────────────────────────── */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[60] animate-bounceIn">
          <div className="bg-[#1C1917] text-white text-xs px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 border border-[#34302C]">
            <span className="w-2 h-2 rounded-full bg-[#8E4A49] flex-shrink-0" />
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* ── Discussion Window ───────────────────────── */}
      <DiscussionWindow />
    </div>
  );
}
