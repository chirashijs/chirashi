import forEach from '../core/forEach'
import forElements from '../core/forElements'
import on from './on'
import off from './off'

/**
 * Bind drag listener on each element of elements.
 * @param {string | Array | NodeList | HTMLCollection | HTMLElement | SVGElement} elements - The iterable, selector or elements.
 * @param {function} move - The move callback
 * @param {function} begin - The begin callback
 * @param {function} end - The end callback
 * @return {object} offObject - An object with off method for unbinding
 * @return {object.off} off - off method
 */
export default function drag (elements, move, begin, end) {
  const undragProperties = []
  let position

  forElements(elements, element => {
    let dragging = false

    let undragProperty = {
      element,

      begin (e) {
        e.preventDefault()
        e.stopPropagation()

        if ('touches' in e && e.touches.length) e = e.touches[0]

        dragging = true

        position = { x: e.pageX, y: e.pageY }

        if (begin) begin({...position})
      },

      move (e) {
        if (!dragging) return

        e.preventDefault()
        e.stopPropagation()

        if ('touches' in e && e.touches.length) e = e.touches[0]

        const translation = { x: e.pageX - position.x, y: e.pageY - position.y }
        position = { x: e.pageX, y: e.pageY }

        if (move) move({...translation}, {...position})
      },

      end (e) {
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

    undragProperties.push(undragProperty)
  })

  return {
    off () {
      forEach(undragProperties, (undragProperty) => {
        off(undragProperty.element, 'touchstart, mousedown', undragProperty.begin)
        off(document.body, 'touchmove, mousemove', undragProperty.move)
        off(document.body, 'touchend, mouseup', undragProperty.end)
      })
    }
  }
}
