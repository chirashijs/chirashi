import deepClone from './deepClone'

export function defaultify (options, defaults) {
  let keys = Object.keys(defaults),
  newOptions = deepClone(options);

  for (let i = keys.length-1; i >= 0; --i) {
    let key = keys[i]

    if(typeof options[key] === 'undefined')
      newOptions[key] = defaults[key];
  }

  return newOptions;
}
