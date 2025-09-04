import { StackPay } from '../src';

describe('StackPay SDK Utils', () => {
  describe('satoshisToBTC', () => {
    it('should correctly convert satoshis to BTC', () => {
      expect(StackPay.satoshisToBTC(100000000)).toBe(1);
      expect(StackPay.satoshisToBTC(50000000)).toBe(0.5);
      expect(StackPay.satoshisToBTC(1000)).toBe(0.00001);
    });
  });

  describe('BTCToSatoshis', () => {
    it('should correctly convert BTC to satoshis', () => {
      expect(StackPay.BTCToSatoshis(1)).toBe(100000000);
      expect(StackPay.BTCToSatoshis(0.5)).toBe(50000000);
      expect(StackPay.BTCToSatoshis(0.00001)).toBe(1000);
    });
  });
});

describe('StackPay SDK Core', () => {
  let stackpay: StackPay;

  beforeEach(() => {
    stackpay = new StackPay({
      appName: 'StackPay Test',
      network: 'testnet',
      contractAddress: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
      contractName: 'stackpay-gateway'
    });
  });

  describe('createPaymentLink', () => {
    it('should generate a valid payment link', () => {
      const options = {
        recipient: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
        amount: 1000000,
        memo: 'Test payment',
        redirectUrl: 'https://example.com/success',
        cancelUrl: 'https://example.com/cancel'
      };

      const link = stackpay.createPaymentLink(options);
      expect(link).toContain('stackpay-app-testnet.com/checkout');
      expect(link).toContain(`recipient=${options.recipient}`);
      expect(link).toContain(`amount=${options.amount}`);
      expect(link).toContain('memo=Test+payment');
      expect(link).toContain(`redirectUrl=${encodeURIComponent(options.redirectUrl)}`);
      expect(link).toContain(`cancelUrl=${encodeURIComponent(options.cancelUrl)}`);
    });

    it('should generate a payment link without optional parameters', () => {
      const options = {
        recipient: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
        amount: 1000000
      };

      const link = stackpay.createPaymentLink(options);
      expect(link).toContain('stackpay-app-testnet.com/checkout');
      expect(link).toContain(`recipient=${options.recipient}`);
      expect(link).toContain(`amount=${options.amount}`);
      expect(link).not.toContain('memo=');
      expect(link).not.toContain('redirectUrl=');
      expect(link).not.toContain('cancelUrl=');
    });

    it('should throw error for invalid recipient', () => {
      const options = {
        recipient: 'invalid-address',
        amount: 1000000
      };

      expect(() => stackpay.createPaymentLink(options)).toThrow('Invalid recipient address');
    });

    it('should throw error for invalid amount', () => {
      const options = {
        recipient: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
        amount: 0
      };

      expect(() => stackpay.createPaymentLink(options)).toThrow('Amount must be greater than 0');
    });
  });
});
