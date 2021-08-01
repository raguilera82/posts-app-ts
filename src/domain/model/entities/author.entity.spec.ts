import { IdVO } from '../vos/id.vo';
import { NameAuthorVO } from '../vos/name-author.vo';
import { NicknameVO } from '../vos/nickname.vo';
import { Author, AuthorType } from './author.entity';

describe('Author entity', () => {

    it('should create an author', () => {
        const id: IdVO = IdVO.create();
        const name: NameAuthorVO = NameAuthorVO.create('Ruben Aguilera');
        const nickname: NicknameVO = NicknameVO.create('raguilera');

        const authorType: AuthorType = {
            id,
            name,
            nickname
        };

        const author: Author = new Author(authorType);

        expect(author.id.value).toEqual(id.value);
        expect(author.name.value).toEqual(name.value);
        expect(author.nickname.value).toEqual(nickname.value);
    });

});