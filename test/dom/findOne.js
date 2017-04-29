import { assert } from 'chai'
import { findOne } from 'chirashi'

describe('chirashi#findOne', () => {
  it('should be a function', () => {
    assert.isFunction(findOne)
  })

  it('should return first element from element\'s children for a selector', () => {
    const maki = document.createElement('div')
    maki.classList.add('maki')

    const salmon = document.createElement('div')
    salmon.classList.add('salmon')
    salmon.id = 'maki-salmon'
    maki.appendChild(salmon)

    const cheese = document.createElement('div')
    cheese.classList.add('cheese')
    maki.appendChild(cheese)

    assert.equal(findOne(maki, '.salmon'), salmon)
    assert.equal(findOne(maki, '[class="salmon"]'), salmon)
    assert.equal(findOne(maki, '#maki-salmon'), salmon)
    assert.isUndefined(findOne(maki, '.avocado'))
    assert.isNull(findOne('.none', '.avocado'))
  })
})
