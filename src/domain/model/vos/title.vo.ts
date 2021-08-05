import { ExceptionWithCode } from './../exception-with-code';
export class TitleVO {

    private static readonly MIN_LENGTH = 5;
    private static readonly MAX_LENGTH = 30;

    get value(): string {
        return this.title;
    }

    private constructor(private title: string) {}

    static create(title: string): TitleVO {
        if (!title) {
            throw new ExceptionWithCode(400, 'El título es requerido');
        }
        if (title.length < this.MIN_LENGTH) {
            throw new ExceptionWithCode(400, `El título no puede ser inferior a ${this.MIN_LENGTH} caracteres`);
        }
        if (title.length > this.MAX_LENGTH) {
            throw new ExceptionWithCode(400, `El título no puede ser superior a ${this.MAX_LENGTH} caracteres`);
        }
        return new TitleVO(title);
    }
}