import express from 'express';
import { AddressInfo, WebSocketServer, WebSocket } from 'ws';
import * as http from 'http';

const app = express();
const httpPort = 3030;

const server = http.createServer(app);
const wss = new WebSocketServer({ server });


wss.on('connection', (ws, req) => {
  const clientIp = req.socket.remoteAddress;
  console.log(`Client connected! - ${clientIp}`);

  ws.on('error', console.error);

  ws.on('message', (data) => {
    console.log(`received ${data}`);
    ws.send(`Hello, you sent -> ${data}`);
  });

  ws.on('close', () => {
    console.log('client disconnected');
  });

  ws.send('Hi there, I am a WebSocket server');
});


app.get('/', (req, res) => {
  res.send(`Hello World! I have ${wss.clients.size} websocket clients connected`);
});


setInterval(() => { 
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(`Servertime: ${new Date().toString()}`);
    }
  });
}, 1000)

//start our server
server.listen(httpPort, () => {
  console.log(`Server started on port ${(server.address() as AddressInfo).port} :)`);
});
