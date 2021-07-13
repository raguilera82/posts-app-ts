export class NameAuthorVO {

    private static readonly MIN_LENGTH = 0;
    private static readonly MAX_LENGTH = 30;

    get value(): string {
        return this.nameAuthor;
    }

    private constructor(private nameAuthor: string) {}

    static create(nameAuthor: string): NameAuthorVO {
        if (nameAuthor.length < this.MIN_LENGTH) {
            throw new Error(`El nombre de autor no puede ser inferior a ${this.MIN_LENGTH} caracteres`);
        }
        if (nameAuthor.length > this.MAX_LENGTH) {
            throw new Error(`El nombre de autor no puede ser superior a ${this.MAX_LENGTH} caracteres`);
        }
        return new NameAuthorVO(nameAuthor);
    }
}