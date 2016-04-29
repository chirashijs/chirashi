import forElements from '../core/for-elements'

/**
 * Filter items matching the tested value from elements.
 * @param {string | Array | HTMLElement | window | document | SVGElement} elements - The iterable, selector or dom element
 * @param {string | HTMLElement | SVGElement} tested - The selector or dom element to match
 */
export default function filter (elements, tested) {
    let matching = []

    forElements(elements, element => {
        if (!!element && element !== window && element !== document && (typeof tested == 'string' && element.matches(tested) || element == tested))
            matching.push(element)
    })

    return matching
}
