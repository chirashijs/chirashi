import forEach from '../core/forEach'
import forElements from '../core/forElements'
import forIn from '../core/forIn'
import _stringToArray from './_stringToArray'

export default function _setEvents (elements, method, input) {
  method += 'EventListener'

  return forElements(elements, element => {
    forIn(input, (events, callback) => {
      forEach(_stringToArray(events), event => element[method](event, callback))
    })
  })
}
