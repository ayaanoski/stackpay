import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { CreditCard, Check, DollarSign, Bitcoin } from 'lucide-react';

const Demo: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [amount, setAmount] = useState('99.99');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(sectionRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      );
    }
  }, []);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setSuccess(true);
    setLoading(false);
  };

  const dummyTransactions = [
    { id: 1, amount: '299.99', status: 'Completed', time: '2 minutes ago', type: 'Payment' },
    { id: 2, amount: '149.99', status: 'Completed', time: '15 minutes ago', type: 'Payment' },
    { id: 3, amount: '599.99', status: 'Processing', time: '1 hour ago', type: 'Payment' },
  ];

  if (success) {
    return (
      <section id="demo" ref={sectionRef} className="min-h-screen pt-24 pb-16 bg-gray-950/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto text-center">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
              <Check className="w-10 h-10 text-green-500" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Payment Successful!</h2>
            <p className="text-gray-400 mb-8">Your payment of ${amount} has been processed successfully.</p>
            <button 
              onClick={() => setSuccess(false)}
              className="px-6 py-3 bg-orange-500 text-black rounded-lg font-semibold hover:bg-orange-400 transition-colors duration-200"
            >
              Make Another Payment
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="demo" ref={sectionRef} className="min-h-screen pt-24 pb-16 bg-gray-950/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-16">
          {/* Payment Form */}
          <div className="bg-gray-900/50 p-6 sm:p-8 rounded-2xl border border-orange-500/20">
            <h2 className="text-2xl sm:text-3xl font-bold text-orange-500 mb-6">Demo Payment</h2>
            <form onSubmit={handlePayment} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Amount</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-black/30 border border-orange-500/20 rounded-lg text-white 
                             focus:outline-none focus:border-orange-500 transition-colors duration-200"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">USD</div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Card Information</label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="4242 4242 4242 4242"
                    className="w-full pl-10 pr-4 py-3 bg-black/30 border border-orange-500/20 rounded-lg text-white 
                             focus:outline-none focus:border-orange-500 transition-colors duration-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Expiry</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full px-4 py-3 bg-black/30 border border-orange-500/20 rounded-lg text-white 
                             focus:outline-none focus:border-orange-500 transition-colors duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">CVC</label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full px-4 py-3 bg-black/30 border border-orange-500/20 rounded-lg text-white 
                             focus:outline-none focus:border-orange-500 transition-colors duration-200"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-orange-500 text-black rounded-lg font-semibold hover:bg-orange-400 
                           transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Bitcoin className="w-5 h-5" />
                      <span>Pay with StackPay</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Recent Transactions */}
          <div className="bg-gray-900/50 p-6 sm:p-8 rounded-2xl border border-orange-500/20">
            <h2 className="text-2xl sm:text-3xl font-bold text-orange-500 mb-6">Recent Transactions</h2>
            <div className="space-y-4">
              {dummyTransactions.map((tx) => (
                <div
                  key={tx.id}
                  className="p-4 bg-black/30 rounded-lg border border-orange-500/10 flex items-center justify-between"
                >
                  <div>
                    <div className="text-white font-medium">${tx.amount}</div>
                    <div className="text-sm text-gray-400">{tx.time}</div>
                  </div>
                  <div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium 
                                 ${tx.status === 'Completed' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'}`}>
                      {tx.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demo;
