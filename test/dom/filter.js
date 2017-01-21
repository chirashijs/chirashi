import { assert } from 'chai'
import { filter } from 'chirashi'

describe('chirashi#filter', () => {
  it('should be a function', () => {
    assert.isFunction(filter)
  })

  it('should return elements matching test', () => {
    const maki = document.createElement('div')
    maki.classList.add('maki')

    const cheese = document.createElement('div')
    cheese.classList.add('cheese')
    maki.appendChild(cheese)

    const avocado = document.createElement('div')
    avocado.classList.add('avocado')
    maki.appendChild(avocado)

    assert.sameDeepMembers(filter(maki.children, '.avocado'), [avocado], 'should test selector')
    assert.sameDeepMembers(filter(maki.children, cheese), [cheese], 'should test node')
    assert.sameDeepMembers(filter(maki.children, '.null'), [], 'should return empty array')
  })
})
