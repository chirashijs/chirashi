export function forOf(object, callback) {
  let keys = Object.keys(object),
      i = keys.length

  while(i--) {
    let key = keys[i]

    callback(key, object[key])
  }
}

export default forOf
