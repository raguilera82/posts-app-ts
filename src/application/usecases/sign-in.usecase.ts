import jwt from 'jsonwebtoken';
import { PasswordVO } from './../../domain/model/vos/password.vo';
import { Service } from 'typedi';
import { ExceptionWithCode } from '../../domain/model/exception-with-code';
import { EmailVO } from '../../domain/model/vos/email.vo';
import { UserService } from '../../domain/services/user.service';

@Service()
export class SignInUseCase {

    constructor(private userService: UserService) {}

    async execute(request: SignInRequest): Promise<string | null> {
        const user = await this.userService.getByEmail(EmailVO.create(request.email));
        if (!user) {
            throw new ExceptionWithCode(404, 'User not found');
        }
        const plainPassword = PasswordVO.create(request.password);
        const isValid = await this.userService.isValidPassword(plainPassword, user);
        if (isValid) {
            return jwt.sign({id: user.id.value}, 'secret', {expiresIn: 86400});
        }
        return null;
    }

}

export type SignInRequest = {
    email: string;
    password: string;
}