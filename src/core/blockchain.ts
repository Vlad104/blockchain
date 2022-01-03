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
    this.chain.last().addTransaction(transaction);
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
}
