import { forElements } from '../core';
import { getProp } from '../dom';

export function watch (elements, prop, handler) {
  var request = {
      value: null
  };

  let watched = [];
  forElements(elements, (element) => {
    watched.push({
        element: element,
        prop: prop,
        value: getProp(element, prop)
    });
  });

  function update () {
      forEach(watched, (item) => {
        let value = getProp(item.element, item.prop);
        if (item.value != value) {
            handler.apply(item.element, item.prop, value);
        }
      })

      request.value = requestAnimationFrame(update);
  }

  return request;
}
