import { assert } from 'chai'
import Chirashi from 'chirashi'

describe('chirashi#find', () => {
  it('should be a function', () => {
    assert.isFunction(Chirashi.find)
  })

  it('should return elements from element\'s children for a selector', () => {
    const maki = document.createElement('div')
    maki.classList.add('maki')

    const salmon = document.createElement('div')
    salmon.classList.add('salmon')
    maki.appendChild(salmon)

    const cheese = document.createElement('div')
    cheese.classList.add('cheese')
    maki.appendChild(cheese)

    assert.sameDeepMembers(Chirashi.find(maki, '.salmon'), [salmon])
    assert.sameDeepMembers(Chirashi.find(maki, '.avocado'), [])
    assert.sameDeepMembers(Chirashi.find(window, '.maki'), [])
  })
})
