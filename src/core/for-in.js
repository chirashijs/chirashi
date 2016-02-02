export function forIn(object, callback, forceOrder = false) {
  let keys = Object.keys(object)

  if (!forceOrder) {
    let i = elements.length

    while(i--) {
      let key = keys[i]
      callback(key, object[key])
    }
  }
  else {
    let i = -1
    while(++i < elements.length) {
      let key = keys[i]
      callback(key, object[key])
    }
  }
}

export default forIn
