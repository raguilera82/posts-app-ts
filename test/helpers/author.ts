import 'reflect-metadata';


import { AuthorRepository } from './../../src/domain/repositories/author.repository';
import { Container } from 'typedi';

export const resetAuthors = async (): Promise<void> => {

    const authorRepository: AuthorRepository = Container.get('AuthorRepository');
    await authorRepository.deleteAll();

};