// PlanningContext.jsx — Central state management for Plan My Moments
import { createContext, useContext, useState, useEffect } from 'react';
import { INSPIRATIONS, VENDORS, VENUES, INITIAL_NOTES, DASHBOARD_INITIAL_STATE } from '../data/mockData.js';

export const PlanningContext = createContext();

// ─── SEED CONVERSATION ─────────────────────────────────────────────────────────
const SEED_MESSAGES = [
  {
    id: 'msg-0',
    sender: 'partner',
    partnerName: 'Rohan',
    text: 'Hey! I found a photographer I really like. Have a look at this.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    attachment: null,
    read: true,
  },
  {
    id: 'msg-1',
    sender: 'partner',
    partnerName: 'Rohan',
    text: 'Stories by Amal — the candid style is amazing. Thoughts?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2.9).toISOString(),
    attachment: {
      type: 'vendor',
      item: {
        id: 'stories-by-amal',
        name: 'Stories by Amal',
        category: 'Wedding Photography',
        location: 'Kochi, Kerala',
        rating: 4.9,
        reviewsCount: 128,
        startingPrice: 'From ₹45,000',
        image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=400&q=80',
        slug: 'stories-by-amal',
      },
    },
    read: true,
  },
  {
    id: 'msg-2',
    sender: 'you',
    text: 'Oh I love this! The natural light work is beautiful. Definitely shortlisting.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    attachment: null,
    read: true,
  },
  {
    id: 'msg-3',
    sender: 'partner',
    partnerName: 'Rohan',
    text: 'Also check out Cedar Hall for the venue — the backwaters view is perfect for our guest count.',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    attachment: {
      type: 'venue',
      item: {
        id: 'venue-1',
        name: 'Cedar Hall',
        location: 'Kumarakom, Kerala',
        capacity: '200-800 guests',
        priceFormatted: 'From ₹2,20,000',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80',
      },
    },
    read: false,
  },
];

