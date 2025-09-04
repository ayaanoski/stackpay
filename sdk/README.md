# @stackpay/sdk

A powerful and developer-friendly SDK for processing sBTC payments on the Stacks blockchain. This SDK provides seamless integration for accepting sBTC payments in your applications, featuring a modern and customizable payment interface.

[![npm version](https://img.shields.io/npm/v/@stackpay/sdk.svg)](https://www.npmjs.com/package/@stackpay/sdk)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 🎨 Modern, sleek payment interface
- 🌙 Dark mode by default
- 🔒 Secure sBTC payment processing
- 🔌 Easy wallet integration (Leather & Xverse)
- 🎯 Typed API with TypeScript support
- ⚡ Simple drop-in components
- 🔗 Payment link generation
- 📝 Transaction record keeping
- 💰 Built-in currency conversion utilities

## Installation

```bash
npm install @stackpay/sdk
# or
yarn add @stackpay/sdk
```

## Quick Start

### Using the UI Component

```typescript
import { StackPayCheckout } from "@stackpay/sdk";

function App() {
  const handleSuccess = (txId: string) => {
    console.log("Payment successful:", txId);
  };

  return <StackPayCheckout appName="My App" onSuccess={handleSuccess} />;
}
```

### Using the Core SDK

```typescript
import { StackPay } from "@stackpay/sdk";

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
  "Payment for order #123" // optional memo
);

// Process payment
try {
  const txId = await stackpay.initiatePayment(
    "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM", // recipient
    1000000, // amount in satoshis
    "Payment for order #123" // optional memo
  );
  console.log("Transaction ID:", txId);
} catch (error) {
  console.error("Payment failed:", error);
}
```

## UI Components

### StackPayCheckout

The `StackPayCheckout` component provides a complete, styled payment interface that you can drop into your React application.

#### Props

| Prop      | Type                   | Description                              |
| --------- | ---------------------- | ---------------------------------------- |
| appName   | string                 | Required. Your application name          |
| amount    | string                 | Optional. Pre-filled payment amount      |
| recipient | string                 | Optional. Pre-filled recipient address   |
| note      | string                 | Optional. Pre-filled payment note        |
| onSuccess | (txId: string) => void | Optional. Callback when payment succeeds |
| onError   | (error: Error) => void | Optional. Callback when payment fails    |
| className | string                 | Optional. Custom CSS classes             |

#### Styling

The UI components use Tailwind CSS. Add this to your application's CSS:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Update your `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@stackpay/sdk/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#FF6B00",
          // ... other shades
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
```

#### Example Usage

```tsx
import { StackPayCheckout } from "@stackpay/sdk";

function PaymentPage() {
  return (
    <div className="container mx-auto py-8">
      <StackPayCheckout
        appName="My App"
        amount="0.001"
        recipient="ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM"
        note="Payment for services"
        className="max-w-md mx-auto"
        onSuccess={(txId) => {
          console.log("Payment successful:", txId);
        }}
        onError={(error) => {
          console.error("Payment failed:", error);
        }}
      />
    </div>
  );
}
```

## Core API Reference

### StackPay Class

#### Constructor

```typescript
constructor(config?: StackPayConfig)
```

Configuration options:

- `appName`: Your application name (default: 'StackPay')
- `network`: Stacks network to use (default: testnet)
- `contractAddress`: Custom contract address
- `contractName`: Custom contract name

#### Methods

##### connectWallet()

Connects to a Stacks wallet (Leather or Xverse).

```typescript
async connectWallet(): Promise<void>
```

##### createPaymentLink()

Generates a payment URL that can be shared with customers.

```typescript
createPaymentLink(
  recipient: string,
  amount: number,
  memo?: string
): string
```

- `recipient`: Merchant's Stacks address
- `amount`: Payment amount in satoshis
- `memo`: Optional payment description

##### initiatePayment()

Processes an sBTC payment transaction.

```typescript
async initiatePayment(
  recipient: string,
  amount: number,
  memo?: string
): Promise<string>
```

- `recipient`: Payment recipient's Stacks address
- `amount`: Payment amount in satoshis
- `memo`: Optional payment description
- Returns: Transaction ID

### Utility Functions

#### satoshisToBTC()

Converts satoshis to BTC.

```typescript
function satoshisToBTC(satoshis: number): number;
```

#### BTCToSatoshis()

Converts BTC to satoshis.

```typescript
function BTCToSatoshis(btc: number): number;
```

#### isValidStacksAddress()

Validates a Stacks address.

```typescript
function isValidStacksAddress(address: string): boolean;
```

## Smart Contract Integration

The SDK interacts with the StackPay Gateway smart contract, which implements the following Clarity functions:

```clarity
;; Process payment
(define-public (process-payment
    (recipient principal)
    (amount uint)
    (memo (optional (string-utf8 256)))
    (sbtc-contract <sbtc-trait>))
    (response (buff 32) uint))
```

## Example Implementation

### Simple Payment Form

```typescript
import React, { useState } from "react";
import { StackPay } from "@stackpay/sdk";

const PaymentForm = () => {
  const [amount, setAmount] = useState("");
  const stackpay = new StackPay({ appName: "My Store" });

  const handlePayment = async () => {
    try {
      await stackpay.connectWallet();
      const txId = await stackpay.initiatePayment(
        "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
        parseInt(amount),
        "Test payment"
      );
      alert(`Payment successful! Transaction ID: ${txId}`);
    } catch (error) {
      alert("Payment failed: " + error.message);
    }
  };

  return (
    <div>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount in satoshis"
      />
      <button onClick={handlePayment}>Pay with sBTC</button>
    </div>
  );
};
```

## Security Considerations

1. **Input Validation**: Always validate recipient addresses using `isValidStacksAddress()`.
2. **Amount Handling**: Use the utility functions to handle conversions between BTC and satoshis.
3. **Error Handling**: Implement proper error handling for all SDK method calls.
4. **Network Selection**: Be explicit about network selection in production environments.

## Error Handling

The SDK throws specific errors that you should handle in your application:

```typescript
try {
  await stackpay.initiatePayment(recipient, amount);
} catch (error) {
  if (error.message.includes("User rejected")) {
    // Handle user rejection
  } else if (error.message.includes("Invalid address")) {
    // Handle invalid address
  } else {
    // Handle other errors
  }
}
```

## Testing

The SDK includes comprehensive tests. To run them:

```bash
npm test
```

To run tests in watch mode:

```bash
npm test -- --watch
```

## Development

1. Clone the repository:

```bash
git clone https://github.com/stackpay/stackpay-sdk.git
```

2. Install dependencies:

```bash
npm install
```

3. Build the package:

```bash
npm run build
```

4. Run tests:

```bash
npm test
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- Documentation: [https://docs.stackpay.com](https://docs.stackpay.com)
- Issues: [GitHub Issues](https://github.com/stackpay/stackpay-sdk/issues)
- Discord: [Join our community](https://discord.gg/stackpay)
- Email: support@stackpay.com

## Acknowledgments

- [Stacks Foundation](https://stacks.org)
- [sBTC Working Group](https://www.stacks.co/sbtc)
- [Hiro Systems](https://www.hiro.so)

## Roadmap

- [ ] Enhanced error handling and recovery
- [ ] Additional payment flow customization options
- [ ] More wallet integrations
- [ ] Advanced payment analytics
- [ ] Webhooks for payment notifications
- [ ] Multi-signature support
