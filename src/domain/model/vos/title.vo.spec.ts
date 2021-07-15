import { TitleVO } from './title.vo';

describe('Title VO', () => {

    it('should created', () => {

        const title = 'Titulo válido';
        const titleVO: TitleVO = TitleVO.create(title);

        expect(title).toEqual(titleVO.value);

    });

    it('should throw error when title is empty', () => {
        const title = '';
        expect(() => TitleVO.create(title)).toThrow('El título es requerido');
    });

    it('should throw error when title is too short', () => {
        const title = '1234';
        expect(() => TitleVO.create(title)).toThrow('El título no puede ser inferior a 5 caracteres');
    });

    it('should throw error when title is too long', () => {
        const title = 'IayBoIr6xoo7zysnsOx7RL5fF10LWbc';
        expect(() => TitleVO.create(title)).toThrow('El título no puede ser superior a 30 caracteres');
    });

});