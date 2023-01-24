import { mouse, left, right, up, down, Point, Button, straightTo } from '@nut-tree/nut-js';

const { PI } = Math;

// const CIRCLE_STEP = 100;

export const mouseUp = async (points: number) => {
  await mouse.move(up(points));
};
export const mouseDown = async (points: number) => {
  await mouse.move(down(points));
};
export const mouseLeft = async (points: number) => {
  await mouse.move(left(points));
};
export const mouseRight = async (points: number) => {
  await mouse.move(right(points));
};
export const mouseGetPosition = async () => {
  return mouse.getPosition();
};

export const mouseCircle = async (radius: number) => {
  try {
    const cursorPos = await mouse.getPosition();
    const center: Point = { x: cursorPos.x + radius, y: cursorPos.y };
    // const step = radius / CIRCLE_STEP;

    const points: Point[] = [];
    // for (let i = -CIRCLE_STEP; i <= CIRCLE_STEP; i++) {
    //   const targetX = center.x + i * step;
    //   const targetY = center.y + Math.sqrt(radius ** 2 - (targetX - center.x) ** 2);
    //   points.push({ x: targetX, y: targetY });
    // }
    // for (let i = CIRCLE_STEP; i >= -CIRCLE_STEP; i--) {
    //   const targetX = center.x + i * step;
    //   const targetY = center.y - Math.sqrt(radius ** 2 - (targetX - center.x) ** 2);
    //   points.push({ x: targetX, y: targetY });
    // }
    for (let i = -PI / 2; i <= (PI * 3) / 2; i += 0.01) {
      // const rad = (i * Math.PI) / 180;

      const targetX = center.x + radius * Math.sin(i);
      const targetY = center.y + radius * Math.cos(i);
      points.push({ x: targetX, y: targetY });
    }
    points.push({ ...cursorPos });

    await mouse.pressButton(Button.LEFT);
    // await mouse.move(points);
    if (points.length > 0) {
      for (let i = 0; i < points.length; i++) {
        const target = points[i];
        if (target) {
          // await mouse.move(await straightTo(target));
          await mouse.move(straightTo(target));
          // const data = await straightTo(target);
        }
      }
    }
    await mouse.releaseButton(Button.LEFT);
  } catch (error) {
    console.log(error);
  }
};

export const rectangle = async (width: number, height: number) => {
  try {
    const cursorPos = await mouse.getPosition();
    console.log('cursorPos', cursorPos);

    // const points: Point[] = [{ ...cursorPos }];

    // points.push({ x: cursorPos.x + width, y: cursorPos.y });
    // points.push({ x: cursorPos.x + width, y: cursorPos.y - height });
    // points.push({ x: cursorPos.x, y: cursorPos.y - height });
    // points.push({ x: cursorPos.x, y: cursorPos.y });

    await mouse.pressButton(Button.LEFT);

    await mouse.move(right(width));
    await mouse.releaseButton(Button.LEFT);
    await mouse.pressButton(Button.LEFT);
    await mouse.move(down(height));
    await mouse.releaseButton(Button.LEFT);
    await mouse.pressButton(Button.LEFT);
    await mouse.move(left(width));
    await mouse.releaseButton(Button.LEFT);
    await mouse.pressButton(Button.LEFT);
    await mouse.move(up(height));
    // if (points.length > 0) {
    //   for (let i = 0; i < points.length; i++) {
    //     const target = points[i];
    //     if (target) {
    //       await mouse.move(await straightTo(target));
    //     }
    //   }
    // }

    await mouse.releaseButton(Button.LEFT);
  } catch (error) {
    console.log(error);
  }
};
