export class Transaction {
  private timestamp = Date.now();

  constructor(
    public readonly from: string,
    public readonly to: string,
    public readonly amount: number
  ) {}

  toJson() {
    return {
      from: this.from,
      to: this.to,
      amount: this.amount,
      timestamp: this.timestamp,
    }
  }

  refers(address: string) {
    return this.to === address || this.from === address;
  }
}
