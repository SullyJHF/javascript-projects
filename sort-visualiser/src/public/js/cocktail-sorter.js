import { swap } from './utils';

export class CocktailSorter {
  constructor(array) {
    this.array = array;
    this.curr = 0;
    this.rightStop = array.length - 1;
    this.leftStop = 0;
    this.switched = 0;
    this.dir = 1;
    this.done = false;
  }

  tick() {
    if (this.done) return;
    if (this.leftStop >= this.rightStop) {
      this.done = true;
      return;
    }

    if (this.switched >= 2) {
      this.done = true;
      return;
    }

    if (this.array[this.curr + 1] < this.array[this.curr]) {
      swap(this.array, this.curr + 1, this.curr);
      this.switched = 0;
    }

    this.curr += this.dir;

    if (this.curr + this.dir < this.leftStop) {
      this.leftStop++;
      this.dir *= -1
      this.length--;
      this.switched++;
    }

    if (this.curr + this.dir > this.rightStop) {
      this.rightStop--;
      this.dir *= -1
      this.length--;
      this.switched++;
    }
  }

  reset() {
    this.curr = 0;
    this.length = this.array.length;
  }
}
