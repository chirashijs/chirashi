import { assert } from 'chai'
import Chirashi from 'chirashi'

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

describe('chirashi#filter', () => {
  it('should be a function', () => {
    assert.isFunction(Chirashi.filter)
  })

  it('should return elements matching test', () => {
    const maki = document.createElement('div')
    maki.classList.add('maki')

    const cheese = document.createElement('div')
    cheese.classList.add('cheese')
    maki.appendChild(cheese)

    const avocado = document.createElement('div')
    avocado.classList.add('avocado')
    maki.appendChild(avocado)

    assert.sameDeepMembers(Chirashi.filter(maki.children, '.avocado'), [avocado], 'should test selector')
    assert.sameDeepMembers(Chirashi.filter(maki.children, cheese), [cheese], 'should test node')
    assert.sameDeepMembers(Chirashi.filter(maki.children, '.null'), [], 'should return empty array')
  })
})
