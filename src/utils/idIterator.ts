function* infiniteSequence() {
  let i: number = 2;
  while (true) {
    yield i++;
  }
}

export const idIterator = infiniteSequence();
