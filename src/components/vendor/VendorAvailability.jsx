import React, { useState } from 'react';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

function MiniCalendar({ bookedDates, enquiredDates }) {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  };

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const getStatus = (d) => {
    if (!d) return 'empty';
    if (bookedDates.includes(d)) return 'booked';
    if (enquiredDates.includes(d)) return 'enquired';
    if (new Date(year, month, d) < today) return 'past';
    return 'available';
  };

  return (
    <div className="bg-[#FDFBF7] border border-[#EAE3DA] rounded-2xl p-6">
      {/* Month nav */}
      <div className="flex items-center justify-between mb-5">
        <button onClick={prevMonth} className="p-1.5 rounded-lg hover:bg-[#F4EFEA] text-[#78716C] transition-colors">‹</button>
        <p className="font-semibold text-[#1C1917] text-sm">{MONTHS[month]} {year}</p>
        <button onClick={nextMonth} className="p-1.5 rounded-lg hover:bg-[#F4EFEA] text-[#78716C] transition-colors">›</button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAYS.map(d => (
          <div key={d} className="text-center text-[10px] font-semibold text-[#A39081]">{d}</div>
        ))}
      </div>

      {/* Date cells */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((d, i) => {
          const status = getStatus(d);
          return (
            <div
              key={i}
              className={`aspect-square flex items-center justify-center text-xs rounded-lg font-medium transition-colors ${
                status === 'empty' ? '' :
                status === 'booked' ? 'bg-[#EAE3DA] text-[#A39081] line-through' :
                status === 'enquired' ? 'bg-[#F5ECE8] text-[#8E4A49] border border-[#E8D4CF]' :
                status === 'past' ? 'text-[#D4C5B9]' :
                'bg-white border border-[#EAE3DA] text-[#1C1917] hover:border-[#6B3037] hover:text-[#6B3037] cursor-pointer'
              }`}
            >
              {d}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex gap-4 mt-4 pt-4 border-t border-[#EAE3DA]">
        <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-white border border-[#EAE3DA]" /><span className="text-[10px] text-[#78716C]">Available</span></div>
        <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-[#F5ECE8] border border-[#E8D4CF]" /><span className="text-[10px] text-[#78716C]">Enquired</span></div>
        <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-[#EAE3DA]" /><span className="text-[10px] text-[#78716C]">Booked</span></div>
      </div>
    </div>
  );
}

export default function VendorAvailability({ availability, vendor, onEnquire }) {
  const [form, setForm] = useState({ date: '', venue: '', guests: '', package: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onEnquire();
  };

  return (
    <div id="availability">
      <p className="text-xs font-semibold uppercase tracking-widest text-[#8E4A49] mb-2">Book a Date</p>
      <h2 className="font-serif text-3xl md:text-4xl text-[#1C1917] mb-3">Availability & Enquiry</h2>
      <p className="text-[#78716C] text-sm mb-10 max-w-xl">{availability.note}</p>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10">
        {/* Calendar */}
        <div>
          <MiniCalendar bookedDates={availability.bookedDates} enquiredDates={availability.enquiredDates} />

          {/* Available months callout */}
          <div className="mt-4 bg-[#F4EFEA] border border-[#E8D4CF] rounded-2xl p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#8E4A49] mb-3">Currently booking</p>
            <div className="flex flex-wrap gap-2">
              {availability.availableMonths.map(m => (
                <span key={m} className="text-sm text-[#1C1917] bg-white border border-[#EAE3DA] px-3 py-1.5 rounded-full font-medium">
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Enquiry Form */}
        <div className="bg-[#FDFBF7] border border-[#EAE3DA] rounded-2xl p-7">
          <p className="font-serif text-xl text-[#1C1917] mb-1">Send an Enquiry</p>
          <p className="text-xs text-[#A39081] mb-6">Your details are private. Only {vendor.name} will see them.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#6B5E53] mb-1.5 uppercase tracking-wider">Wedding Date</label>
              <input
                type="date"
                value={form.date}
                onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                className="w-full border border-[#D4C5B9] rounded-xl px-4 py-3 text-sm text-[#1C1917] bg-white focus:outline-none focus:border-[#6B3037] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#6B5E53] mb-1.5 uppercase tracking-wider">Venue / Location</label>
              <input
                type="text"
                placeholder="e.g. Cedar Hall, Kumarakom"
                value={form.venue}
                onChange={e => setForm(f => ({ ...f, venue: e.target.value }))}
                className="w-full border border-[#D4C5B9] rounded-xl px-4 py-3 text-sm text-[#1C1917] bg-white focus:outline-none focus:border-[#6B3037] transition-colors placeholder:text-[#D4C5B9]"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#6B5E53] mb-1.5 uppercase tracking-wider">Guest Count</label>
                <input
                  type="number"
                  placeholder="200"
                  value={form.guests}
                  onChange={e => setForm(f => ({ ...f, guests: e.target.value }))}
                  className="w-full border border-[#D4C5B9] rounded-xl px-4 py-3 text-sm text-[#1C1917] bg-white focus:outline-none focus:border-[#6B3037] transition-colors placeholder:text-[#D4C5B9]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#6B5E53] mb-1.5 uppercase tracking-wider">Package</label>
                <select
                  value={form.package}
                  onChange={e => setForm(f => ({ ...f, package: e.target.value }))}
                  className="w-full border border-[#D4C5B9] rounded-xl px-4 py-3 text-sm text-[#1C1917] bg-white focus:outline-none focus:border-[#6B3037] transition-colors"
                >
                  <option value="">Any</option>
                  <option>Story</option>
                  <option>Chapter</option>
                  <option>Legacy</option>
                  <option>Custom</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#6B5E53] mb-1.5 uppercase tracking-wider">Your Message</label>
              <textarea
                rows={4}
                placeholder="Tell Amal a little about your wedding and what you're looking for..."
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                className="w-full border border-[#D4C5B9] rounded-xl px-4 py-3 text-sm text-[#1C1917] bg-white focus:outline-none focus:border-[#6B3037] transition-colors placeholder:text-[#D4C5B9] resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#6B3037] hover:bg-[#52242A] text-white font-medium py-3.5 rounded-xl transition-colors text-sm shadow-md"
            >
              Send Enquiry →
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
