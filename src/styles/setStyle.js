import { forEach } from '../core';

var unitLessAttributes = [
  'z-index',
  'font-weight',
  'line-height',
  'counter-reset',
  'counter-increment',
  'volume',
  'stress',
  'pitch-range',
  'richness',
  'opacity'
];

export function setStyle (elements, options) {
  let properties = Object.keys(options);

  let i = properties.length, property, value;
  while(i--) {
      property = properties[i];
      value = options[property];

      if (typeof value == 'number' && unitLessAttributes.indexOf(property) == -1)
        options[property] += 'px';
  }

  forEach(elements, (element) => {
    if (!element.style) return;

    let i = properties.length, property, value;
    while(i--) {
      property = properties[i];
      element.style[property] = options[property];
    }
  });
}
