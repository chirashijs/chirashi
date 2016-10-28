import assert from 'assert'
import Chirashi from '../../src'

window.describe('chirashi#debounce', () => {
  window.it('should be a function', () => {
    assert.equal(typeof Chirashi.debounce, 'function')
  })

  window.it('should debounce calls', (done) => {
    let immediateCalled = 0
    let a = false
    let b = false

    function immediateCallback (argA = false, argB = false) {
      a = argA
      b = argB

      ++immediateCalled
    }

    const immediateDebounced = Chirashi.debounce(immediateCallback, 100, true)

    immediateDebounced(true, true)
    assert.equal(immediateCalled, 1, 'should support immediate call')
    assert.ok(a && b, 'should support arguments with immediate')

    let called = 0
    let c = false
    let d = false

    function callback (argC = false, argD = false) {
      c = argC
      d = argD

      ++called
    }

    const debounced = Chirashi.debounce(callback, 100)
    debounced(true, true)
    assert.equal(called, 0, 'should delay immediate call')

    setTimeout(debounced.bind(null, true, true), 10)
    setTimeout(debounced.bind(null, true, true), 20)
    setTimeout(debounced.bind(null, true, true), 30)

    setTimeout(() => {
      assert.equal(called, 1, 'should call debounced wait time after last call')
      assert.ok(c && d, 'should support arguments')
    }, 160)

    setTimeout(() => {
      debounced(true, true)
    }, 170)

    setTimeout(() => {
      debounced.cancel()
    }, 190)

    setTimeout(() => {
      assert.equal(called, 1, 'should cancel call')
      done()
    }, 280)
  })
})
