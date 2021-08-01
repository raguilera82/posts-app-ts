import { NicknameVO } from '../model/vos/nickname.vo';
import { Author } from './../model/entities/author.entity';
export interface AuthorRepository {

    persist(author: Author): Promise<void>;

    searchByNickname(nickname: NicknameVO): Promise<Author | null>;

}