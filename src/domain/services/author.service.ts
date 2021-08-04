import { IdVO } from './../model/vos/id.vo';
import { NicknameVO } from '../model/vos/nickname.vo';
import { AuthorRepository } from './../repositories/author.repository';
import { Inject, Service } from 'typedi';
import { Author } from '../model/entities/author.entity';

@Service()
export class AuthorService {

    constructor(@Inject('AuthorRepository') private authorRepository: AuthorRepository) {}

    async create(author: Author): Promise<void> {
        return this.authorRepository.persist(author);
    }

    async getByNickname(nickname: NicknameVO): Promise<Author | null> {
        return this.authorRepository.searchByNickname(nickname);
    }

    async deleteById(id: IdVO): Promise<void> {
        this.authorRepository.deleteById(id);
    }

}