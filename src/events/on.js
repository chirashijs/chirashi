import forElements from '../core/for-elements'

/**
 * Bind events listener on each element of elements.
 * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
 * @param {string} events - The events that should be bound seperated with spaces
 * @param {function} callback - The callback used for event binding
 * @return {string | Array | NodeList | HTMLCollection} elements - The iterable for chaining
 */
export default function on (elements, events, callback) {
    events = events.split(' ')

    return forElements(elements, element => {
        if (!element.addEventListener) return

        let i = events.length
        while(i--) element.addEventListener(events[i], callback)
    })
}
