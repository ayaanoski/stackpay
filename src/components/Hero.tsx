import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
    )
    .fromTo(subtitleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    )
    .fromTo(buttonRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" },
      "-=0.3"
    )
    .fromTo(featuresRef.current ? Array.from(featuresRef.current.children) : [],
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
      "-=0.2"
    );
  }, []);

  const scrollToHowItWorks = () => {
    const element = document.getElementById('how-it-works');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="vision" ref={heroRef} className="min-h-screen flex items-center justify-center pt-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto w-full text-center">
        <h1 ref={titleRef} className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 sm:mb-8 md:mb-12 gradient-text leading-tight tracking-wider">
          STACKPAY
        </h1>
        
        <p ref={subtitleRef} className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 sm:mb-12 md:mb-16 max-w-4xl mx-auto leading-relaxed tracking-wide px-4">
          Decentralized sBTC Payment Gateway Built on Stacks Blockchain
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 sm:mb-16 md:mb-20">
          <button 
            ref={buttonRef}
            onClick={scrollToHowItWorks}
            className="modern-button text-black text-base sm:text-lg inline-flex items-center space-x-2 sm:space-x-3
                     hover:scale-105 active:scale-95 transform transition-all duration-200"
          >
            <span>Explore Platform</span>
            <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <button 
            onClick={() => {
              const element = document.getElementById('demo');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 py-3 bg-transparent border-2 border-orange-500 text-orange-500 rounded-lg font-semibold
                     hover:bg-orange-500/10 transition-all duration-200 text-base sm:text-lg inline-flex items-center space-x-2"
          >
            <span>Try Demo</span>
          </button>
        </div>
        
        <div ref={featuresRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto px-4">
          <div className="text-center p-4 sm:p-6 rounded-xl hover:bg-orange-500/5 transition-colors duration-300">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-orange-500/20 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4
                          transform transition-transform duration-300 hover:scale-110">
              <span className="text-orange-500 text-xl sm:text-2xl font-bold">🔒</span>
            </div>
            <h3 className="text-orange-500 text-base sm:text-lg font-bold mb-2">SECURE</h3>
            <p className="text-gray-400 text-sm">Trust-minimized payments on Bitcoin Layer 2</p>
          </div>
          
          <div className="text-center p-4 sm:p-6 rounded-xl hover:bg-orange-500/5 transition-colors duration-300">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-orange-500/20 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4
                          transform transition-transform duration-300 hover:scale-110">
              <span className="text-orange-500 text-xl sm:text-2xl font-bold">⚡</span>
            </div>
            <h3 className="text-orange-500 text-base sm:text-lg font-bold mb-2">SIMPLE</h3>
            <p className="text-gray-400 text-sm">Easy integration with modern developer tools</p>
          </div>
          
          <div className="text-center p-4 sm:p-6 rounded-xl hover:bg-orange-500/5 transition-colors duration-300 sm:col-span-2 md:col-span-1">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-orange-500/20 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4
                          transform transition-transform duration-300 hover:scale-110">
              <span className="text-orange-500 text-xl sm:text-2xl font-bold">🌐</span>
            </div>
            <h3 className="text-orange-500 text-base sm:text-lg font-bold mb-2">OPEN</h3>
            <p className="text-gray-400 text-sm">Fully decentralized and open-source</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;