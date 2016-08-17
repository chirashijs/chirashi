import assert from 'assert'
import $ from '../../src'

Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false

    // compare lengths - can save a lot of time
    if (this.length != array.length)
        return false

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false
        }
        else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false
        }
    }
    return true
}

describe('chirashi#getElements', () => {
  it('should return a function', () => {
    assert.equal(typeof $.getElements, 'function')
  })

  it('should return element', () => {
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

    assert.ok([div].equals($.getElements(div)), 'should works for dom element')
    assert.ok([div, div2].equals($.getElements(document.querySelectorAll('.test'))), 'should works for nodelist')
    assert.ok([div, div2, div3].equals($.getElements('div')), 'should works for tag selector')
    assert.ok([div, div2, div3].equals($.getElements('.test, .test2')), 'should works for class selector')
    assert.ok([div3, div2, div].equals($.getElements([div, div2, '.test2', '.unknown'])), 'should extract dom elements from array')
    assert.ok([form].equals($.getElements(form)), 'shouldn\'t return forms children')
    assert.equal(null, $.getElements(null), 'should return null for non dom element')

    document.body.removeChild(div)
    document.body.removeChild(div2)
    document.body.removeChild(div3)
  })
})
