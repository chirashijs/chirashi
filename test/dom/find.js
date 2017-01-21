import { assert } from 'chai'
import { find } from 'chirashi'

describe('chirashi#find', () => {
  it('should be a function', () => {
    assert.isFunction(find)
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

    assert.sameDeepMembers(find(maki, '.salmon'), [salmon])
    assert.sameDeepMembers(find(maki, '.avocado'), [])
    assert.sameDeepMembers(find(window, '.maki'), [])
  })
})
