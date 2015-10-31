import { forElements } from '../core';
import { on } from './on';

export function undrag(undragProperties) {
  forEach(undragProperties, (undragProperty) => {
    off(undragProperty.element, 'touchstart, mousedown', undragProperty.begin);
    off(document.body, 'touchmove, mousemove', undragProperty.move);
    off(document.body, 'touchend, mouseup', undragProperty.end);
  });
}
