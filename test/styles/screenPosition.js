import { assert } from 'chai'
import Chirashi from '../../src'

window.describe('chirashi#screenPosition', () => {
  window.it('should be a function', () => {
    assert.isFunction(Chirashi.screenPosition)
  })

  window.it('should return element\'s position on screen', () => {
    let poulp = document.createElement('div')
    poulp.classList.add('poulp')
    document.body.appendChild(poulp)

    Object.assign(document.body.style, {
      margin: 0,
      padding: 0,
      position: 'relative'
    })

    Object.assign(document.documentElement.style, {
      margin: 0,
      padding: 0
    })

    Object.assign(poulp.style, {
      display: 'block',
      position: 'absolute',
      top: '200px',
      left: '240px',
      width: '100px',
      height: '100px',
      background: 'red'
    })

    const screenPosition = Chirashi.screenPosition(poulp)
    assert.equal(screenPosition.top, 200, 'should return correct top position')
    assert.equal(screenPosition.left, 240, 'should return correct left position')
    assert.isFalse(Chirashi.screenPosition(null), 'should return false if element isn\'t valid')

    document.body.removeChild(poulp)
  })
})
