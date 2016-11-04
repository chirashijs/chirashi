import { assert } from 'chai'
import Chirashi from '../../src'

window.describe('chirashi#find', () => {
  window.it('should be a function', () => {
    assert.isFunction(Chirashi.find)
  })

  window.it('should return elements from element\'s children for a selector', () => {
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
