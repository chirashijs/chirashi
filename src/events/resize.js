import { on } from './on';

export function resize (userCallback) {
  let callback = () => {
    userCallback({
      width: window.innerWidth,
      height: window.innerHeight
    });
  };

  on(window, 'resize', callback);

  return callback;
}
