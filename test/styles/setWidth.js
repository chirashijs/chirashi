import { assert } from 'chai'
import Chirashi from 'chirashi'

describe('chirashi#setWidth', () => {
  it('should be a function', () => {
    assert.isFunction(Chirashi.setWidth)
  })

  it('should return element\'s width as Number', () => {
    let div = document.createElement('div')
    div.classList.add('set-width', 'test')
    document.body.appendChild(div)

    Object.assign(div.style, {
      display: 'block',
      height: '200px'
    })

    Chirashi.setWidth(div, 200)
    assert.equal(div.style.width, '200px', 'should set width in pixels')

    Chirashi.setWidth(div, '100%')
    assert.equal(div.style.width, '100%', 'should set width with unit')

    document.body.removeChild(div)
  })
})
