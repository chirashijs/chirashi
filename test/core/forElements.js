import assert from 'assert';
import forElements from '../../src/core/for-elements';

describe('chirashi#forElements', () => {
    const elements = [0, 1, 2];

    it('should be a function', () => {
        assert.equal(typeof forElements, 'function');
    });

    it('should execute callback on elements', () => {
      let div = document.createElement('div');
      div.classList.add('test');
      document.body.appendChild(div);

      let div2 = document.createElement('div');
      div2.classList.add('test');
      document.body.appendChild(div2);

      let div3 = document.createElement('div');
      div3.classList.add('test2');
      document.body.appendChild(div3);

      let array1 = [div], i = array1.length;
      while(i--) {
        forElements(div, (element) => {
          assert.equal(array1[i], element, 'should works for dom element');
        });
      }

      let array2 = [div, div2], j = array2.length;
      forElements(document.querySelectorAll('.test'), (element) => {
        assert.equal(array2[--j], element, 'should works for nodelist');
      });

      let array3 = [div, div2, div3], h = array3.length;
      forElements('div', (element) => {
        assert.equal(array3[--h], element, 'should works for tag selector');
      });

      let array4 = [div, div2, div3], k = array4.length;
      forElements('.test, .test2', (element) => {
        assert.equal(array4[--k], element, 'should works for class selector');
      });

      let array5 = [div3, div2, div], l = array5.length;
      forElements([div, div2, '.test2', '.unknown'], (element) => {
        assert.equal(array5[--l], element, 'should extract dom elements from array');
      });

      let array6 = [div3, div, div2], m = array6.length;
      forElements(['.test', '.test2'], (element) => {
        assert.equal(array6[--m], element, 'should works for array of selectors');
      });

      document.body.removeChild(div);
      document.body.removeChild(div2);
      document.body.removeChild(div3);
    });
});
