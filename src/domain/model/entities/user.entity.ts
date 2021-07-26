import { EmailVO } from '../vos/email.vo';
import { IdVO } from '../vos/id.vo';
import { PasswordVO } from '../vos/password.vo';

export type UserType = {
    id: IdVO;
    email: EmailVO;
    password: PasswordVO;
}

export class User {

    constructor(private user: UserType) {}

    get id(): IdVO {
        return this.user.id;
    }

    get email(): EmailVO {
        return this.user.email;
    }

    get password(): PasswordVO {
        return this.user.password;
    }

}