import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DeviceMockup from '../components/device/DeviceMockup';
import { Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const SecuritySection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const deviceRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const leftHeadlineRef = useRef<HTMLHeadingElement>(null);
  const rightHeadlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const device = deviceRef.current;
    const badge = badgeRef.current;
    const leftHeadline = leftHeadlineRef.current;
    const rightHeadline = rightHeadlineRef.current;
    const subheadline = subheadlineRef.current;
    const cta = ctaRef.current;
    const bg = bgRef.current;

    if (!section || !device || !badge || !leftHeadline || !rightHeadline || !subheadline || !cta || !bg) return;

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
          { y: '22vh', opacity: 0 }, 
          { y: 0, opacity: 1, ease: 'power2.out' }, 
          0
        )
        .fromTo(badge, 
          { scale: 0.85, opacity: 0 }, 
          { scale: 1, opacity: 1, ease: 'power2.out' }, 
          0.12
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
          { y: 22, opacity: 0 }, 
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
        .fromTo(badge, 
          { opacity: 1 }, 
          { opacity: 0, ease: 'power2.in' }, 
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
      id="security"
      className="section-pinned bg-vaulta-dark z-50"
    >
      {/* Background Image */}
      <div 
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.7, transform: 'scale(1.08)' }}
      >
        <img 
          src="/images/biometric_phone_bg.jpg" 
          alt="Biometric security"
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
          Unlock
        </h1>

        {/* Device Mockup */}
        <div 
          ref={deviceRef}
          className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2"
          style={{ opacity: 0 }}
        >
          <DeviceMockup screen="unlock" />
        </div>

        {/* Security Badge */}
        <div 
          ref={badgeRef}
          className="absolute left-[58vw] top-[44%] hidden lg:block"
          style={{ opacity: 0 }}
        >
          <div className="px-4 py-2 rounded-full bg-vaulta-teal/20 border border-vaulta-teal/30 backdrop-blur-sm pulse-animation">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-vaulta-teal" />
              <span className="text-vaulta-teal text-sm font-mono font-medium">AES-256</span>
            </div>
          </div>
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
          With biometrics.
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
          {/* PIN + fingerprint or face unlock. Your data never leaves your device unencrypted. */}
        </p>

        {/* CTA Button */}
        <button 
          ref={ctaRef}
          onClick={() => scrollToSection('emergency')}
          className="absolute left-1/2 top-[88%] -translate-x-1/2 text-vaulta-teal font-medium text-sm hover:underline transition-all"
          style={{ opacity: 0 }}
        >
          Learn about security →
        </button>
      </div>
    </section>
  );
};

export default SecuritySection;
