import { IdVO } from '../vos/id.vo';
import { NameAuthorVO } from '../vos/name-author.vo';
import { NicknameVO } from '../vos/nickname.vo';

export type AuthorType = {
    id: IdVO;
    name: NameAuthorVO;
    nickname: NicknameVO;
}

export class Author {

    constructor(private author: AuthorType) {}

    get id(): IdVO {
        return this.author.id;
    }

    get name(): NameAuthorVO {
        return this.author.name;
    }

    get nickname(): NicknameVO {
        return this.author.nickname;
    }

}