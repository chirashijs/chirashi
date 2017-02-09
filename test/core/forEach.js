import { assert } from 'chai'
import { forEach } from 'chirashi'

describe('chirashi#forEach', () => {
  const items = [0, 1, 2]

  it('should be defined as a function', () => {
    assert.isFunction(forEach)
  })

  it('should execute callback on item', () => {
    const salmonMaki = document.createElement('div')
    salmonMaki.classList.add('maki', 'salmon')
    document.body.appendChild(salmonMaki)

    const cheeseSalmonMaki = document.createElement('div')
    cheeseSalmonMaki.classList.add('maki', 'salmon', 'cheese')
    document.body.appendChild(cheeseSalmonMaki)

    const avocadoMaki = document.createElement('div')
    avocadoMaki.classList.add('maki', 'avocado')
    document.body.appendChild(avocadoMaki)

    let j = 0
    forEach(items, (item, index) => {
      assert.equal(j++, index, 'should provide index forward')
      assert.equal(items[index], item, 'should iterate forward')
    })

    forEach(1, item => {
      assert.equal(1, item, 'should work with singleton')
    })

    const nodeList = document.querySelectorAll('.maki')
    let k = 0
    forEach(nodeList, (item, index) => {
      assert.equal(k++, index, 'should provide index forward')
      assert.equal(nodeList[index], item, 'should iterate forward')
    })

    assert.equal(items, forEach(items, () => {}), 'should return items')

    const emptyArray = forEach(null, () => {})
    assert.isArray(emptyArray, 'should return empty array')
    assert.lengthOf(emptyArray, 0, 'should return empty array')

    const singletonArray = forEach(1, () => {})
    assert.isArray(singletonArray, 'should return array with singleton')
    assert.lengthOf(singletonArray, 1, 'should return array with singleton')
    assert.equal(singletonArray, 1, 'should return array with singleton')

    document.body.removeChild(salmonMaki)
    document.body.removeChild(cheeseSalmonMaki)
    document.body.removeChild(avocadoMaki)
  })
})
