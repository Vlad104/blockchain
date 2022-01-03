import { Crypto } from './crypto';
import { Transaction } from './transaction';

export class Block {
  private timestamp = Date.now();
  public readonly transactions: Transaction[] = [];

  constructor(public readonly previousHash: string) {}

  get json() {
    return {
      timestamp: this.timestamp,
      transactions: this.transactions.map(transaction => transaction.json),
      previousHash: this.previousHash,
    };
  }

  get hash() {
    return Crypto.hash(JSON.stringify(this.json));
  }

  addTransaction(transaction: Transaction) {
    this.transactions.push(transaction);
  }
}
