import { Crypto } from './crypto';

export class Transaction {
  private timestamp = Date.now();

  constructor(
    public readonly from: string,
    public readonly to: string,
    public readonly amount: number,
  ) {}

  get fee() {
    return 0; // TODO add fee calculations
  }

  get json() {
    return {
      from: this.from,
      to: this.to,
      amount: this.amount,
      timestamp: this.timestamp,
      fee: this.fee,
    };
  }

  get hash() {
    return Crypto.hash(JSON.stringify(this.json));
  }

  refers(address: string) {
    return this.to === address || this.from === address;
  }
}
