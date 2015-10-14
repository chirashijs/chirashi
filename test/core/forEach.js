import assert from 'assert';
import { forEach } from '../../src';

describe('chirashi#forEach', () => {
    const list = ['.test-1', '.test-2', '.test-3'];

    it('should return a function', () => {
        assert.equal(typeof forEach, 'function');
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
