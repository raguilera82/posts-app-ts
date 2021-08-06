import { IdVO } from './../model/vos/id.vo';
import { NicknameVO } from '../model/vos/nickname.vo';
import { Author } from './../model/entities/author.entity';
export interface AuthorRepository {

    persist(author: Author): Promise<void>;

    searchByNickname(nickname: NicknameVO): Promise<Author | null>;

    searchById(id: IdVO): Promise<Author | null>;

    deleteById(id: IdVO): Promise<void>;

    deleteAll(): Promise<void>;

}