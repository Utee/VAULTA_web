import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DeviceMockup from '../components/device/DeviceMockup';

gsap.registerPlugin(ScrollTrigger);

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const deviceRef = useRef<HTMLDivElement>(null);
  const leftHeadlineRef = useRef<HTMLHeadingElement>(null);
  const rightHeadlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const device = deviceRef.current;
    const leftHeadline = leftHeadlineRef.current;
    const rightHeadline = rightHeadlineRef.current;
    const subheadline = subheadlineRef.current;
    const cta = ctaRef.current;
    const bg = bgRef.current;

    if (!section || !device || !leftHeadline || !rightHeadline || !subheadline || !cta || !bg) return;

    const ctx = gsap.context(() => {
      // Initial load animation
      const loadTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      
      loadTl
        .fromTo(bg, { opacity: 0, scale: 1.06 }, { opacity: 1, scale: 1, duration: 1.1 })
        .fromTo(device, { y: '18vh', opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, '-=0.8')
        .fromTo(leftHeadline, { x: '-12vw', opacity: 0 }, { x: 0, opacity: 1, duration: 0.7 }, '-=0.6')
        .fromTo(rightHeadline, { x: '12vw', opacity: 0 }, { x: 0, opacity: 1, duration: 0.7 }, '-=0.5')
        .fromTo([subheadline, cta], { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 }, '-=0.3');

      // Scroll-driven animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.set([device, leftHeadline, rightHeadline, subheadline, cta], { 
              opacity: 1, 
              x: 0, 
              y: 0 
            });
          }
        }
      });

      // ENTRANCE (0% - 30%): Hold position (already animated by load)
      // SETTLE (30% - 70%): Static
      // EXIT (70% - 100%): Elements exit
      scrollTl
        .fromTo(device, 
          { y: 0, opacity: 1 }, 
          { y: '-18vh', opacity: 0.25, ease: 'power2.in' }, 
          0.70
        )
        .fromTo(leftHeadline, 
          { x: 0, opacity: 1 }, 
          { x: '-10vw', opacity: 0.2, ease: 'power2.in' }, 
          0.70
        )
        .fromTo(rightHeadline, 
          { x: 0, opacity: 1 }, 
          { x: '10vw', opacity: 0.2, ease: 'power2.in' }, 
          0.70
        )
        .fromTo([subheadline, cta], 
          { y: 0, opacity: 1 }, 
          { y: 18, opacity: 0, ease: 'power2.in', stagger: 0.05 }, 
          0.75
        );

    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="hero"
      className="section-pinned bg-vaulta-dark z-10"
    >
      {/* Background Image */}
      <div 
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0 }}
      >
        <img 
          src="/images/hero_bg.jpg" 
          alt="Hero background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-vaulta-dark/35 to-vaulta-dark/65" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        {/* Left Headline */}
        <h1 
          ref={leftHeadlineRef}
          className="absolute left-[8vw] top-[34%] font-sora font-bold text-vaulta-text leading-none"
          style={{ 
            fontSize: 'clamp(36px, 5vw, 78px)',
            width: '28vw',
            opacity: 0
          }}
        >
          Your identity
        </h1>

        {/* Device Mockup */}
        <div 
          ref={deviceRef}
          className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2"
          style={{ opacity: 0 }}
        >
          <DeviceMockup screen="profile" />
        </div>

        {/* Right Headline */}
        <h1 
          ref={rightHeadlineRef}
          className="absolute right-[8vw] top-[34%] font-sora font-bold text-vaulta-text text-right leading-none"
          style={{ 
            fontSize: 'clamp(36px, 5vw, 78px)',
            opacity: 0
          }}
        >
          Secured.
        </h1>

        {/* Subheadline */}
        <p 
          ref={subheadlineRef}
          className="absolute left-1/2 top-[78%] -translate-x-1/2 text-vaulta-muted text-center px-4"
          style={{ 
            fontSize: 'clamp(14px, 1.2vw, 18px)',
            width: 'min(52vw, 720px)',
            opacity: 0
          }}
        >
          VAULTA is an offline-first digital identity wallet designed for real life.
        </p>

        {/* CTA Button */}
        <button 
          ref={ctaRef}
          onClick={() => scrollToSection('cta')}
          className="absolute left-1/2 top-[88%] -translate-x-1/2 px-8 py-3.5 bg-vaulta-teal rounded-full text-white font-medium text-sm hover:bg-vaulta-teal/90 hover-lift transition-all"
          style={{ opacity: 0 }}
        >
          Get early access
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
