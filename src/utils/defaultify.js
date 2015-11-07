import deepClone from './deep-clone'

export function defaultify (options, defaults) {
  if (typeof options == 'undefined' || options == null)
    return defaults;

  let keys = Object.keys(defaults),
  newOptions = deepClone(options);

  for (let i = keys.length-1; i >= 0; --i) {
    let key = keys[i]

    if(typeof options[key] === 'undefined')
      newOptions[key] = defaults[key];
  }

  return newOptions;
}

export default defaultify;
