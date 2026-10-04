import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { usePlanning } from '../context/PlanningContext.jsx';
import { STORIES_BY_AMAL } from '../data/vendorData.js';
import VendorHero from '../components/vendor/VendorHero.jsx';
import VendorGallery from '../components/vendor/VendorGallery.jsx';
import VendorAbout from '../components/vendor/VendorAbout.jsx';
import VendorPackages from '../components/vendor/VendorPackages.jsx';
import VendorReviews from '../components/vendor/VendorReviews.jsx';
import VendorAvailability from '../components/vendor/VendorAvailability.jsx';
import VendorFAQ from '../components/vendor/VendorFAQ.jsx';
import VendorSimilar from '../components/vendor/VendorSimilar.jsx';
import VendorStickyActions from '../components/vendor/VendorStickyActions.jsx';
import EnquiryModal from '../components/modals/EnquiryModal.jsx';

export default function VendorPage() {
  const { id } = useParams();
  const vendor = STORIES_BY_AMAL; // In production, fetch by id
  const { isSaved, toggleSave, isInCompare, toggleCompare, openModal, activeModal, closeModal, addNote } = usePlanning();
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setShowSticky(!entry.isIntersecting),
      { threshold: 0 }
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  const savedStatus = isSaved(vendor.id);
  const compareStatus = isInCompare(vendor.id);

  const vendorAsItem = {
    id: vendor.id,
    name: vendor.name,
    category: vendor.category,
    location: vendor.location,
    rating: vendor.rating,
    image: vendor.heroImage,
    priceFormatted: vendor.startingPrice,
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1917] font-sans">
      {/* Breadcrumb */}
      <nav className="border-b border-[#EAE3DA] bg-[#FDFBF7]" aria-label="Breadcrumb">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <ol className="flex items-center gap-2 text-sm text-[#78716C]">
            <li><Link to="/" className="hover:text-[#6B3037] transition-colors">Home</Link></li>
            <li className="text-[#D4C5B9]">/</li>
            <li><Link to="/" className="hover:text-[#6B3037] transition-colors">Photography</Link></li>
            <li className="text-[#D4C5B9]">/</li>
            <li><Link to="/" className="hover:text-[#6B3037] transition-colors">Kerala</Link></li>
            <li className="text-[#D4C5B9]">/</li>
            <li className="text-[#1C1917] font-medium">{vendor.name}</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <div ref={heroRef}>
        <VendorHero
          vendor={vendor}
          savedStatus={savedStatus}
          compareStatus={compareStatus}
          onSave={() => toggleSave(vendorAsItem)}
          onCompare={() => toggleCompare(vendorAsItem)}
          onEnquire={() => setShowEnquiry(true)}
        />
      </div>

      {/* Quick Stats Bar */}
      <div className="bg-[#1C1917] text-white border-b border-[#34302C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#34302C]">
            {[
              { label: 'Weddings Done', value: '200+' },
              { label: 'Response Rate', value: '98%' },
              { label: 'Response Time', value: '~2 hours' },
              { label: 'Currently Booking', value: 'Winter 2026–27' },
            ].map((stat) => (
              <div key={stat.label} className="px-6 py-4 text-center">
                <p className="text-lg font-semibold text-[#E8D4CF]">{stat.value}</p>
                <p className="text-xs text-[#78716C] mt-0.5 font-sans">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        {/* Portfolio Gallery */}
        <section id="gallery">
          <VendorGallery gallery={vendor.gallery} vendorName={vendor.name} />
        </section>

        {/* About + Team */}
        <section id="about">
          <VendorAbout vendor={vendor} />
        </section>

        {/* Packages */}
        <section id="packages">
          <VendorPackages packages={vendor.packages} onEnquire={() => setShowEnquiry(true)} />
        </section>

        {/* Planning Workspace Strip */}
        <section id="planning" className="bg-gradient-to-r from-[#F5ECE8] to-[#FAF8F5] rounded-3xl p-8 border border-[#E8D4CF]">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#8E4A49] mb-3">Your Planning Workspace</p>
          <h2 className="font-serif text-2xl text-[#1C1917] mb-2">Save, compare and plan around this vendor</h2>
          <p className="text-[#78716C] text-sm mb-6">Everything you do here stays private — only you and your partner can see it.</p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => toggleSave(vendorAsItem)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200 ${
                savedStatus
                  ? 'bg-[#6B3037] text-white border-[#6B3037]'
                  : 'bg-white text-[#1C1917] border-[#D4C5B9] hover:border-[#6B3037] hover:text-[#6B3037]'
              }`}
            >
              <span>{savedStatus ? '♥' : '♡'}</span>
              {savedStatus ? 'Saved to Collection' : 'Save to Collection'}
            </button>
            <button
              onClick={() => toggleCompare(vendorAsItem)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200 ${
                compareStatus
                  ? 'bg-[#1C1917] text-white border-[#1C1917]'
                  : 'bg-white text-[#1C1917] border-[#D4C5B9] hover:border-[#1C1917]'
              }`}
            >
              <span>⊕</span>
              {compareStatus ? 'In Compare Tray' : 'Add to Compare'}
            </button>
            <button
              onClick={() => addNote({ title: `Note about ${vendor.name}`, content: '', targetTitle: vendor.name })}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium border border-[#D4C5B9] bg-white text-[#1C1917] hover:border-[#6B3037] hover:text-[#6B3037] transition-all duration-200"
            >
              <span>📝</span> Add a Note
            </button>
            <a
              href="#availability"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium border border-[#D4C5B9] bg-white text-[#1C1917] hover:border-[#6B3037] hover:text-[#6B3037] transition-all duration-200"
            >
              <span>🗓</span> Check Availability
            </a>
          </div>
        </section>

        {/* Reviews */}
        <section id="reviews">
          <VendorReviews
            reviews={vendor.reviews}
            ratingBreakdown={vendor.ratingBreakdown}
          />
        </section>

        {/* Availability */}
        <section id="availability">
          <VendorAvailability
            availability={vendor.availability}
            vendor={vendor}
            onEnquire={() => setShowEnquiry(true)}
          />
        </section>

        {/* FAQ */}
        <section id="faq">
          <VendorFAQ faqs={vendor.faqs} />
        </section>

        {/* Similar Vendors */}
        <section id="similar">
          <VendorSimilar vendors={vendor.similarVendors} />
        </section>

        {/* Final CTA */}
        <section className="text-center py-16 bg-[#1C1917] rounded-3xl px-8">
          <p className="text-[#8E4A49] text-xs font-semibold uppercase tracking-widest mb-4">Ready to begin?</p>
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
            Ready to meet {vendor.name}?
          </h2>
          <p className="text-[#A39081] max-w-lg mx-auto mb-8 text-sm leading-relaxed">
            Send an enquiry and Amal typically responds within 2 hours. Your date and contact details stay completely private.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowEnquiry(true)}
              className="px-8 py-3.5 bg-[#6B3037] text-white rounded-xl font-medium hover:bg-[#52242A] transition-colors text-sm"
            >
              Send Enquiry →
            </button>
            <button
              onClick={() => toggleSave(vendorAsItem)}
              className="px-8 py-3.5 bg-white/10 text-white border border-white/20 rounded-xl font-medium hover:bg-white/20 transition-colors text-sm"
            >
              {savedStatus ? '♥ Saved' : '♡ Save to Collection'}
            </button>
          </div>
          <p className="mt-6 text-[#57534E] text-xs">
            Questions? <button className="text-[#A39081] underline hover:text-white transition-colors">Chat with our planning team →</button>
          </p>
        </section>
      </div>

      {/* Sticky Action Bar */}
      {showSticky && (
        <VendorStickyActions
          vendor={vendor}
          savedStatus={savedStatus}
          compareStatus={compareStatus}
          onSave={() => toggleSave(vendorAsItem)}
          onCompare={() => toggleCompare(vendorAsItem)}
          onEnquire={() => setShowEnquiry(true)}
        />
      )}

      {/* Enquiry Modal */}
      {showEnquiry && (
        <EnquiryModal vendor={vendor} onClose={() => setShowEnquiry(false)} />
      )}
    </div>
  );
}
