import { assert } from 'chai'
import Chirashi from 'chirashi'

describe('chirashi#setSize', () => {
  it('should be a function', () => {
    assert.isFunction(Chirashi.setSize)
  })

  it('should set elements\' size', () => {
    let salmon = document.createElement('div')
    salmon.classList.add('salmon')
    document.body.appendChild(salmon)

    Object.assign(salmon.style, {
      display: 'block',
      position: 'relative',
      background: 'pink'
    })

    let unagi = document.createElement('div')
    unagi.classList.add('unagi')
    document.body.appendChild(unagi)

    Object.assign(unagi.style, {
      display: 'block',
      position: 'relative',
      background: 'gray'
    })

    Chirashi.setSize([salmon, unagi], 150, '20%')
    assert.ok(salmon.style.width === '150px' && unagi.style.width === '150px', 'should set width')
    assert.ok(salmon.style.height === '20%' && unagi.style.height === '20%', 'should set height')

    document.body.removeChild(salmon)
  })
})
