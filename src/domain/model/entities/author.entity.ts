import { IdVO } from '../vos/id.vo';
import { NameAuthorVO } from '../vos/name-author.vo';
import { NicknameAuthorVO } from '../vos/nickname-author.vo';

export type AuthorType = {
    id: IdVO;
    name: NameAuthorVO;
    nickname: NicknameAuthorVO;
}

export class Author {

    constructor(private author: AuthorType) {}

    get id(): string {
        return this.author.id.value;
    }

    get name(): string {
        return this.author.name.value;
    }

    get nickname(): string {
        return this.author.nickname.value;
    }

}