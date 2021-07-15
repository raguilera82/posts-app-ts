import { NameAuthorVO } from './name-author.vo';

describe('Name Author VO', () => {

    it('should create', () => {

        const nameAuthor = 'Rubén Aguilera';
        const nameAuthorVO = NameAuthorVO.create(nameAuthor);

        expect(nameAuthor).toEqual(nameAuthorVO.value);

    });

    it('should throw error when name author is empty', () => {
        const nameAuthor = '';
        expect(() => NameAuthorVO.create(nameAuthor)).toThrow('El nombre de autor es requerido');
    });

    it('should throw error when name author is too short', () => {
        const nameAuthor = 'Pepe';
        expect(() => NameAuthorVO.create(nameAuthor)).toThrow('El nombre de autor no puede ser inferior a 5 caracteres');
    });

    it('should throw error when name author is too long', () => {
        const nameAuthor = 'IayBoIr6xoo7zysnsOx7RL5fF10LWbc';
        expect(() => NameAuthorVO.create(nameAuthor)).toThrow('El nombre de autor no puede ser superior a 30 caracteres');
    });

});