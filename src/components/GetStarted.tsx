import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Rocket, Github, MessageCircle, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const GetStarted: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(contentRef.current.children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
          }
        }
      );
    }

    if (linksRef.current) {
      gsap.fromTo(linksRef.current.children,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: linksRef.current,
            start: "top 90%",
          }
        }
      );
    }
  }, []);

  return (
    <section id="get-started" ref={sectionRef} className="py-16 sm:py-24 md:py-32 bg-gray-950/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div ref={contentRef}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-orange-500 mb-4 sm:mb-6 md:mb-8 glow-effect tracking-wider">
            GET STARTED
          </h2>
          
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-4 sm:mb-6 md:mb-8 tracking-wide">
            Ready to revolutionize your payment system?
          </p>
          
          <p className="text-base sm:text-lg text-gray-400 mb-8 sm:mb-12 md:mb-16 max-w-4xl mx-auto leading-relaxed px-4">
            StackPay is currently in MVP phase, focusing on Stacks testnet. We're actively seeking 
            partners and developers to build the future of Bitcoin payments together.
          </p>
          
          <button className="modern-button text-black text-base sm:text-lg md:text-xl inline-flex items-center space-x-2 sm:space-x-3 
                         mb-12 sm:mb-16 md:mb-20 hover:scale-105 active:scale-95 transform transition-all duration-200">
            <Rocket className="w-5 h-5 sm:w-6 sm:h-6" />
            <span>Start Building</span>
          </button>
        </div>

        {/* Contact Links */}
        <div ref={linksRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto 
                                   mb-12 sm:mb-16 md:mb-20">
          <a href="https://github.com/stackpay" 
             className="bg-gray-900/40 border border-orange-500/20 p-4 sm:p-6 rounded-xl sm:rounded-2xl 
                      hover:border-orange-500/60 hover:bg-gray-900/50 transition-all duration-300 
                      text-center group block transform hover:scale-105">
            <Github className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500 mx-auto mb-3 sm:mb-4 
                             group-hover:scale-110 transition-transform duration-300" />
            <h4 className="text-white text-base sm:text-lg font-bold mb-2 tracking-wide">GITHUB</h4>
            <p className="text-gray-400 text-xs sm:text-sm">Explore the codebase</p>
          </a>
          
          <a href="https://discord.gg/stackpay" 
             className="bg-gray-900/40 border border-orange-500/20 p-4 sm:p-6 rounded-xl sm:rounded-2xl 
                      hover:border-orange-500/60 hover:bg-gray-900/50 transition-all duration-300 
                      text-center group block transform hover:scale-105">
            <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500 mx-auto mb-3 sm:mb-4 
                                    group-hover:scale-110 transition-transform duration-300" />
            <h4 className="text-white text-base sm:text-lg font-bold mb-2 tracking-wide">DISCORD</h4>
            <p className="text-gray-400 text-xs sm:text-sm">Join our community</p>
          </a>
          
          <a href="mailto:support@stackpay.com" 
             className="bg-gray-900/40 border border-orange-500/20 p-4 sm:p-6 rounded-xl sm:rounded-2xl 
                      hover:border-orange-500/60 hover:bg-gray-900/50 transition-all duration-300 
                      text-center group block transform hover:scale-105 sm:col-span-2 md:col-span-1">
            <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500 mx-auto mb-3 sm:mb-4 
                           group-hover:scale-110 transition-transform duration-300" />
            <h4 className="text-white text-base sm:text-lg font-bold mb-2 tracking-wide">EMAIL</h4>
            <p className="text-gray-400 text-xs sm:text-sm">Get direct support</p>
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto">
          <div className="text-center p-3 sm:p-4">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-500 mb-1 sm:mb-2">100%</div>
            <div className="text-gray-400 text-xs sm:text-sm tracking-wide">OPEN SOURCE</div>
          </div>
          <div className="text-center p-3 sm:p-4">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-500 mb-1 sm:mb-2">0</div>
            <div className="text-gray-400 text-sm tracking-wide">API KEYS NEEDED</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-orange-500 mb-2">5</div>
            <div className="text-gray-400 text-sm tracking-wide">MINUTE SETUP</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-orange-500 mb-2">∞</div>
            <div className="text-gray-400 text-sm tracking-wide">POSSIBILITIES</div>
            </div>
          </div>
        </div>
      
      
      <footer className="mt-32 pt-16 border-t border-orange-500/20">
        <div className="section-container text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="text-orange-500 text-2xl font-bold tracking-wider">STACKPAY</span>
          </div>
          <p className="text-gray-500 text-sm tracking-wide">
            Built on Stacks • Powered by Bitcoin • Designed for the Future
          </p>
        </div>
      </footer>
    </section>
  );
};

export default GetStarted;