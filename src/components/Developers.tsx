import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Key, Zap, Package, Palette, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Developers: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const codeBlocksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const features = featuresRef.current?.querySelectorAll('.feature-card');
    const codeBlocks = codeBlocksRef.current?.querySelectorAll('.code-section');
    
    if (features) {
      gsap.fromTo(features,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 80%",
          }
        }
      );
    }

    if (codeBlocks) {
      gsap.fromTo(codeBlocks,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: codeBlocksRef.current,
            start: "top 80%",
          }
        }
      );
    }
  }, []);

  const features = [
    { icon: Palette, title: "Modern UI", description: "Sleek dark mode interface" },
    { icon: Shield, title: "Secure", description: "Built-in security best practices" },
    { icon: Package, title: "TypeScript", description: "Full type safety included" },
    { icon: Zap, title: "Fast Setup", description: "Drop-in React components" },
    { icon: Code, title: "Open Source", description: "Fully transparent codebase" },
    { icon: Key, title: "No API Keys", description: "Your Stacks address is your key" }
  ];

  return (
    <section id="developers" ref={sectionRef} className="py-16 sm:py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-orange-500 mb-4 sm:mb-6 md:mb-8 glow-effect tracking-wider">
            FOR DEVELOPERS
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-4 sm:mb-6 tracking-wide">
            Developer tools designed to be as simple as Stripe
          </p>
          <p className="text-base sm:text-lg text-gray-400 max-w-4xl mx-auto leading-relaxed px-4">
            Our SDK provides easy-to-use packages that abstract away blockchain complexity. 
            Everything is open-source and built with modern development practices.
          </p>
        </div>

        {/* Features Grid */}
        <div ref={featuresRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16 md:mb-20">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index} 
                className="feature-card bg-gray-900/40 border border-orange-500/20 p-4 sm:p-6 rounded-xl sm:rounded-2xl 
                         hover:border-orange-500/60 hover:bg-gray-900/50 transition-all duration-300 
                         text-center group transform hover:scale-105"
              >
                <Icon className="w-8 h-8 sm:w-12 sm:h-12 text-orange-500 mx-auto mb-3 sm:mb-4 
                               group-hover:scale-110 transition-transform duration-300" />
                <h4 className="text-white text-base sm:text-lg font-bold mb-2 tracking-wide">{feature.title}</h4>
                <p className="text-gray-400 text-xs sm:text-sm">{feature.description}</p>
              </div>
            );
          })}
        </div>

        <div ref={codeBlocksRef} className="space-y-12 sm:space-y-16 md:space-y-20">
          {/* Quick Start */}
          <div className="code-section">
            <div className="flex items-center mb-4 sm:mb-6 md:mb-8">
              <Package className="w-8 h-8 sm:w-10 sm:h-10 text-orange-500 mr-3 sm:mr-4" />
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-500 tracking-wider">QUICK START</h3>
            </div>
            
            <p className="text-gray-300 mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed">
              Get started with StackPay in minutes. Install the SDK and start accepting sBTC payments 
              with just a few lines of code.
            </p>
            
            <div className="code-block p-8">
              <pre className="text-sm text-gray-300 overflow-x-auto">
{`// Install the SDK
npm install @stackpay/sdk

// React Component Usage
import { StackPayCheckout } from "@stackpay/sdk";

function App() {
  const handleSuccess = (txId: string) => {
    console.log("Payment successful:", txId);
  };

  return (
    <StackPayCheckout 
      appName="My Store" 
      onSuccess={handleSuccess} 
    />
  );
}`}
              </pre>
            </div>
          </div>

          {/* Core SDK */}
          <div className="code-section">
            <div className="flex items-center mb-8">
              <Code className="w-10 h-10 text-orange-500 mr-4" />
              <h3 className="text-3xl md:text-4xl font-bold text-orange-500 tracking-wider">CORE SDK</h3>
            </div>
            
            <p className="text-gray-300 mb-8 text-lg leading-relaxed">
              Use the core SDK for custom implementations. Handle wallet connections, 
              payment processing, and transaction monitoring with full control.
            </p>
            
            <div className="code-block p-8">
              <pre className="text-sm text-gray-300 overflow-x-auto">
{`import { StackPay } from "@stackpay/sdk";

// Initialize StackPay
const stackpay = new StackPay({
  appName: "Your App Name",
  network: "testnet", // or 'mainnet'
});

// Connect wallet
await stackpay.connectWallet();

// Generate payment link
const paymentLink = stackpay.createPaymentLink(
  "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM", // recipient
  1000000, // amount in satoshis
  "Order #12345" // optional memo
);

// Process payment
const txId = await stackpay.initiatePayment(
  "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  1000000,
  "Payment for order #123"
);`}
              </pre>
            </div>
          </div>

          {/* Decentralized Authentication */}
          <div className="code-section">
            <div className="flex items-center mb-8">
              <Key className="w-10 h-10 text-orange-500 mr-4" />
              <h3 className="text-3xl md:text-4xl font-bold text-orange-500 tracking-wider">NO API KEYS</h3>
            </div>
            
            <p className="text-gray-300 mb-8 text-lg leading-relaxed">
              Your Stacks address serves as your decentralized API key. No traditional API keys needed - 
              your on-chain identity is fully verifiable and secure by design.
            </p>
            
            <div className="code-block p-8">
              <pre className="text-sm text-gray-300 overflow-x-auto">
{`// Your Stacks address is your "API Key"
const merchantAddress = 'ST1XJ6A...YourStacksAddress...W9R6M';

// Verify payments by checking the blockchain
const transaction = await hiroAPI.getTxStatus('tx_id_hash');

if (transaction.recipient === merchantAddress && 
    transaction.status === 'success') {
  console.log('Payment Confirmed!');
  // Process order fulfillment
}`}
              </pre>
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div className="mt-20">
          <h3 className="text-3xl md:text-4xl font-bold text-center text-orange-500 mb-12 glow-effect tracking-wider">
            USE CASES
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900/40 border border-orange-500/20 p-8 rounded-2xl hover:border-orange-500/60 transition-all duration-300 text-center group">
              <div className="w-16 h-16 bg-orange-500/20 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-500/30 transition-colors duration-300">
                <span className="text-orange-500 text-2xl">🛒</span>
              </div>
              <h4 className="text-white text-xl font-bold mb-4 tracking-wide">E-COMMERCE</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Power online stores with trust-minimized payments, eliminating chargebacks and fraud
              </p>
            </div>
            
            <div className="bg-gray-900/40 border border-orange-500/20 p-8 rounded-2xl hover:border-orange-500/60 transition-all duration-300 text-center group">
              <div className="w-16 h-16 bg-orange-500/20 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-500/30 transition-colors duration-300">
                <span className="text-orange-500 text-2xl">🎨</span>
              </div>
              <h4 className="text-white text-xl font-bold mb-4 tracking-wide">DIGITAL CONTENT</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Accept payments for NFTs, digital art, subscriptions, and premium content
              </p>
            </div>
            
            <div className="bg-gray-900/40 border border-orange-500/20 p-8 rounded-2xl hover:border-orange-500/60 transition-all duration-300 text-center group">
              <div className="w-16 h-16 bg-orange-500/20 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-500/30 transition-colors duration-300">
                <span className="text-orange-500 text-2xl">🔄</span>
              </div>
              <h4 className="text-white text-xl font-bold mb-4 tracking-wide">SUBSCRIPTIONS</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Implement recurring payments using smart contract functionality
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Developers;