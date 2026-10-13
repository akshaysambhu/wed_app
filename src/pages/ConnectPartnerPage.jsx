/**
 * ConnectPartnerPage.jsx — /connect-partner
 * Purpose:
 * Allow two people planning the same event to create a private planning connection.
 *
 * SECTIONS:
 * - Header: “Plan together.” / “Invite your partner to build your celebration together.”
 * - Connect Options: Search username (@alex123), Invite link, QR code
 * - Request: Pending state + Partner receives “Midhun wants to connect with you for wedding planning.” with Accept / Decline
 * - Connected: Partner name, Profile image, Connected status, “Open Our Planning” button
 * - Privacy: “Your planning discussions are private.” Only connected partners can see Messages, Shortlists, Finalised crew, Decisions, Planning information
 */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePlanning } from '../context/PlanningContext.jsx';

export default function ConnectPartnerPage() {
  const {
    partnerConnection,
    sendPartnerInvite,
    acceptPartnerInvite,
    declinePartnerInvite,
    disconnectPartner,
    openDiscussion,
    yourName = 'Midhun',
    showToast,
  } = usePlanning();

  const [activeTab, setActiveTab] = useState('username'); // 'username' | 'link' | 'qr'
  const [searchUsername, setSearchUsername] = useState('@alex123');
  const [copiedLink, setCopiedLink] = useState(false);

  const inviteLink = `https://planmymoments.com/connect?invite=pmm-${yourName.toLowerCase()}-alex-9821`;

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(inviteLink);
    setCopiedLink(true);
    showToast('Invite link copied to clipboard!');
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleSendUsernameInvite = () => {
    if (!searchUsername.trim()) return;
    sendPartnerInvite({
      username: searchUsername.startsWith('@') ? searchUsername : `@${searchUsername}`,
      name: 'Alex Rivera',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    });
  };

  const isConnected = partnerConnection?.status === 'connected';
  const isPending = partnerConnection?.status === 'pending';

  return (
    <div className="min-h-screen bg-[#FAF8F5] pt-24 pb-20 font-sans selection:bg-[#E8D4CF] selection:text-[#6B3037]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ── BREADCRUMB ──────────────────────────────────────────────────── */}
        <nav className="mb-6 text-xs text-[#78716C] flex items-center gap-2" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-[#6B3037] transition-colors">Home</Link>
          <span className="text-[#D4C5B9]">/</span>
          <span className="text-[#1C1917] font-medium">Connect Partner</span>
        </nav>

        {/* ── HEADER ──────────────────────────────────────────────────────── */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F5ECE8] text-[#8E4A49] mb-4">
            <span>🔒</span>
            <span>Private Couple Planning</span>
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-[#1C1917] tracking-tight leading-tight mb-4">
            Plan together.
          </h1>
          <p className="text-base sm:text-lg text-[#57534E] leading-relaxed">
            Invite your partner to build your celebration together.
          </p>
        </div>

        {/* ── STATE CONTAINER: CONNECTED / PENDING / OPTIONS ──────────────── */}
        <div className="space-y-8 mb-16">

          {/* ────────────────────────────────────────────────────────────────
              1. CONNECTED STATE
             ──────────────────────────────────────────────────────────────── */}
          {isConnected && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE3DA] shadow-xl animate-fadeIn relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-50 rounded-full blur-3xl opacity-70 pointer-events-none" />
              
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
                {/* Partner Details */}
                <div className="flex items-center gap-5 text-center sm:text-left">
                  {/* Profile Image with status ring */}
                  <div className="relative">
                    <img
                      src={partnerConnection.partnerAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
                      alt={partnerConnection.partnerName || 'Partner'}
                      className="w-20 h-20 rounded-full object-cover ring-4 ring-emerald-500/30 shadow-md"
                    />
                    <span
                      className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full shadow-xs"
                      title="Partner connected"
                    />
                  </div>

                  <div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full mb-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Connected
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#1C1917] leading-tight">
                      {partnerConnection.partnerName || 'Alex Rivera'}
                    </h2>
                    <p className="text-xs text-[#78716C] mt-0.5">
                      {partnerConnection.partnerUsername || '@alex123'} · Connected Partner
                    </p>
                  </div>
                </div>

                {/* Primary CTA: Open Our Planning */}
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => openDiscussion()}
                    className="w-full sm:w-auto px-6 py-3.5 bg-[#1C1917] hover:bg-[#6B3037] text-white font-semibold rounded-2xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2 hover:scale-102 active:scale-98"
                  >
                    <span>💬</span>
                    <span>Open Our Planning</span>
                  </button>

                  <button
                    onClick={disconnectPartner}
                    className="w-full sm:w-auto px-4 py-3 bg-[#FAF8F5] hover:bg-[#F4EFEA] text-[#78716C] hover:text-[#1C1917] text-xs font-medium rounded-2xl border border-[#EAE3DA] transition-colors"
                  >
                    Disconnect
                  </button>
                </div>
              </div>

              {/* Shared Workspace Status Bar */}
              <div className="mt-6 pt-6 border-t border-[#F4EFEA] grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EAE3DA]/60">
                  <p className="text-[10px] text-[#78716C] uppercase font-bold tracking-wider">Sync Status</p>
                  <p className="text-xs font-semibold text-emerald-800 mt-0.5">🟢 Real-Time Active</p>
                </div>
                <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EAE3DA]/60">
                  <p className="text-[10px] text-[#78716C] uppercase font-bold tracking-wider">Event Role</p>
                  <p className="text-xs font-semibold text-[#1C1917] mt-0.5">Co-Planner</p>
                </div>
                <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EAE3DA]/60">
                  <p className="text-[10px] text-[#78716C] uppercase font-bold tracking-wider">Shared Access</p>
                  <p className="text-xs font-semibold text-[#1C1917] mt-0.5">Full Workspace</p>
                </div>
                <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EAE3DA]/60">
                  <p className="text-[10px] text-[#78716C] uppercase font-bold tracking-wider">Privacy Mode</p>
                  <p className="text-xs font-semibold text-[#6B3037] mt-0.5">🔒 Private Couple</p>
                </div>
              </div>
            </div>
          )}

          {/* ────────────────────────────────────────────────────────────────
              2. REQUEST / PENDING STATE
             ──────────────────────────────────────────────────────────────── */}
          {isPending && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE3DA] shadow-xl animate-fadeIn">
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#F4EFEA]">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-amber-500 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                    Invitation Pending
                  </span>
                </div>
                <span className="text-xs text-[#78716C]">Sent to {partnerConnection.partnerUsername || '@alex123'}</span>
              </div>

              {/* Partner Receives Card (Exact Client Specification) */}
              <div className="bg-[#FAF6F0] rounded-2xl p-6 border border-[#EAE3DA] max-w-xl mx-auto my-4 text-center">
                <div className="w-12 h-12 rounded-full bg-[#8E4A49] text-white flex items-center justify-center font-bold text-lg mx-auto mb-3 shadow-sm">
                  {yourName.charAt(0)}
                </div>
                <p className="text-[11px] font-semibold text-[#8E4A49] uppercase tracking-wider mb-1">
                  Partner Invitation Received
                </p>
                <h3 className="text-lg sm:text-xl font-bold text-[#1C1917] leading-snug mb-5">
                  “{yourName} wants to connect with you for wedding planning.”
                </h3>

                {/* Buttons: Accept and Decline */}
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={acceptPartnerInvite}
                    className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-xl text-sm shadow-md transition-all active:scale-95"
                  >
                    Accept
                  </button>
                  <button
                    onClick={declinePartnerInvite}
                    className="px-6 py-2.5 bg-white hover:bg-red-50 text-stone-700 hover:text-red-700 border border-[#D4C5B9] font-semibold rounded-xl text-sm transition-all active:scale-95"
                  >
                    Decline
                  </button>
                </div>
              </div>

              <p className="text-center text-xs text-[#78716C] mt-4">
                Click <strong>Accept</strong> above to simulate your partner accepting the request in real time.
              </p>
            </div>
          )}

          {/* ────────────────────────────────────────────────────────────────
              3. CONNECT OPTIONS (3 OPTIONS)
             ──────────────────────────────────────────────────────────────── */}
          {(!isConnected || isPending) && (
            <div className="bg-white rounded-3xl border border-[#EAE3DA] shadow-md overflow-hidden">
              <div className="p-6 sm:p-8 bg-[#FAF8F5] border-b border-[#EAE3DA]">
                <h2 className="text-lg sm:text-xl font-bold text-[#1C1917]">
                  Choose how to connect
                </h2>
                <p className="text-xs sm:text-sm text-[#78716C] mt-1">
                  Select any of the 3 options below to link with your partner.
                </p>

                {/* Option Tabs */}
                <div className="flex gap-2 mt-6 overflow-x-auto no-scrollbar">
                  {[
                    { id: 'username', label: 'Option 1: Search Username', icon: '🔍' },
                    { id: 'link', label: 'Option 2: Invite Link', icon: '🔗' },
                    { id: 'qr', label: 'Option 3: QR Code', icon: '📱' },
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
                        activeTab === tab.id
                          ? 'bg-[#1C1917] text-white shadow-md'
                          : 'bg-white text-[#78716C] hover:text-[#1C1917] border border-[#EAE3DA]'
                      }`}
                    >
                      <span>{tab.icon}</span>
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6 sm:p-8">
                {/* ── OPTION 1: SEARCH USERNAME ────────────────────────── */}
                {activeTab === 'username' && (
                  <div className="max-w-xl mx-auto space-y-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#1C1917] mb-2">
                        Partner's Username
                      </label>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#78716C] font-semibold text-sm">
                            @
                          </span>
                          <input
                            type="text"
                            value={searchUsername.replace('@', '')}
                            onChange={e => setSearchUsername(`@${e.target.value.replace('@', '')}`)}
                            placeholder="alex123"
                            className="w-full pl-8 pr-4 py-3 bg-[#FAF8F5] border border-[#EAE3DA] rounded-xl text-sm font-medium text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#6B3037]/30 transition-all"
                          />
                        </div>
                        <button
                          onClick={handleSendUsernameInvite}
                          className="px-6 py-3 bg-[#6B3037] hover:bg-[#52242A] text-white font-semibold text-xs sm:text-sm rounded-xl shadow-md transition-all active:scale-95 flex-shrink-0"
                        >
                          Send Invitation
                        </button>
                      </div>
                      <div className="flex items-center gap-2 mt-2.5 text-xs text-[#78716C]">
                        <span>Try example:</span>
                        <button
                          type="button"
                          onClick={() => setSearchUsername('@alex123')}
                          className="font-semibold text-[#8E4A49] hover:underline"
                        >
                          @alex123
                        </button>
                        <span>·</span>
                        <button
                          type="button"
                          onClick={() => setSearchUsername('@rohan_k')}
                          className="font-semibold text-[#8E4A49] hover:underline"
                        >
                          @rohan_k
                        </button>
                      </div>
                    </div>

                    {/* Preview match card */}
                    <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#EAE3DA] flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                          alt="Alex Rivera"
                          className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-xs"
                        />
                        <div>
                          <p className="text-sm font-bold text-[#1C1917]">Alex Rivera</p>
                          <p className="text-xs text-[#78716C]">{searchUsername || '@alex123'}</p>
                        </div>
                      </div>
                      <button
                        onClick={handleSendUsernameInvite}
                        className="px-4 py-2 bg-[#1C1917] hover:bg-[#6B3037] text-white text-xs font-semibold rounded-xl transition-colors"
                      >
                        Invite
                      </button>
                    </div>
                  </div>
                )}

                {/* ── OPTION 2: INVITE LINK ────────────────────────────── */}
                {activeTab === 'link' && (
                  <div className="max-w-xl mx-auto space-y-6 text-center sm:text-left">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-[#1C1917] mb-2">
                        Private Invitation Link
                      </p>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          type="text"
                          readOnly
                          value={inviteLink}
                          className="flex-1 px-4 py-3 bg-[#FAF8F5] border border-[#EAE3DA] rounded-xl text-xs text-[#57534E] font-mono select-all focus:outline-none"
                        />
                        <button
                          onClick={handleCopyLink}
                          className="px-6 py-3 bg-[#1C1917] hover:bg-[#6B3037] text-white font-semibold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
                        >
                          {copiedLink ? '✓ Copied' : 'Copy Link'}
                        </button>
                      </div>
                      <p className="text-[11px] text-[#78716C] mt-2">
                        🔒 Single-use secure token. Only one partner can accept this link.
                      </p>
                    </div>

                    {/* Quick share channels */}
                    <div className="pt-4 border-t border-[#F4EFEA] flex flex-wrap gap-2">
                      <button
                        onClick={() => {
                          window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(`Hey! Connect with me on Plan My Moments to plan our wedding: ${inviteLink}`)}`, '_blank');
                        }}
                        className="px-4 py-2 bg-[#E7F6EC] text-[#1E7E34] text-xs font-semibold rounded-xl hover:bg-[#D4EDDA] transition-colors"
                      >
                        Share on WhatsApp
                      </button>
                      <button
                        onClick={() => {
                          window.location.href = `mailto:?subject=${encodeURIComponent('Plan our wedding together on Plan My Moments')}&body=${encodeURIComponent(`Hey! Connect with me here: ${inviteLink}`)}`;
                        }}
                        className="px-4 py-2 bg-[#FAF8F5] text-[#57534E] border border-[#EAE3DA] text-xs font-semibold rounded-xl hover:bg-[#F4EFEA] transition-colors"
                      >
                        Send via Email
                      </button>
                      <button
                        onClick={handleSendUsernameInvite}
                        className="px-4 py-2 bg-[#FAF8F5] text-[#8E4A49] border border-[#EAE3DA] text-xs font-semibold rounded-xl hover:bg-[#F4EFEA] transition-colors ml-auto"
                      >
                        Simulate Sent Request
                      </button>
                    </div>
                  </div>
                )}

                {/* ── OPTION 3: QR CODE ────────────────────────────────── */}
                {activeTab === 'qr' && (
                  <div className="max-w-md mx-auto text-center space-y-4">
                    <p className="text-xs text-[#78716C]">
                      Have your partner scan this code with their smartphone camera to connect immediately.
                    </p>

                    {/* Stylized QR Box */}
                    <div className="w-56 h-56 mx-auto bg-white p-4 rounded-3xl border-2 border-[#1C1917] shadow-xl flex flex-col items-center justify-center relative">
                      <svg className="w-full h-full text-[#1C1917]" viewBox="0 0 100 100" fill="currentColor">
                        {/* QR Grid Pattern Simulation */}
                        <path d="M10 10 h24 v24 h-24 z M14 14 h16 v16 h-16 z M18 18 h8 v8 h-8 z" />
                        <path d="M66 10 h24 v24 h-24 z M70 14 h16 v16 h-16 z M74 18 h8 v8 h-8 z" />
                        <path d="M10 66 h24 v24 h-24 z M14 70 h16 v16 h-16 z M18 74 h8 v8 h-8 z" />
                        <path d="M42 10 h6 v6 h-6 z M52 10 h6 v6 h-6 z M42 20 h16 v6 h-16 z M42 30 h6 v6 h-6 z M52 30 h6 v6 h-6 z" />
                        <path d="M10 42 h6 v6 h-6 z M20 42 h6 v6 h-6 z M30 42 h6 v6 h-6 z M10 52 h16 v6 h-16 z" />
                        <path d="M42 42 h16 v16 h-16 z M66 42 h8 v8 h-8 z M82 42 h8 v8 h-8 z M74 50 h8 v8 h-8 z" />
                        <path d="M42 66 h6 v6 h-6 z M52 66 h16 v6 h-16 z M42 76 h6 v14 h-6 z M52 84 h16 v6 h-16 z" />
                        <path d="M66 66 h8 v8 h-8 z M82 66 h8 v8 h-8 z M74 74 h16 v6 h-16 z M66 84 h8 v6 h-8 z M82 84 h8 v6 h-8 z" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-10 h-10 rounded-full bg-white shadow-md border border-[#EAE3DA] flex items-center justify-center text-xs font-bold text-[#6B3037]">
                          💑
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-2 pt-2">
                      <button
                        onClick={handleSendUsernameInvite}
                        className="px-5 py-2.5 bg-[#1C1917] hover:bg-[#6B3037] text-white text-xs font-semibold rounded-xl transition-all shadow-md active:scale-95"
                      >
                        Simulate Partner Scan
                      </button>
                      <button
                        onClick={() => showToast('QR Code saved to photos')}
                        className="px-4 py-2.5 bg-[#FAF8F5] text-[#57534E] border border-[#EAE3DA] text-xs font-semibold rounded-xl hover:bg-[#F4EFEA] transition-colors"
                      >
                        Download QR
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Test switcher if already connected (allows resetting/testing anytime) */}
          {isConnected && (
            <div className="text-center">
              <button
                onClick={() => {
                  disconnectPartner();
                  showToast('Reset connection to test invite flow');
                }}
                className="text-xs text-[#8E4A49] font-semibold hover:underline"
              >
                Want to test the invitation flow again? Click here to reset.
              </button>
            </div>
          )}

        </div>

        {/* ── PRIVACY SECTION ─────────────────────────────────────────────── */}
        <section className="bg-white rounded-3xl p-8 sm:p-10 border border-[#EAE3DA] shadow-sm">
          <div className="max-w-3xl mx-auto">
            {/* Header copy per spec */}
            <div className="text-center mb-8">
              <span className="text-2xl mb-2 inline-block">🔒</span>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#1C1917] font-bold">
                Your planning discussions are private.
              </h2>
              <p className="text-sm sm:text-base text-[#57534E] mt-2">
                Only connected partners can see:
              </p>
            </div>

            {/* 5 Specific Items per spec:
                - Messages
                - Shortlists
                - Finalised crew
                - Decisions
                - Planning information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  title: 'Messages',
                  desc: 'Private couple discussions, reactions, and floating chat threads.',
                  icon: '💬',
                },
                {
                  title: 'Shortlists',
                  desc: 'Options under consideration across photography, venues, catering, and decor.',
                  icon: '📋',
                },
                {
                  title: 'Finalised crew',
                  desc: 'The confirmed vendors you have officially chosen for your day.',
                  icon: '👥',
                },
                {
                  title: 'Decisions',
                  desc: 'Shared votes, partner approvals, status changes, and private couple notes.',
                  icon: '⚖️',
                },
                {
                  title: 'Planning information',
                  desc: 'Budgets, timelines, guest counts, and personal celebration details.',
                  icon: '📊',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-5 bg-[#FAF8F5] rounded-2xl border border-[#EAE3DA] hover:border-[#6B3037]/30 transition-colors"
                >
                  <span className="text-xl mb-2 block">{item.icon}</span>
                  <h3 className="font-bold text-sm text-[#1C1917] mb-1">{item.title}</h3>
                  <p className="text-xs text-[#78716C] leading-relaxed">{item.desc}</p>
                </div>
              ))}

              {/* Zero Public Exposure Assurance */}
              <div className="p-5 bg-[#FAF6F0] rounded-2xl border border-[#D4C5B9] flex flex-col justify-center">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#8E4A49] mb-1">
                  <span>🛡️</span>
                  <span>Zero Public Exposure</span>
                </div>
                <p className="text-xs text-[#57534E] leading-relaxed">
                  No vendors, guests, or search engines can access your private planning room.
                </p>
              </div>
            </div>

            {/* Bottom Support Copy */}
            <div className="mt-8 pt-6 border-t border-[#F4EFEA] text-center text-xs text-[#A39081]">
              Need help? Both partners can manage permissions or disconnect at any time from this page.
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
