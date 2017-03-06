import _applyOnElements from '../_internals/_applyOnElements'

/**
 * Iterates over elements, returning an array of all elements matching tested selector.
 * @param {(string|Array|NodeList|HTMLCollection|Element)} elements - The iterable, selector or elements. Note that it'll be passed to getElements.
 * @param {(string|Element)} tested - The selector or dom element to match.
 * @return {Array.<Element>} matching - The array of filtered elements.
 * @example //esnext
 * import { createElement, append, filter } from 'chirashi'
 * const salmonMaki = createElement('.salmon.maki')
 * const tunaMaki = createElement('.tuna.maki')
 * const salmonSushi = createElement('.salmon.sushi')
 * const tunaSushi = createElement('.tuna.sushi')
 * append(document.body, [salmonMaki, tunaMaki, salmonSushi, tunaSushi])
 * filter('div', '.salmon') //returns: [<div class="salmon sushi"></div>, <div class="salmon maki"></div>]
 * filter([salmonMaki, tunaMaki, salmonSushi, tunaSushi], '.maki') //returns: [<div class="salmon maki"></div>, <div class="tuna maki"></div>]
 * filter('div', '.salmon') //returns: [<div class="salmon sushi"></div>, <div class="salmon maki"></div>]
 * @example //es5
 * var salmonMaki = Chirashi.createElement('.salmon.maki')
 * var tunaMaki = Chirashi.createElement('.tuna.maki')
 * var salmonSushi = Chirashi.createElement('.salmon.sushi')
 * var tunaSushi = Chirashi.createElement('.tuna.sushi')
 * Chirashi.append(document.body, [salmonMaki, tunaMaki, salmonSushi, tunaSushi])
 * Chirashi.filter('div', '.salmon') //returns: [<div class="salmon sushi"></div>, <div class="salmon maki"></div>]
 * Chirashi.filter([salmonMaki, tunaMaki, salmonSushi, tunaSushi], '.maki') //returns: [<div class="salmon maki"></div>, <div class="tuna maki"></div>]
 * Chirashi.filter('div', '.salmon') //returns: [<div class="salmon sushi"></div>, <div class="salmon maki"></div>]
 */
const filter = _applyOnElements.bind(null, _checkOne)
export default filter

function _checkOne (matching, tested, element) {
  if ((typeof tested === 'string' && 'matches' in element && element.matches(tested)) || element === tested) {
    matching.push(element)
  }
}
