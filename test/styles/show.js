import { assert } from 'chai'
import Chirashi from 'chirashi'

describe('chirashi#show', () => {
  it('should be a function', () => {
    assert.isFunction(Chirashi.show)
  })

  it('should set element\'s visibility to visible', () => {
    let div = document.createElement('div')
    div.classList.add('show', 'test')
    document.body.appendChild(div)
    div.style.visibility = 'hidden'

    Chirashi.show(div)

    assert.equal(div.style.visibility, 'visible')

    document.body.removeChild(div)
  })
})
