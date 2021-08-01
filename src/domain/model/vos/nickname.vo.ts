export class NicknameVO {

    private static readonly MIN_LENGTH = 3;
    private static readonly MAX_LENGTH = 10;

    get value(): string {
        return this.nickname;
    }

    private constructor(private nickname: string) {}

    static create(nickname: string): NicknameVO {
        if (!nickname) {
            throw new Error('El nickname es requerido');
        }
        if (nickname.length < this.MIN_LENGTH) {
            throw new Error(`El nickname no puede ser inferior a ${this.MIN_LENGTH} caracteres`);
        }
        if (nickname.length > this.MAX_LENGTH) {
            throw new Error(`El nickname no puede ser superior a ${this.MAX_LENGTH} caracteres`);
        }
        return new NicknameVO(nickname);
    }
}