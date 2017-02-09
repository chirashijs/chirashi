import contains from '../contains'
import { assert } from 'chai'
import { parents } from 'chirashi'

describe('chirashi#parents', () => {
  it('should be a function', () => {
    assert.isFunction(parents)
  })

  it('should return element\'s parents', () => {
    const maki = document.createElement('div')
    maki.id = 'parents-maki'
    const cheese = document.createElement('div')
    maki.appendChild(cheese)

    assert.isTrue(contains(parents(cheese), [maki, document.body]))
  })
})
