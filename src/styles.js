import * as Core from './core';

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

export function getStyle (element, property) {
  if (typeof element == 'string') element = Core.get(element);
  if (!element) return;

  let ret = getComputedStyle(element)[property];

  return (ret.indexOf('px') == -1) ? ret : parseInt(ret, 10);
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

  Core.forEach(elements, (element) => {
    if (!element.style) return;

    let i = properties.length, property, value;
    while(i--) {
      property = properties[i];
      element.style[property] = values[property];
    }
  });
}

export function style (elements, option) {
  if (typeof option == 'object') {
    setStyle(elements, option);
  }
  else if (typeof option == 'string') {
    return getStyle(elements, option);
  }
}

export function hide (elements) {
  Core.forEach(elements, (element) => {
    if (!element.style) return;

    element.style.display = 'none';
  });
}

export function show (elements) {
  Core.forEach(elements, (element) => {
    if (!element.style) return;

    element.style.display = '';
  });
}

export function getHeight (element) {
  if (typeof element == 'string') element = Core.get(element);

  return element && parseInt(getComputedStyle(element).height, 10);
}

export function setHeight (elements, height) {
  Core.forEach(elements, (element) => {
    if (typeof height == 'number') height += 'px';

    element.style.height = height;
  });
}

export function height (elements, height) {
  if (typeof height != 'undefined') {
    setHeight(elements, height);
  }
  else {
    return getHeight(elements);
  }
}

export function getWidth (element) {
  if (typeof element == 'string') element = Core.get(element);

  return element && parseInt(getComputedStyle(element).width, 10);
}

export function setWidth (elements, width) {
  Core.forEach(elements, (element) => {
    if (typeof width == 'number') width += 'px';

    element.style.width = width;
  });
}

export function width (elements, width) {
  if (typeof width != 'undefined') {
    setWidth(elements, width);
  }
  else {
    return getWidth(elements);
  }
}

export function getSize (element) {
  if (typeof element == 'string') element = Core.get(element);

  return element && {
    width: getWidth(element),
    height: getHeight(element)
  };
}

export function setSize (elements, width, height) {
  setWidth(elements, width);
  setHeight(elements, height);
}

export function size (elements, width, height) {
  if (typeof width != 'undefined' && typeof height != 'undefined') {
    setSize(elements, width, height);
  }
  else {
    return getSize(elements);
  }
}

export function transform (elements, options) {
    let properties = Object.keys(options),
        i = properties.length,
        matrix = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];
    while(i--) {
        let property = properties[i],
            value = options[property];

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

    let value = 'matrix3d('+matrix.join(',')+')';
    Core.forEach(elements, (element) => {
        if (!element.style) return;

        element.style['-ms-transform'] =
        element.style['-moz-transform'] =
        element.style['-o-transform'] =
        element.style['-webkit-transform'] =
        element.style.transform = value;
    });
}

export function offset (element) {
  if (typeof element == 'string') element = Core.get(element);
  if (!element) return;

  let rect = element.getBoundingClientRect()

  return {
    top: rect.top + document.body.scrollTop,
    left: rect.left + document.body.scrollLeft
  };
}

export function position (element) {
  if (typeof element == 'string') element = Core.get(element);

  return element && {
    top: element.offsetTop,
    left: element.offsetLeft
  };
}

export function screenPosition (element) {
  if (typeof element == 'string') element = Core.get(element);
  if (!element) return;

  let rect = element.getBoundingClientRect()

  return {
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    left: rect.left
  };
}
