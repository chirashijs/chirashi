import { forElements } from '../core';
import { on } from './on';

export function undrag(elements, callbacks) {
  forElements(elements, (element) => {
    off(element, 'touchstart, mousedown', callbacks.begin);
    off(element, 'touchmove, mousemove', callbacks.move);
    off(document.body, 'touchend, mouseup', callbacks.end);
  });
}
