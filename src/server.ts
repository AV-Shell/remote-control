import { httpServer } from './http_server/static';
import { wss } from './ws_server/ws_server';

const HTTP_PORT = 8181;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

process.on('SIGINT', () => {
  wss.clients.forEach((ws): void => {
    console.log('close ws');
    return ws.close();
  });
  wss.close(() => console.log('ws server close'));
  httpServer.close(() => console.log('httpServer close'));
  setTimeout(() => process.exit(0), 10);
});
