import { Author, AuthorType } from './../../../domain/model/entities/author.entity';
import { AuthorService } from './../../../domain/services/author.service';
import { IdVO } from './../../../domain/model/vos/id.vo';
import { User, UserType } from './../../../domain/model/entities/user.entity';
import { UserService } from './../../../domain/services/user.service';
import { Role, RoleVO } from '../../../domain/model/vos/role.vo';
import { PasswordVO } from '../../../domain/model/vos/password.vo';
import { EmailVO } from '../../../domain/model/vos/email.vo';
import { NameAuthorVO } from '../../../domain/model/vos/name-author.vo';
import { NicknameVO } from '../../../domain/model/vos/nickname.vo';
import { Service } from 'typedi';
import { logger } from '../../../infrastructure/config/logger';

@Service()
export class SignUpAuthorUseCase {

    constructor(private userService: UserService, private authorService: AuthorService){}

    async execute(request: SignUpAuthorRequest): Promise<void> {

        logger.debug('entro en SignUpAuthorUseCase');

        const idUser = IdVO.create();

        const userData: UserType = {
            id: idUser,
            email: EmailVO.create(request.email),
            password: PasswordVO.create(request.password),
            role: RoleVO.create(Role.PUBLISHER)
        };
        await this.userService.persist(new User(userData));

        logger.debug('Creado el user');

        const authorData: AuthorType = {
            id: idUser,
            name: NameAuthorVO.create(request.nameAuthor),
            nickname: NicknameVO.create(request.nicknameAuthor)
        };
        await this.authorService.create(new Author(authorData));

        logger.debug('Creado el author');

    }

}

export type SignUpAuthorRequest = {
    nameAuthor: string,
    nicknameAuthor: string,
    email: string,
    password: string
}