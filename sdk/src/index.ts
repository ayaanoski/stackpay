import { 
  StacksNetwork, 
  StacksTestnet,
  StacksMainnet
} from '@stacks/network';
import { 
  openContractCall, 
  showConnect,
  UserData 
} from '@stacks/connect';
import {
  AnchorMode,
  ContractCallOptions,
  PostConditionMode,
  stringUtf8CV,
  uintCV,
  principalCV,
  noneCV
} from '@stacks/transactions';

// Types and Interfaces
export interface StackPayConfig {
  appName?: string;
  network?: 'mainnet' | 'testnet';
  contractAddress?: string;
  contractName?: string;
}

export interface PaymentLinkOptions {
  recipient: string;
  amount: number;
  memo?: string;
  redirectUrl?: string;
  cancelUrl?: string;
}

export interface PaymentOptions extends PaymentLinkOptions {
  onSuccess?: (txId: string) => void;
  onError?: (error: Error) => void;
  onCancel?: () => void;
}

export interface TransactionRecord {
  txId: string;
  sender: string;
  recipient: string;
  amount: number;
  timestamp: number;
  memo?: string;
  status: 'pending' | 'success' | 'failed';
}

// Export UI components
export * from './components/StackPayCheckout';

export class StackPay {
  private network: StacksNetwork;
  private appName: string;
  private contractAddress: string;
  private contractName: string;
  private userData: UserData | null = null;

  constructor(config?: StackPayConfig) {
    this.appName = config?.appName || 'StackPay';
    this.network = config?.network === 'mainnet' 
      ? new StacksMainnet() 
      : new StacksTestnet();
    this.contractAddress = config?.contractAddress || 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';
    this.contractName = config?.contractName || 'stackpay-gateway';
  }

  async connectWallet(): Promise<UserData> {
    return new Promise((resolve, reject) => {
      showConnect({
        appDetails: {
          name: this.appName,
          icon: window.location.origin + '/logo.png',
        },
        onFinish: (userData) => {
          this.userData = userData;
          resolve(userData);
        },
        onCancel: () => {
          reject(new Error('User cancelled wallet connection'));
        },
        userSession: this.userData || undefined,
      });
    });
  }

  createPaymentLink(options: PaymentLinkOptions): string {
    if (!this.isValidStacksAddress(options.recipient)) {
      throw new Error('Invalid recipient address');
    }

    if (options.amount <= 0) {
      throw new Error('Amount must be greater than 0');
    }

    const baseUrl = 'https://stackpay-app-testnet.com/checkout';
    const params = new URLSearchParams({
      recipient: options.recipient,
      amount: options.amount.toString(),
      ...(options.memo && { memo: options.memo }),
      ...(options.redirectUrl && { redirectUrl: options.redirectUrl }),
      ...(options.cancelUrl && { cancelUrl: options.cancelUrl })
    });

    return `${baseUrl}?${params.toString()}`;
  }

  async initiatePayment(options: PaymentOptions): Promise<string> {
    if (!this.userData) {
      throw new Error('Wallet not connected. Call connectWallet() first.');
    }

    if (!this.isValidStacksAddress(options.recipient)) {
      throw new Error('Invalid recipient address');
    }

    if (options.amount <= 0) {
      throw new Error('Amount must be greater than 0');
    }

    const functionArgs = [
      principalCV(options.recipient),
      uintCV(options.amount),
      options.memo ? stringUtf8CV(options.memo) : noneCV(),
    ];

    return new Promise((resolve, reject) => {
      void openContractCall({
        network: this.network,
        anchorMode: AnchorMode.Any,
        contractAddress: this.contractAddress,
        contractName: this.contractName,
        functionName: 'process-payment',
        functionArgs,
        postConditionMode: PostConditionMode.Allow,
        onFinish: (data) => {
          options.onSuccess?.(data.txId);
          resolve(data.txId);
        },
        onCancel: () => {
          options.onCancel?.();
          reject(new Error('Transaction cancelled by user'));
        },
      });
    });
  }

  private isValidStacksAddress(address: string): boolean {
    return /^S[PT][0-9A-Z]{38,}$/.test(address);
  }

  getWalletData(): UserData | null {
    return this.userData;
  }

  static satoshisToBTC(satoshis: number): number {
    return satoshis / 100000000;
  }

  static BTCToSatoshis(btc: number): number {
    return Math.floor(btc * 100000000);
  }
}

export class StackPay {
  private network: StacksNetwork;
  private appName: string;
  private contractAddress: string;
  private contractName: string;

  constructor(config?: StackPayConfig) {
    this.network = config?.network || new StacksTestnet();
    this.appName = config?.appName || 'StackPay';
    this.contractAddress = config?.contractAddress || 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM'; // Update with your contract address
    this.contractName = config?.contractName || 'stackpay-gateway';
  }

  /**
   * Connect to a Stacks wallet (Leather or Xverse)
   */
  async connectWallet(): Promise<void> {
    const connectOptions = {
      appDetails: {
        name: this.appName,
        icon: window.location.origin + '/logo.png',
      },
      onFinish: () => {
        // Callback when wallet connection is successful
      },
      onCancel: () => {
        // Callback when wallet connection is cancelled
      },
    };

    await showConnect(connectOptions);
  }

  /**
   * Generate a payment link for merchants
   * @param recipient - Merchant's Stacks address
   * @param amount - Amount in satoshis
   * @param memo - Optional payment memo
   */
  createPaymentLink(recipient: string, amount: number, memo?: string): string {
    const baseUrl = 'https://stackpay-app-testnet.com/checkout';
    const params = new URLSearchParams({
      recipient,
      amount: amount.toString(),
      ...(memo && { memo }),
    });

    return `${baseUrl}?${params.toString()}`;
  }

  /**
   * Initiate an sBTC payment
   * Note: The recipient address acts as the merchant's "API key" in this decentralized system.
   * No centralized API keys are needed as the blockchain handles authentication.
   * 
   * @param recipient - Merchant's Stacks address (acts as API key)
   * @param amount - Amount in satoshis
   * @param memo - Optional payment memo
   */
  async initiatePayment(recipient: string, amount: number, memo?: string): Promise<string> {
    const functionArgs = [
      principalCV(recipient),
      uintCV(amount),
      memo ? stringUtf8CV(memo) : noneCV(),
    ];

    return new Promise((resolve, reject) => {
      void openContractCall({
        network: this.network,
        anchorMode: AnchorMode.Any,
        contractAddress: this.contractAddress,
        contractName: this.contractName,
        functionName: 'process-payment',
        functionArgs,
        postConditionMode: PostConditionMode.Allow,
        onFinish: (data) => {
          console.log('Transaction submitted:', data);
          resolve(data.txId);
        },
        onCancel: () => {
          reject(new Error('Transaction cancelled by user'));
        },
      });
    });
  }
}
