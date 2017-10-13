import { swap } from './utils';

export class CocktailSorter {
  constructor(array) {
    this.array = array;
    this.reset();
    this.done = false;
  }

  tick() {
    if (this.done) return;
    if (this.leftPtr >= this.rightPtr || this.switched > 1) {
      this.done = true;
      this.reset();
      return;
    }

    if (this.array[this.curr + 1] < this.array[this.curr]) {
      swap(this.array, this.curr + 1, this.curr);
      this.switched = 0;
    }

    this.curr += this.dir;

    if (this.curr + this.dir < this.leftPtr) {
      this.leftPtr++;
      this.dir *= -1
      this.length--;
      this.switched++;
    }

    if (this.curr + this.dir > this.rightPtr) {
      this.rightPtr--;
      this.dir *= -1
      this.length--;
      this.switched++;
    }
  }

  reset() {
    this.curr = this.leftPtr = this.switched = 0;
    this.rightPtr = this.array.length - 1;
    this.dir = 1;
  }
}
