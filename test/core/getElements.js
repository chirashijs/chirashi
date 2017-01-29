import contains from '../contains'
import { assert } from 'chai'
import { getElements } from 'chirashi'

describe('chirashi#getElements', () => {
  it('should return a function', () => {
    assert.isFunction(getElements)
  })

  it('should return elements', () => {
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

    assert.isTrue(contains([pinkVinegarGinger], getElements(pinkVinegarGinger)), 'should work for dom element')
    assert.isTrue(contains([pinkVinegarGinger, vinegarGinger], getElements(document.querySelectorAll('.ginger.vinegar'))), 'should work for NodeList')
    assert.isTrue(contains([...form.children], getElements(form.children)), 'should work for HTMLCollection')
    assert.isTrue(contains([pinkVinegarGinger, vinegarGinger, sugarGinger], getElements('h1')), 'should work for tag selector')
    assert.isTrue(contains([pinkVinegarGinger, vinegarGinger, sugarGinger], getElements('.ginger.vinegar, .ginger.sugar')), 'should work for class selector')

    const gingers = getElements([pinkVinegarGinger, vinegarGinger, '.ginger.sugar', '.unknown'])
    assert.isTrue(contains([sugarGinger, vinegarGinger, pinkVinegarGinger], gingers), 'should extract dom elements from array')
    gingers.push('.none') // invalidate array
    assert.isTrue(contains([sugarGinger, vinegarGinger, pinkVinegarGinger], getElements(gingers)), 'should return previously elements')

    assert.isTrue(contains([form], getElements(form)), 'shouldn\'t return forms children')
    assert.isTrue(contains([], getElements(null)), 'should return an empty array')

    document.body.removeChild(pinkVinegarGinger)
    document.body.removeChild(vinegarGinger)
    document.body.removeChild(sugarGinger)
  })
})
