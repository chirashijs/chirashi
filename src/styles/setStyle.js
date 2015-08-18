import forEach from '../core/forEach';

if (!unitLessAttributes) {
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
}

export function setStyle (elements, values) {
  let properties = Object.keys(values);

  let i = properties.length, property, value;
  while(i--) {
      property = properties[i];
      value = values[property];

      if (typeof value == 'number' && unitLessAttributes.indexOf(property) == -1)
        values[property] += 'px';
  }

  forEach(elements, (element) => {
    if (!element.style) return;

    let i = properties.length, property, value;
    while(i--) {
      property = properties[i];
      element.style[property] = values[property];
    }
  });
}
