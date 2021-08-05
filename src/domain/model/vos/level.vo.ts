import { ExceptionWithCode } from './../exception-with-code';
export class LevelVO {

    get value(): number {
        return this.level;
    }

    private constructor(private level: number) {}

    static create(level: number): LevelVO {
        if (level < 1 || level > 5) {
            throw new ExceptionWithCode(400, `${level} no válido. Tiene que estar entre 1 y 5`);
        }
        return new LevelVO(level);
    }

}