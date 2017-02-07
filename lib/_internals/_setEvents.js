import getElements from '../core/getElements'
import forEach from '../core/forEach'
import forIn from '../core/forIn'
import _stringToArray from './_stringToArray'

function _setEvent (method, callback, event, element) {
  element[method](event, callback)
}

function _setEventOnEach (elements, method, callback, event) {
  forEach(elements, _setEvent.bind(null, method, callback, event))
}

function _setInput (elements, method, events, callback) {
  forEach(_stringToArray(events), _setEventOnEach.bind(null, elements, method, callback))
}

export default function _setEvents (elements, method, input) {
  method += 'EventListener'

  elements = getElements(elements)
  forIn(input, _setInput.bind(null, elements, method))

  return elements
}
