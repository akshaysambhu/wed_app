/**
 * HowItWorksPage.jsx — /how-it-works
 * Explains the platform's core concept: Discover -> Discuss -> Finalise
 */
import React from 'react';
import { Link } from 'react-router-dom';

export default function HowItWorksPage() {
  const steps = [
    {
      number: '01',
      title: 'Discover & Shortlist',
      desc: 'Browse hundreds of curated vendors, venues, and real weddings. Add the ones that catch your eye to your Shortlist.',
      icon: '✨'
    },
    {
      number: '02',
      title: 'Discuss Privately',
      desc: 'Connect with your partner and use the built-in chat to discuss vendors and share ideas directly within the platform.',
      icon: '💬'
    },
    {
      number: '03',
      title: 'Compare & Decide',
      desc: 'Compare shortlisted vendors side-by-side. Review their packages, pricing, and portfolios to make the right choice.',
      icon: '⚖️'
    },
    {
      number: '04',
      title: 'Build Your Crew',
      desc: 'Finalise your chosen vendors. We\'ll help you request quotes, check availability, and secure your bookings.',
      icon: '🎉'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#8E4A49] mb-4">How it works</p>
          <h1 className="font-serif text-5xl md:text-6xl text-[#1C1917] mb-6">Plan the moments that matter.</h1>
          <p className="text-[#57534E] text-lg max-w-2xl mx-auto leading-relaxed">
            Planning starts long before the final decision. Plan My Moments is a complete ecosystem where you can discover inspiration, discuss privately with your partner, and gradually turn ideas into reality.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 mb-24">
          {steps.map(step => (
            <div key={step.number} className="relative bg-white rounded-3xl p-8 border border-[#EAE3DA] shadow-sm hover:shadow-md transition-shadow">
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-[#6B3037] text-white rounded-full flex items-center justify-center font-serif text-2xl border-4 border-[#FAF8F5]">
                {step.number}
              </div>
              <div className="text-4xl mb-4 text-right opacity-50">{step.icon}</div>
              <h3 className="font-serif text-2xl text-[#1C1917] mb-3">{step.title}</h3>
              <p className="text-[#78716C] leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-[#1C1917] rounded-3xl p-12 text-center text-white">
          <h2 className="font-serif text-4xl mb-4">Ready to start planning?</h2>
          <p className="text-[#A39081] mb-8 max-w-lg mx-auto">
            Join thousands of couples building their perfect event crew.
          </p>
          <Link to="/start-planning" className="px-8 py-4 bg-[#6B3037] text-white font-semibold rounded-full hover:bg-[#52242A] transition-colors inline-block">
            Start Your Journey
          </Link>
        </div>

      </div>
    </div>
  );
}
