import { CustomError } from 'ts-custom-error';

export class ExceptionWithCode extends CustomError {
    public constructor(public code: number, message: string) {
        super(message);
    }
}