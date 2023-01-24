import { screen, mouse, Point, Region } from '@nut-tree/nut-js';
import Jimp, { MIME_PNG } from 'jimp';

const ImageWidth = 200;
const ImageHeight = 200;

export const takeScreenshot = async () => {
  try {
    const cursor: Point = await mouse.getPosition();
    const startPos: Point = { x: cursor.x - ImageWidth / 2, y: cursor.y - ImageHeight / 2 };

    const realScreenWidth = await screen.width();
    const realScreenHeight = await screen.height();

    if (startPos.x <= 0 || startPos.x + ImageWidth >= realScreenWidth) {
      startPos.x = startPos.x <= 0 ? 0 : realScreenWidth - ImageWidth;
    }
    if (startPos.y <= 0 || startPos.y + ImageHeight >= realScreenHeight) {
      startPos.y = startPos.y <= 0 ? 0 : realScreenHeight - ImageWidth;
    }

    const region = new Region(startPos.x, startPos.y, 200, 200);

    const rawScr = await screen.grabRegion(region);
    const rgbScr = await rawScr.toRGB();

    const jimpImage = new Jimp({ data: rgbScr.data, width: ImageWidth, height: ImageHeight });

    // const buf = await jimpImage.getBase64Async(MIME_PNG);
    // const buf  = rgbScr.data.toString('base64');

    const buf = await jimpImage.getBufferAsync(MIME_PNG);

    return buf;
  } catch (error) {
    console.log(error);
    return null;
  }
};
