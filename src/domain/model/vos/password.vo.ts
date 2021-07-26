export class PasswordVO {

    get value(): string {
        return this.password;
    }

    private constructor(private password: string) {}

    static create(password: string): PasswordVO {
        return new PasswordVO(password);
    }

}