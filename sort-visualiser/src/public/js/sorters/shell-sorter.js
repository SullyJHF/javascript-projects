import { swap } from '../utils';

export class ShellSorter {
  constructor(array) {
    this.array = array;
    this.step = 1;
    while (this.step <= this.array.length / 3) {
      this.step = this.step * 3 + 1;
    }
    this.outer = this.step;

    this.curr = 0;
    this.done = false;
  }

  tick() {
    if (this.done) return;
    if (this.step <= 0) {
      this.done = true;
      return;
    }

    if (this.outer + 1 >= this.array.length) {
      this.step = (this.step - 1) / 3;
      this.outer = this.step;
      return this.tick();
    }

    if (this.curr > this.step - 1 && this.array[this.curr - this.step] >= this.array[this.outer]) {
      swap(this.array, this.curr, this.curr - this.step);
      this.curr -= this.step;
    } else {
      this.outer++;
      this.curr = this.outer;
    }
  }

  reset() {
    this.curr = 0;
    this.length = this.array.length;
  }
}
