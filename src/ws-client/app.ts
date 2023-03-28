import { client as WebSocketClient } from 'websocket';

const client = new WebSocketClient();

client.on('connectFailed', (error) => {
  console.log('Connect Error: ' + error.toString());
});

client.on('connect', (connection) => {
  console.log('WebSocket Client Connected');
    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });
    connection.on('close', () => {
        console.log('echo-protocol Connection Closed');
    });
    connection.on('message', (message) => {
        if (message.type === 'utf8') {
            console.log("Received: '" + message.utf8Data + "'");
        }
    });
})

client.connect('ws://localhost:3030/', 'echo-protocol');


