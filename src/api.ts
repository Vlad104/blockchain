import express from 'express';
import { Address } from './core/address';
import { Blockchain } from './core/blockchain';
import { Transaction } from './core/transaction';
import { P2PServer } from './p2p-server';

const app = express();
app.use(express.json());
app.listen();

const blockchain = new Blockchain();
const p2pserver = new P2PServer(blockchain);

app.post('transactions', (req, res) => {
  const { from, to, amount, sign } = req.body;

  const address = new Address(blockchain, from, sign);
  address.send(new Transaction(from, to, amount));

  res.json({});
});

app.post('mine', (_req, res) => {
  const block = blockchain.createBlock();

  res.json(block.json);
});
