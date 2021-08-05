import { ExceptionWithCode } from './../exception-with-code';
export class NameAuthorVO {

    private static readonly MIN_LENGTH = 5;
    private static readonly MAX_LENGTH = 30;

    get value(): string {
        return this.nameAuthor;
    }

    private constructor(private nameAuthor: string) {}

    static create(nameAuthor: string): NameAuthorVO {
        if (!nameAuthor) {
            throw new ExceptionWithCode(400, 'El nombre de autor es requerido');
        }
        if (nameAuthor.length < this.MIN_LENGTH) {
            throw new ExceptionWithCode(400, `El nombre de autor no puede ser inferior a ${this.MIN_LENGTH} caracteres`);
        }
        if (nameAuthor.length > this.MAX_LENGTH) {
            throw new ExceptionWithCode(400, `El nombre de autor no puede ser superior a ${this.MAX_LENGTH} caracteres`);
        }
        return new NameAuthorVO(nameAuthor);
    }
}