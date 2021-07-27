import { PasswordVO } from './../../domain/model/vos/password.vo';
import { Service } from 'typedi';
import { ExceptionWithCode } from '../../domain/model/exception-with-code';
import { EmailVO } from '../../domain/model/vos/email.vo';
import { UserService } from '../../domain/services/user.service';

@Service()
export class SignInUseCase {

    constructor(private userService: UserService) {}

    async execute(request: SignInRequest): Promise<boolean> {
        const user = await this.userService.getByEmail(EmailVO.create(request.email));
        if (!user) {
            throw new ExceptionWithCode(404, 'User not found');
        }
        const plainPassword = PasswordVO.create(request.password);
        return this.userService.isValidPassword(plainPassword, user);
    }

}

export type SignInRequest = {
    email: string;
    password: string;
}