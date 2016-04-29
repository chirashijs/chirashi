import forElements from '../core/for-elements'
import on from './on'

/**
 * Bind drag listener on each element of elements.
 * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
 * @param {function} move - The move callback
 * @param {function} begin - The begin callback
 * @param {function} end - The end callback
 * @return {object} undragProperties - The object to pass to undrag for unbinding
 */
export default function drag(elements, move, begin, end) {
    let undragProperties = []

    forElements(elements, element => {
        let dragging = false

        let undragProperty = {
            element,

            begin(e) {
                e.preventDefault()
                e.stopPropagation()

                if ('touches' in e && e.touches.length) e = e.touches[0]

                dragging = true

                if (begin) begin({ x: e.pageX, y: e.pageY })
            },

            move(e) {
                if (!dragging) return

                e.preventDefault()
                e.stopPropagation()

                if ('touches' in e && e.touches.length) e = e.touches[0]

                if (move) move({ x: e.pageX, y: e.pageY })
            },

            end(e) {
                if (!dragging) return

                e.preventDefault()
                e.stopPropagation()

                if ('touches' in e && e.touches.length) e = e.touches[0]

                dragging = false

                if (end) end({ x: e.pageX, y: e.pageY })
            }
        }

        on(element, 'touchstart mousedown', undragProperty.begin)
        on(document.body, 'touchmove mousemove', undragProperty.move)
        on(document.body, 'touchend mouseup', undragProperty.end)
    })

    return undragProperties
}
