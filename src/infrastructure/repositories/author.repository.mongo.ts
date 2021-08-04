import { AuthorType } from './../../domain/model/entities/author.entity';
import { Author } from '../../domain/model/entities/author.entity';
import { NicknameVO } from '../../domain/model/vos/nickname.vo';
import { AuthorRepository } from '../../domain/repositories/author.repository';
import { AuthorModel } from './author.schema';
import { IdVO } from '../../domain/model/vos/id.vo';
import { NameAuthorVO } from '../../domain/model/vos/name-author.vo';


export class AuthorRepositoryMongo implements AuthorRepository {
    
    async searchByNickname(nickname: NicknameVO): Promise<Author | null> {
        const authorDB = await AuthorModel.findOne({nickname: nickname.value}).exec();

        if (!authorDB) {
            return null;
        }

        const authorData: AuthorType = {
            id: IdVO.createWithUUID(authorDB.id),
            name: NameAuthorVO.create(authorDB.name),
            nickname: NicknameVO.create(authorDB.nickname),
        };

        return new Author(authorData);
    }

    async persist(author: Author): Promise<void> {
        const docAuthor = {
            id: author.id.value,
            name: author.name.value,
            nickname: author.nickname.value
        };
        const authorModel = new AuthorModel(docAuthor);
        await authorModel.save();
    }

    async deleteById(id: IdVO): Promise<void> {
        await AuthorModel.findOneAndDelete({id: id.value});
    }

    async deleteAll(): Promise<void> {
        await AuthorModel.deleteMany({});
    }

}