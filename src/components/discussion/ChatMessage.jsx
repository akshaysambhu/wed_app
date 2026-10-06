/**
 * ChatMessage.jsx — A single message bubble in the couple chat
 * Handles: own messages (right), partner messages (left), timestamps, attachments
 */
import React from 'react';
import AttachmentCard from './AttachmentCard.jsx';

function formatTime(isoString) {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return 'yesterday';
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}

export default function ChatMessage({ message, partnerName, showAvatar = true }) {
  const isOwn = message.sender === 'you';

  return (
    <div className={`flex items-end gap-2 mb-3 ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      {!isOwn && (
        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0 mb-0.5 ${
          showAvatar ? 'bg-[#8C7E72]' : 'invisible'
        }`}>
          {(message.partnerName || partnerName || 'P').charAt(0)}
        </div>
      )}

      {/* Bubble */}
      <div className={`max-w-[78%] ${isOwn ? 'items-end' : 'items-start'} flex flex-col`}>
        {/* Partner name (only on first of sequence) */}
        {!isOwn && showAvatar && (
          <p className="text-[10px] font-semibold text-[#8C7E72] mb-1 ml-1">
            {message.partnerName || partnerName}
          </p>
        )}

        <div className={`rounded-2xl px-3.5 py-2.5 ${
          isOwn
            ? 'bg-[#6B3037] text-white rounded-br-sm'
            : 'bg-[#F4EFEA] text-[#1C1917] border border-[#EAE3DA] rounded-bl-sm'
        }`}>
          {/* Text */}
          {message.text && (
            <p className={`text-sm leading-relaxed ${isOwn ? 'text-white' : 'text-[#1C1917]'}`}>
              {message.text}
            </p>
          )}

          {/* Attachment */}
          {message.attachment && (
            <AttachmentCard attachment={message.attachment} />
          )}
        </div>

        {/* Timestamp */}
        <p className={`text-[10px] mt-1 px-1 ${isOwn ? 'text-right text-[#A39081]' : 'text-[#B8AD9E]'}`}>
          {formatTime(message.timestamp)}
        </p>
      </div>
    </div>
  );
}
