import { assert } from 'chai'
import Chirashi from 'chirashi'

describe('chirashi#findOne', () => {
  it('should be a function', () => {
    assert.isFunction(Chirashi.findOne)
  })

  it('should return first element from element\'s children for a selector', () => {
    const maki = document.createElement('div')
    maki.classList.add('maki')

    const salmon = document.createElement('div')
    salmon.classList.add('salmon')
    maki.appendChild(salmon)

    const cheese = document.createElement('div')
    cheese.classList.add('cheese')
    maki.appendChild(cheese)

    assert.equal(Chirashi.findOne(maki, '.salmon'), salmon)
    assert.isNull(Chirashi.findOne(maki, '.avocado'))
    assert.isNull(Chirashi.findOne(window, '.maki'))
  })
})
