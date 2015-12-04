import forElements from '../core/for-elements';

const prefix = '-'+(Array.prototype.slice
  .call(window.getComputedStyle(document.documentElement, ''))
  .join('')
  .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
)[1]+'-';

function applyPropertyToMatrix (property, value, matrix) {
  switch (property) {
    case 'x':
    matrix[12] += value;
    break;

    case 'y':
    matrix[13] += value;
    break;

    case 'z':
    matrix[14] += value;
    break;

    case 'rotate':
    let cosValue = Math.cos(value),
    sinValue = Math.sin(value);
    matrix[0] *= cosValue;
    matrix[1] += sinValue;
    matrix[4] -= sinValue;
    matrix[5] *= cosValue;
    break;

    case 'rotateX':
    let cosValue2 = Math.cos(value),
    sinValue2 = Math.sin(value);
    matrix[5] *= cosValue2;
    matrix[6] += sinValue2;
    matrix[9] -= sinValue2;
    matrix[10] *= cosValue2;
    break;

    case 'rotateY':
    let cosValue3 = Math.cos(value),
    sinValue3 = Math.sin(value);
    matrix[0] *= cosValue3;
    matrix[2] -= sinValue3;
    matrix[8] += sinValue3;
    matrix[10] *= cosValue3;
    break;

    case 'rotateZ':
    let cosValue4 = Math.cos(value),
    sinValue4 = Math.sin(value);
    matrix[0] *= cosValue4;
    matrix[1] += sinValue4;
    matrix[4] -= sinValue4;
    matrix[5] *= cosValue4;
    break;

    case 'scale':
    matrix[0] *= value;
    matrix[5] *= value;
    break;

    case 'scaleX':
    matrix[0] *= value;
    break;

    case 'scaleY':
    matrix[5] *= value;
    break;

    case 'scaleZ':
    matrix[10] *= value;
    break;

    case 'skew':
    let tanValue = Math.tan(value);
    matrix[4] += value;
    matrix[1] += value;
    break;

    case 'skewX':
    matrix[4] += Math.tan(value);
    break;

    case 'skewY':
    matrix[1] += Math.tan(value);
    break;
  }
}

export function transform3d (elements, transformation) {
  let properties = Object.keys(transformation),
  i = properties.length,
  matrix = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
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

  matrix = 'matrix3d('+matrix.join(',')+')';

  forElements(elements, (element) => {
    if (!element.style) return;

    element.style[prefix+'transform'] = element.style.transform = matrix;
  });
}

export default transform3d
