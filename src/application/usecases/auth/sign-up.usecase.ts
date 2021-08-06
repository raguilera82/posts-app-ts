import { User } from './../../../domain/model/entities/user.entity';
import { Role, RoleVO } from './../../../domain/model/vos/role.vo';
import { Service } from 'typedi';
import { UserType } from '../../../domain/model/entities/user.entity';
import { EmailVO } from '../../../domain/model/vos/email.vo';
import { IdVO } from '../../../domain/model/vos/id.vo';
import { PasswordVO } from '../../../domain/model/vos/password.vo';
import { UserService } from '../../../domain/services/user.service';

@Service()
export class SignUpUseCase {

    constructor(private userService: UserService) {}

    async execute(request: SignUpRequest): Promise<void> {
        const user: UserType = {
            id: IdVO.create(),
            email: EmailVO.create(request.email),
            password: PasswordVO.create(request.password),
            role: RoleVO.create(Role.PUBLISHER)
        };
        await this.userService.persist(new User(user));
    }

}

export type SignUpRequest = {
    email: string;
    password: string;
}