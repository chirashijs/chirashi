import { forElements, getSelectorAll } from '../core';
import { on } from './on';
import { off } from './off';

export function load (elements, eachCallback, allCallback) {
  if (typeof elements == 'string') elements = getSelectorAll(elements);

  if (!elements || elements.length == 0) {
    if (allCallback) allCallback();

    return;
  }

  let n = {
    value: elements.length
  };

  let callback = function (event, element, error) {
    if (event) {
        element = event.target;
        if (event.type == 'error') error = event;
    }

    off(element, 'load loadedmetadata error', callback);

    if (eachCallback) eachCallback(element, error);

    if (!(--n.value) && allCallback) allCallback();
  };

  forElements(elements, (element) => {
    if (element.tagName == 'IMG' && !element.src) {
        callback(null, element, 'image without src');
    }
    else if (element.naturalWidth || element.loadedmetadata) {
      callback(null, element, null);
    }
    else {
      on(element, 'load loadedmetadata error', callback);
    }
  });
}
