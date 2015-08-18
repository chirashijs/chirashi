import { forEach } from '../core';

export function setData (elements, attributes) {
  let attributesName = Object.keys(attributes);

  forEach(elements, (element) => {
    if (!element.setAttribute) return;

    let i = attributesName.length, attributeName;
    while(i--) {
      attributeName = attributesName[i];
      element.setAttribute('data-'+attributeName, attributes[attributeName]);
    }
  });
}
