import forEach     from '../core/forEach'
import forElements from '../core/forElements'

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
        while(i--) {
            const event = events[i]

            if (!('_cs-events' in element)) {
                element['_cs-events'] = {}
            }

            if (!(event in element['_cs-events'])) {
                element['_cs-callback'] = (e) => {
                    const pool = element['_cs-events'][event]

                    let i = pool.length
                    while (i--) {
                        const poolCallback = pool[i]

                        setTimeout(function () {
                            poolCallback(e)
                        })
                    }
                }

                element.addEventListener(event, element['_cs-callback'])

                element['_cs-events'][event] = []
            }

            element['_cs-events'][event].push(callback)
        }
    })
}
