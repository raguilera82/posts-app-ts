import { isUuid } from 'uuidv4';

export class IdVO {

    get value(): string {
        return this.id;
    }

    private constructor(private id: string) {}

    static create(id: string): IdVO {
        if (!isUuid(id)) {
            throw new Error('ID no es un UUID');
        }
        return new IdVO(id);
    }

}