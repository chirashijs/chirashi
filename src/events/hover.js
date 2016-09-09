import forElements from '../core/forElements'
import on          from './on'

/**
 * Bind hover listener on each element of elements.
 * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
 * @param {function} enter - The enter callback
 * @param {function} leave - The leave callback
 * @return {object} offObject - An object with off method for unbinding
 */
export default function hover (elements, enter, leave) {
    forElements(elements, element => {
        if (enter) on(element, 'mouseenter', enter)
        if (leave) on(element, 'mouseleave', leave)
    })

    return {
        off() {
            forElements(elements, element => {
                if (enter) off(element, 'mouseenter', enter)
                if (leave) off(element, 'mouseleave', leave)
            })
        }
    }
}