export function PlanningProvider({ children }) {

  // ─── SAVED / FAVOURITES ───────────────────────────────────────────────────
  const [savedItems, setSavedItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('pmm_saved_items')) || [INSPIRATIONS[0], VENDORS[0]]; }
    catch { return [INSPIRATIONS[0], VENDORS[0]]; }
  });

  // ─── SHORTLIST ────────────────────────────────────────────────────────────
  const [shortlistItems, setShortlistItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('pmm_shortlist')) || []; }
    catch { return []; }
  });

  // ─── FINALISED ────────────────────────────────────────────────────────────
  const [finalisedItems, setFinalisedItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('pmm_finalised')) || []; }
    catch { return []; }
  });

  // ─── COMPARE ──────────────────────────────────────────────────────────────
  const [compareItems, setCompareItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('pmm_compare_items')) || [VENDORS[0], VENDORS[3]]; }
    catch { return [VENDORS[0], VENDORS[3]]; }
  });

  // ─── NOTES ────────────────────────────────────────────────────────────────
  const [notes, setNotes] = useState(() => {
    try { return JSON.parse(localStorage.getItem('pmm_notes')) || INITIAL_NOTES; }
    catch { return INITIAL_NOTES; }
  });

  // ─── DASHBOARD ────────────────────────────────────────────────────────────
  const [dashboardState, setDashboardState] = useState(() => {
    try { return JSON.parse(localStorage.getItem('pmm_dashboard')) || DASHBOARD_INITIAL_STATE; }
    catch { return DASHBOARD_INITIAL_STATE; }
  });

  // ─── COUPLE DISCUSSION MESSAGES ───────────────────────────────────────────
  const [messages, setMessages] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('pmm_messages'));
      return stored && stored.length ? stored : SEED_MESSAGES;
    }
    catch { return SEED_MESSAGES; }
  });

  // ─── DISCUSSION WINDOW STATE ──────────────────────────────────────────────
  const [discussionOpen, setDiscussionOpen] = useState(false);
  const [discussionMinimized, setDiscussionMinimized] = useState(false);
  const [discussionAttachment, setDiscussionAttachment] = useState(null);
  const [partnerName] = useState('Rohan');
  const [yourName] = useState('Anjali');

  // ─── MODALS ───────────────────────────────────────────────────────────────
  const [activeModal, setActiveModal] = useState(null);
  const [toast, setToast] = useState(null);

  // ─── PERSIST ──────────────────────────────────────────────────────────────
  useEffect(() => { try { localStorage.setItem('pmm_saved_items', JSON.stringify(savedItems)); } catch {} }, [savedItems]);
  useEffect(() => { try { localStorage.setItem('pmm_shortlist', JSON.stringify(shortlistItems)); } catch {} }, [shortlistItems]);
  useEffect(() => { try { localStorage.setItem('pmm_finalised', JSON.stringify(finalisedItems)); } catch {} }, [finalisedItems]);
  useEffect(() => { try { localStorage.setItem('pmm_compare_items', JSON.stringify(compareItems)); } catch {} }, [compareItems]);
  useEffect(() => { try { localStorage.setItem('pmm_notes', JSON.stringify(notes)); } catch {} }, [notes]);
  useEffect(() => { try { localStorage.setItem('pmm_dashboard', JSON.stringify(dashboardState)); } catch {} }, [dashboardState]);
  useEffect(() => { try { localStorage.setItem('pmm_messages', JSON.stringify(messages)); } catch {} }, [messages]);

  // ─── TOAST ────────────────────────────────────────────────────────────────
  const showToast = (message) => {
    setToast({ message, id: Date.now() });
    setTimeout(() => setToast(null), 3200);
  };

  // ─── SAVED HELPERS ────────────────────────────────────────────────────────
  const isSaved = (id) => savedItems.some(i => i.id === id);
  const toggleSave = (item) => {
    if (isSaved(item.id)) {
      setSavedItems(prev => prev.filter(i => i.id !== item.id));
      showToast(`Removed "${item.title || item.name}" from Saved`);
    } else {
      setSavedItems(prev => [...prev, item]);
      showToast(`Saved "${item.title || item.name}" to your collection`);
    }
  };

  // ─── SHORTLIST HELPERS ────────────────────────────────────────────────────
  const isShortlisted = (id) => shortlistItems.some(i => i.id === id);
  const toggleShortlist = (item) => {
    if (isShortlisted(item.id)) {
      setShortlistItems(prev => prev.filter(i => i.id !== item.id));
      showToast(`Removed "${item.name}" from Shortlist`);
    } else {
      setShortlistItems(prev => [...prev, { ...item, status: 'shortlisted', addedAt: Date.now() }]);
      showToast(`"${item.name}" added to Shortlist ✓`);
    }
  };

  // ─── FINALISED HELPERS ────────────────────────────────────────────────────
  const isFinalised = (id) => finalisedItems.some(i => i.id === id);
  const finaliseVendor = (item) => {
    if (!isFinalised(item.id)) {
      setFinalisedItems(prev => [...prev, { ...item, status: 'waiting', finalisedAt: Date.now() }]);
      setShortlistItems(prev => prev.filter(i => i.id !== item.id));
      showToast(`"${item.name}" added to your Final Crew! 🎉`);
    }
  };
  const updateFinalisedStatus = (id, status) => {
    setFinalisedItems(prev => prev.map(i => i.id === id ? { ...i, status } : i));
  };
  const removeFromFinalised = (id) => {
    setFinalisedItems(prev => prev.filter(i => i.id !== id));
  };

  // ─── COMPARE HELPERS ──────────────────────────────────────────────────────
  const isInCompare = (id) => compareItems.some(i => i.id === id);
  const toggleCompare = (item) => {
    if (isInCompare(item.id)) {
      setCompareItems(prev => prev.filter(i => i.id !== item.id));
      showToast('Removed from comparison');
    } else {
      if (compareItems.length >= 4) { showToast('Compare list full (max 4)'); return; }
      setCompareItems(prev => [...prev, item]);
      showToast(`Added "${item.name || item.title}" to compare`);
    }
  };
  const removeFromCompare = (id) => setCompareItems(prev => prev.filter(i => i.id !== id));

  // ─── NOTES HELPERS ────────────────────────────────────────────────────────
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
    setNotes(prev => [noteObj, ...prev]);
    showToast(newNote.isDecision ? 'Shared decision recorded' : 'Note added');
  };

  // ─── DASHBOARD HELPERS ────────────────────────────────────────────────────
  const toggleTask = (taskId) => {
    setDashboardState(prev => ({
      ...prev,
      tasks: prev.tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t),
    }));
  };

  // ─── DISCUSSION HELPERS ───────────────────────────────────────────────────
  const unreadCount = messages.filter(m => m.sender === 'partner' && m.read === false).length;

  const openDiscussion = (attachment = null) => {
    setDiscussionAttachment(attachment);
    setDiscussionOpen(true);
    setDiscussionMinimized(false);
    // Mark all as read
    setMessages(prev => prev.map(m => ({ ...m, read: true })));
  };

  const closeDiscussion = () => {
    setDiscussionOpen(false);
    setDiscussionAttachment(null);
  };

  const minimizeDiscussion = () => {
    setDiscussionMinimized(prev => !prev);
  };

  const sendMessage = (text, attachment = null) => {
    if (!text.trim() && !attachment) return;
    const msg = {
      id: `msg-${Date.now()}`,
      sender: 'you',
      text: text.trim(),
      timestamp: new Date().toISOString(),
      attachment,
      read: true,
    };
    setMessages(prev => [...prev, msg]);
    setDiscussionAttachment(null);

    // Simulate partner typing + reply after 2–4s
    const replies = [
      'That looks really nice! Let me check their portfolio.',
      'Love it! Should we shortlist this one?',
      'Hmm, interesting. What do you think about the pricing?',
      'I agree! Can we also compare it with the others we saved?',
      'Yes! This feels right for our vibe 💛',
    ];
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: `msg-${Date.now()}-reply`,
        sender: 'partner',
        partnerName,
        text: replies[Math.floor(Math.random() * replies.length)],
        timestamp: new Date().toISOString(),
        attachment: null,
        read: false,
      }]);
    }, 2000 + Math.random() * 2000);
  };

  const clearMessages = () => setMessages(SEED_MESSAGES);

  // ─── MODAL HELPERS ────────────────────────────────────────────────────────
  const openModal = (type, data = null) => {
    setActiveModal({ type, data });
    document.body.style.overflow = 'hidden';
  };
  const closeModal = () => {
    setActiveModal(null);
    document.body.style.overflow = '';
  };

  return (
    <PlanningContext.Provider value={{
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
      messages, sendMessage, clearMessages,
      unreadCount,
      discussionOpen, discussionMinimized, discussionAttachment,
      openDiscussion, closeDiscussion, minimizeDiscussion,
      partnerName, yourName,
      // Modals
      activeModal, openModal, closeModal,
      // Toast
      toast, showToast,
    }}>
      {children}
    </PlanningContext.Provider>
  );
}

export const usePlanning = () => useContext(PlanningContext);
