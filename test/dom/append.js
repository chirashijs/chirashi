import { assert } from 'chai'
import { append } from 'chirashi'

describe('chirashi#append', () => {
  it('should be a function', () => {
    assert.isFunction(append)
  })

  it('should append child into element', () => {
    const maki = document.createElement('div')
    const salmon = document.createElement('div')
    append(maki, [salmon, '.cheese'])

    assert.equal(maki.firstChild, salmon, 'should append existing node')
    assert.isTrue(maki.children[1].classList.contains('cheese'), 'should create and append node')
    assert.isFalse(append(window, '.null'), 'shouldn\'t append when not possible')
  })
})
