import { swap } from './utils';

export class BubbleSorter {
  constructor(array) {
    this.array = array;
    this.curr = 0;
    this.length = array.length - 1;
    this.done = false;
  }

  tick() {
    if (this.done) return;
    if (this.array[this.curr + 1] < this.array[this.curr]) {
      swap(this.array, this.curr + 1, this.curr);
    }
    this.incCurr();
  }

  incCurr() {
    this.curr++;

    if(this.curr + 1 > this.length) {
      this.length--;
      this.curr = 0;
    }

    if (this.length <= 0) {
      this.done = true;
    }
  }

  reset() {
    this.curr = 0;
    this.length = this.array.length;
  }
}
