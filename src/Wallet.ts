import * as Crypto from 'crypto';
import { Transaction } from './Transaction';
import { Chain } from './Chain';

interface IWallet {
    blockchain: Chain; // The blockchain that the wallet will interact on
    publicKey: string; // The public key of the wallet
    privateKey: string; // The private key of the wallet
    send(amount: number, receiverPublicKey: string): void; // Make a transaction
}

/**
 * A wallet (user) that operates on the blockchain
 * 
 * @public publicKey 
 * @public privateKey
 */
export class Wallet implements IWallet {

    public blockchain: Chain;
    public publicKey: string;
    public privateKey: string;

    constructor(chain: Chain) {
        const keyPair = Crypto.generateKeyPairSync('rsa', {
          modulusLength: 2048,
          publicKeyEncoding: { type: 'spki', format: 'pem' },
          privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
        });
    
        this.blockchain = chain;
        this.privateKey = keyPair.privateKey;
        this.publicKey = keyPair.publicKey;
      }

    send(amount: number, receiverPublicKey: string) {
        // Create a new transaction 
        const transaction = new Transaction(amount, this.publicKey, receiverPublicKey);
        
        // Sign the transaction
        const sign = Crypto.createSign('SHA256');
        sign.update(transaction.toString()).end();

        // Update the signature
        const signature = sign.sign(this.privateKey);

        // Add the transaction to the blockchain
        this.blockchain.addBlock(transaction, this.publicKey, signature);
    }
}