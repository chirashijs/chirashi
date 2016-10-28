import assert from 'assert'
import Chirashi from '../../src'

window.describe('chirashi#drag', () => {
  window.it('should be a function', () => {
    assert.equal(typeof Chirashi.drag, 'function')
  })

  // window.it('should return element\'s height as Number', () => {
  //   let div = document.createElement('div')
  //   div.classList.add('get-height', 'test')
  //   document.body.appendChild(div)
  //
  //   Object.assign(div.style, {
  //     display: 'block',
  //     border: '20px solid red',
  //     padding: '10px',
  //     height: '200px',
  //     width: '200px'
  //   })
  //
  //   assert.equal(Chirashi.drag(div), 260, 'should return offset height')
  //   assert.equal(Chirashi.drag(div, true), 220, 'should return client height')
  //
  //   document.body.removeChild(div)
  // })
})
