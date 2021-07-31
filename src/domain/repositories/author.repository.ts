import { Author } from './../model/entities/author.entity';
export interface AuthorRepository {

    persist(author: Author): Promise<void>;

}