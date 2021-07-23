import { validate, v4 } from 'uuid';
import { ExceptionWithCode } from '../exception-with-code';

export class IdVO {

    get value(): string {
        return this.id;
    }

    private constructor(private id: string) {}

    static createWithUUID(uuid: string): IdVO {
        if (!validate(uuid)) {
            throw new ExceptionWithCode(400, 'ID no es un UUID');
        }
        return new IdVO(uuid);
    }

    static create(): IdVO {
        return new IdVO(v4());
    }

}