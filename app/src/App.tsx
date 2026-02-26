import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './components/Navigation';
import HeroSection from './sections/HeroSection';
import ProblemSection from './sections/ProblemSection';
import SolutionSection from './sections/SolutionSection';
import ShareSection from './sections/ShareSection';
import SecuritySection from './sections/SecuritySection';
import EmergencySection from './sections/EmergencySection';
import UseCasesSection from './sections/UseCasesSection';
import VisionSection from './sections/VisionSection';
import CTASection from './sections/CTASection';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Wait for all ScrollTriggers to be created
    const timeout = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      
      if (!maxScroll || pinned.length === 0) return;

      // Build ranges and snap targets from actual pinned sections
      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      // Create global snap
      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            // Check if within any pinned range (with small buffer)
            const inPinned = pinnedRanges.some(
              r => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            
            if (!inPinned) return value; // Flowing section: free scroll

            // Find nearest pinned center
            const target = pinnedRanges.reduce((closest, r) =>
              Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
              pinnedRanges[0]?.center ?? 0
            );
            
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        }
      });
    }, 100);

    return () => {
      clearTimeout(timeout);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div className="relative bg-vaulta-dark">
      {/* Grain Overlay */}
      <div className="grain-overlay" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="relative">
        {/* Section 1: Hero - z-10 */}
        <HeroSection />
        
        {/* Section 2: Problem - z-20 */}
        <ProblemSection />
        
        {/* Section 3: Solution - z-30 */}
        <SolutionSection />
        
        {/* Section 4: Share - z-40 */}
        <ShareSection />
        
        {/* Section 5: Security - z-50 */}
        <SecuritySection />
        
        {/* Section 6: Emergency - z-60 */}
        <EmergencySection />
        
        {/* Section 7: Use Cases - z-70 (flowing) */}
        <UseCasesSection />
        
        {/* Section 8: Vision - z-80 */}
        <VisionSection />
        
        {/* Section 9: CTA - z-90 (flowing) */}
        <CTASection />
      </main>
    </div>
  );
}

export default App;
