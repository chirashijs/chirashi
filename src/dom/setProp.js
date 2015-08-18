import forEach from '../core/forEach';

export function setProp (elements, props) {
  let propsName = Object.keys(props);

  forEach(elements, (element) => {
    let i = propsName.length, propName;
    while(i--) {
      propName = propsName[i];
      element[propName] = props[propName];
    }
  });
}
