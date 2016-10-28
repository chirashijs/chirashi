import forIn from '../core/forIn'

function _capitalize (input) {
  return input.slice(0, 1).toUpperCase() + input.slice(1)
}

export default function _flattenObject (object, defaults) {
  const flatten = {}

  forIn(object, (key, value) => {
    if (typeof value === 'object') {
      forIn(value, (subKey, subValue) => {
        flatten[key + _capitalize(subKey)] = subValue
      })
    } else {
      flatten[key] = value
    }
  })

  return {...defaults, ...flatten}
}
