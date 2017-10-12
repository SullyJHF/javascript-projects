import { Loop } from './loop';
import { shuffle } from './utils';
import {
  WIDTH,
  HEIGHT
} from './constants';

import { ArrayVisualiser } from './array-visualiser';
import { BubbleSorter } from './bubble-sorter';
import { SelectionSorter } from './selection-sorter';
import { InsertionSorter } from './insertion-sorter';


let display = document.getElementById('display');
display.width = WIDTH;
display.height = HEIGHT;
let ctx = display.getContext('2d');

let loop = new Loop(250);


let array = shuffle([...Array(100).keys()]);

let sorter;
// sortType is passed in through index.ejs
switch(sortType) {
  case ('bubble'):
    sorter = new BubbleSorter(array);
    break;
  case ('selection'):
    sorter = new SelectionSorter(array);
    break;
  case ('insertion'):
    sorter = new InsertionSorter(array);
    break;
  default:
    sorter = new BubbleSorter(array);
}

let av = new ArrayVisualiser();

loop.start(tick, render);

function tick(delta) {
  sorter.tick();
}

function render() {
  ctx.clearRect(0, 0, display.width, display.height);

  if (av.done) loop.stop();
  av.render(ctx, sorter);
}
