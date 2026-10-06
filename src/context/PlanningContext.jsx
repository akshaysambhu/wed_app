// PlanningContext.jsx — Central state management for Plan My Moments
import { createContext, useContext, useState, useEffect } from 'react';
import { INSPIRATIONS, VENDORS, VENUES, INITIAL_NOTES, DASHBOARD_INITIAL_STATE } from '../data/mockData.js';

export const PlanningContext = createContext();

export function PlanningProvider({ children }) {

  // ─── SAVED / FAVOURITES ────────────────────────────────────────────────────
  const [savedItems, setSavedItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('pmm_saved_items')) || [INSPIRATIONS[0], VENDORS[0]]; }
    catch { return [INSPIRATIONS[0], VENDORS[0]]; }
  });

  // ─── SHORTLIST (Considering for event) ─────────────────────────────────────
  const [shortlistItems, setShortlistItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('pmm_shortlist')) || []; }
    catch { return []; }
  });

  // ─── FINALISED (Chosen vendors) ────────────────────────────────────────────
  const [finalisedItems, setFinalisedItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('pmm_finalised')) || []; }
    catch { return []; }
  });

  // ─── COMPARE TRAY ──────────────────────────────────────────────────────────
  const [compareItems, setCompareItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('pmm_compare_items')) || [VENDORS[0], VENDORS[3]]; }
    catch { return [VENDORS[0], VENDORS[3]]; }
  });

  // ─── NOTES (Simple notes — will be replaced by Discussion in Phase 3) ──────
  const [notes, setNotes] = useState(() => {
    try { return JSON.parse(localStorage.getItem('pmm_notes')) || INITIAL_NOTES; }
    catch { return INITIAL_NOTES; }
  });

  // ─── DASHBOARD ─────────────────────────────────────────────────────────────
  const [dashboardState, setDashboardState] = useState(() => {
    try { return JSON.parse(localStorage.getItem('pmm_dashboard')) || DASHBOARD_INITIAL_STATE; }
    catch { return DASHBOARD_INITIAL_STATE; }
  });

  // ─── DISCUSSION STATE ───────────────────────────────────────────────────────
  const [discussionOpen, setDiscussionOpen] = useState(false);
  const [discussionAttachment, setDiscussionAttachment] = useState(null); // { item, type }

  // ─── MODALS ────────────────────────────────────────────────────────────────
  const [activeModal, setActiveModal] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState(null);

  // ─── PERSIST TO LOCALSTORAGE ───────────────────────────────────────────────
  useEffect(() => { try { localStorage.setItem('pmm_saved_items', JSON.stringify(savedItems)); } catch {} }, [savedItems]);
  useEffect(() => { try { localStorage.setItem('pmm_shortlist', JSON.stringify(shortlistItems)); } catch {} }, [shortlistItems]);
  useEffect(() => { try { localStorage.setItem('pmm_finalised', JSON.stringify(finalisedItems)); } catch {} }, [finalisedItems]);
  useEffect(() => { try { localStorage.setItem('pmm_compare_items', JSON.stringify(compareItems)); } catch {} }, [compareItems]);
  useEffect(() => { try { localStorage.setItem('pmm_notes', JSON.stringify(notes)); } catch {} }, [notes]);
  useEffect(() => { try { localStorage.setItem('pmm_dashboard', JSON.stringify(dashboardState)); } catch {} }, [dashboardState]);

  // ─── TOAST ─────────────────────────────────────────────────────────────────
  const showToast = (message) => {
    setToast({ message, id: Date.now() });
    setTimeout(() => setToast(null), 3200);
  };

  // ─── SAVED HELPERS ─────────────────────────────────────────────────────────
  const isSaved = (id) => savedItems.some((i) => i.id === id);
  const toggleSave = (item) => {
    if (isSaved(item.id)) {
      setSavedItems((prev) => prev.filter((i) => i.id !== item.id));
      showToast(`Removed "${item.title || item.name}" from Saved`);
    } else {
      setSavedItems((prev) => [...prev, item]);
      showToast(`Saved "${item.title || item.name}" to your collection`);
    }
  };

  // ─── SHORTLIST HELPERS ─────────────────────────────────────────────────────
  const isShortlisted = (id) => shortlistItems.some((i) => i.id === id);
  const toggleShortlist = (item) => {
    if (isShortlisted(item.id)) {
      setShortlistItems((prev) => prev.filter((i) => i.id !== item.id));
      showToast(`Removed "${item.name}" from Shortlist`);
    } else {
      setShortlistItems((prev) => [...prev, { ...item, status: 'shortlisted', addedAt: Date.now() }]);
      showToast(`"${item.name}" added to Shortlist ✓`);
    }
  };

  // ─── FINALISED HELPERS ─────────────────────────────────────────────────────
  const isFinalised = (id) => finalisedItems.some((i) => i.id === id);
  const finaliseVendor = (item) => {
    if (!isFinalised(item.id)) {
      setFinalisedItems((prev) => [...prev, { ...item, status: 'waiting', finalisedAt: Date.now() }]);
      setShortlistItems((prev) => prev.filter((i) => i.id !== item.id)); // remove from shortlist
      showToast(`"${item.name}" added to your Final Crew! 🎉`);
    }
  };
  const updateFinalisedStatus = (id, status) => {
    setFinalisedItems((prev) => prev.map((i) => i.id === id ? { ...i, status } : i));
  };
  const removeFromFinalised = (id) => {
    setFinalisedItems((prev) => prev.filter((i) => i.id !== id));
  };

  // ─── COMPARE HELPERS ───────────────────────────────────────────────────────
  const isInCompare = (id) => compareItems.some((i) => i.id === id);
  const toggleCompare = (item) => {
    if (isInCompare(item.id)) {
      setCompareItems((prev) => prev.filter((i) => i.id !== item.id));
      showToast('Removed from comparison');
    } else {
      if (compareItems.length >= 4) { showToast('Compare list full (max 4)'); return; }
      setCompareItems((prev) => [...prev, item]);
      showToast(`Added "${item.name || item.title}" to compare`);
    }
  };
  const removeFromCompare = (id) => setCompareItems((prev) => prev.filter((i) => i.id !== id));

  // ─── NOTES HELPERS ─────────────────────────────────────────────────────────
  const addNote = (newNote) => {
    const noteObj = {
      id: `note-${Date.now()}`,
      author: newNote.author || 'You',
      type: newNote.isDecision ? 'shared_decision' : 'partner_note',
      title: newNote.title || 'Untitled Note',
      content: newNote.content,
      targetTitle: newNote.targetTitle || 'General Planning',
      date: 'Just now',
      isDecision: Boolean(newNote.isDecision),
    };
    setNotes((prev) => [noteObj, ...prev]);
    showToast(newNote.isDecision ? 'Shared decision recorded' : 'Note added');
  };

  // ─── DASHBOARD HELPERS ─────────────────────────────────────────────────────
  const toggleTask = (taskId) => {
    setDashboardState((prev) => ({
      ...prev,
      tasks: prev.tasks.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t)),
    }));
  };

  // ─── DISCUSSION HELPERS ────────────────────────────────────────────────────
  const openDiscussion = (attachment = null) => {
    setDiscussionAttachment(attachment);
    setDiscussionOpen(true);
  };
  const closeDiscussion = () => {
    setDiscussionOpen(false);
    setDiscussionAttachment(null);
  };

  // ─── MODAL HELPERS ─────────────────────────────────────────────────────────
  const openModal = (type, data = null) => {
    setActiveModal({ type, data });
    document.body.style.overflow = 'hidden';
  };
  const closeModal = () => {
    setActiveModal(null);
    document.body.style.overflow = '';
  };

  return (
    <PlanningContext.Provider
      value={{
        // Saved
        savedItems, isSaved, toggleSave,
        // Shortlist
        shortlistItems, isShortlisted, toggleShortlist,
        // Finalised
        finalisedItems, isFinalised, finaliseVendor, updateFinalisedStatus, removeFromFinalised,
        // Compare
        compareItems, isInCompare, toggleCompare, removeFromCompare,
        // Notes
        notes, addNote,
        // Dashboard
        dashboardState, toggleTask,
        // Discussion
        discussionOpen, discussionAttachment, openDiscussion, closeDiscussion,
        // Modals
        activeModal, openModal, closeModal,
        // Search
        searchQuery, setSearchQuery,
        // Toast
        toast, showToast,
      }}
    >
      {children}
    </PlanningContext.Provider>
  );
}

export const usePlanning = () => useContext(PlanningContext);
