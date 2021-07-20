import { validate, v4 } from 'uuid';

export class IdVO {

    get value(): string {
        return this.id;
    }

    private constructor(private id: string) {}

    static createWithUUID(uuid: string): IdVO {
        if (!validate(uuid)) {
            throw new Error('ID no es un UUID');
        }
        return new IdVO(uuid);
    }

    static create(): IdVO {
        return new IdVO(v4());
    }

}