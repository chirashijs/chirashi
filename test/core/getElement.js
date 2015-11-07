import assert from 'assert';
import getElement from '../../src/core/get-element';

describe('chirashi#getElement', () => {
    it('should return a function', () => {
        assert.equal(typeof getElement, 'function');
    });

    it('should return element', () => {
      let div = document.createElement('div');
      div.classList.add('test');
      document.body.appendChild(div);

      assert.equal(div, getElement(div), 'should works for dom element');
      assert.equal(div, getElement('div'), 'should works for tag selector');
      assert.equal(div, getElement('.test'), 'should works for class selector');
      assert.equal(div, getElement([div, 'test']), 'should return first for array');
      assert.equal(null, getElement('.unknown'), 'should return null for unknown');

      document.body.removeChild(div);
    });
});
