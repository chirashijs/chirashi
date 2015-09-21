import { forElements, getSelectorAll } from '../core';
import { on } from './on';
import { off } from './off';

export function load (elements, eachCallback, allCallback) {
  if (typeof elements == 'string') elements = getSelectorAll(elements);

  if (!elements || !elements.length) {
    if (allCallback) allCallback();

    return;
  }

  let n = {
    value: elements.length
  };

  let callback = (event) => {
    let element = event.currentTarget;

    off(element, 'load loadedmetadata', callback);

    if (eachCallback) eachCallback.apply(element);

    if (!(--n.value) && allCallback) allCallback();
  };

  forElements(elements, (element) => {
    if (element.naturalWidth || element.loadedmetadata) {
      callback(element);
    }
    else {
      on(element, 'load loadedmetadata', callback.bind(element));
    }
  });
}
