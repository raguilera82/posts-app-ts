import { Author } from '../../domain/model/entities/author.entity';
import { AuthorRepository } from '../../domain/repositories/author.repository';
import { AuthorModel } from './author.schema';


export class AuthorRepositoryMongo implements AuthorRepository {

    async persist(author: Author): Promise<void> {
        const docAuthor = {
            id: author.id.value,
            name: author.name.value,
            nickname: author.nickname.value
        };
        const authorModel = new AuthorModel(docAuthor);
        await authorModel.save();
    }

}