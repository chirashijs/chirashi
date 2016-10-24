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

window.describe('chirashi#getElements', () => {
  window.it('should return a function', () => {
    assert.equal(typeof Chirashi.getElements, 'function')
  })

  window.it('should return element', () => {
    let div = document.createElement('div')
    div.classList.add('test')
    document.body.appendChild(div)

    let div2 = document.createElement('div')
    div2.classList.add('test')
    document.body.appendChild(div2)

    let div3 = document.createElement('div')
    div3.classList.add('test2')
    document.body.appendChild(div3)

    let form = document.createElement('form')
    form.appendChild(document.createElement('input'))
    form.appendChild(document.createElement('input'))
    form.appendChild(document.createElement('input'))
    form.appendChild(document.createElement('input'))

    assert.ok(equalsArray([div], Chirashi.getElements(div)), 'should work for dom element')
    assert.ok(equalsArray([div, div2], Chirashi.getElements(document.querySelectorAll('.test'))), 'should work for nodelist')
    assert.ok(equalsArray([div, div2, div3], Chirashi.getElements('div')), 'should work for tag selector')
    assert.ok(equalsArray([div, div2, div3], Chirashi.getElements('.test, .test2')), 'should work for class selector')
    assert.ok(equalsArray([div3, div2, div], Chirashi.getElements([div, div2, '.test2', '.unknown'])), 'should extract dom elements from array')
    assert.ok(equalsArray([form], Chirashi.getElements(form)), 'shouldn\'t return forms children')
    assert.ok(equalsArray([], Chirashi.getElements(null)), 'should return an empty array')

    document.body.removeChild(div)
    document.body.removeChild(div2)
    document.body.removeChild(div3)
  })
})
