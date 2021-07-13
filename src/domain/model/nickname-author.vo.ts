export class NicknameAuthorVO {

    private static readonly MIN_LENGTH = 0;
    private static readonly MAX_LENGTH = 30;

    get value(): string {
        return this.nicknameAuthor;
    }

    private constructor(private nicknameAuthor: string) {}

    static create(nicknameAuthor: string): NicknameAuthorVO {
        if (nicknameAuthor.length < this.MIN_LENGTH) {
            throw new Error(`El nickname de autor no puede ser inferior a ${this.MIN_LENGTH} caracteres`);
        }
        if (nicknameAuthor.length > this.MAX_LENGTH) {
            throw new Error(`El nickname de autor no puede ser superior a ${this.MAX_LENGTH} caracteres`);
        }
        return new NicknameAuthorVO(nicknameAuthor);
    }
}