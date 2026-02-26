import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Heart, Briefcase, Home, Wallet } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const useCases = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Police / Security checkpoints',
    description: 'Show ID instantly. No signal required. No more delays at checkpoints.',
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: 'Hospital emergencies',
    description: 'Medical staff access your blood type, allergies, and emergency contacts immediately.',
  },
  {
    icon: <Briefcase className="w-6 h-6" />,
    title: 'Job applications & school admissions',
    description: 'Present verified certificates and credentials with a single tap.',
  },
  {
    icon: <Home className="w-6 h-6" />,
    title: 'House rentals & guarantor checks',
    description: 'Share identity and references securely with potential landlords.',
  },
  {
    icon: <Wallet className="w-6 h-6" />,
    title: 'Everyday proof—without carrying papers',
    description: 'Your entire identity, always in your pocket. Never worry about lost documents again.',
  },
];

const UseCasesSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const cards = cardsRef.current.filter(Boolean);

    if (!section || !heading || cards.length === 0) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(heading,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Cards animation with stagger
      cards.forEach((card, index) => {
        gsap.fromTo(card,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            }
          }
        );

        // Subtle parallax
        gsap.fromTo(card,
          { y: 0 },
          {
            y: -12,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            }
          }
        );
      });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="usecases"
      className="relative bg-vaulta-dark py-24 lg:py-32 z-[70]"
    >
      <div className="w-full px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left Heading */}
          <div 
            ref={headingRef}
            className="lg:w-[40%] lg:sticky lg:top-32 lg:self-start"
            style={{ opacity: 0 }}
          >
            <h2 
              className="font-sora font-bold text-vaulta-text mb-4"
              style={{ fontSize: 'clamp(28px, 3.6vw, 56px)' }}
            >
              Built for real life
            </h2>
            <p className="text-vaulta-muted text-base lg:text-lg leading-relaxed">
              VAULTA is designed for the moments that matter—offline, under pressure, and on the move.
            </p>
          </div>

          {/* Right Cards */}
          <div className="lg:w-[60%] space-y-4">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                ref={(el) => { cardsRef.current[index] = el; }}
                className="p-6 rounded-2xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all cursor-pointer group"
                style={{ opacity: 0 }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-vaulta-teal/10 flex items-center justify-center text-vaulta-teal flex-shrink-0 group-hover:bg-vaulta-teal/20 transition-colors">
                    {useCase.icon}
                  </div>
                  <div>
                    <h3 className="font-sora font-semibold text-vaulta-text text-lg mb-2">
                      {useCase.title}
                    </h3>
                    <p className="text-vaulta-muted text-sm leading-relaxed">
                      {useCase.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;
