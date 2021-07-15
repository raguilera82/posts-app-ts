import { NicknameAuthorVO } from './nickname-author.vo';

describe('Nickname Author VO', () => {

    it('should create', () => {

        const nicknameAuthor = 'raguilera';
        const nicknameAuthorVO = NicknameAuthorVO.create(nicknameAuthor);

        expect(nicknameAuthor).toEqual(nicknameAuthorVO.value);

    });

    it('should throw error when nickname author is empty', () => {
        const nicknameAuthor = '';
        expect(() => NicknameAuthorVO.create(nicknameAuthor)).toThrow('El nickname de autor es requerido');
    });

    it('should throw error when nickname author is too short', () => {
        const nicknameAuthor = 'Pe';
        expect(() => NicknameAuthorVO.create(nicknameAuthor)).toThrow('El nickname de autor no puede ser inferior a 3 caracteres');
    });

    it('should throw error when nickname author is too long', () => {
        const nicknameAuthor = 'IayBoIr6xoo7zysnsOx7RL5fF10LWbc';
        expect(() => NicknameAuthorVO.create(nicknameAuthor)).toThrow('El nickname de autor no puede ser superior a 10 caracteres');
    });

});