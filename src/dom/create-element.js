import forIn from '../core/for-in'

/**
 * Create a dom element from an HTML string or tag.
 * @param {string | HTMLElement | SVGElement} string - The html string or tag
 * @param {object} attributes - The object of attributes
 * @return {HTMLElement | SVGElement} element - The dom element created from the string
 */
export default function createElement (string, attributes = {}) {
    let strAttributes = ""

    forIn(attributes, (name, value) => {
        strAttributes += `${name}="${value}"`
    })

    if (string.indexOf('<') == -1) string = `<${string}${strAttributes}></${string}>`

    let temp = document.createElement('div')
    temp.innerHTML = string

    return temp.firstChild
}
