import {LevelVO} from './level.vo';
describe('Level VO', () => {

    it('should create', () => {
        const minLevel = 1;
        const level = LevelVO.create(minLevel);
        expect(level.value).toBe(minLevel);
    });

    it('should throw error if level is greater', () => {
        const invalidLevel = 10;
        expect(() => LevelVO.create(invalidLevel)).toThrow('10 no válido. Tiene que estar entre 1 y 5');
    });

    it('should throw error if level is lower', () => {
        const invalidLevel = 0;
        expect(() => LevelVO.create(invalidLevel)).toThrow('0 no válido. Tiene que estar entre 1 y 5');
    });

});