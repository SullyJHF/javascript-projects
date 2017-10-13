import { swap } from './utils';

export class DoubleSelectionSorter {
  constructor(array) {
    this.array = array;
    this.startPtr = 0;
    this.curr = this.startPtr;
    this.min = this.startPtr;
    this.max = this.startPtr;
    this.endPtr = this.array.length - 1;
    this.done = false;
  }

  tick() {
    if (this.done) return;
    if (this.startPtr >= this.array.length - 1 || this.startPtr >= this.endPtr) {
      // call reset and reset all counters etc.
      this.done = true;
      this.reset();
      return;
    }

    if (this.array[this.curr] < this.array[this.min]) {
      this.min = this.curr;
    }

    if (this.array[this.curr] > this.array[this.max]) {
      this.max = this.curr
    }

    if (this.curr >= this.endPtr) {
      swap(this.array, this.min, this.startPtr++);
      if (this.array[this.min] < this.array[this.max]) {
        swap(this.array, this.max, this.endPtr--);
      }
      this.curr = this.min = this.max = this.startPtr;
    } else {
      this.curr++;
    }
  }

  reset() {
    this.startPtr = this.min = this.max = 0;
    this.endPtr = this.array.length - 1;
    this.curr = 0;
  }
}
