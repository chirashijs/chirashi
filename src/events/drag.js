import { forElements } from '../core';
import { on } from './on';

export function drag(elements, move, begin, end) {
  let undragProperties = [];

  forElements(elements, (element) => {
    let undragProperty = {}, dragging = false;

    undragProperty.element = element;

    undragProperty.begin = (e) => {
      e.preventDefault();
      e.stopPropagation();

      if ('touches' in e && e.touches.length) e = e.touches[0];

      dragging = true;

      if (begin) begin({ x: e.pageX, y: e.pageY });
    };

    undragProperty.move = (e) => {
      if (!dragging) return;

      e.preventDefault();
      e.stopPropagation();

      if ('touches' in e && e.touches.length) e = e.touches[0];

      if (move) move({ x: e.pageX, y: e.pageY });
    };

    undragProperty.end = (e) => {
      if (!dragging) return;

      e.preventDefault();
      e.stopPropagation();

      if ('touches' in e && e.touches.length) e = e.touches[0];

      dragging = false;

      if (end) end({ x: e.pageX, y: e.pageY });
    };

    on(element, 'touchstart, mousedown', undragProperty.begin);
    on(document.body, 'touchmove, mousemove', undragProperty.move);
    on(document.body, 'touchend, mouseup', undragProperty.end);
  });

  return undragProperties;
}
