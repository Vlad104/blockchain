import crypto from 'crypto';
import { Transaction } from './transaction';

export class Block {
  private timestamp = Date.now();
  private transactions: Transaction[] = [];
  private _hash: string;

  constructor(public readonly previousHash: string) {
    this._hash = this.toHash();
  }

  get hash() {
    return this._hash;
  }

  getTransactionsByAddress(address: string) {
    return this.transactions.filter(transaction => transaction.refers(address));
  }

  addTransaction(transaction: Transaction) {
    this.transactions.push(transaction);
  }

  toJson() {
    return {
      timestamp: this.timestamp,
      transactions: this.transactions.map(transaction => transaction.toJson()),
      previousHash: this.previousHash,
    };
  }

  toHash() {
    const data = JSON.stringify(this.toJson());

    return crypto.createHash('sha256').update(data).digest('hex');
  }
}
