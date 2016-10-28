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

  window.it('should return elements', () => {
    let pinkVinegarGinger = document.createElement('h1')
    pinkVinegarGinger.classList.add('ginger', 'vinegar', 'pink')
    document.body.appendChild(pinkVinegarGinger)

    let vinegarGinger = document.createElement('h1')
    vinegarGinger.classList.add('ginger', 'vinegar')
    document.body.appendChild(vinegarGinger)

    let sugarGinger = document.createElement('h1')
    sugarGinger.classList.add('ginger', 'sugar')
    document.body.appendChild(sugarGinger)

    let form = document.createElement('form')
    form.appendChild(document.createElement('input'))
    form.appendChild(document.createElement('input'))
    form.appendChild(document.createElement('input'))
    form.appendChild(document.createElement('input'))

    assert.ok(equalsArray([pinkVinegarGinger], Chirashi.getElements(pinkVinegarGinger)), 'should work for dom element')
    assert.ok(equalsArray([pinkVinegarGinger, vinegarGinger], Chirashi.getElements(document.querySelectorAll('.ginger.vinegar'))), 'should work for nodelist')
    assert.ok(equalsArray([pinkVinegarGinger, vinegarGinger, sugarGinger], Chirashi.getElements('h1')), 'should work for tag selector')
    assert.ok(equalsArray([pinkVinegarGinger, vinegarGinger, sugarGinger], Chirashi.getElements('.ginger.vinegar, .ginger.sugar')), 'should work for class selector')

    const gingers = Chirashi.getElements([pinkVinegarGinger, vinegarGinger, '.ginger.sugar', '.unknown'])
    assert.ok(equalsArray([sugarGinger, vinegarGinger, pinkVinegarGinger], gingers), 'should extract dom elements from array')
    assert.ok(equalsArray([sugarGinger, vinegarGinger, pinkVinegarGinger], Chirashi.getElements(gingers)), 'should return previously vinegared elements')

    const vinegarGingers = Chirashi.getElements(document.querySelectorAll('.ginger.vinegar'))
    vinegarGingers.push('.ginger.sugar')
    assert.ok(equalsArray([sugarGinger, vinegarGinger, pinkVinegarGinger], Chirashi.getElements(vinegarGingers)), 'should invalidate modified array')

    const changingGingers = Chirashi.getElements(document.querySelectorAll('.ginger.vinegar'))
    changingGingers.chrshPush('.ginger.sugar')
    assert.ok(equalsArray([pinkVinegarGinger, vinegarGinger, sugarGinger], Chirashi.getElements(changingGingers)), 'should push using getElements')

    assert.ok(equalsArray([form], Chirashi.getElements(form)), 'shouldn\'t return forms children')
    assert.ok(equalsArray([], Chirashi.getElements(null)), 'should return an empty array')

    document.body.removeChild(pinkVinegarGinger)
    document.body.removeChild(vinegarGinger)
    document.body.removeChild(sugarGinger)
  })
})
