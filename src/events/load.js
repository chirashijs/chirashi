import forEach     from '../core/for-each'
import getElements from '../core/get-elements'
import on          from './on'
import off         from './off'

/**
 * Bind hover listener on each element of elements.
 * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
 * @param {function} eachCallback - The callback on each load event
 * @param {function} allCallback - The callback when all elements have been loaded
 * @param {bool} [once] = true - Trigger only once for each media if true
 * @param {bool} [testSrc] = true - If true callback will be called with error when an element doesn't have src
 * @return {object} offObject - An object with off method for unbinding
 */
export default function load (elements, eachCallback, allCallback, once = true, testSrc = true) {
    elements = getElements(elements)

    if (!elements || elements.length == 0) {
        if (allCallback) allCallback()

        return
    }

    let n = {
        value: elements.length
    }

    callback = (event, element, error) => {
        if (event) {
            element = event.target
            if (event.type == 'error') error = event
        }

        if (once)
            off(element, 'load loadedmetadata error', callback)

        if (eachCallback) eachCallback(element, error)

        if (!(--n.value) && allCallback) allCallback()
    }

    forEach(elements, element => {
        if (testSrc && !element.src)
            callback(null, element, 'image without src')
        else if (element.naturalWidth || element.loadedmetadata)
            callback(null, element, null)
        else
            on(element, 'load loadedmetadata error', callback)
    })

    return {
        off() {
            forEach(elements, element => off(element, 'load loadedmetadata error', callback))
        }
    }
}
