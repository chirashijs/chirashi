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
    assert.isTrue(Chirashi.createElement("a#sushi.link[data-href='chirashijs.org'][data-link]").matches('a#sushi.link[data-href="chirashijs.org"][data-link]'), 'from css selector with double quotes')
    assert.isTrue(Chirashi.createElement('p').matches('p'), 'from simple tag')

    const title = Chirashi.createElement('<h1>Hello <strong>World</strong>!</h1>')
    assert.isTrue(title.matches('h1'), 'from html string')
    assert.isTrue(title.children[0].matches('strong'), 'with children')
  })
})
