export class ContentCommentVO {

    private static readonly MIN_LENGTH = 10;
    private static readonly MAX_LENGTH = 200;

    get value(): string {
        return this.content;
    }

    private constructor(private content: string) {}

    static create(content: string): ContentCommentVO {
        const long = content.length;
        if (content.length < this.MIN_LENGTH) {
            throw new Error(`Te faltan ${this.MIN_LENGTH - long} caracteres`);
        }
        if (content.length > this.MAX_LENGTH) {
            throw new Error(`Te sobran ${long - this.MAX_LENGTH} caracteres`);
        }
        return new ContentCommentVO(content);
    }

}