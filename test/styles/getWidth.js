import { assert } from 'chai'
import { getWidth } from 'chirashi'

describe('chirashi#getWidth', () => {
  it('should be a function', () => {
    assert.isFunction(getWidth)
  })

  it('should return element\'s width as Number', () => {
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

    assert.equal(getWidth(div, true), 260, 'should return offset width')
    assert.equal(getWidth(div), 220, 'should return client width')

    document.body.removeChild(div)
  })
})
