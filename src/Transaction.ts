interface ITransaction {
    amount: number; // Transaction amount
    sender: string; // Payer wallet
    receiver: string; // Payee wallet
    toString(): string;
}

/**
 * A transaction on the blockchain
 * @param amount
 * @param sender
 * @param receiver
 */
export class Transaction implements ITransaction {

    public amount: number;
    public sender: string;
    public receiver: string;

    constructor(amount: number, sender: string, receiver: string) {
        this.amount = amount;
        this.sender = sender;
        this.receiver = receiver;
    }

    /**
     * Convert this Transaction object to a string
     */
    toString() {
        return JSON.stringify(this);
    }
}