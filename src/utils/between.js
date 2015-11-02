export function between(value, min=0, max=1) {
  return isNaN(value) ? max : Math.min(Math.max(value, min), max);
}
