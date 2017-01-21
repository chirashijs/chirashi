import { assert } from 'chai'
import { forElements } from 'chirashi'

describe('chirashi#forElements', () => {
  it('should be a function', () => {
    assert.isFunction(forElements)
  })

  it('should execute callback on elements', () => {
    const wasabiSalmonSushi = document.createElement('div')
    wasabiSalmonSushi.classList.add('sushi', 'salmon', 'wasabi')
    document.body.appendChild(wasabiSalmonSushi)

    const salmonSushi = document.createElement('div')
    salmonSushi.classList.add('sushi', 'salmon')
    document.body.appendChild(salmonSushi)

    const tunaSushi = document.createElement('div')
    tunaSushi.classList.add('sushi', 'tuna')
    document.body.appendChild(tunaSushi)

    const s1 = [wasabiSalmonSushi]
    let i = s1.length
    while (i--) {
      forElements(wasabiSalmonSushi, element => {
        assert.equal(s1[i], element, 'should work for dom element')
      })
    }

    const s2 = [wasabiSalmonSushi, salmonSushi]
    let j = s2.length
    const elements = forElements(document.querySelectorAll('.sushi.salmon'), element => {
      assert.equal(s2[--j], element, 'should work for nodelist')
    })

    const s3 = [wasabiSalmonSushi, salmonSushi, tunaSushi]
    let h = s3.length
    forElements('.sushi', element => {
      assert.equal(s3[--h], element, 'should work for tag selector')
    })

    const s4 = [wasabiSalmonSushi, salmonSushi, tunaSushi]
    let k = s4.length
    forElements('.sushi.salmon, .sushi.tuna', element => {
      assert.equal(s4[--k], element, 'should work for class selector')
    })

    elements.chrshPush('.sushi.tuna', '.unknown')
    const s5 = [wasabiSalmonSushi, salmonSushi, tunaSushi]
    let l = s5.length
    forElements(elements, element => {
      assert.equal(s5[--l], element, 'should extract dom elements from array')
    })

    const s6 = [tunaSushi, wasabiSalmonSushi, salmonSushi]
    let m = s6.length
    forElements(['.sushi.salmon', '.sushi.tuna'], element => {
      assert.equal(s6[--m], element, 'should work for array of selectors')
    })

    elements.push('.none')
    const s7 = [tunaSushi, salmonSushi, wasabiSalmonSushi]
    let n = s7.length
    forElements(elements, (element, index) => {
      assert.equal(s7[--n], element, 'should invalidate elements')
    })

    document.body.removeChild(wasabiSalmonSushi)
    document.body.removeChild(salmonSushi)
    document.body.removeChild(tunaSushi)
  })
})
