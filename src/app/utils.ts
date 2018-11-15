export function padArray(array, size) {
  const padItems = Array.from(Array(size)).map(item => []);
  return array.concat(padItems).slice(0, size);
}
