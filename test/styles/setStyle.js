import assert from 'assert'
import Chirashi from '../../src'

function equalsArray (array1, array2) {
  // if the other array is a falsy value, return
  if (!array2) return false

  // compare lengths - can save a lot of time
  if (array1.length !== array2.length) return false

  for (var i = 0, l = array1.length; i < l; i++) {
    // Check if we have nested array2s
    if (array1[i] instanceof Array && array2[i] instanceof Array) {
      // recurse into the nested array2s
      if (!equalsArray(array1[i], array2[i])) return false
    } else if (array1[i] !== array2[i]) {
      // Warning - two different object instances will never be equal: {x:20} != {x:20}
      return false
    }
  }
  return true
}

window.describe('chirashi#setStyle', () => {
  window.it('should be a function', () => {
    assert.equal(typeof Chirashi.setStyle, 'function')
  })

  window.it('should set value for element\'s style property', () => {
    let div = document.createElement('div')
    div.classList.add('set-style', 'test')
    document.body.appendChild(div)

    Chirashi.setStyle(div, {
      display: 'block',
      padding: 10
    })

    assert.equal(div.style.display, 'block', 'should set value for style property')
    assert.equal(div.style.padding, '10px', 'should set numbers values as px if property isn\'t unitless')
    assert.ok(equalsArray([window], Chirashi.setStyle(window, { background: 'red' })), 'should return if element doesn\'t have style property')

    document.body.removeChild(div)
  })
})
