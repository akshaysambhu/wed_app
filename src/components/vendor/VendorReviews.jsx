import React from 'react';

function StarBar({ stars, percentage, count }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-[#78716C] w-4 text-right">{stars}</span>
      <span className="text-[#6B3037] text-xs">★</span>
      <div className="flex-1 bg-[#EAE3DA] rounded-full h-2 overflow-hidden">
        <div
          className="h-full bg-[#6B3037] rounded-full transition-all duration-700"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-xs text-[#A39081] w-10 text-right">{count}</span>
    </div>
  );
}

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} className={`text-sm ${i <= rating ? 'text-[#6B3037]' : 'text-[#EAE3DA]'}`}>★</span>
      ))}
    </div>
  );
}

export default function VendorReviews({ reviews, ratingBreakdown }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-[#8E4A49] mb-2">What couples say</p>
      <h2 className="font-serif text-3xl md:text-4xl text-[#1C1917] mb-10">Reviews</h2>

      {/* Rating Summary */}
      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-10 mb-12 bg-[#FDFBF7] border border-[#EAE3DA] rounded-2xl p-8">
        {/* Overall score */}
        <div className="flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-[#EAE3DA] pb-6 md:pb-0 md:pr-8">
          <p className="font-serif text-7xl font-semibold text-[#1C1917]">{ratingBreakdown.overall}</p>
          <div className="flex gap-1 my-2">
            {[1,2,3,4,5].map(i => (
              <span key={i} className="text-xl text-[#6B3037]">★</span>
            ))}
          </div>
          <p className="text-sm text-[#78716C]">Based on {reviews.length} reviews</p>
        </div>

        {/* Breakdown */}
        <div className="flex flex-col justify-center space-y-6 md:pl-4">
          {/* Star distribution */}
          <div className="space-y-2.5">
            {ratingBreakdown.distribution.map(d => (
              <StarBar key={d.stars} stars={d.stars} percentage={d.percentage} count={d.count} />
            ))}
          </div>

          {/* Category ratings */}
          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#EAE3DA]">
            {Object.entries(ratingBreakdown.categories).map(([key, val]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-xs text-[#78716C] capitalize">{key}</span>
                <span className="text-xs font-semibold text-[#1C1917]">{val} ★</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Review Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map(review => (
          <div
            key={review.id}
            className="bg-[#FDFBF7] border border-[#EAE3DA] rounded-2xl p-7 hover:shadow-md transition-shadow duration-200 flex flex-col"
          >
            {/* Reviewer header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0"
                  style={{ backgroundColor: review.avatarColor }}
                >
                  {review.avatar}
                </div>
                <div>
                  <p className="font-semibold text-[#1C1917] text-sm">{review.couple}</p>
                  <p className="text-xs text-[#A39081]">{review.weddingType} · {review.location}</p>
                </div>
              </div>
              <div className="text-right">
                <StarRating rating={review.rating} />
                <p className="text-xs text-[#A39081] mt-1">{review.date}</p>
              </div>
            </div>

            {/* Review content */}
            <h4 className="font-serif text-base text-[#1C1917] mb-2">"{review.title}"</h4>
            <p className="text-sm text-[#57534E] leading-relaxed flex-1">{review.text}</p>

            {/* Sub-ratings */}
            <div className="grid grid-cols-2 gap-2 mt-5 pt-4 border-t border-[#EAE3DA]">
              {[
                { label: 'Quality', val: review.qualityRating },
                { label: 'Communication', val: review.communicationRating },
                { label: 'Delivery', val: review.deliveryRating },
                { label: 'Value', val: review.valueRating },
              ].map(r => (
                <div key={r.label} className="flex items-center justify-between">
                  <span className="text-[10px] text-[#A39081]">{r.label}</span>
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(i => (
                      <span key={i} className={`text-[10px] ${i <= r.val ? 'text-[#6B3037]' : 'text-[#EAE3DA]'}`}>★</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
