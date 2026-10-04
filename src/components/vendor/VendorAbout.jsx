import React from 'react';

export default function VendorAbout({ vendor }) {
  return (
    <div>
      {/* Section Header */}
      <p className="text-xs font-semibold uppercase tracking-widest text-[#8E4A49] mb-2">The Photographer</p>
      <h2 className="font-serif text-3xl md:text-4xl text-[#1C1917] mb-10">About {vendor.name}</h2>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-14">
        {/* Left — Bio */}
        <div className="space-y-8">
          <div className="prose prose-neutral max-w-none">
            {vendor.about.split('\n\n').map((para, i) => (
              <p key={i} className="text-[#44403C] leading-relaxed text-base mb-5">
                {para.trim()}
              </p>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex gap-4 pt-2">
            <a
              href={`https://instagram.com/${vendor.instagramHandle.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-[#78716C] border border-[#D4C5B9] rounded-xl px-4 py-2.5 hover:border-[#6B3037] hover:text-[#6B3037] transition-all duration-200 bg-white"
            >
              <span className="text-base">📸</span>
              {vendor.instagramHandle}
            </a>
            <a
              href={`https://${vendor.websiteUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-[#78716C] border border-[#D4C5B9] rounded-xl px-4 py-2.5 hover:border-[#6B3037] hover:text-[#6B3037] transition-all duration-200 bg-white"
            >
              <span className="text-base">🌐</span>
              {vendor.websiteUrl}
            </a>
          </div>
        </div>

        {/* Right — Details */}
        <div className="space-y-6">
          {/* Shooting Styles */}
          <div className="bg-[#FDFBF7] border border-[#EAE3DA] rounded-2xl p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#8C7E72] mb-3">Shooting Style</p>
            <div className="flex flex-wrap gap-2">
              {vendor.styles.map(style => (
                <span key={style} className="text-sm text-[#6B5E53] bg-[#F4EFEA] border border-[#E8D4CF] px-3 py-1.5 rounded-full font-medium">
                  {style}
                </span>
              ))}
            </div>
          </div>

          {/* Equipment */}
          <div className="bg-[#FDFBF7] border border-[#EAE3DA] rounded-2xl p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#8C7E72] mb-3">Equipment</p>
            <ul className="space-y-2">
              {vendor.equipment.map(eq => (
                <li key={eq} className="text-sm text-[#44403C] flex items-start gap-2">
                  <span className="text-[#D4C5B9] mt-0.5">—</span> {eq}
                </li>
              ))}
            </ul>
          </div>

          {/* Languages + Area */}
          <div className="bg-[#FDFBF7] border border-[#EAE3DA] rounded-2xl p-6 space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#8C7E72] mb-2">Languages</p>
              <p className="text-sm text-[#44403C]">{vendor.languages.join(', ')}</p>
            </div>
            <div className="h-px bg-[#EAE3DA]" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#8C7E72] mb-2">Based in</p>
              <p className="text-sm text-[#44403C]">{vendor.location}</p>
            </div>
            <div className="h-px bg-[#EAE3DA]" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#8C7E72] mb-2">Travels to</p>
              <p className="text-sm text-[#44403C]">{vendor.serviceArea}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="mt-14">
        <h3 className="font-serif text-2xl text-[#1C1917] mb-6">The Team</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {vendor.team.map(member => (
            <div key={member.id} className="flex gap-5 bg-[#FDFBF7] border border-[#EAE3DA] rounded-2xl p-6">
              <img
                src={member.avatar}
                alt={member.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-[#E8D4CF] flex-shrink-0"
              />
              <div>
                <p className="font-semibold text-[#1C1917]">{member.name}</p>
                <p className="text-xs text-[#8E4A49] font-medium mb-2">{member.role}</p>
                <p className="text-sm text-[#78716C] leading-relaxed">{member.bio}</p>
                <p className="text-xs text-[#A39081] mt-2">{member.instagram}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
