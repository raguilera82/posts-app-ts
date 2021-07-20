import { v4, validate } from 'uuid';
import { IdVO } from './id.vo';

describe('Id VO', () => {

    it('should create id', () => {
        const id = IdVO.create();
        expect(validate(id.value)).toBeTruthy();
    });

    it('should create id with uuid', () => {
        const id = IdVO.createWithUUID(v4());
        expect(validate(id.value)).toBeTruthy();
    });

    it('should throw error when id is not uuid', () => {
        expect(() => IdVO.createWithUUID('no-uuid')).toThrow('ID no es un UUID');
    });

});