/**
 * DiscussionPage.jsx — /discussion
 * Dedicated full-screen view for the couple discussion.
 */
import React, { useRef, useEffect, useState } from 'react';
import { usePlanning } from '../context/PlanningContext.jsx';
import ChatMessage from '../components/discussion/ChatMessage.jsx';
import AttachmentCard from '../components/discussion/AttachmentCard.jsx';
import AttachmentPicker from '../components/discussion/AttachmentPicker.jsx';
import VendorPreviewInChat from '../components/discussion/VendorPreviewInChat.jsx';

export default function DiscussionPage() {
  const { messages, sendMessage, partnerName, unreadCount } = usePlanning();
  const [inputText, setInputText] = useState('');
  const [pendingAttachment, setPendingAttachment] = useState(null);
  const [showAttachmentPicker, setShowAttachmentPicker] = useState(false);
  const [activeAttachmentView, setActiveAttachmentView] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!activeAttachmentView) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, activeAttachmentView]);

  const handleSend = () => {
    if (!inputText.trim() && !pendingAttachment) return;
    sendMessage(inputText, pendingAttachment);
    setInputText('');
    setPendingAttachment(null);
    setShowAttachmentPicker(false);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] pt-20 flex flex-col">
      <div className="flex-1 flex max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 h-[calc(100vh-80px)]">
        
        {/* Chat Container */}
        <div className="flex-1 bg-white border border-[#EAE3DA] rounded-3xl flex flex-col overflow-hidden shadow-lg">
          
          {/* Header */}
          <div className="bg-[#1C1917] px-6 py-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-[#8C7E72] flex items-center justify-center text-lg font-bold text-white shadow-xs">
                  {partnerName.charAt(0)}
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#1C1917] rounded-full" />
              </div>
              <div>
                <h2 className="text-white text-lg font-bold">Our Planning</h2>
                <p className="text-[#A39081] text-xs">Partner connected · Private</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {unreadCount > 0 && (
                <span className="bg-[#6B3037] text-white text-xs font-bold px-3 py-1 rounded-full">
                  {unreadCount} New
                </span>
              )}
            </div>
          </div>

          {/* Privacy Banner */}
          <div className="bg-[#FAF6F0] border-b border-[#EAE3DA] px-6 py-2 flex items-center justify-between text-xs text-[#78716C]">
            <span className="flex items-center gap-1.5 font-medium text-[#57534E]">
              <span>🔒</span>
              <span>Only you and your connected partner can see this.</span>
            </span>
            <span className="text-[11px] text-[#8C7E72] bg-white px-2.5 py-0.5 rounded-full border border-[#EAE3DA]">
              Private Discussion
            </span>
          </div>

          {/* Body Switcher: Attachment View or Chat Stream */}
          {activeAttachmentView ? (
            <div className="flex-1 overflow-hidden">
              <VendorPreviewInChat
                attachment={activeAttachmentView}
                onBack={() => setActiveAttachmentView(null)}
              />
            </div>
          ) : (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto bg-[#FDFBF7] p-6 space-y-4">
                <div className="text-center mb-6">
                  <div className="inline-block bg-[#EAE3DA] text-[#78716C] text-[10px] uppercase tracking-widest font-bold px-3.5 py-1 rounded-full">
                    Beginning of Private Conversation
                  </div>
                  <p className="text-xs text-[#A39081] mt-1.5">🔒 Only you and your connected partner can see this. Do not expose these messages publicly.</p>
                </div>
                
                {messages.map((msg, i) => (
                  <ChatMessage
                    key={msg.id || i}
                    message={msg}
                    partnerName={partnerName}
                    showAvatar={i === 0 || messages[i - 1].sender !== msg.sender}
                    onViewAttachment={(att) => setActiveAttachmentView(att)}
                  />
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Attachment Picker */}
              {showAttachmentPicker && (
                <div className="border-t border-[#EAE3DA]">
                  <AttachmentPicker
                    onSelect={(att) => {
                      setPendingAttachment(att);
                      setShowAttachmentPicker(false);
                    }}
                    onClose={() => setShowAttachmentPicker(false)}
                  />
                </div>
              )}

              {/* Pending Attachment */}
              {pendingAttachment && !showAttachmentPicker && (
                <div className="bg-[#F4EFEA] border-t border-[#EAE3DA] px-6 py-3 flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-[10px] font-bold text-[#8E4A49] uppercase tracking-wider mb-1">Attaching to message:</p>
                    <AttachmentCard
                      attachment={pendingAttachment}
                      onView={(att) => setActiveAttachmentView(att)}
                    />
                  </div>
                  <button
                    onClick={() => setPendingAttachment(null)}
                    className="p-1.5 text-[#78716C] hover:text-[#6B3037] ml-4"
                  >
                    ✕
                  </button>
                </div>
              )}

              {/* Input bar */}
              <div className="p-4 bg-white border-t border-[#EAE3DA]">
                <div className="flex items-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAttachmentPicker(prev => !prev)}
                    className={`p-3.5 rounded-2xl transition-all ${
                      showAttachmentPicker || pendingAttachment
                        ? 'bg-[#6B3037] text-white'
                        : 'bg-[#F4EFEA] text-[#78716C] hover:text-[#1C1917]'
                    }`}
                    title="Attach to Discussion"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                  </button>

                  <textarea
                    value={inputText}
                    onChange={e => setInputText(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    placeholder="Message your partner…"
                    rows={1}
                    className="flex-1 resize-none bg-[#F4EFEA] rounded-2xl px-5 py-3.5 text-sm text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#6B3037]/20 transition-all"
                    onInput={e => {
                      e.target.style.height = 'auto';
                      e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
                    }}
                  />
                  <button
                    onClick={handleSend}
                    disabled={!inputText.trim() && !pendingAttachment}
                    className="h-12 w-12 flex-shrink-0 bg-[#6B3037] text-white rounded-2xl flex items-center justify-center hover:bg-[#52242A] transition-colors disabled:opacity-40"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </div>
            </>
          )}

        </div>

      </div>
    </div>
  );
}
