import assert from 'assert'
import $ from '../../src'

describe('chirashi#Style', () => {
    let div = document.createElement('p')
    document.body.appendChild(div)

    it('should return a function', () => {
        assert.equal(typeof $.style, 'function')
    })

    it('should set style div', () => {
        $.style(div, {
            marginTop: 10
        })

        console.log(div.style.marginTop)

        assert.equal(div.style.marginTop, '10px')
    })
})
