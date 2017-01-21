import { assert } from 'chai'
import { offset } from 'chirashi'

describe('chirashi#offset', () => {
  it('should be a function', () => {
    assert.isFunction(offset)
  })

  it('should return element\'s position in page', () => {
    let tuna = document.createElement('div')
    tuna.classList.add('tuna')
    document.body.appendChild(tuna)

    Object.assign(document.body.style, {
      margin: 0,
      padding: 0,
      position: 'relative'
    })

    Object.assign(document.documentElement.style, {
      margin: 0,
      padding: 0
    })

    Object.assign(tuna.style, {
      display: 'block',
      position: 'absolute',
      top: '200px',
      left: '240px',
      width: '100px',
      height: '100px',
      background: 'red'
    })

    const tunaOffset = offset(tuna)
    assert.equal(tunaOffset.top, 200, 'should return correct top offset')
    assert.equal(tunaOffset.left, 240, 'should return correct left offset')
    assert.equal(offset(null), false, 'should return false if element isn\'t valid')

    document.body.removeChild(tuna)
  })
})
