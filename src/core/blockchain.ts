import { Block } from './block';
import { Chain } from './chain';
import { Transaction } from './transaction';

export class Blockchain {
  private chain: Chain;

  constructor() {
    this.chain = new Chain([]);
  }

  getChain() {
    return this.chain.get();
  }

  createBlock() {
    const { previousHash } = this.chain.last();
    const block = new Block(previousHash);
    this.chain.add(block);

    return block;
  }

  addTransaction(transaction: Transaction) {
    if (this.validateTransaction(transaction)) {
      this.chain.last().addTransaction(transaction);
    }
  }

  getTransactionsByAddress(address: string) {
    return this.chain.get().map(block => block.getTransactionsByAddress(address)).flat();
  }

  replaceChain(otherChain: Chain) {
    if (otherChain.size() <= this.chain.size()){
        console.log('Recieved chain is not longer than the current chain');
        return;
    }

    if(!otherChain.validate()){
        console.log('Recieved chain is invalid');
        return;
    }
    
    this.chain = otherChain;
  }

  validateTransaction(transaction: Transaction) {
    if (transaction.amount >= this.getAddressAmount(transaction.from)) {
      return true;
    }

    return false;
  }

  getAddressAmount(address: string) {
    const transactions = this.getTransactionsByAddress(address);

    let amount = 0;
    for (const transaction of transactions) {
      if (transaction.to === address) {
        amount += transaction.amount;
      }
  
      if (transaction.from === address) {
        amount -= transaction.amount;
      }
    }

    return amount;
  }
}
