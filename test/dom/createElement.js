import { assert } from 'chai'
import { createElement } from 'chirashi'

describe('chirashi#createElement', () => {
  it('should be a function', () => {
    assert.isFunction(createElement)
  })

  it('should return new element', () => {
    assert.isTrue(createElement('a#sushi.link[data-href="https://chirashijs.org"][data-link]').matches('a#sushi.link[data-href="https://chirashijs.org"][data-link]'), 'from css selector')
    assert.isTrue(createElement('p').matches('p'), 'from simple tag')

    const button = createElement('a.button[href="#"]{click}')
    assert.isTrue(button.matches('a.button[href="#"]'), 'from css selector')
    assert.equal(button.textContent, 'click', 'from css selector')

    const title = createElement('<h1>Hello <strong>World</strong>!</h1>')
    assert.isTrue(title.matches('h1'), 'from html string')
    assert.isTrue(title.children[0].matches('strong'), 'with children')
  })
})
