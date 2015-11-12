import { forEach, forElements } from '../core';
import { getProp } from '../dom';

export function watchProp (elements, prop, handler) {
  var watching = {
      value: true
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
      if (!watching.value) return;

      forEach(watched, (item) => {
        let value = getProp(item.element, item.prop);
        if (item.value != value) {
            item.value = value;
            handler.call(item.element, item.prop, value);
        }
      });

       requestAnimationFrame(update);
  }

  update();

  return watching;
}
