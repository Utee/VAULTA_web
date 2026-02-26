import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DeviceMockup from '../components/device/DeviceMockup';

gsap.registerPlugin(ScrollTrigger);

const ProblemSection: React.FC = () => {
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
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE (0% - 30%)
      scrollTl
        .fromTo(bg, 
          { scale: 1.08, opacity: 0.7 }, 
          { scale: 1, opacity: 1, ease: 'none' }, 
          0
        )
        .fromTo(device, 
          { y: '22vh', scale: 0.96, opacity: 0 }, 
          { y: 0, scale: 1, opacity: 1, ease: 'power2.out' }, 
          0
        )
        .fromTo(leftHeadline, 
          { x: '-14vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'power2.out' }, 
          0.05
        )
        .fromTo(rightHeadline, 
          { x: '14vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'power2.out' }, 
          0.08
        )
        .fromTo([subheadline, cta], 
          { y: 24, opacity: 0 }, 
          { y: 0, opacity: 1, ease: 'power2.out', stagger: 0.03 }, 
          0.12
        );

      // SETTLE (30% - 70%): Hold positions

      // EXIT (70% - 100%)
      scrollTl
        .fromTo(bg, 
          { scale: 1, opacity: 1 }, 
          { scale: 1.06, opacity: 0.35, ease: 'power2.in' }, 
          0.70
        )
        .fromTo(device, 
          { y: 0, opacity: 1 }, 
          { y: '-16vh', opacity: 0.25, ease: 'power2.in' }, 
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
          { opacity: 1 }, 
          { opacity: 0, ease: 'power2.in', stagger: 0.02 }, 
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
      id="problem"
      className="section-pinned bg-vaulta-dark z-20"
    >
      {/* Background Image */}
      <div 
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.7, transform: 'scale(1.08)' }}
      >
        <img 
          src="/images/paper_document_bg.jpg" 
          alt="Paper document background"
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
          Paper fails.
        </h1>

        {/* Device Mockup */}
        <div 
          ref={deviceRef}
          className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2"
          style={{ opacity: 0 }}
        >
          <DeviceMockup screen="add-document" />
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
          Connections drop.
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
          Millions lose access to jobs, healthcare, and housing because identity is too fragile.
        </p>

        {/* CTA Button */}
        <button 
          ref={ctaRef}
          onClick={() => scrollToSection('solution')}
          className="absolute left-1/2 top-[88%] -translate-x-1/2 text-vaulta-teal font-medium text-sm hover:underline transition-all"
          style={{ opacity: 0 }}
        >
          See how VAULTA fixes it →
        </button>
      </div>
    </section>
  );
};

export default ProblemSection;
