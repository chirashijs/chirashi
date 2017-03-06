import setStyleProp from './setStyleProp'

/**
* Show each element of elements using visibility.
* @param {(string|Array|NodeList|HTMLCollection|HTMLElement)} elements - The iterable, selector or elements.
* @return {Array} iterable - The getElements' result for chaining.
* @example //esnext
* import { append, show, getStyleProp }
* append(document.body, '.maki')
* const maki = show('.maki')
* getStyleProp(maki, 'visibility') // returns: "visible"
* @example //es5
* Chirashi.append(document.body, '.maki')
* var maki = Chirashi.show('.maki')
* Chirashi.getStyleProp(maki, 'visibility') // returns: "visible"
*/
export default function show (elements) {
 return setStyleProp(elements, { visibility: 'visible' })
}
