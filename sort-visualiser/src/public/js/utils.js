export function shuffle(a) {
  let temp = a;
  for (let i = temp.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [temp[i], temp[j]] = [temp[j], temp[i]];
  }
  return temp;
}

export function swap(a, i, j) {
  let x = a[i];
  a[i] = a[j];
  a[j] = x;
}
