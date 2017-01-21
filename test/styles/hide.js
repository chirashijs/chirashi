import { assert } from 'chai'
import { hide } from 'chirashi'

describe('chirashi#hide', () => {
  it('should be a function', () => {
    assert.isFunction(hide)
  })

  it('should set element\'s visibility to hidden', () => {
    let div = document.createElement('div')
    div.classList.add('hide', 'test')
    document.body.appendChild(div)

    hide(div)

    assert.equal(div.style.visibility, 'hidden')

    document.body.removeChild(div)
  })
})
