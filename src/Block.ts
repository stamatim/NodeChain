import * as Crypto from 'crypto';
import { Transaction } from './Transaction';

interface IBlock {
    previousHash: string;
    transaction: Transaction;
    timestamp: number;
    nonce: number;
    getHash(): string;
}

/**
 * A block on the blockchain
 * 
 * @param previousHash
 * @param transaction
 */
export class Block implements IBlock {

    public previousHash: string;
    public transaction: Transaction;
    public timestamp: number;
    public nonce: number;

    constructor(previousHash: string, transaction: Transaction) {
        this.previousHash = previousHash;
        this.transaction = transaction;
        this.timestamp = Date.now();
        this.nonce = Math.round(Math.random() * 999999999);
    }

    /**
     * Get the hash for the current block
     * @return string
     */
    getHash() {
        const str = JSON.stringify(this);
        const hash = Crypto.createHash('SHA256');
        hash.update(str).end()
        return hash.digest('hex');
    }
}