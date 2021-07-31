import { CreateAuthorUseCase } from './../../application/usecases/authors/create-author.usecase';
import { User, UserType } from './../../domain/model/entities/user.entity';
import { UserService } from './../../domain/services/user.service';
import { Container } from 'typedi';
import { CreateOffensiveWordUseCase } from '../../application/usecases/create-offensive-word.usecase';
import { GetAllOffensiveWordsUseCase } from '../../application/usecases/get-all-offensive-word.usecase';
import { OffensiveWordResponse } from '../../application/usecases/offensive-word.response';
import { IdVO } from '../../domain/model/vos/id.vo';
import { EmailVO } from '../../domain/model/vos/email.vo';
import { PasswordVO } from '../../domain/model/vos/password.vo';
import { Role, RoleVO } from '../../domain/model/vos/role.vo';


const populate = async (): Promise<void> => {
    const useCaseGetAll = Container.get(GetAllOffensiveWordsUseCase);
    const offensiveWords: OffensiveWordResponse[] = await useCaseGetAll.execute();

    if (offensiveWords.length === 0) {
        const useCaseCreateOffensiveWord = Container.get(CreateOffensiveWordUseCase);
        useCaseCreateOffensiveWord.execute({word: 'App', level: 3});
    }

    const useCaseCreateAuthor = Container.get(CreateAuthorUseCase);
    await useCaseCreateAuthor.execute({name: 'Prueba', nickname: 'Prueba'});

    const userService = Container.get(UserService);
    const userData: UserType = {
        email: EmailVO.create('hola@kairosds.com'),
        password: PasswordVO.create('password'),
        id: IdVO.create(),
        role: RoleVO.create(Role.ADMIN)
    };

    await userService.persist(new User(userData));

};

export { populate as populateDatabases };