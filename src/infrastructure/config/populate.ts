import { AddCommentUseCase, AddCommentRequest } from './../../application/usecases/comments/add-comment.usecase';
import { CreatePostUseCase, CreatePostRequest } from './../../application/usecases/posts/create-post.usecase';
import { AuthorService } from './../../domain/services/author.service';
import { CreateAuthorUseCase } from './../../application/usecases/authors/create-author.usecase';
import { User, UserType } from './../../domain/model/entities/user.entity';
import { UserService } from './../../domain/services/user.service';
import { Container } from 'typedi';
import { CreateOffensiveWordUseCase } from '../../application/usecases/offensive-word/create-offensive-word.usecase';
import { GetAllOffensiveWordsUseCase } from '../../application/usecases/offensive-word/get-all-offensive-word.usecase';
import { OffensiveWordResponse } from '../../application/usecases/offensive-word/offensive-word.response';
import { IdVO } from '../../domain/model/vos/id.vo';
import { EmailVO } from '../../domain/model/vos/email.vo';
import { PasswordVO } from '../../domain/model/vos/password.vo';
import { Role, RoleVO } from '../../domain/model/vos/role.vo';
import { NicknameVO } from '../../domain/model/vos/nickname.vo';


const populate = async (): Promise<void> => {
    const useCaseGetAll = Container.get(GetAllOffensiveWordsUseCase);
    const offensiveWords: OffensiveWordResponse[] = await useCaseGetAll.execute();

    if (offensiveWords.length === 0) {
        const useCaseCreateOffensiveWord = Container.get(CreateOffensiveWordUseCase);
        useCaseCreateOffensiveWord.execute({word: 'App', level: 3});
    }

    const authorService = Container.get(AuthorService);
    const author = await authorService.getByNickname(NicknameVO.create('Prueba'));
    console.log('author', author);
    if (!author) {
        console.log('Introduzco author');
        const useCaseCreateAuthor = Container.get(CreateAuthorUseCase);
        await useCaseCreateAuthor.execute({name: 'Prueba', nickname: 'Prueba'});    
    }
    
    const userService = Container.get(UserService);
    const userData: UserType = {
        email: EmailVO.create('admin@example.org'),
        password: PasswordVO.create('password'),
        id: IdVO.create(),
        role: RoleVO.create(Role.ADMIN)
    };

    await userService.persist(new User(userData));

    const createPostUseCase = Container.get(CreatePostUseCase);
    const createPostRequest: CreatePostRequest = {
        authorNickname: 'Prueba',
        content: 'Contenido de prueba Contenido de prueba Contenido de prueba Contenido de prueba Contenido de prueba',
        title: 'Título de prueba'
    };
    const postId = await createPostUseCase.execute(createPostRequest);

    const addCommentUseCase = Container.get(AddCommentUseCase);
    const addCommentRequest: AddCommentRequest = {
        postId: postId.id,
        contentComment: 'Este es el contenido de comentario',
        nicknameComment: 'cuñado'
    };
    await addCommentUseCase.execute(addCommentRequest);

};

export { populate as populateDatabases };