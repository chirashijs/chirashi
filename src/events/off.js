import forElements from '../core/forElements'

/**
 * Bind hover listener on each element of elements.
 * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
 * @param {string} events - The events that should be bound seperated with spaces
 * @param {function} callback - The callback used for event binding
 * @return {string | Array | NodeList | HTMLCollection} elements - The iterable for chaining
 */

function unbindEvents(element, events) {
    if (!element.removeEventListener || !('_cs-events' in element)) { return }

    events = events ? events.split(' ') : Object.keys(element['_cs-events'])

    let i = events.length
    while(i--) {
        const event = events[i]

        if (event in element['_cs-events'])
            unbindEvent(element, event)
    }
}

function unbindEvent(element, event) {
    element.removeEventListener(event, element['_cs-callback'])

    delete element['_cs-events'][event]
}

export default function off (elements, events, callback) {
    let traitment

    if (events && callback) {
        events = events.split(' ')
        
        traitment = element => {
            if (!element.removeEventListener || !('_cs-events' in element)) { return }

            let i = events.length
            while(i--) {
                const event = events[i]

                if (event in element['_cs-events']) {
                    element['_cs-events'][event].splice(element['_cs-events'][event].indexOf(callback), 1)

                    if (!element['_cs-events'][event].length)
                        unbindEvent(element, event)
                }
            }
        }
    }
    else {
        traitment = element => {
            unbindEvents(element, events)
        }
    }

    return forElements(elements, traitment)
}
