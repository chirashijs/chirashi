import { assert } from 'chai'
import Chirashi from 'chirashi'

describe('chirashi#getSize', () => {
  it('should be a function', () => {
    assert.isFunction(Chirashi.getSize)
  })

  it('should return element\'s size as object of width and height', () => {
    let div = document.createElement('div')
    div.classList.add('get-size', 'test')
    document.body.appendChild(div)

    Object.assign(div.style, {
      display: 'block',
      border: '20px solid red',
      padding: '10px',
      height: '200px',
      width: '200px'
    })

    const size = Chirashi.getSize(div, true)
    const innerSize = Chirashi.getSize(div)

    assert.equal(size.width, 260, 'should return offset width')
    assert.equal(size.height, 260, 'should return offset height')
    assert.equal(innerSize.width, 220, 'should return client width')
    assert.equal(innerSize.height, 220, 'should return client height')

    document.body.removeChild(div)
  })
})
