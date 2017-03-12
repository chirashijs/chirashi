import { assert } from 'chai'
import { delegate } from 'chirashi'

describe('chirashi#delegate', () => {
  it('should be a function', () => {
    assert.isFunction(delegate)
  })

  it('should delegate event of elements', done => {
    let called = 0
    let maki = document.createElement('div')
    maki.classList.add('delegate', 'maki')
    document.body.appendChild(maki)

    let cheese = document.createElement('div')
    cheese.classList.add('delegate', 'cheese')
    document.body.appendChild(cheese)

    const off = delegate('.delegate.cheese', {
      click: {
        handler: (event, target) => {
          ++called

          console.log('clicked .delegate.cheese')

          assert.equal(target, target, 'should delegate event returning target')
          assert.equal(called, 1, 'should trigger only once')
          off()

          setTimeout(() => {
            document.body.removeChild(maki)
            document.body.removeChild(cheese)

            done()
          }, 200)
        },
        capture: false
      }
    })

    assert.isFunction(off, 'should return object with off method')

    maki.dispatchEvent(new window.CustomEvent('click', {
      bubbles: true,
      cancelable: true
    }))
    cheese.dispatchEvent(new window.CustomEvent('click', {
      bubbles: true,
      cancelable: true
    }))
    cheese.dispatchEvent(new window.CustomEvent('click', {
      bubbles: true,
      cancelable: true
    }))
  })
})
