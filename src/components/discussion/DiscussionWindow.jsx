/**
 * DiscussionWindow.jsx
 * Floating WhatsApp-style couple chat window — bottom-right corner.
 * States: open (full chat), minimized (header only), closed (not rendered).
 * Opens with optional pre-attached item when "Discuss" is clicked anywhere.
 */
import React, { useState, useRef, useEffect } from 'react';
import { usePlanning } from '../../context/PlanningContext.jsx';
import ChatMessage from './ChatMessage.jsx';
import AttachmentCard from './AttachmentCard.jsx';

function TypingIndicator({ name }) {
  return (
    <div className="flex items-end gap-2 mb-3">
      <div className="w-7 h-7 rounded-full bg-[#8C7E72] flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0">
        {name.charAt(0)}
      </div>
      <div className="bg-[#F4EFEA] border border-[#EAE3DA] rounded-2xl rounded-bl-sm px-4 py-3">
        <div className="flex gap-1 items-center">
          <span className="w-1.5 h-1.5 bg-[#A39081] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-1.5 h-1.5 bg-[#A39081] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-1.5 h-1.5 bg-[#A39081] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}

export default function DiscussionWindow() {
  const {
    messages, sendMessage,
    discussionOpen, discussionMinimized, discussionAttachment,
    closeDiscussion, minimizeDiscussion, openDiscussion,
    partnerName, yourName, unreadCount,
  } = usePlanning();

  const [inputText, setInputText] = useState('');
  const [pendingAttachment, setPendingAttachment] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (discussionOpen && !discussionMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, discussionOpen, discussionMinimized]);

  // When opened with an attachment, pre-set pending attachment
  useEffect(() => {
    if (discussionAttachment) {
      setPendingAttachment(discussionAttachment);
      inputRef.current?.focus();
    }
  }, [discussionAttachment]);

  // Detect partner typing simulation
  useEffect(() => {
    const lastMsg = messages[messages.length - 1];
    if (lastMsg?.sender === 'you') {
      setIsTyping(true);
      const timer = setTimeout(() => setIsTyping(false), 3500);
      return () => clearTimeout(timer);
    }
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim() && !pendingAttachment) return;
    sendMessage(inputText, pendingAttachment);
    setInputText('');
    setPendingAttachment(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const removePendingAttachment = () => setPendingAttachment(null);

  // Detect consecutive messages from same sender for avatar grouping
  const shouldShowAvatar = (index) => {
    if (index === 0) return true;
    return messages[index].sender !== messages[index - 1].sender;
  };

  // ── Minimized state — just show the header bar ──────────────────────────
  if (discussionOpen && discussionMinimized) {
    return (
      <div
        className="fixed bottom-4 right-4 z-50 w-72 animate-slideUp"
        style={{ fontFamily: 'inherit' }}
      >
        <button
          onClick={minimizeDiscussion}
          className="w-full flex items-center justify-between gap-3 bg-[#1C1917] text-white px-4 py-3 rounded-2xl shadow-2xl hover:bg-[#34302C] transition-colors"
        >
          <div className="flex items-center gap-3">
            {/* Partner avatar */}
            <div className="w-8 h-8 rounded-full bg-[#8C7E72] flex items-center justify-center text-xs font-bold flex-shrink-0">
              {partnerName.charAt(0)}
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold">{partnerName}</p>
              <p className="text-[10px] text-[#A39081]">Couple Discussion</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <span className="bg-[#6B3037] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )}
            <svg className="w-4 h-4 text-[#8C7E72]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
            </svg>
          </div>
        </button>
      </div>
    );
  }

  // ── Closed — floating bubble launcher ────────────────────────────────────
  if (!discussionOpen) {
    return (
      <button
        onClick={() => openDiscussion()}
        className="fixed bottom-6 right-6 z-50 group"
        title="Open Couple Discussion"
      >
        <div className="relative w-14 h-14 bg-[#1C1917] hover:bg-[#6B3037] rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#6B3037] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
              {unreadCount}
            </span>
          )}
        </div>
        {/* Tooltip */}
        <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-[#1C1917] text-white text-xs px-3 py-1.5 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg">
          Couple Discussion
        </span>
      </button>
    );
  }

  // ── Open — full chat window ───────────────────────────────────────────────
  return (
    <div
      className="fixed bottom-4 right-4 z-50 w-80 sm:w-96 flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-[#EAE3DA] animate-slideUp"
      style={{ height: '520px', fontFamily: 'inherit' }}
    >
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div className="bg-[#1C1917] px-4 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          {/* Partner avatar */}
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-[#8C7E72] flex items-center justify-center text-sm font-bold text-white">
              {partnerName.charAt(0)}
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#1C1917] rounded-full" />
          </div>
          <div>
            <p className="text-white text-sm font-semibold leading-tight">{partnerName}</p>
            <p className="text-[#A39081] text-[10px]">Couple Discussion · Private</p>
          </div>
        </div>

        {/* Header actions */}
        <div className="flex items-center gap-1">
          <button
            onClick={minimizeDiscussion}
            className="p-1.5 text-[#8C7E72] hover:text-white transition-colors rounded-lg hover:bg-white/10"
            title="Minimise"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
            </svg>
          </button>
          <button
            onClick={closeDiscussion}
            className="p-1.5 text-[#8C7E72] hover:text-white transition-colors rounded-lg hover:bg-white/10"
            title="Close"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── Privacy notice ─────────────────────────────────────────────── */}
      <div className="bg-[#FDFBF7] border-b border-[#EAE3DA] px-4 py-2 flex items-center gap-2 flex-shrink-0">
        <span className="text-[10px] text-[#A39081]">🔒 Private · Only you and {partnerName} can see this</span>
      </div>

      {/* ── Messages area ──────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto bg-[#FAF8F5] px-4 py-4">
        {messages.map((msg, i) => (
          <ChatMessage
            key={msg.id}
            message={msg}
            partnerName={partnerName}
            showAvatar={shouldShowAvatar(i)}
          />
        ))}

        {/* Partner typing indicator */}
        {isTyping && <TypingIndicator name={partnerName} />}

        <div ref={messagesEndRef} />
      </div>

      {/* ── Pending attachment preview ──────────────────────────────────── */}
      {pendingAttachment && (
        <div className="bg-[#F4EFEA] border-t border-[#EAE3DA] px-4 py-2 flex-shrink-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-[#8E4A49] font-semibold uppercase tracking-wider mb-1.5">Attaching</p>
              <AttachmentCard attachment={pendingAttachment} />
            </div>
            <button
              onClick={removePendingAttachment}
              className="flex-shrink-0 p-1 text-[#A39081] hover:text-[#6B3037] transition-colors mt-5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* ── Input bar ──────────────────────────────────────────────────── */}
      <div className="bg-white border-t border-[#EAE3DA] px-3 py-3 flex-shrink-0">
        <div className="flex items-end gap-2">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={pendingAttachment ? 'Add a message to go with your attachment...' : `Message ${partnerName}...`}
              rows={1}
              className="w-full resize-none bg-[#F4EFEA] rounded-xl px-3.5 py-2.5 text-sm text-[#1C1917] placeholder:text-[#B8AD9E] focus:outline-none focus:ring-1 focus:ring-[#6B3037] transition-all max-h-24 overflow-y-auto"
              style={{ lineHeight: '1.5' }}
              onInput={e => {
                e.target.style.height = 'auto';
                e.target.style.height = Math.min(e.target.scrollHeight, 96) + 'px';
              }}
            />
          </div>

          {/* Send button */}
          <button
            onClick={handleSend}
            disabled={!inputText.trim() && !pendingAttachment}
            className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-full bg-[#6B3037] hover:bg-[#52242A] disabled:bg-[#D4C5B9] disabled:cursor-not-allowed text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>

        <p className="text-[10px] text-[#C8BDB6] mt-1.5 text-center">
          Enter to send · Click 💬 on any vendor or venue to attach it here
        </p>
      </div>
    </div>
  );
}
