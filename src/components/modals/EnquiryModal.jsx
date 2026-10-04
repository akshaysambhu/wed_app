import React, { useState } from 'react';
import { usePlanning } from '../../context/PlanningContext.jsx';

export default function EnquiryModal({ vendor, onClose }) {
  const { showToast } = usePlanning();
  const [form, setForm] = useState({
    name: '',
    partnerName: '',
    email: '',
    phone: '',
    date: '',
    venue: '',
    guests: '',
    package: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    showToast(`Enquiry sent to ${vendor.name}! They typically respond within 2 hours.`);
    setTimeout(onClose, 3000);
  };

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  const inputClass = "w-full border border-[#D4C5B9] rounded-xl px-4 py-3 text-sm text-[#1C1917] bg-white focus:outline-none focus:border-[#6B3037] transition-colors placeholder:text-[#D4C5B9]";
  const labelClass = "block text-xs font-semibold text-[#6B5E53] mb-1.5 uppercase tracking-wider";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#EAE3DA] px-8 py-5 flex items-center justify-between rounded-t-3xl z-10">
          <div className="flex items-center gap-4">
            <img
              src={vendor.heroImage}
              alt={vendor.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-[#E8D4CF]"
            />
            <div>
              <p className="font-serif text-lg text-[#1C1917]">Enquire with {vendor.name}</p>
              <p className="text-xs text-[#78716C]">★ {vendor.rating} · {vendor.reviewsCount} reviews · Responds in ~2 hrs</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full border border-[#D4C5B9] text-[#78716C] hover:border-[#6B3037] hover:text-[#6B3037] transition-colors flex items-center justify-center text-sm"
          >
            ✕
          </button>
        </div>

        {submitted ? (
          <div className="px-8 py-16 text-center">
            <div className="w-16 h-16 bg-[#F4EFEA] rounded-full flex items-center justify-center text-2xl mx-auto mb-4">✉️</div>
            <h3 className="font-serif text-2xl text-[#1C1917] mb-2">Enquiry Sent!</h3>
            <p className="text-[#78716C] text-sm">
              {vendor.name} has received your enquiry and typically responds within 2 hours.
              You'll hear back on <span className="font-medium text-[#1C1917]">{form.email || 'your email'}</span>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-8 py-7 space-y-5">
            {/* Privacy note */}
            <div className="bg-[#F4EFEA] border border-[#E8D4CF] rounded-xl px-5 py-3.5 flex items-start gap-3">
              <span className="text-[#8E4A49] mt-0.5">🔒</span>
              <p className="text-xs text-[#6B5E53] leading-relaxed">
                Your enquiry is completely private. Only <strong>{vendor.name}</strong> will see your contact details. Plan My Moments does not share your information.
              </p>
            </div>

            {/* Names */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Your Name</label>
                <input type="text" required placeholder="Anjali" value={form.name} onChange={set('name')} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Partner's Name</label>
                <input type="text" placeholder="Rohan" value={form.partnerName} onChange={set('partnerName')} className={inputClass} />
              </div>
            </div>

            {/* Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Email Address</label>
                <input type="email" required placeholder="you@email.com" value={form.email} onChange={set('email')} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Phone Number</label>
                <input type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={set('phone')} className={inputClass} />
              </div>
            </div>

            {/* Wedding details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Wedding Date</label>
                <input type="date" value={form.date} onChange={set('date')} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Guest Count</label>
                <input type="number" placeholder="e.g. 250" value={form.guests} onChange={set('guests')} className={inputClass} />
              </div>
            </div>

            <div>
              <label className={labelClass}>Venue / Location</label>
              <input type="text" placeholder="e.g. Cedar Hall, Kumarakom" value={form.venue} onChange={set('venue')} className={inputClass} />
            </div>

            <div>
              <label className={labelClass}>Package Interest</label>
              <select value={form.package} onChange={set('package')} className={inputClass}>
                <option value="">Not sure yet — happy to discuss</option>
                <option>Story — From ₹45,000</option>
                <option>Chapter — From ₹75,000</option>
                <option>Legacy — From ₹1,20,000</option>
                <option>Custom package</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>Your Message</label>
              <textarea
                rows={4}
                placeholder={`Tell ${vendor.name} a little about your wedding vision, what matters most to you, and any specific moments you'd love captured...`}
                value={form.message}
                onChange={set('message')}
                className={`${inputClass} resize-none`}
              />
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-[#6B3037] hover:bg-[#52242A] text-white font-medium py-4 rounded-xl transition-colors text-sm shadow-lg"
              >
                Send Enquiry to {vendor.name} →
              </button>
              <p className="text-center text-xs text-[#A39081] mt-3">
                No commitment required · Free to enquire · Respond typically within 2 hours
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
