import { assert } from 'chai'
import { clientRect } from 'chirashi'

window.describe('chirashi#clientRect', () => {
  window.it('should be a function', () => {
    assert.isFunction(clientRect)
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

    const boundingClientRect = clientRect(poulp)
    assert.equal(boundingClientRect.top, 200, 'should return correct top position')
    assert.equal(boundingClientRect.left, 240, 'should return correct left position')
    assert.equal(boundingClientRect.width, 100, 'should return correct width')
    assert.equal(boundingClientRect.height, 100, 'should return correct height')
    assert.isFalse(clientRect(null), 'should return false if element isn\'t valid')

    document.body.removeChild(poulp)
  })
})
