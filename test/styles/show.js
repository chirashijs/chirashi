import { assert } from 'chai'
import { show } from 'chirashi'

describe('chirashi#show', () => {
  it('should be a function', () => {
    assert.isFunction(show)
  })

  it('should set element\'s visibility to visible', () => {
    let div = document.createElement('div')
    div.classList.add('show', 'test')
    document.body.appendChild(div)
    div.style.visibility = 'hidden'

    show(div)

    assert.equal(div.style.visibility, 'visible')

    document.body.removeChild(div)
  })
})
