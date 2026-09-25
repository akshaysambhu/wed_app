// React Context for Plan My Moments state management
import { createContext, useContext, useState, useEffect } from 'react';
import { INSPIRATIONS, VENDORS, VENUES, INITIAL_NOTES, DASHBOARD_INITIAL_STATE } from '../data/mockData.js';

export const PlanningContext = createContext();

export function PlanningProvider({ children }) {
  // Saved / Favourites State (persisted in localStorage)
  const [savedItems, setSavedItems] = useState(() => {
    try {
      const stored = localStorage.getItem('pmm_saved_items');
      return stored ? JSON.parse(stored) : [INSPIRATIONS[0], INSPIRATIONS[2], VENDORS[0]];
    } catch (e) {
      return [INSPIRATIONS[0], INSPIRATIONS[2], VENDORS[0]];
    }
  });

  // Compare Tray State (persisted in localStorage)
  const [compareItems, setCompareItems] = useState(() => {
    try {
      const stored = localStorage.getItem('pmm_compare_items');
      return stored ? JSON.parse(stored) : [VENDORS[0], VENDORS[3], VENDORS[4]];
    } catch (e) {
      return [VENDORS[0], VENDORS[3], VENDORS[4]];
    }
  });

  // Notes State (persisted in localStorage)
  const [notes, setNotes] = useState(() => {
    try {
      const stored = localStorage.getItem('pmm_notes');
      return stored ? JSON.parse(stored) : INITIAL_NOTES;
    } catch (e) {
      return INITIAL_NOTES;
    }
  });

  // Dashboard State (persisted in localStorage)
  const [dashboardState, setDashboardState] = useState(() => {
    try {
      const stored = localStorage.getItem('pmm_dashboard');
      return stored ? JSON.parse(stored) : DASHBOARD_INITIAL_STATE;
    } catch (e) {
      return DASHBOARD_INITIAL_STATE;
    }
  });

  // Active Modals & Overlays
  const [activeModal, setActiveModal] = useState(null); // { type, data }
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('pmm_saved_items', JSON.stringify(savedItems));
    } catch (e) {}
  }, [savedItems]);

  useEffect(() => {
    try {
      localStorage.setItem('pmm_compare_items', JSON.stringify(compareItems));
    } catch (e) {}
  }, [compareItems]);

  useEffect(() => {
    try {
      localStorage.setItem('pmm_notes', JSON.stringify(notes));
    } catch (e) {}
  }, [notes]);

  useEffect(() => {
    try {
      localStorage.setItem('pmm_dashboard', JSON.stringify(dashboardState));
    } catch (e) {}
  }, [dashboardState]);

  // Toast Helper
  const showToast = (message, icon = 'check') => {
    setToast({ message, icon, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  // Saved Items Helpers
  const isSaved = (id) => savedItems.some((item) => item.id === id);

  const toggleSave = (item) => {
    if (isSaved(item.id)) {
      setSavedItems((prev) => prev.filter((i) => i.id !== item.id));
      showToast(`Removed "${item.title || item.name}" from Saved`, 'heart-off');
    } else {
      setSavedItems((prev) => [...prev, item]);
      showToast(`Saved "${item.title || item.name}" to your collection`, 'heart');
    }
  };

  // Compare Items Helpers
  const isInCompare = (id) => compareItems.some((item) => item.id === id);

  const toggleCompare = (item) => {
    if (isInCompare(item.id)) {
      setCompareItems((prev) => prev.filter((i) => i.id !== item.id));
      showToast(`Removed from comparison`, 'minus');
    } else {
      if (compareItems.length >= 4) {
        showToast(`Comparison list full (max 4 items)`, 'alert');
        return;
      }
      setCompareItems((prev) => [...prev, item]);
      showToast(`Added "${item.name || item.title}" to compare`, 'check');
    }
  };

  const removeFromCompare = (id) => {
    setCompareItems((prev) => prev.filter((item) => item.id !== id));
    showToast(`Removed from comparison`, 'minus');
  };

  // Notes Helpers
  const addNote = (newNote) => {
    const noteObj = {
      id: `note-${Date.now()}`,
      author: newNote.author || 'Anjali',
      type: newNote.isDecision ? 'shared_decision' : 'partner_note',
      title: newNote.title || 'Untitled Note',
      content: newNote.content,
      targetTitle: newNote.targetTitle || 'General Planning',
      date: 'Just now',
      isDecision: Boolean(newNote.isDecision)
    };
    setNotes((prev) => [noteObj, ...prev]);
    showToast(newNote.isDecision ? 'Shared decision recorded' : 'Note added for partner to review', 'pen-tool');
  };

  // Task Toggle
  const toggleTask = (taskId) => {
    setDashboardState((prev) => ({
      ...prev,
      tasks: prev.tasks.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    }));
  };

  // Modal Handlers
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
        savedItems,
        isSaved,
        toggleSave,
        compareItems,
        isInCompare,
        toggleCompare,
        removeFromCompare,
        notes,
        addNote,
        dashboardState,
        toggleTask,
        activeModal,
        openModal,
        closeModal,
        searchQuery,
        setSearchQuery,
        toast,
        showToast
      }}
    >
      {children}
    </PlanningContext.Provider>
  );
}

export const usePlanning = () => useContext(PlanningContext);
