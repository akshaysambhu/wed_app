/**
 * DiscussionWindow.jsx
 * Reusable floating couple discussion component.
 * Behaved like Facebook Messenger.
 *
 * SPECIFICATION:
 * - Desktop: bottom-right, compact square chat window (width ~380-420px, height ~600px)
 * - Mobile: full-screen or near-full-screen chat
 * - Header: Avatar, “Our Planning”, Partner status: “Partner connected · Private”, Minimise & Close buttons
 * - Chat: Right (you) / Left (partner), timestamps, unread indicator, smooth scrolling
 * - Attachments: Vendor, Story, Photo, Venue, Package, Inspiration (belongs to that message)
 * - Attachment View: In-discussion scrollable vendor preview with Back to Discussion button
 * - Composer: “Message your partner…”, Attachment button, Send button
 * - Privacy: “🔒 Only you and your connected partner can see this.”
 */
import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { usePlanning } from '../../context/PlanningContext.jsx';
import ChatMessage from './ChatMessage.jsx';
import AttachmentCard from './AttachmentCard.jsx';
import AttachmentPicker from './AttachmentPicker.jsx';
import VendorPreviewInChat from './VendorPreviewInChat.jsx';

function TypingIndicator({ name = 'Rohan' }) {
  return (
    <div className="flex items-end gap-2 mb-3 animate-fadeIn">
      <div className="w-7 h-7 rounded-full bg-[#8C7E72] flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0 shadow-xs">
        {name.charAt(0)}
      </div>
      <div className="bg-[#F4EFEA] border border-[#EAE3DA] rounded-2xl rounded-bl-xs px-3.5 py-2.5 shadow-xs">
        <div className="flex gap-1.5 items-center">
          <span className="w-1.5 h-1.5 bg-[#8C7E72] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-1.5 h-1.5 bg-[#8C7E72] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-1.5 h-1.5 bg-[#8C7E72] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}

export default function DiscussionWindow() {
  const location = useLocation();
  const {
    messages,
    sendMessage,
    discussionOpen,
    discussionMinimized,
    discussionAttachment,
    closeDiscussion,
    minimizeDiscussion,
    openDiscussion,
    partnerName = 'Rohan',
    unreadCount,
  } = usePlanning();

  const [inputText, setInputText] = useState('');
  const [pendingAttachment, setPendingAttachment] = useState(null);
  const [showAttachmentPicker, setShowAttachmentPicker] = useState(false);
  const [activeAttachmentView, setActiveAttachmentView] = useState(null);
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (discussionOpen && !discussionMinimized && !activeAttachmentView) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, discussionOpen, discussionMinimized, activeAttachmentView]);

  // Handle external attachments passed via openDiscussion(attachment)
  useEffect(() => {
    if (discussionAttachment) {
      setPendingAttachment(discussionAttachment);
      setShowAttachmentPicker(false);
      setTimeout(() => textareaRef.current?.focus(), 150);
    }
  }, [discussionAttachment]);

  // Partner typing simulation when user sends message
  useEffect(() => {
    const lastMsg = messages[messages.length - 1];
    if (lastMsg?.sender === 'you') {
      setIsTyping(true);
      const timer = setTimeout(() => setIsTyping(false), 2800);
      return () => clearTimeout(timer);
    }
  }, [messages]);

  // Hide floating launcher on dedicated /discussion page
  if (location.pathname === '/discussion') {
    return null;
  }

  const handleSend = () => {
    if (!inputText.trim() && !pendingAttachment) return;
    sendMessage(inputText, pendingAttachment);
    setInputText('');
    setPendingAttachment(null);
    setShowAttachmentPicker(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSelectAttachment = (attachment) => {
    setPendingAttachment(attachment);
    setShowAttachmentPicker(false);
    setTimeout(() => textareaRef.current?.focus(), 100);
  };

  const handleViewAttachment = (attachment) => {
    setActiveAttachmentView(attachment);
  };

  // Grouping avatar helper
  const shouldShowAvatar = (index) => {
    if (index === 0) return true;
    return messages[index].sender !== messages[index - 1].sender;
  };

  // ──────────────────────────────────────────────────────────────────────────
  // 1. MINIMIZED STATE (Bottom-right compact dock bar)
  // ──────────────────────────────────────────────────────────────────────────
  if (discussionOpen && discussionMinimized) {
    return (
      <div className="fixed bottom-5 right-5 z-50 animate-slideUp">
        <button
          onClick={minimizeDiscussion}
          className="flex items-center gap-3 bg-[#1C1917] hover:bg-[#2C2724] text-white px-4 py-3 rounded-2xl shadow-2xl border border-white/10 transition-all hover:scale-102"
          title="Restore Our Planning Discussion"
        >
          {/* Avatar with green online dot */}
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-[#8C7E72] flex items-center justify-center text-xs font-bold text-white shadow-xs">
              {partnerName.charAt(0)}
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#1C1917] rounded-full" />
          </div>

          <div className="text-left pr-2">
            <p className="text-xs font-bold leading-tight">Our Planning</p>
            <p className="text-[10px] text-[#A39081]">Partner connected · Private</p>
          </div>

          <div className="flex items-center gap-1.5 ml-1">
            {unreadCount > 0 && (
              <span className="bg-[#6B3037] text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">
                {unreadCount}
              </span>
            )}
            <svg className="w-4 h-4 text-[#A39081]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 15l7-7 7 7" />
            </svg>
          </div>
        </button>
      </div>
    );
  }

  // ──────────────────────────────────────────────────────────────────────────
  // 2. CLOSED STATE (Floating Messenger Chat Head Launcher)
  // ──────────────────────────────────────────────────────────────────────────
  if (!discussionOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50 group">
        <button
          onClick={() => openDiscussion()}
          className="relative w-14 h-14 bg-[#1C1917] hover:bg-[#6B3037] rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 active:scale-95 border-2 border-white/20"
          title="Our Planning — Private Couple Discussion"
          aria-label="Open couple discussion"
        >
          {/* Messenger-style speech bubble icon */}
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.145 2 11.258c0 2.915 1.455 5.518 3.734 7.159v3.583l3.438-1.892c.905.253 1.854.39 2.828.39 5.523 0 10-4.145 10-9.24C22 6.145 17.523 2 12 2zm1.054 12.443l-2.617-2.793-5.109 2.793 5.617-5.962 2.68 2.793 5.045-2.793-5.616 5.962z" />
          </svg>

          {/* Unread badge */}
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#6B3037] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-md animate-bounce">
              {unreadCount}
            </span>
          )}

          {/* Live Partner Dot */}
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" title="Partner connected" />
        </button>

        {/* Hover Tooltip */}
        <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-[#1C1917] text-white text-xs px-3 py-1.5 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-xl pointer-events-none flex items-center gap-1.5">
          <span>Our Planning</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        </div>
      </div>
    );
  }

  // ──────────────────────────────────────────────────────────────────────────
  // 3. OPEN STATE (Square Desktop 380–420px x 600px, Full-screen Mobile)
  // ──────────────────────────────────────────────────────────────────────────
  return (
    <div
      className="fixed inset-0 sm:inset-auto sm:bottom-5 sm:right-5 sm:w-[400px] sm:h-[600px] sm:max-h-[min(600px,calc(100vh-2.5rem))] z-50 flex flex-col bg-white overflow-hidden shadow-2xl border border-[#EAE3DA] sm:rounded-2xl rounded-none animate-slideUp font-sans"
      style={{ zIndex: 9999 }}
    >
      {/* ── HEADER ────────────────────────────────────────────────────────── */}
      <div className="bg-[#1C1917] px-4 py-3 flex items-center justify-between flex-shrink-0 z-20">
        <div className="flex items-center gap-3">
          {/* Partner Avatar with Online Ring */}
          <div className="relative flex-shrink-0">
            <div className="w-9 h-9 rounded-full bg-[#8C7E72] flex items-center justify-center text-sm font-bold text-white shadow-xs">
              {partnerName.charAt(0)}
            </div>
            <span
              className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#1C1917] rounded-full"
              title="Partner connected"
            />
          </div>

          {/* Title & Status */}
          <div>
            <h3 className="text-white text-sm font-bold leading-tight">Our Planning</h3>
            <p className="text-[#A39081] text-[10px] flex items-center gap-1">
              <span>Partner connected · Private</span>
            </p>
          </div>
        </div>

        {/* Header Action Buttons: Minimise and Close */}
        <div className="flex items-center gap-1">
          <button
            onClick={minimizeDiscussion}
            className="p-1.5 text-[#A39081] hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            title="Minimise"
            aria-label="Minimise"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M20 12H4" />
            </svg>
          </button>
          <button
            onClick={closeDiscussion}
            className="p-1.5 text-[#A39081] hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            title="Close"
            aria-label="Close"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── PRIVACY BANNER ─────────────────────────────────────────────────── */}
      <div className="bg-[#FAF6F0] border-b border-[#EAE3DA] px-3.5 py-1.5 flex items-center justify-between text-[11px] text-[#78716C] flex-shrink-0">
        <span className="flex items-center gap-1.5 font-medium text-[#57534E]">
          <span>🔒</span>
          <span>Only you and your connected partner can see this.</span>
        </span>
        <span className="text-[10px] text-[#8C7E72] bg-white px-2 py-0.5 rounded-full border border-[#EAE3DA]">
          Private
        </span>
      </div>

      {/* ────────────────────────────────────────────────────────────────────
          MAIN BODY SWITCHER:
          If an attachment is being viewed -> render scrollable VendorPreview
          Otherwise -> render Chat stream
         ──────────────────────────────────────────────────────────────────── */}
      {activeAttachmentView ? (
        <VendorPreviewInChat
          attachment={activeAttachmentView}
          onBack={() => setActiveAttachmentView(null)}
        />
      ) : (
        <>
          {/* ── CHAT MESSAGES STREAM ──────────────────────────────────────── */}
          <div className="flex-1 overflow-y-auto bg-[#FAF8F5] px-3.5 py-3">
            {/* Privacy Reassurance Card at start */}
            <div className="text-center my-3">
              <div className="inline-flex items-center gap-1.5 bg-[#F4EFEA] border border-[#EAE3DA] px-3 py-1 rounded-full text-[10px] text-[#78716C]">
                <span>🔒 Only you and your connected partner can see this.</span>
              </div>
              <p className="text-[10px] text-[#A39081] mt-1">Do not expose these messages publicly.</p>
            </div>

            {/* Message Bubbles */}
            {messages.map((msg, index) => (
              <React.Fragment key={msg.id || index}>
                {/* Unread Divider on unread partner messages */}
                {!msg.read && msg.sender === 'partner' && index > 0 && messages[index - 1]?.read && (
                  <div className="flex items-center gap-2 my-3">
                    <div className="flex-1 h-px bg-[#D4C5B9]" />
                    <span className="text-[10px] font-bold tracking-wider text-[#6B3037] uppercase bg-[#F5ECE8] px-2 py-0.5 rounded-full">
                      New Messages
                    </span>
                    <div className="flex-1 h-px bg-[#D4C5B9]" />
                  </div>
                )}

                <ChatMessage
                  message={msg}
                  partnerName={partnerName}
                  showAvatar={shouldShowAvatar(index)}
                  onViewAttachment={handleViewAttachment}
                />
              </React.Fragment>
            ))}

            {/* Partner Typing Indicator */}
            {isTyping && <TypingIndicator name={partnerName} />}

            <div ref={messagesEndRef} />
          </div>

          {/* ── ATTACHMENT PICKER DRAWER (if open) ───────────────────────── */}
          {showAttachmentPicker && (
            <AttachmentPicker
              onSelect={handleSelectAttachment}
              onClose={() => setShowAttachmentPicker(false)}
            />
          )}

          {/* ── PENDING ATTACHMENT CARD (Staged above input) ─────────────── */}
          {pendingAttachment && !showAttachmentPicker && (
            <div className="bg-[#F4EFEA] border-t border-[#EAE3DA] px-3 py-2 flex-shrink-0 animate-fadeIn">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-bold text-[#8E4A49] uppercase tracking-wider mb-1">
                    Attaching to message:
                  </p>
                  <AttachmentCard
                    attachment={pendingAttachment}
                    onView={handleViewAttachment}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setPendingAttachment(null)}
                  className="p-1 text-[#8C7E72] hover:text-[#6B3037] rounded-md transition-colors mt-2"
                  title="Remove attachment"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* ── COMPOSER ─────────────────────────────────────────────────── */}
          <div className="bg-white border-t border-[#EAE3DA] p-2.5 flex-shrink-0">
            <div className="flex items-end gap-1.5">
              {/* Attachment Button */}
              <button
                type="button"
                onClick={() => setShowAttachmentPicker(prev => !prev)}
                className={`p-2 rounded-xl transition-all flex-shrink-0 ${
                  showAttachmentPicker || pendingAttachment
                    ? 'bg-[#6B3037] text-white shadow-xs'
                    : 'text-[#78716C] hover:text-[#1C1917] hover:bg-[#F4EFEA]'
                }`}
                title="Attach vendor, venue, story, package, inspiration, or photo"
                aria-label="Attach item"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
              </button>

              {/* Text Input */}
              <div className="flex-1 relative">
                <textarea
                  ref={textareaRef}
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Message your partner…"
                  rows={1}
                  className="w-full resize-none bg-[#F4EFEA] rounded-xl px-3.5 py-2 text-xs sm:text-sm text-[#1C1917] placeholder:text-[#A39081] focus:outline-none focus:ring-1 focus:ring-[#6B3037] transition-all max-h-24 overflow-y-auto"
                  style={{ lineHeight: '1.4' }}
                  onInput={e => {
                    e.target.style.height = 'auto';
                    e.target.style.height = Math.min(e.target.scrollHeight, 80) + 'px';
                  }}
                />
              </div>

              {/* Send Button */}
              <button
                type="button"
                onClick={handleSend}
                disabled={!inputText.trim() && !pendingAttachment}
                className="w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0 flex items-center justify-center rounded-xl bg-[#6B3037] hover:bg-[#52242A] disabled:bg-[#EAE3DA] disabled:text-[#A39081] disabled:cursor-not-allowed text-white transition-all shadow-xs active:scale-95"
                title="Send message"
                aria-label="Send message"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>

            <div className="flex items-center justify-between text-[10px] text-[#A39081] mt-1.5 px-1">
              <span>Press Enter to send</span>
              <span>🔒 Connected to {partnerName}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
