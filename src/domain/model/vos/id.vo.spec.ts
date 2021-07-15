import { v4, validate } from 'uuid';
import { IdVO } from './id.vo';

describe('Id VO', () => {

    it('should create id', () => {
        const id = IdVO.create(v4());
        expect(validate(id.value)).toBeTruthy();
    });

    it('should throw error when id is not uuid', () => {
        expect(() => IdVO.create('no-uuid')).toThrow('ID no es un UUID');
    });

});