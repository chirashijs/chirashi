import assert from 'assert';
import { forElements } from '../../src';

describe('chirashi#forElements', () => {
    const elements = [0, 1, 2];

    it('should be a function', () => {
        assert.equal(typeof forElements, 'function');
    });

    it('should execute callback on array', () => {
        let i = list.length-1;
        forEach(list, (item) => {
            assert.equal(list[i--], item);
        });
    });

    it('should execute callback on singleton', () => {
        forEach('test', (item) => {
            assert.equal('test', item);
        });
    });
});
