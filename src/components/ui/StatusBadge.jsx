/**
 * StatusBadge.jsx — Reusable vendor approval status badge
 * States: 'waiting' | 'approved' | 'rejected' | 'shortlisted' | 'finalised'
 */
import React from 'react';

const STATUS_CONFIG = {
  waiting: {
    label: 'Awaiting Approval',
    icon: '⏳',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    text: 'text-amber-700',
  },
  approved: {
    label: 'Approved',
    icon: '✓',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    text: 'text-emerald-700',
  },
  rejected: {
    label: 'Not Available',
    icon: '✕',
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-700',
  },
  shortlisted: {
    label: 'Shortlisted',
    icon: '★',
    bg: 'bg-[#F5ECE8]',
    border: 'border-[#E8D4CF]',
    text: 'text-[#6B3037]',
  },
  finalised: {
    label: 'Finalised',
    icon: '✓',
    bg: 'bg-[#1C1917]',
    border: 'border-[#1C1917]',
    text: 'text-white',
  },
};

export default function StatusBadge({ status, className = '' }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.waiting;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${config.bg} ${config.border} ${config.text} ${className}`}
    >
      <span>{config.icon}</span>
      {config.label}
    </span>
  );
}
