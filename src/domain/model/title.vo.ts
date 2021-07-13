export class TitleVO {

    private static readonly MIN_LENGTH = 5;
    private static readonly MAX_LENGTH = 30;

    get value(): string {
        return this.title;
    }

    private constructor(private title: string) {}

    static create(title: string): TitleVO {
        if (title.length < this.MIN_LENGTH) {
            throw new Error(`Content no puede ser inferior a ${this.MIN_LENGTH} caracteres`);
        }
        if (title.length > this.MAX_LENGTH) {
            throw new Error(`Content no puede ser superior a ${this.MAX_LENGTH} caracteres`);
        }
        return new TitleVO(title);
    }
}