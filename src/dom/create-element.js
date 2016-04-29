/**
 * Create a dom element from an HTML string or tag.
 * @param {string | HTMLElement | SVGElement} string - The html string or tag
 * @return {HTMLElement | SVGElement} element - The dom element created from the string
 */
export default function createElement (string) {
    if (string.indexOf('<') == -1) string = `<${string}></${string}>`

    let temp = document.createElement('div')
    temp.innerHTML = string

    return temp.firstChild
}
