import contains from '../contains'
import { assert } from 'chai'
import { children } from 'chirashi'

describe('chirashi#children', () => {
  it('should be a function', () => {
    assert.isFunction(children)
  })

  it('should return element\'s children', () => {
    const maki = document.createElement('div')
    maki.id = 'children-maki'
    const cheese = document.createElement('div')
    maki.appendChild(cheese)
    document.body.appendChild(maki)

    assert.isTrue(contains([cheese], children('#children-maki')))
    maki.removeChild(cheese)
    assert.isTrue(contains([], children('#children-maki')))

    document.body.removeChild(maki)
  })
})
