export function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export function probability(n) {
  return !!n && Math.random() < n;
};