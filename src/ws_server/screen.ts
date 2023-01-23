import { screen, mouse, Point, Region } from '@nut-tree/nut-js';
import { Duplex } from 'stream';

export const takeScreenshot = async (myStream: Duplex) => {
  try {
    const cursor: Point = await mouse.getPosition();
    const region = new Region(cursor.x, cursor.y, 200, 200);

    const rawScr = await screen.grabRegion(region);
    const rgbScr = await rawScr.toRGB();

    myStream.write(rgbScr.data.toString('base64'));
  } catch (error) {
    console.log(error);
  }
};
