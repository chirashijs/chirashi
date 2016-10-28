import assert from 'assert'
import Chirashi from '../../src'

window.describe('chirashi#forEach', () => {
  const items = [0, 1, 2]

  window.it('should be defined as a function', () => {
    assert.equal(typeof Chirashi.forEach, 'function')
  })

  window.it('should execute callback on item', () => {
    const salmonMaki = document.createElement('div')
    salmonMaki.classList.add('maki', 'salmon')
    document.body.appendChild(salmonMaki)

    const cheeseSalmonMaki = document.createElement('div')
    cheeseSalmonMaki.classList.add('maki', 'salmon', 'cheese')
    document.body.appendChild(cheeseSalmonMaki)

    const avocadoMaki = document.createElement('div')
    avocadoMaki.classList.add('maki', 'avocado')
    document.body.appendChild(avocadoMaki)

    let i = items.length
    Chirashi.forEach(items, (item, index) => {
      assert.equal(--i, index, 'should provide index backward')
      assert.equal(items[index], item, 'should iterate backward')
    })

    let j = -1
    Chirashi.forEach(items, (item, index) => {
      assert.equal(++j, index, 'should provide index forward')
      assert.equal(items[index], item, 'should iterate forward')
    }, true)

    Chirashi.forEach(1, item => {
      assert.equal(1, item, 'should work with singleton')
    })

    const nodeList = document.querySelectorAll('.maki')
    let k = nodeList.length
    Chirashi.forEach(nodeList, (item, index) => {
      assert.equal(--k, index, 'should provide index backward')
      assert.equal(nodeList[index], item, 'should iterate backward')
    })

    assert.equal(items, Chirashi.forEach(items, () => {}), 'should return items')

    const emptyArray = Chirashi.forEach(null, () => {})
    assert.ok(emptyArray instanceof Array && emptyArray.length === 0, 'should return empty array')

    const singletonArray = Chirashi.forEach(1, () => {})
    assert.ok(singletonArray instanceof Array && singletonArray.length === 1 && singletonArray[0] === 1, 'should return array with singleton')

    document.body.removeChild(salmonMaki)
    document.body.removeChild(cheeseSalmonMaki)
    document.body.removeChild(avocadoMaki)
  })
})
