import { assert } from 'chai'
import { getElement } from 'chirashi'

describe('chirashi#getElement', () => {
  it('should return a function', () => {
    assert.isFunction(getElement)
  })

  it('should return element', () => {
    let yakitori = document.createElement('a')
    yakitori.classList.add('yakitori')
    document.body.appendChild(yakitori)

    assert.equal(yakitori, getElement(yakitori), 'should work for dom element')
    assert.equal(yakitori, getElement('a'), 'should work for tag selector')
    assert.equal(yakitori, getElement('.yakitori'), 'should work for class selector')
    assert.equal(yakitori, getElement(document.querySelectorAll('.yakitori')), 'should work with NodeList')
    assert.equal(yakitori, getElement([yakitori, 'yakitori']), 'should return first for array')
    assert.isNull(getElement('.unknown'), 'should return null for unknown')

    document.body.removeChild(yakitori)
  })
})
