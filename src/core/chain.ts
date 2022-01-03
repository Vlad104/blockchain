import { Block } from './block';

export class Chain {
  constructor(private readonly chain: Block[]) {}

  get() {
    return this.chain;
  }

  add(block: Block) {
    this.chain.push(block);
  }

  size() {
    return this.chain.length;
  }

  last() {
    return this.chain[this.chain.length - 1];
  }

  validate() {
    return this.chain.every((block, index, chain) => {
      if (index === 0) {
        return true;
      }

      if (block.previousHash !== chain[index - 1].hash) {
        return false;
      }

      return true;
    });
  }
}