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
    let i = 0
    forElements(wasabiSalmonSushi, element => {
      assert.equal(s1[i++], element, 'should work for dom element')
    })

    const s2 = [wasabiSalmonSushi, salmonSushi]
    let j = 0
    const elements = forElements(document.querySelectorAll('.sushi.salmon'), element => {
      assert.equal(s2[j++], element, 'should work for nodelist')
    })

    const s3 = [wasabiSalmonSushi, salmonSushi, tunaSushi]
    let h = 0
    forElements('.sushi', element => {
      assert.equal(s3[h++], element, 'should work for tag selector')
    })

    const s4 = [wasabiSalmonSushi, salmonSushi, tunaSushi]
    let k = 0
    forElements('.sushi.salmon, .sushi.tuna', element => {
      assert.equal(s4[k++], element, 'should work for class selector')
    })

    elements.push('.sushi.tuna', '.unknown')
    const s5 = [wasabiSalmonSushi, salmonSushi, tunaSushi]
    let l = 0
    forElements(elements, element => {
      assert.equal(s5[l++], element, 'should extract dom elements from array')
    })

    const s6 = [wasabiSalmonSushi, salmonSushi, tunaSushi]
    let m = 0
    forElements(['.sushi.salmon', '.sushi.tuna'], element => {
      assert.equal(s6[m++], element, 'should work for array of selectors')
    })

    document.body.removeChild(wasabiSalmonSushi)
    document.body.removeChild(salmonSushi)
    document.body.removeChild(tunaSushi)
  })
})
