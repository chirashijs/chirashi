import { forElements } from '../core';
import { on } from './on';

export function drag(elements, move, begin, end) {
  forElements(elements, (element) => {
    let dragging = false;

    let callbacks = {};

    callbacks.begin = (e) => {
      e.preventDefault();
      e.stopPropagation();

      dragging = true;

      if (begin) begin({ x: e.pageX, y: e.pageY });
    };

    callbacks.move = (e) => {
      if (!dragging) return;

      e.preventDefault();
      e.stopPropagation();

      if (move) move({ x: e.pageX, y: e.pageY });
    };

    callbacks.end = (e) => {
      if (!dragging) return;

      e.preventDefault();
      e.stopPropagation();

      dragging = false;

      if (end) end({ x: e.pageX, y: e.pageY });
    };

    on(element, 'touchstart, mousedown', callbacks.begin);
    on(element, 'touchmove, mousemove', callbacks.move);
    on(document.body, 'touchend, mouseup', callbacks.end);

    return callbacks;
  });
}
