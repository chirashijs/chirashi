import { assert } from 'chai'
import Chirashi from 'chirashi'

describe('chirashi#hide', () => {
  it('should be a function', () => {
    assert.isFunction(Chirashi.hide)
  })

  it('should set element\'s visibility to hidden', () => {
    let div = document.createElement('div')
    div.classList.add('hide', 'test')
    document.body.appendChild(div)

    Chirashi.hide(div)

    assert.equal(div.style.visibility, 'hidden')

    document.body.removeChild(div)
  })
})
