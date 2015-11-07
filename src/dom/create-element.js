export function createElement (string) {
  if (string.indexOf('<') == -1) string = `<${string}></${string}>`;

  let temp = document.createElement('div');
  temp.innerHTML = string;
  return temp.firstChild;
}

export default createElement;
