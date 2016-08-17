import forElements from '../core/for-elements'
import getElements from '../core/get-elements'

/**
 * Trigger events on elements with data
 * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
 * @param {string} events - The events that should be tiggered seperated with spaces
 * @param {object} data - The events' data
 * @return {string | Array | NodeList | HTMLCollection} elements - The iterable for chaining
 */
export default function trigger (elements, events, data) {
    events = events.split(' ')
    let i = events.length

    elements = getElements(elements)

    while(i--) {
        let event = events[i]

        if (window.CustomEvent) {
            event = new CustomEvent(event, {detail: data})
        } else {
            event = document.createEvent('CustomEvent')
            event.initCustomEvent(event, true, true, data)
        }

        forEach(elements, element => {
            if (!element.dispatchEvent) return

            element.dispatchEvent(event)
        })
    }

    return elements
}
