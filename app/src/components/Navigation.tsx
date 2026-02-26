import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: 'Product', id: 'solution' },
    { label: 'Security', id: 'security' },
    { label: 'Use Cases', id: 'usecases' },
    { label: 'Vision', id: 'vision' },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-vaulta-dark/80 backdrop-blur-xl border-b border-white/5' 
            : 'bg-transparent'
        }`}
      >
        <div className="w-full px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="font-sora font-bold text-xl text-vaulta-text hover:text-vaulta-teal transition-colors"
            >
              VAULTA
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-vaulta-muted hover:text-vaulta-text text-sm font-medium transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <button 
                onClick={() => scrollToSection('cta')}
                className="px-5 py-2.5 bg-vaulta-teal rounded-full text-white text-sm font-medium hover:bg-vaulta-teal/90 hover-lift transition-all"
              >
                Get early access
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-vaulta-text"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 z-40 bg-vaulta-dark/95 backdrop-blur-xl transition-all duration-300 lg:hidden ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="text-vaulta-text text-2xl font-sora font-medium hover:text-vaulta-teal transition-colors"
            >
              {link.label}
            </button>
          ))}
          <button 
            onClick={() => scrollToSection('cta')}
            className="mt-4 px-8 py-3 bg-vaulta-teal rounded-full text-white text-lg font-medium"
          >
            Get early access
          </button>
        </div>
      </div>
    </>
  );
};

export default Navigation;
