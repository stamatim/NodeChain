import * as Crypto from 'crypto';
import { Transaction } from './Transaction';
import { Block } from './Block';
import { Chain } from './Chain';
import { Wallet } from './Wallet';

/**
 * Example usage of the blockchain app
 */

// Create a genesis block
const genesisBlock = new Block('genesis', new Transaction(0, 'genesis', 'genesis'));

// Add genesis block to chain
const Blockchain = new Chain(genesisBlock);

// Create example users (wallets)
const user_one = new Wallet(Blockchain);
const user_two = new Wallet(Blockchain);
const user_three = new Wallet(Blockchain);

// Make some transactions
user_one.send(50, user_two.publicKey);
user_two.send(20, user_three.publicKey);
user_three.send(500, user_one.publicKey);

// Log output
console.log(Blockchain);
