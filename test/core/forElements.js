import assert from 'assert'
import Chirashi from '../../src'

window.describe('chirashi#forElements', () => {
  window.it('should be a function', () => {
    assert.equal(typeof Chirashi.forElements, 'function')
  })

  window.it('should execute callback on elements', () => {
    let div = document.createElement('div')
    div.classList.add('test')
    document.body.appendChild(div)

    let div2 = document.createElement('div')
    div2.classList.add('test')
    document.body.appendChild(div2)

    let div3 = document.createElement('div')
    div3.classList.add('test2')
    document.body.appendChild(div3)

    let array1 = [div]
    let i = array1.length
    while (i--) {
      Chirashi.forElements(div, element => {
        assert.equal(array1[i], element, 'should work for dom element')
      })
    }

    let array2 = [div, div2]
    let j = array2.length
    Chirashi.forElements(document.querySelectorAll('.test'), element => {
      assert.equal(array2[--j], element, 'should work for nodelist')
    })

    let array3 = [div, div2, div3]
    let h = array3.length
    Chirashi.forElements('div', element => {
      assert.equal(array3[--h], element, 'should work for tag selector')
    })

    let array4 = [div, div2, div3]
    let k = array4.length
    Chirashi.forElements('.test, .test2', element => {
      assert.equal(array4[--k], element, 'should work for class selector')
    })

    let array5 = [div3, div2, div]
    let l = array5.length
    Chirashi.forElements([div, div2, '.test2', '.unknown'], element => {
      assert.equal(array5[--l], element, 'should extract dom elements from array')
    })

    let array6 = [div3, div, div2]
    let m = array6.length
    Chirashi.forElements(['.test', '.test2'], element => {
      assert.equal(array6[--m], element, 'should work for array of selectors')
    })

    document.body.removeChild(div)
    document.body.removeChild(div2)
    document.body.removeChild(div3)
  })
})
