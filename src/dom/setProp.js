import { forElements } from '../core';

export function setProp (elements, props) {
  let propsName = Object.keys(props);

  forElements(elements, (element) => {
    let i = propsName.length, propName;
    while(i--) {
      propName = propsName[i];
      element[propName] = props[propName];
    }
  });
}
