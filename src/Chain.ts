import * as Crypto from 'crypto';
import { Transaction } from './Transaction';
import { Block } from './Block';

interface IChain {
    chain: Block[];
    getLastBlock(): Block;
    mine(nonce: number): void;
    addBlock(transaction: Transaction, senderPublicKey: string, signature: Buffer): void;
}

/**
 * A chain of blocks
 * 
 */
export class Chain implements IChain {

    public chain: Block[];

    /**
     * Create a new chain with a genesis block
     * @param genesisBlock 
     */
    constructor(genesisBlock: Block) {
        this.chain = [genesisBlock]; // Add the genesis block to the chain
    }

    /**
     * Get the previous block on the chain
     * @return Block
     */
    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }

    /**
     * Implements the proof-of-work consensus mechanism
     * @param nonce 
     */
    mine(nonce: number) {
        let solution = 1;
        console.log('⛏️ Mining...');

        while (true) {
            const hash = Crypto.createHash('MD5'); // message digest algorithm
            hash.update((nonce + solution).toString()).end();

            const attempt = hash.digest('hex');

            if (attempt.substr(0, 4) === '0000') {
                console.log(`✅ Solved: ${solution}`);
                return solution;
            }

            solution += 1;
        }
    }

    addBlock(transaction: Transaction, senderPublicKey: string, signature: Buffer) {
        const verifier = Crypto.createVerify('SHA256');
        verifier.update(transaction.toString());

        // Check validity of public key and signature
        const isValid = verifier.verify(senderPublicKey, signature);

        // Add block if valid
        if (isValid) {
            const newBlock = new Block(this.getLastBlock().getHash(), transaction);
            this.mine(newBlock.nonce);
            this.chain.push(newBlock);
        } else {
            console.log('🚫 ERROR: Block is not valid...');
        }
    }
}