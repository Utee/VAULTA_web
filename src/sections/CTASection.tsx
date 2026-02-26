import React, { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Mail } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

gsap.registerPlugin(ScrollTrigger);

const CTASection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [showDialog, setShowDialog] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const bg = bgRef.current;

    if (!section || !content || !bg) return;

    const ctx = gsap.context(() => {
      // Background parallax
      gsap.fromTo(bg,
        { y: 0 },
        {
          y: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        }
      );

      // Content animation
      gsap.fromTo(content,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: content,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );

    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setShowDialog(true);
      setEmail('');
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="cta"
      className="relative min-h-screen bg-vaulta-warm z-[90] overflow-hidden"
    >
      {/* Background Image */}
      <div 
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
      >
        <img 
          src="/images/cta_warm_bg.jpg" 
          alt="Warm background"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-vaulta-warm/60 to-vaulta-warm/80" />
      </div>

      {/* Content */}
      <div 
        ref={contentRef}
        className="relative z-10 min-h-screen flex items-center justify-center px-6"
        style={{ opacity: 0 }}
      >
        <div className="w-full max-w-xl text-center">
          <h2 
            className="font-sora font-bold text-white mb-4"
            style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}
          >
            Join the future of identity
          </h2>
          
          <p className="text-white/70 text-base lg:text-lg mb-8 leading-relaxed">
            Get early access to VAULTA. Be the first to experience offline identity, done right.
          </p>

          {/* Email Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="flex-1 relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-vaulta-teal focus:ring-1 focus:ring-vaulta-teal transition-all"
                required
              />
            </div>
            <button
              type="submit"
              className="px-8 py-4 bg-vaulta-teal rounded-xl text-white font-medium flex items-center justify-center gap-2 hover:bg-vaulta-teal/90 hover-lift transition-all"
            >
              Join waitlist
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          {/* Partnership Link */}
          <p className="text-white/50 text-sm">
            For partnerships:{' '}
            <a 
              href="mailto:partnerships@vaulta.io" 
              className="text-vaulta-teal hover:underline"
            >
              partnerships@vaulta.io
            </a>
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 w-full px-6 lg:px-12 py-8 border-t border-white/10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sora font-bold text-white text-lg">VAULTA</p>
          <p className="text-white/50 text-sm">
            © 2025 VAULTA. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-white/50 text-sm hover:text-white transition-colors">Privacy</a>
            <a href="#" className="text-white/50 text-sm hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="bg-vaulta-dark border-white/10 text-vaulta-text">
          <DialogHeader>
            <DialogTitle className="font-sora text-xl">Welcome to VAULTA!</DialogTitle>
            <DialogDescription className="text-vaulta-muted">
              Thank you for joining our waitlist. We'll notify you as soon as early access is available.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <button
              onClick={() => setShowDialog(false)}
              className="w-full py-3 bg-vaulta-teal rounded-xl text-white font-medium hover:bg-vaulta-teal/90 transition-colors"
            >
              Got it
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default CTASection;
