import assert from 'assert'
import Chirashi from '../../src'

window.describe('chirashi#getWidth', () => {
  window.it('should be a function', () => {
    assert.equal(typeof Chirashi.getWidth, 'function')
  })

  window.it('should return element\'s width as Number', () => {
    let div = document.createElement('div')
    div.classList.add('get-width', 'test')
    document.body.appendChild(div)

    Object.assign(div.style, {
      display: 'block',
      border: '20px solid red',
      padding: '10px',
      height: '200px',
      width: '200px'
    })

    assert.equal(Chirashi.getWidth(div), 260, 'should return offset width')
    assert.equal(Chirashi.getWidth(div, true), 220, 'should return client width')

    document.body.removeChild(div)
  })
})
