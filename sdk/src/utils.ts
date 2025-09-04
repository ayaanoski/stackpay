import { ContractCallOptions } from '@stacks/transactions';

/**
 * Parse amount from satoshis to BTC
 * @param satoshis Amount in satoshis
 */
export const satoshisToBTC = (satoshis: number): number => {
    return satoshis / 100000000;
};

/**
 * Parse amount from BTC to satoshis
 * @param btc Amount in BTC
 */
export const BTCToSatoshis = (btc: number): number => {
    return Math.floor(btc * 100000000);
};

/**
 * Validate Stacks address
 * @param address Stacks address to validate
 */
export const isValidStacksAddress = (address: string): boolean => {
    return address.startsWith('SP') || address.startsWith('ST');
};

/**
 * Format transaction options for contract calls
 * @param options Base contract call options
 */
export const formatTxOptions = (options: ContractCallOptions): ContractCallOptions => {
    return {
        ...options,
        sponsored: false,
    };
};
