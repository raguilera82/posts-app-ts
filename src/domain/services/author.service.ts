import { AuthorRepository } from './../repositories/author.repository';
import { Inject, Service } from 'typedi';
import { Author } from '../model/entities/author.entity';

@Service()
export class AuthorService {

    constructor(@Inject('AuthorRepository') private authorRepository: AuthorRepository) {}

    async create(author: Author): Promise<void> {
        return this.authorRepository.persist(author);
    }

}