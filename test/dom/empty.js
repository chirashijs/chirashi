import { assert } from 'chai'
import { empty } from 'chirashi'

describe('chirashi#empty', () => {
  it('should be a function', () => {
    assert.isFunction(empty)
  })

  it('should empty element', () => {
    const maki = document.createElement('div')
    maki.id = 'empty-maki'
    const cheese = document.createElement('div')
    maki.appendChild(cheese)
    document.body.appendChild(maki)

    empty('#empty-maki')
    assert.isNull(maki.firstChild)

    document.body.removeChild(maki)
  })
})
