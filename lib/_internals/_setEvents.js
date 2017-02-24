import getElements from '../core/getElements'
import forEach from '../core/forEach'
import forIn from '../core/forIn'
import _stringToArray from './_stringToArray'

function _setEvent (method, callback, options, event, element) {
  element[method](event, callback, options)
}

function _setEventOnEach (elements, method, callback, options, event) {
  forEach(elements, _setEvent.bind(null, method, callback, options, event))
}

function _setInput (elements, method, events, options) {
  let callback
  let passedOptions
  if (typeof options === 'function') {
    callback = options
    passedOptions = false
  } else {
    callback = options.handler
    passedOptions = {...options}
  }

  forEach(_stringToArray(events), _setEventOnEach.bind(null, elements, method, callback, passedOptions))
}

export default function _setEvents (elements, method, input) {
  method += 'EventListener'

  elements = getElements(elements)
  forIn(input, _setInput.bind(null, elements, method))

  return elements
}
