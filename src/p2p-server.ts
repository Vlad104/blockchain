import WebSocket from 'ws';
import { Blockchain } from './core/blockchain';

const P2P_PORT = parseInt(process.env.P2P_PORT) || 5001;
const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];

export class P2PServer {
  private sockets: WebSocket[] = [];

  constructor(private readonly blockchain: Blockchain) {}

  listen() {
    const server = new WebSocket.Server({ port: P2P_PORT });
    server.on('connection', socket => this.connectSocket(socket));
    this.connectToPeers();
    console.log(`Listening for peer to peer connection on port : ${P2P_PORT}`);
  }

  connectSocket(socket: WebSocket) {
    this.sockets.push(socket);
    console.log("Socket connected");
    this.messageHandler(socket);
    this.sendChain(socket);
  }

  connectToPeers() {
    peers.forEach((peer) => {
      const socket = new WebSocket(peer);
      socket.on('open', () => this.connectSocket(socket));
    });
  }

  messageHandler(socket: WebSocket) {
    socket.on('message', (message: string) => {
      const data = JSON.parse(message);
      console.log("data ", data);
      this.blockchain.replaceChain(data);
    });
  }

  sendChain(socket: WebSocket){
    socket.send(JSON.stringify(this.blockchain.getChain()));
  }

  syncChain(){
    this.sockets.forEach(socket =>{
        this.sendChain(socket);
    });
  }
}
