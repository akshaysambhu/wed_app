/**
 * ChatMessage.jsx — A single message bubble in the couple chat
 * Handles:
 * - Your messages on the right
 * - Partner messages on the left
 * - Message timestamp & status indicator
 * - Inline attachment belonging directly to that message
 */
import React from 'react';
import AttachmentCard from './AttachmentCard.jsx';

function formatMessageTime(isoString) {
  if (!isoString) return '';
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);

  const timeStr = date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago · ${timeStr}`;
  if (diffHours < 24 && date.getDate() === now.getDate()) return `Today · ${timeStr}`;
  if (diffHours < 48) return `Yesterday · ${timeStr}`;
  return `${date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} · ${timeStr}`;
}

export default function ChatMessage({
  message,
  partnerName = 'Rohan',
  showAvatar = true,
  onViewAttachment,
}) {
  const isOwn = message.sender === 'you';

  return (
    <div className={`flex items-end gap-2 mb-3.5 ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Partner avatar */}
      {!isOwn && (
        <div
          className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0 mb-1 ${
            showAvatar ? 'bg-[#8C7E72] ring-2 ring-white shadow-xs' : 'invisible'
          }`}
          title={message.partnerName || partnerName}
        >
          {(message.partnerName || partnerName || 'P').charAt(0)}
        </div>
      )}

      {/* Bubble container */}
      <div className={`max-w-[84%] sm:max-w-[80%] flex flex-col ${isOwn ? 'items-end' : 'items-start'}`}>
        {/* Partner name label on grouped start */}
        {!isOwn && showAvatar && (
          <p className="text-[10px] font-medium text-[#8C7E72] mb-1 ml-1.5 flex items-center gap-1">
            <span>{message.partnerName || partnerName}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" title="Online" />
          </p>
        )}

        {/* Message Bubble */}
        <div
          className={`rounded-2xl px-3.5 py-2.5 shadow-xs transition-shadow ${
            isOwn
              ? 'bg-[#6B3037] text-white rounded-br-xs selection:bg-[#8E4A49]'
              : 'bg-[#F4EFEA] text-[#1C1917] border border-[#EAE3DA] rounded-bl-xs'
          }`}
        >
          {/* Text Message */}
          {message.text && (
            <p className={`text-[13px] sm:text-sm leading-relaxed whitespace-pre-wrap ${isOwn ? 'text-white' : 'text-[#1C1917]'}`}>
              {message.text}
            </p>
          )}

          {/* Attached card (belongs directly to this message) */}
          {message.attachment && (
            <AttachmentCard
              attachment={message.attachment}
              onView={onViewAttachment}
            />
          )}
        </div>

        {/* Timestamp and delivery status */}
        <div className={`flex items-center gap-1.5 text-[10px] mt-1 px-1.5 ${isOwn ? 'text-[#A39081]' : 'text-[#A39081]'}`}>
          <span>{formatMessageTime(message.timestamp)}</span>
          {isOwn && (
            <span className="text-[#6B3037] font-medium flex items-center" title="Delivered & Seen">
              <svg className="w-3.5 h-3.5 text-[#8E4A49]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
