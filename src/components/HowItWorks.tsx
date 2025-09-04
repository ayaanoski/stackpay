import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link, Wallet, Shield, CheckCircle, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HowItWorks: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const flowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const steps = stepsRef.current?.querySelectorAll('.payment-step');
    
    if (steps) {
      gsap.fromTo(steps,
        { y: 100, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: stepsRef.current,
            start: "top 80%",
            end: "bottom 20%",
          }
        }
      );
    }

    // Animate the flow line
    if (flowRef.current) {
      gsap.fromTo(flowRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: flowRef.current,
            start: "top 90%",
          }
        }
      );
    }
  }, []);

  const steps = [
    {
      number: 1,
      title: "Payment Request",
      description: "Merchant generates a unique payment link or embeds the StackPay widget in their application",
      icon: Link,
      color: "from-orange-500 to-orange-600"
    },
    {
      number: 2,
      title: "Customer Checkout",
      description: "Customer views the payment interface with amount displayed in both sBTC and USD",
      icon: Globe,
      color: "from-orange-600 to-orange-700"
    },
    {
      number: 3,
      title: "Wallet Connection",
      description: "Customer connects their Stacks wallet (Leather or Xverse) and authorizes the transaction",
      icon: Wallet,
      color: "from-orange-700 to-orange-800"
    },
    {
      number: 4,
      title: "Blockchain Settlement",
      description: "Transaction is broadcasted to Stacks blockchain and confirmed on-chain",
      icon: Shield,
      color: "from-orange-800 to-orange-900"
    },
    {
      number: 5,
      title: "Confirmation",
      description: "Both merchant and customer receive real-time notifications of successful payment",
      icon: CheckCircle,
      color: "from-orange-900 to-orange-500"
    }
  ];

  return (
    <section id="how-it-works" ref={sectionRef} className="py-16 sm:py-24 md:py-32 bg-gray-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-orange-500 mb-4 sm:mb-6 md:mb-8 glow-effect tracking-wider">
            HOW IT WORKS
          </h2>
          <p className="text-gray-300 text-base sm:text-lg md:text-xl max-w-4xl mx-auto leading-relaxed tracking-wide px-4">
            Our mission is to make accepting Bitcoin payments as easy as using traditional payment processors. 
            By leveraging Stacks as Bitcoin Layer 2, we're building a trust-minimized, open-source payment 
            gateway that enables seamless sBTC transactions.
          </p>
        </div>

        {/* Payment Flow Visualization */}
        <div className="mb-12 sm:mb-16 md:mb-20">
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center text-orange-500 mb-8 sm:mb-12 md:mb-16 glow-effect tracking-wider">
            PAYMENT CYCLE
          </h3>
          
          {/* Desktop Flow */}
          <div className="hidden lg:block mb-16">
            <div className="relative px-8">
              <div ref={flowRef} className="absolute top-1/2 left-8 right-8 h-1 bg-gradient-to-r from-orange-500 to-orange-600 transform -translate-y-1/2 origin-left"></div>
              <div className="flex justify-between items-center relative z-10">
                {steps.map((step) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.number} className="flex flex-col items-center transform hover:scale-105 transition-transform duration-300">
                      <div className={`w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center mb-4 shadow-lg`}>
                        <Icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                      </div>
                      <div className="step-number text-orange-400 font-bold mb-2">{step.number}</div>
                      <h4 className="text-white text-sm font-bold text-center max-w-[120px] leading-tight">
                        {step.title}
                      </h4>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mobile/Tablet Cards */}
          <div ref={stepsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div 
                  key={step.number} 
                  className="payment-step p-4 sm:p-6 text-center bg-gray-900/30 rounded-xl border border-orange-500/20 
                           hover:border-orange-500/40 hover:bg-gray-900/40 transition-all duration-300"
                >
                  <div className="step-number text-orange-400 font-bold mb-2">
                    {step.number}
                  </div>
                  
                  <div className="mb-3 sm:mb-4">
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500 mx-auto" />
                  </div>
                  
                  <h4 className="text-white text-base sm:text-lg font-bold mb-2 sm:mb-4 tracking-wide">
                    {step.title}
                  </h4>
                  
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Key Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
          <div className="text-center p-4 sm:p-6 md:p-8 bg-gray-900/30 rounded-xl sm:rounded-2xl border border-orange-500/20 
                       hover:border-orange-500/50 hover:bg-gray-900/40 transition-all duration-300 transform hover:scale-105">
            <h4 className="text-orange-500 text-lg sm:text-xl font-bold mb-2 sm:mb-4 tracking-wide">NO CHARGEBACKS</h4>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              Bitcoin transactions are final and irreversible, eliminating chargeback fraud
            </p>
          </div>
          
          <div className="text-center p-4 sm:p-6 md:p-8 bg-gray-900/30 rounded-xl sm:rounded-2xl border border-orange-500/20 
                       hover:border-orange-500/50 hover:bg-gray-900/40 transition-all duration-300 transform hover:scale-105">
            <h4 className="text-orange-500 text-lg sm:text-xl font-bold mb-2 sm:mb-4 tracking-wide">LOW FEES</h4>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              Minimal transaction fees compared to traditional payment processors
            </p>
          </div>
          
          <div className="text-center p-4 sm:p-6 md:p-8 bg-gray-900/30 rounded-xl sm:rounded-2xl border border-orange-500/20 
                       hover:border-orange-500/50 hover:bg-gray-900/40 transition-all duration-300 transform hover:scale-105">
            <h4 className="text-orange-500 text-lg sm:text-xl font-bold mb-2 sm:mb-4 tracking-wide">GLOBAL ACCESS</h4>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              Accept payments from anywhere in the world without restrictions
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;