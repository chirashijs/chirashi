import { assert } from 'chai'
import Chirashi from '../../src'

// matches pollyfill for phantomJS
if (!window.Element.prototype.matches) {
  window.Element.prototype.matches =
  window.Element.prototype.matchesSelector ||
  window.Element.prototype.mozMatchesSelector ||
  window.Element.prototype.msMatchesSelector ||
  window.Element.prototype.oMatchesSelector ||
  window.Element.prototype.webkitMatchesSelector ||
  function (s) {
    let matches = (this.document || this.ownerDocument).querySelectorAll(s)
    let i = matches.length
    while (--i >= 0 && matches.item(i) !== this) {}

    return i > -1
  }
}

window.describe('chirashi#createElement', () => {
  window.it('should be a function', () => {
    assert.isFunction(Chirashi.createElement)
  })

  window.it('should return new element', () => {
    assert.isTrue(Chirashi.createElement('a#sushi.link[data-href="chirashijs.org"][data-link]').matches('a#sushi.link[data-href="chirashijs.org"][data-link]'), 'from css selector')
    assert.isTrue(Chirashi.createElement('<h1>Hello World!</h1>').matches('h1'), 'from html string')
  })
})
