/**
 * Get array of dom elements from selector.
 * @param {string} selector - The query selector
 * @return {Array} domElements - The dom elements matching selector
 */
export default function getSelectorAll (selector) {
    return [].slice.call(document.querySelectorAll(selector))
}
