import { assert } from 'chai'
import { position } from 'chirashi'

describe('chirashi#position', () => {
  it('should be a function', () => {
    assert.isFunction(position)
  })

  it('should return element\'s position in parent', () => {
    let cod = document.createElement('div')
    cod.classList.add('cod')
    document.body.appendChild(cod)

    Object.assign(document.body.style, {
      margin: 0,
      padding: 0,
      position: 'relative',
      height: '2000px',
      width: '2000px'
    })

    Object.assign(document.documentElement.style, {
      margin: 0,
      padding: 0
    })

    Object.assign(cod.style, {
      display: 'block',
      position: 'fixed',
      top: '200px',
      left: '240px',
      width: '100px',
      height: '100px',
      background: 'red'
    })

    let innerCod = document.createElement('div')
    innerCod.classList.add('innerCod')
    document.body.appendChild(innerCod)

    Object.assign(innerCod.style, {
      display: 'block',
      position: 'absolute',
      top: '20px',
      left: '10px',
      width: '10px',
      height: '10px',
      background: 'blue'
    })

    const codPosition = position(innerCod)
    assert.equal(codPosition.top, 20, 'should return correct top position')
    assert.equal(codPosition.left, 10, 'should return correct left position')
    assert.equal(position(null), false, 'should return false if element isn\'t valid')

    document.body.removeChild(cod)
    document.body.removeChild(innerCod)
  })
})
