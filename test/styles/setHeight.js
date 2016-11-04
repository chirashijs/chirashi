import { assert } from 'chai'
import Chirashi from '../../src'

window.describe('chirashi#setHeight', () => {
  window.it('should be a function', () => {
    assert.isFunction(Chirashi.setHeight)
  })

  window.it('should return element\'s height as Number', () => {
    let div = document.createElement('div')
    div.classList.add('set-height', 'test')
    document.body.appendChild(div)

    Object.assign(div.style, {
      display: 'block',
      width: '200px'
    })

    Chirashi.setHeight(div, 200)
    assert.equal(div.style.height, '200px', 'should set height in pixels')

    Chirashi.setHeight(div, '100%')
    assert.equal(div.style.height, '100%', 'should set height with unit')

    document.body.removeChild(div)
  })
})
