import { assert } from 'chai'
import { setCssVariable } from 'chirashi'

describe('chirashi#setCssVariable', () => {
  it('should be a function', () => {
    assert.isFunction(setCssVariable)
  })

  it('should set value for element\'s style property', () => {
    let div = document.createElement('div')
    div.classList.add('set-css-variable', 'test')
    document.body.appendChild(div)

    Object.assign(div.style, {
      color: 'var(--title-color)',
      opacity: 'var(--opacity)'
    })

    div.style.setProperty('--opacity', 0.2)
    const supportsVariables = (+window.getComputedStyle(div).opacity).toFixed(1) === '0.2'
    div.style.setProperty('--opacity', '')

    setCssVariable(div, {
      titleColor: 'blue',
      opacity: 0.4
    })

    const elements = setCssVariable(window, { titleColor: 'red' })

    if (!supportsVariables) return

    const computedStyle = window.getComputedStyle(div)
    assert.equal(computedStyle.color.replace(/\s+/g, ''), 'rgb(0,0,255)', 'should set value for style property')
    assert.equal((+computedStyle.opacity).toFixed(1), '0.4', 'should set value for unitless style property')
    assert.sameDeepMembers(elements, [window], 'should return if element doesn\'t have style property')

    document.body.removeChild(div)
  })
})
