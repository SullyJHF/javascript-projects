import { swap } from '../utils';

export class SelectionSorter {
  constructor(array) {
    this.array = array;
    this.reset();
    this.done = false;
  }

  tick() {
    if (this.done) return;
    if (this.start >= this.array.length - 1) {
      this.done = true;
      this.reset();
      return;
    }

    if (this.array[this.curr] < this.array[this.min]) {
      this.min = this.curr;
    }

    if (this.curr >= this.array.length - 1) {
      swap(this.array, this.min, this.start++);
      this.curr = this.min = this.start;
    } else {
      this.curr++;
    }
  }

  reset() {
    this.start = 0;
    this.curr = this.start;
    this.min = this.start;
  }
}
