import 'reflect-metadata';


import { AuthorRepository } from './../../src/domain/repositories/author.repository';
import { Container } from 'typedi';
import { AuthorType, Author } from '../../src/domain/model/entities/author.entity';
import { IdVO } from '../../src/domain/model/vos/id.vo';
import { NameAuthorVO } from '../../src/domain/model/vos/name-author.vo';
import { NicknameVO } from '../../src/domain/model/vos/nickname.vo';
import { AuthorService } from '../../src/domain/services/author.service';

export const resetAuthors = async (): Promise<void> => {

    const authorRepository: AuthorRepository = Container.get('AuthorRepository');
    await authorRepository.deleteAll();

};

export const createAuthor = async (): Promise<void> => {

    const authorService = Container.get(AuthorService);
    const idAuthor = IdVO.create();
    const authorData: AuthorType = {
        id: idAuthor,
        name: NameAuthorVO.create('Miguel de Cervantes'),
        nickname: NicknameVO.create('Cervantes')
    };
    await authorService.create(new Author(authorData));

};