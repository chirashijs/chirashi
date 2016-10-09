import on      from './on'
import off     from './off'
import closest from '../dom/closest'

/**
 * Bind events listener on body and execute callback when target match selector.
 * @param {string} selector - The selector to match
 * @param {string} events - The events that should be bound seperated with spaces
 * @param {function} callback - The callback used for event binding
 * @return {object} unbindObject - An object with unbind method for unbinding
 */
export default function bind (selector, events, callback) {
    const innerCallback = (event) => {
        let target = closest(event.target, selector)
        if (!!target)
            callback(event, target)
    }

    on(document.body, events, innerCallback)

    return {
        unbind() {
            off(document.body, events, innerCallback)
        }
    }
}
