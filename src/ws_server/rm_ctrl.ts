import { WebSocket, createWebSocketStream } from 'ws';
import { mouseUp, mouseDown, mouseLeft, mouseRight, mouseCircle, mouseGetPosition, rectangle } from './mouse';
// import { takeScreenshot } from './screen';

export const startControl = (ws: WebSocket): void => {
  console.log('Ws connetded:', !ws.isPaused);
  const ioStream = createWebSocketStream(ws, {
    decodeStrings: false,
    encoding: 'utf8',
  });

  let position;

  ioStream.on('data', async (message) => {
    try {
      console.log(message);
      const [command, ...data] = message.split(' ');

      switch (command) {
        case 'mouse_down':
          await mouseDown(+(data[0] ?? 0));
          break;
        case 'mouse_up':
          await mouseUp(+(data[0] ?? 0));
          break;
        case 'mouse_left':
          await mouseLeft(+(data[0] ?? 0));
          break;
        case 'mouse_right':
          await mouseRight(+(data[0] ?? 0));
          break;
        case 'mouse_position':
          position = await mouseGetPosition();
          ioStream.write(`mouse_position ${position.x},${position.y}`);
          break;
        case 'draw_circle':
          await mouseCircle(+(data[0] ?? 0));
          break;
        case 'draw_rectangle':
          await rectangle(+(data[0] ?? 0), +(data[1] ?? 0));
          break;
        case 'draw_square':
          await rectangle(+(data[0] ?? 0), +(data[0] ?? 0));
          break;
        case 'prnt_scrn':
          console.log('prnt_scrn');
          // takeScreenshot(ioStream);

          break;

        default:
          break;
      }
    } catch (error) {
      console.log('error: ', error);
    }
    // ioStream.write(`${command}`);
  });

  // ws.on('message', function message(data) {
  //   console.log('received: %s', data);
  // });
};
