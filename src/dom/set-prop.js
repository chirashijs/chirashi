import forElements from '../core/for-elements';
import forOf from '../core/for-of';

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

export default setProp;
