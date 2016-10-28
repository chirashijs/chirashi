import assert from 'assert'
import Chirashi from '../../src'

window.describe('chirashi#throttle', () => {
  window.it('should be a function', () => {
    assert.equal(typeof Chirashi.throttle, 'function')
  })

  window.it('should throttle calls', (done) => {
    let optionsCalled = 0
    let a = false
    let b = false

    function optionsCallback (argA = false, argB = false) {
      a = argA
      b = argB

      ++optionsCalled
    }

    const optionsThrottled = Chirashi.throttle(optionsCallback, 100)

    optionsThrottled(true, true)
    assert.equal(optionsCalled, 1, 'should support leading option')
    assert.ok(a && b, 'should support arguments')

    setTimeout(optionsThrottled.bind(null, true, true), 20)

    setTimeout(() => {
      assert.equal(optionsCalled, 2, 'should support trailing option')
    }, 130)

    let called = 0
    let c = false
    let d = false

    function callback (argC = false, argD = false) {
      c = argC
      d = argD

      ++called
    }

    const throttled = Chirashi.throttle(callback, 100, false, false)

    throttled(null, null)
    setTimeout(throttled.bind(null, true, true), 140)
    setTimeout(throttled.bind(null, true, true), 170)
    setTimeout(throttled.bind(null, true, true), 190)

    setTimeout(() => {
      assert.equal(called, 1, 'should throttle calls')
      assert.ok(c && d, 'should support arguments')

      throttled(true, true)
    }, 250)

    setTimeout(() => {
      throttled.cancel()
    }, 280)

    setTimeout(() => {
      assert.equal(called, 1, 'should cancel throttle calls')

      done()
    }, 400)
  })
})
