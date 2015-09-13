import { forElements } from '../core';

function applyPropertyToMatrix (property, value, matrix) {
  switch (property) {
    case 'x':
    matrix[4] += value;
    break;

    case 'y':
    matrix[5] += value;
    break;

    case 'rotate':
    let cosValue = Math.cos(value),
    sinValue = Math.sin(value);
    matrix[0] *= cosValue;
    matrix[1] += sinValue;
    matrix[2] -= sinValue;
    matrix[3] *= cosValue;
    break;

    case 'scale':
    matrix[0] *= value;
    matrix[2] *= value;
    break;

    case 'scaleX':
    matrix[0] *= value;
    break;

    case 'scaleY':
    matrix[3] *= value;
    break;

    case 'skew':
    let tanValue = Math.tan(value);
    matrix[2] += value;
    matrix[1] += value;
    break;

    case 'skewX':
    matrix[2] += Math.tan(value);
    break;

    case 'skewY':
    matrix[1] += Math.tan(value);
    break;
  }
}

export function transform2d (elements, transformation) {
  let properties = Object.keys(transformation),
  i = properties.length,
  matrix = [
    1, 0,
    0, 1,
    0, 0
  ];
  while(i--) {
    let property = properties[i],
    value = transformation[property];

    if (typeof value == 'object') {
      let subProperties = Object.keys(value),
      j = subProperties.length;

      while (j--) {
        let subProperty = subProperties[j];
        applyPropertyToMatrix(property+subProperty.toUpperCase(), value[subProperty], matrix);
      }
    }
    else {
      applyPropertyToMatrix(property, value, matrix);
    }
  }

  matrix = 'matrix('+matrix.join(',')+')';

  const prefix = '-'+(Array.prototype.slice
    .call(window.getComputedStyle(document.documentElement, ''))
    .join('')
    .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
  )[1]+'-';

  forElements(elements, (element) => {
    if (!element.style) return;

    element.style[prefix+'transform'] = element.style.transform = matrix;
  });
}
