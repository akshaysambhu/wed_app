/**
 * HomePage.jsx
 * Layout wrapper that assembles all homepage sections in order.
 */
import React, { useState } from 'react';

// Sections
import Hero from './Hero.jsx';
import StartProgram from './StartProgram.jsx';
import BuildCrew from './BuildCrew.jsx';
import StoriesPreview from './StoriesPreview.jsx';
import PrivatePlanning from './PrivatePlanning.jsx';
import VendorDiscovery from './VendorDiscovery.jsx';
import PlanningJourney from './PlanningJourney.jsx';
import FinalCTA from './FinalCTA.jsx';

export default function HomePage() {
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);

  const handleSelectProgram = (programId) => {
    setSelectedProgram(programId);
    setTimeout(() => {
      document.getElementById('build-crew')?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  const handleToggleService = (serviceId) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) ? prev.filter(s => s !== serviceId) : [...prev, serviceId]
    );
  };

  return (
    <main>
      <Hero />
      <StartProgram selectedProgram={selectedProgram} onSelectProgram={handleSelectProgram} />
      <div id="build-crew">
        {selectedProgram && (
          <BuildCrew 
            selectedProgram={selectedProgram} 
            selectedServices={selectedServices} 
            onToggleService={handleToggleService} 
          />
        )}
      </div>
      <StoriesPreview />
      <PrivatePlanning />
      <VendorDiscovery />
      <PlanningJourney />
      <FinalCTA />
    </main>
  );
}
