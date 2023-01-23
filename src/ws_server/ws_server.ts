import { WebSocketServer } from 'ws';
import { startControl } from './rm_ctrl';

const WS_PORT = 8080;

export const wss = new WebSocketServer({ port: WS_PORT });

wss.on('listening', () => console.log('WebSocketServer listening on port', WS_PORT));
wss.on('connection', startControl);

wss.on('close', () => {
  console.log('disconnected');
});
wss.on('error ', () => {
  console.log('error ');
});
