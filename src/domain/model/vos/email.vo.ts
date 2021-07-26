export class EmailVO {

    get value(): string {
        return this.email;
    }

    private constructor(private email: string) {}

    static create(email: string): EmailVO {
        return new EmailVO(email);
    }

}