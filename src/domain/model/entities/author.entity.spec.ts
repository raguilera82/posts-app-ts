import { IdVO } from '../vos/id.vo';
import { NameAuthorVO } from '../vos/name-author.vo';
import { NicknameAuthorVO } from '../vos/nickname-author.vo';
import { Author, AuthorType } from './author.entity';

describe('Author entity', () => {

    it('should create an author', () => {
        const id: IdVO = IdVO.create();
        const name: NameAuthorVO = NameAuthorVO.create('Ruben Aguilera');
        const nickname: NicknameAuthorVO = NicknameAuthorVO.create('raguilera');

        const authorType: AuthorType = {
            id,
            name,
            nickname
        };

        const author: Author = new Author(authorType);

        expect(author.id).toEqual(id.value);
        expect(author.name).toEqual(name.value);
        expect(author.nickname).toEqual(nickname.value);
    });

});