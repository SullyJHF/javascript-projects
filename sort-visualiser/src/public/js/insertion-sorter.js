import { swap } from './utils';

export class InsertionSorter {
  constructor(array) {
    this.array = array;
    this.rightPtr = 1;
    this.curr = 0;
    this.done = false;
  }

  tick() {
    if (this.done) return;
    if (this.rightPtr > this.array.length) {
      this.done = true;
      return;
    }

    if (this.array[this.curr] > this.array[this.curr + 1]) {
      swap(this.array, this.curr, this.curr + 1);
    } else {
      this.curr = this.rightPtr++;
    }

    this.curr--;
  }

  reset() {
    this.curr = 0;
    this.length = this.array.length;
  }
}
