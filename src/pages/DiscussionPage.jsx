/**
 * DiscussionPage.jsx — /discussion
 * A full-screen dedicated page for the couple's chat.
 */
import React, { useRef, useEffect, useState } from 'react';
import { usePlanning } from '../context/PlanningContext.jsx';
import ChatMessage from '../components/discussion/ChatMessage.jsx';
import AttachmentCard from '../components/discussion/AttachmentCard.jsx';

export default function DiscussionPage() {
  const { messages, sendMessage, partnerName, unreadCount } = usePlanning();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    sendMessage(inputText);
    setInputText('');
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] pt-20 flex flex-col">
      <div className="flex-1 flex max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 h-[calc(100vh-80px)]">
        
        {/* Chat Container */}
        <div className="flex-1 bg-white border border-[#EAE3DA] rounded-3xl flex flex-col overflow-hidden shadow-sm">
          
          {/* Header */}
          <div className="bg-[#1C1917] px-6 py-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-[#8C7E72] flex items-center justify-center text-lg font-bold text-white">
                  {partnerName.charAt(0)}
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#1C1917] rounded-full" />
              </div>
              <div>
                <p className="text-white text-lg font-semibold">{partnerName}</p>
                <p className="text-[#A39081] text-xs">Couple Discussion · Private</p>
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

          {/* Messages */}
          <div className="flex-1 overflow-y-auto bg-[#FDFBF7] p-6 space-y-4">
            <div className="text-center mb-8">
              <span className="bg-[#EAE3DA] text-[#78716C] text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full">
                Beginning of Conversation
              </span>
            </div>
            
            {messages.map((msg, i) => (
              <ChatMessage
                key={msg.id}
                message={msg}
                partnerName={partnerName}
                showAvatar={i === 0 || messages[i - 1].sender !== msg.sender}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-[#EAE3DA]">
             <div className="flex items-end gap-3">
               <textarea
                 value={inputText}
                 onChange={e => setInputText(e.target.value)}
                 onKeyDown={e => {
                   if (e.key === 'Enter' && !e.shiftKey) {
                     e.preventDefault();
                     handleSend();
                   }
                 }}
                 placeholder={`Message ${partnerName}...`}
                 rows={1}
                 className="flex-1 resize-none bg-[#F4EFEA] rounded-2xl px-5 py-4 text-sm text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#6B3037]/20 transition-all"
                 onInput={e => {
                   e.target.style.height = 'auto';
                   e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
                 }}
               />
               <button
                 onClick={handleSend}
                 disabled={!inputText.trim()}
                 className="h-12 w-12 flex-shrink-0 bg-[#6B3037] text-white rounded-full flex items-center justify-center hover:bg-[#52242A] transition-colors disabled:opacity-50"
               >
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                 </svg>
               </button>
             </div>
          </div>
          
        </div>

      </div>
    </div>
  );
}
