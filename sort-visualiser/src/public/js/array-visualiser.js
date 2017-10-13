import { WIDTH, HEIGHT } from './constants';

export class ArrayVisualiser {
  constructor() {}

  render(ctx, sorter) {
    if (sorter.done) this.done = true;
    let min = Math.min(...sorter.array);
    let max = Math.max(...sorter.array);
    let range = max - min;
    
    ctx.save();

    for (let i = 0; i < sorter.array.length; i++) {
      ctx.fillStyle = sorter.curr === i ? 'red' : 'white';
      ctx.fillStyle = sorter.min === i ? '#0f0' : ctx.fillStyle;
      ctx.fillStyle = sorter.max === i ? '#0ff' : ctx.fillStyle;
      let width = WIDTH / sorter.array.length;
      let height = HEIGHT * (sorter.array[i] - min) / range;
      let x = i * width;
      let y = HEIGHT - height;
      ctx.fillRect(x, y, width, height);
    }
    ctx.restore();
  }

  // create a done function which will go up the array and fill in green or something
}
