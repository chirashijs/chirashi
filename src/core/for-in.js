export function forIn(object, callback, forceOrder = false) {
  if (typeof object != 'object') return

  let keys = Object.keys(object)

  if (!forceOrder) {
    let i = keys.length

    while(i--) {
      let key = keys[i]
      callback(key, object[key])
    }
  }
  else {
    let i = -1, len = keys.length
    while(++i < len) {
      let key = keys[i]
      callback(key, object[key])
    }
  }
}

export default forIn
