export function createElement (string) {
  let temp = document.createElement('div');
  temp.innerHTML = string;
  return temp.firstChild;
}
