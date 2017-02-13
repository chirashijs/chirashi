import { assert } from 'chai'
import contains from '../contains'
import { find } from 'chirashi'

describe('chirashi#find', () => {
  it('should be a function', () => {
    assert.isFunction(find)
  })

  it('should return elements from element\'s children for a selector', () => {
    const maki = document.createElement('div')
    maki.classList.add('maki')

    const sushi = document.createElement('div')
    sushi.classList.add('sushi')

    const makiSalmon = document.createElement('div')
    makiSalmon.setAttribute('id', 'salmon')
    makiSalmon.classList.add('salmon')
    maki.appendChild(makiSalmon)

    const sushiSalmon = document.createElement('div')
    sushiSalmon.classList.add('salmon')
    sushi.appendChild(sushiSalmon)

    const cheese = document.createElement('div')
    cheese.classList.add('cheese')
    maki.appendChild(cheese)

    assert.isTrue(contains([], find(maki, '.avocado')))
    assert.isTrue(contains([sushiSalmon], find(maki, '#salmon')))
    assert.isTrue(contains([makiSalmon, sushiSalmon], find([maki, sushi], '.salmon')))
  })
})
