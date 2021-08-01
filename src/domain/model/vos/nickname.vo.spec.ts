import { NicknameVO } from './nickname.vo';

describe('Nickname VO', () => {

    it('should create', () => {

        const nickname = 'raguilera';
        const nicknameVO = NicknameVO.create(nickname);

        expect(nickname).toEqual(nicknameVO.value);

    });

    it('should throw error when nickname is empty', () => {
        const nickname = '';
        expect(() => NicknameVO.create(nickname)).toThrow('El nickname es requerido');
    });

    it('should throw error when nickname is too short', () => {
        const nickname = 'Pe';
        expect(() => NicknameVO.create(nickname)).toThrow('El nickname no puede ser inferior a 3 caracteres');
    });

    it('should throw error when nickname is too long', () => {
        const nickname = 'IayBoIr6xoo7zysnsOx7RL5fF10LWbc';
        expect(() => NicknameVO.create(nickname)).toThrow('El nickname no puede ser superior a 10 caracteres');
    });

});