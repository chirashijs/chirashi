import { assert } from 'chai'
import Chirashi from 'chirashi'

describe('chirashi#getHeight', () => {
  it('should be a function', () => {
    assert.isFunction(Chirashi.getHeight)
  })

  it('should return element\'s height as Number', () => {
    let div = document.createElement('div')
    div.classList.add('get-height', 'test')
    document.body.appendChild(div)

    Object.assign(div.style, {
      display: 'block',
      border: '20px solid red',
      padding: '10px',
      height: '200px',
      width: '200px'
    })

    assert.equal(Chirashi.getHeight(div, true), 260, 'should return offset height')
    assert.equal(Chirashi.getHeight(div), 220, 'should return client height')

    document.body.removeChild(div)
  })
})
