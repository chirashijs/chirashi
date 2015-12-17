export function range(value, min=0, max=1) {
  return isNaN(value) ? max : Math.min(Math.max(value, min), max);
}

export default between;
