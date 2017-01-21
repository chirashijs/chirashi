import { assert } from 'chai'
import { closest } from 'chirashi'

describe('chirashi#closest', () => {
  it('should be a function', () => {
    assert.isFunction(closest)
  })

  it('should return closest element matching test', () => {
    const maki = document.createElement('div')
    maki.classList.add('maki')
    const cheese = document.createElement('div')
    cheese.classList.add('cheese')

    maki.appendChild(cheese)

    const avocado = document.createElement('div')
    avocado.classList.add('avocado')
    cheese.appendChild(avocado)

    document.body.appendChild(maki)

    assert.equal(closest('.avocado', '.maki'), maki)
    assert.isFalse(closest('.avocado', '.maki', '.cheese'))
    assert.equal(closest('.avocado', maki), maki)

    document.body.removeChild(maki)
  })
})
