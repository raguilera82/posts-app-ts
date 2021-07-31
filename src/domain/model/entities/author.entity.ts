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

    get id(): IdVO {
        return this.author.id;
    }

    get name(): NameAuthorVO {
        return this.author.name;
    }

    get nickname(): NicknameAuthorVO {
        return this.author.nickname;
    }

}