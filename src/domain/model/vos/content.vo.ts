import { ExceptionWithCode } from './../exception-with-code';
export class ContentVO {

    private static readonly MIN_LENGTH = 50;
    private static readonly MAX_LENGTH = 300;

    get value(): string {
        return this.content;
    }

    private constructor(private content: string) {}

    static create(content: string): ContentVO {
        const long = content.length;
        if (content.length < ContentVO.MIN_LENGTH) {
            throw new ExceptionWithCode(400, `Te faltan ${this.MIN_LENGTH - long} caracteres`);
        }
        if (content.length > ContentVO.MAX_LENGTH) {
            throw new ExceptionWithCode(400, `Te sobran ${long - this.MAX_LENGTH} caracteres`);
        }
        return new ContentVO(content);
    }
}