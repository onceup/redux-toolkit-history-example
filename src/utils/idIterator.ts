function* infiniteSequence() {
  let i = 2;
  while (true) {
    yield i++;
  }
}

export const idIterator = infiniteSequence();
