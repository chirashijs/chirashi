import { forElements } from '../core';
import { on } from './on';
import { resize } from './resize';
import { width } from '../styles/width';

export function drag(elements, move, begin, end) {
  let undragProperties = [];

  forElements(elements, (element) => {
    let startPosition, elWidth, undragProperty = {}, dragging = false;

    undragProperty.element = element;

    undragProperty.resize = () => elWidth = width(element)
    resize(undragProperty.resize)
    undragProperty.resize()

    undragProperty.begin = (e) => {
      e.preventDefault();
      e.stopPropagation();

      if ('touches' in e && e.touches.length) e = e.touches[0];

      dragging = true;

      startPosition = { x: e.pageX, y: e.pageY };
      if (begin) begin(startPosition);
    };

    undragProperty.move = (e) => {
      if (!dragging) return;

      e.preventDefault();
      e.stopPropagation();

      if ('touches' in e && e.touches.length) e = e.touches[0];

      let currentPosition = { x: e.pageX, y: e.pageY }

      currentPosition.length = currentPosition.x - startPosition.x;
      currentPosition.ratio = (currentPosition.length / elWidth) * 10;

      if (move) move(currentPosition);
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
