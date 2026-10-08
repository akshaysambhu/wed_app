import React, { useState } from 'react';

export default function VendorAvailability() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2027, 8, 1)); // Sep 2027
  
  // Generating a dummy calendar
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  
  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  // Dummy statuses: Available, Held, Booked
  const getStatus = (day) => {
    if (!day) return 'empty';
    if ([5, 12, 19, 26].includes(day)) return 'booked'; // Weekends heavily booked
    if ([6, 18].includes(day)) return 'held';
    return 'available';
  };

  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  return (
    <div id="availability" className="bg-white rounded-3xl p-8 border border-[#EAE3DA]">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
        
        {/* Left side: Legend & CTA */}
        <div className="w-full md:w-1/3">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#8E4A49] mb-2">Availability</p>
          <h2 className="font-serif text-3xl text-[#1C1917] mb-4">Book your dates.</h2>
          <p className="text-[#78716C] text-sm mb-8">
            Dates fill up quickly during peak wedding seasons. Check calendar to see if we are available for your event.
          </p>
          
          <div className="space-y-3 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full border border-[#D4C5B9] bg-white"></div>
              <span className="text-sm font-medium text-[#44403C]">Available</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-[#F5ECE8] border border-[#8E4A49]"></div>
              <span className="text-sm font-medium text-[#44403C]">Held (Pending)</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-[#6B3037]"></div>
              <span className="text-sm font-medium text-[#44403C]">Booked</span>
            </div>
          </div>
          
          <div className="p-5 bg-[#F5ECE8] rounded-xl border border-[#E8D4CF]">
            <h4 className="font-serif text-lg text-[#1C1917] mb-2">Secure your date</h4>
            <p className="text-xs text-[#78716C] mb-4">You can place a 48-hour hold on an available date while you decide.</p>
            <div className="flex flex-col gap-2">
              <button className="w-full py-2.5 bg-white text-[#1C1917] border border-[#1C1917] text-sm font-medium rounded-lg hover:bg-[#F4EFEA] transition-colors">
                Hold Date
              </button>
              <button className="w-full py-2.5 bg-[#6B3037] text-white text-sm font-medium rounded-lg hover:bg-[#52242A] transition-colors">
                Book Now
              </button>
            </div>
          </div>
        </div>

        {/* Right side: Calendar UI */}
        <div className="w-full md:w-2/3 max-w-md mx-auto">
          <div className="bg-[#FAF8F5] border border-[#EAE3DA] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <button onClick={prevMonth} className="text-[#1C1917] hover:text-[#6B3037] p-1">←</button>
              <h3 className="font-serif text-xl text-[#1C1917] font-semibold">
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </h3>
              <button onClick={nextMonth} className="text-[#1C1917] hover:text-[#6B3037] p-1">→</button>
            </div>
            
            <div className="grid grid-cols-7 gap-2 mb-2 text-center text-xs font-semibold text-[#8C7E72] uppercase tracking-wider">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => <div key={d}>{d}</div>)}
            </div>
            
            <div className="grid grid-cols-7 gap-2 text-center">
              {days.map((day, i) => {
                const status = getStatus(day);
                let classes = "w-10 h-10 mx-auto rounded-full flex items-center justify-center text-sm transition-colors ";
                
                if (status === 'empty') {
                  return <div key={`empty-${i}`} className="w-10 h-10"></div>;
                }
                if (status === 'booked') {
                  classes += "bg-[#6B3037] text-white cursor-not-allowed";
                } else if (status === 'held') {
                  classes += "bg-[#F5ECE8] border border-[#8E4A49] text-[#6B3037] font-semibold cursor-not-allowed";
                } else {
                  classes += "bg-white border border-[#D4C5B9] text-[#1C1917] hover:border-[#1C1917] cursor-pointer";
                }

                return (
                  <div key={i} className="py-1">
                    <button className={classes} disabled={status !== 'available'}>
                      {day}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
