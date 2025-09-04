import React from 'react';
import { PaymentForm } from './components';
import { StackPay } from '@stackpay/sdk';

export interface StackPayCheckoutProps {
  /**
   * Your StackPay application name
   */
  appName: string;
  
  /**
   * Optional pre-filled amount
   */
  amount?: string;
  
  /**
   * Optional pre-filled recipient address
   */
  recipient?: string;
  
  /**
   * Optional pre-filled payment note
   */
  note?: string;
  
  /**
   * Optional callback when payment succeeds
   */
  onSuccess?: (txId: string) => void;
  
  /**
   * Optional callback when payment fails
   */
  onError?: (error: Error) => void;
  
  /**
   * Optional styles to apply to the container
   */
  className?: string;
}

export const StackPayCheckout: React.FC<StackPayCheckoutProps> = ({
  appName,
  amount,
  recipient,
  note,
  onSuccess,
  onError,
  className,
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const stackpay = React.useMemo(() => new StackPay({ appName }), [appName]);

  const handlePayment = React.useCallback(async (values: {
    amount: number;
    recipient: string;
    note?: string;
  }) => {
    try {
      setIsLoading(true);
      const txId = await stackpay.initiatePayment(
        values.recipient,
        values.amount,
        values.note
      );
      onSuccess?.(txId);
    } catch (error) {
      onError?.(error instanceof Error ? error : new Error('Payment failed'));
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [stackpay, onSuccess, onError]);

  return (
    <div className={className}>
      <PaymentForm
        onSubmit={handlePayment}
        initialValues={{
          amount: amount || '',
          recipient: recipient || '',
          note: note || '',
        }}
        isLoading={isLoading}
      />
    </div>
  );
};
