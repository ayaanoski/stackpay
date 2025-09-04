import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { StackPayCheckout } from '../components/StackPayCheckout';
import { StackPay } from '../stackpay';

// Mock the StackPay SDK
jest.mock('../stackpay', () => ({
  StackPay: jest.fn().mockImplementation(() => ({
    initiatePayment: jest.fn().mockResolvedValue('mock-transaction-id'),
  })),
}));

describe('StackPayCheckout Integration', () => {
  const mockOnSuccess = jest.fn();
  const mockOnError = jest.fn();

  beforeEach(() => {
    mockOnSuccess.mockClear();
    mockOnError.mockClear();
  });

  it('successfully processes a payment', async () => {
    render(
      <StackPayCheckout
        appName="Test App"
        onSuccess={mockOnSuccess}
        onError={mockOnError}
      />
    );

    // Fill out the form
    await userEvent.type(screen.getByLabelText(/amount/i), '0.001');
    await userEvent.type(
      screen.getByLabelText(/recipient address/i),
      'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM'
    );
    await userEvent.type(screen.getByLabelText(/note/i), 'Test payment');

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /pay now/i }));

    await waitFor(() => {
      expect(mockOnSuccess).toHaveBeenCalledWith('mock-transaction-id');
      expect(mockOnError).not.toHaveBeenCalled();
    });
  });

  it('handles payment failure correctly', async () => {
    // Mock a failed payment
    const mockError = new Error('Payment failed');
    jest.spyOn(StackPay.prototype, 'initiatePayment')
      .mockRejectedValueOnce(mockError);

    render(
      <StackPayCheckout
        appName="Test App"
        onSuccess={mockOnSuccess}
        onError={mockOnError}
      />
    );

    // Fill out the form
    await userEvent.type(screen.getByLabelText(/amount/i), '0.001');
    await userEvent.type(
      screen.getByLabelText(/recipient address/i),
      'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM'
    );

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /pay now/i }));

    await waitFor(() => {
      expect(mockOnError).toHaveBeenCalledWith(mockError);
      expect(mockOnSuccess).not.toHaveBeenCalled();
    });
  });

  it('pre-fills form fields with provided props', () => {
    const initialValues = {
      amount: '0.001',
      recipient: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
      note: 'Test payment',
    };

    render(
      <StackPayCheckout
        appName="Test App"
        amount={initialValues.amount}
        recipient={initialValues.recipient}
        note={initialValues.note}
        onSuccess={mockOnSuccess}
        onError={mockOnError}
      />
    );

    expect(screen.getByLabelText(/amount/i)).toHaveValue(0.001);
    expect(screen.getByLabelText(/recipient address/i)).toHaveValue(initialValues.recipient);
    expect(screen.getByLabelText(/note/i)).toHaveValue(initialValues.note);
  });
});
