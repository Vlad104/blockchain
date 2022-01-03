import { Blockchain } from "./blockchain";
import { Transaction } from "./transaction";

export class Address {
  constructor(
    private readonly blockchain: Blockchain,
    private readonly address: string,
    private readonly sign: string,
  ) {}

  get transactions() {
    return this.blockchain.getChain().reduce((acc, block) => {
      return acc.concat(
        block.transactions.filter(transaction => transaction.refers(this.address))
      );
    }, [] as Transaction[]);
  }

  get amount() {
    return this.transactions.reduce((acc, transaction) => {
      if (transaction.to === this.address) {
        return acc + transaction.amount;
      }

      if (transaction.from === this.address) {
        return acc - transaction.amount - transaction.fee;
      }

      return acc;
    }, 0);
  }

  isSigned() {
    return !!this.sign; // TODO add crypto check
  }

  isValid(transaction: Transaction) {
    return this.amount >= (transaction.amount + transaction.fee);
  }

  send(transaction: Transaction) {
    if (!this.isSigned()) {
      throw new Error('is not permitted');
    }

    if (!this.isValid(transaction)) {
      throw new Error('not enought coins');
    }

    this.blockchain.addTransaction(transaction);
  }
}
