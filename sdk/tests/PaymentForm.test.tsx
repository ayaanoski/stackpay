import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { PaymentForm } from '../components/PaymentForm';

describe('PaymentForm', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it('renders all form fields correctly', () => {
    render(<PaymentForm onSubmit={mockOnSubmit} />);

    expect(screen.getByLabelText(/amount/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/recipient address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/note/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /pay now/i })).toBeInTheDocument();
  });

  it('shows validation errors for required fields', async () => {
    render(<PaymentForm onSubmit={mockOnSubmit} />);

    const submitButton = screen.getByRole('button', { name: /pay now/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/amount is required/i)).toBeInTheDocument();
      expect(screen.getByText(/recipient address is required/i)).toBeInTheDocument();
    });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('submits form with valid data', async () => {
    render(<PaymentForm onSubmit={mockOnSubmit} />);

    const amountInput = screen.getByLabelText(/amount/i);
    const recipientInput = screen.getByLabelText(/recipient address/i);
    const noteInput = screen.getByLabelText(/note/i);

    await userEvent.type(amountInput, '0.001');
    await userEvent.type(recipientInput, 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM');
    await userEvent.type(noteInput, 'Test payment');

    const submitButton = screen.getByRole('button', { name: /pay now/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        amount: 0.001,
        recipient: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
        note: 'Test payment',
      });
    });
  });

  it('shows loading state when isLoading prop is true', () => {
    render(<PaymentForm onSubmit={mockOnSubmit} isLoading={true} />);

    expect(screen.getByRole('button')).toHaveTextContent(/processing/i);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('pre-fills form with initialValues', () => {
    const initialValues = {
      amount: '0.001',
      recipient: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
      note: 'Test payment',
    };

    render(<PaymentForm onSubmit={mockOnSubmit} initialValues={initialValues} />);

    expect(screen.getByLabelText(/amount/i)).toHaveValue(0.001);
    expect(screen.getByLabelText(/recipient address/i)).toHaveValue(initialValues.recipient);
    expect(screen.getByLabelText(/note/i)).toHaveValue(initialValues.note);
  });
});
