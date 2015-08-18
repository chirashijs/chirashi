import { on } from './on';

export function resize (callback) {
  on(window, 'resize', () => {
    callback({
      width: window.innerWidth,
      height: window.innerHeight
    });
  });
}
