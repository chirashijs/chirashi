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

    assert.sameDeepMembers([pinkVinegarGinger], getElements(pinkVinegarGinger), 'should work for dom element')
    assert.sameDeepMembers([pinkVinegarGinger, vinegarGinger], getElements(document.querySelectorAll('.ginger.vinegar')), 'should work for NodeList')
    assert.sameDeepMembers([...form.children], getElements(form.children), 'should work for HTMLCollection')
    assert.sameDeepMembers([pinkVinegarGinger, vinegarGinger, sugarGinger], getElements('h1'), 'should work for tag selector')
    assert.sameDeepMembers([pinkVinegarGinger, vinegarGinger, sugarGinger], getElements('.ginger.vinegar, .ginger.sugar'), 'should work for class selector')

    const gingers = getElements([pinkVinegarGinger, vinegarGinger, '.ginger.sugar', '.unknown'])
    assert.sameDeepMembers([sugarGinger, vinegarGinger, pinkVinegarGinger], gingers, 'should extract dom elements from array')
    assert.sameDeepMembers([sugarGinger, vinegarGinger, pinkVinegarGinger], getElements(gingers), 'should return previously vinegared elements')

    const vinegarGingers = getElements(document.querySelectorAll('.ginger.vinegar'))
    vinegarGingers.push('.ginger.sugar')
    assert.sameDeepMembers([sugarGinger, vinegarGinger, pinkVinegarGinger], getElements(vinegarGingers), 'should invalidate modified array')

    const changingGingers = getElements(document.querySelectorAll('.ginger.vinegar'))
    changingGingers.chrshPush('.ginger.sugar')
    assert.sameDeepMembers([pinkVinegarGinger, vinegarGinger, sugarGinger], getElements(changingGingers), 'should push using getElements')

    assert.sameDeepMembers([form], getElements(form), 'shouldn\'t return forms children')
    assert.sameDeepMembers([], getElements(null), 'should return an empty array')

    document.body.removeChild(pinkVinegarGinger)
    document.body.removeChild(vinegarGinger)
    document.body.removeChild(sugarGinger)
  })
})
