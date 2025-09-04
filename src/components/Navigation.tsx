import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Layers, Menu, X } from 'lucide-react';
import { Link } from 'react-scroll';

const Navigation: React.FC = () => {
  const navRef = useRef<HTMLNavElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
      );
    }
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { label: 'Vision', sectionId: 'vision' },
    { label: 'How It Works', sectionId: 'how-it-works' },
    { label: 'Demo', sectionId: 'demo' },
    { label: 'Developers', sectionId: 'developers' },
    { label: 'Get Started', sectionId: 'get-started' },
  ];

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 bg-black backdrop-blur-md border-b border-orange-500/20 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <div className="flex items-center justify-between h-16 sm:h-20">
    {/* Logo Left */}
    <div className="flex-shrink-0 flex items-center space-x-2 sm:space-x-3">
      <Layers className="w-7 h-7 sm:w-9 sm:h-9 text-orange-400 drop-shadow-lg" />
      <span className="text-orange-400 text-xl sm:text-2xl font-extrabold tracking-widest leading-none drop-shadow-lg">
        STACKPAY
      </span>
    </div>

    {/* Navigation Right */}
    <div className="flex items-center">
      {/* Desktop Menu */}
      <div className="hidden lg:flex space-x-6 lg:space-x-10">
        {navItems.map((item) => (
          <Link
            key={item.sectionId}
            to={item.sectionId}
            spy={true}
            smooth={true}
            offset={-64}
            duration={500}
            className="text-white text-base lg:text-lg font-medium tracking-wide cursor-pointer transition-all duration-300
                      hover:text-orange-400 hover:scale-105 relative group"
          >
            {item.label}
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </Link>
        ))}
      </div>

      {/* Mobile Button */}
      <div className="lg:hidden ml-4">
        <button
          onClick={toggleMobileMenu}
          className="inline-flex items-center justify-center p-2 rounded-md text-orange-400 hover:text-orange-300 hover:bg-black/50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500 transition-colors duration-200"
          aria-expanded={isMobileMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          {isMobileMenuOpen ? (
            <X className="block h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="block h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </div>
    </div>
  </div>
</div>
      

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 top-16 sm:top-20 bg-black transition-opacity duration-300 ease-in-out ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-stretch p-4 bg-black space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.sectionId}
              to={item.sectionId}
              spy={true}
              smooth={true}
              offset={-64}
              duration={500}
              onClick={toggleMobileMenu}
              className="text-white text-lg font-medium tracking-wide cursor-pointer py-3 px-4 rounded-lg
                         hover:bg-orange-400/20 active:bg-orange-400/30 transition-colors duration-200
                         flex items-center justify-center"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
