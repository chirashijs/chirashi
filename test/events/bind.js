import { assert } from 'chai'
import Chirashi from '../../src'

window.describe('chirashi#bind', () => {
  window.it('should be a function', () => {
    assert.isFunction(Chirashi.bind)
  })

  window.it('should bind event of elements', done => {
    let called = 0
    let maki = document.createElement('div')
    maki.classList.add('bind', 'maki')
    document.body.appendChild(maki)

    let cheese = document.createElement('div')
    cheese.classList.add('bind', 'cheese')
    document.body.appendChild(cheese)

    const listener = Chirashi.bind('.cheese', {
      click: (event, target) => {
        ++called

        assert.equal(target, target, 'should bind event returning target')
        assert.equal(called, 1, 'should trigger only once')
        listener.unbind()

        setTimeout(() => {
          document.body.removeChild(maki)
          document.body.removeChild(cheese)

          done()
        }, 200)
      }
    })

    assert.isFunction(listener.unbind, 'should return object with unbind method')

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
