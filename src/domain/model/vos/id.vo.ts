import { validate } from 'uuid';

export class IdVO {

    get value(): string {
        return this.id;
    }

    private constructor(private id: string) {}

    static create(id: string): IdVO {
        if (!validate(id)) {
            throw new Error('ID no es un UUID');
        }
        return new IdVO(id);
    }

}