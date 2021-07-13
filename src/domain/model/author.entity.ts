import { IdVO } from './id.vo';
import { NameAuthorVO } from './name-author.vo';
import { NicknameAuthorVO } from './nickname-author.vo';

export type Author = {
    id: IdVO;
    name: NameAuthorVO;
    nickname: NicknameAuthorVO;
}

export class AuthorEntity {

    constructor(private author: Author) {}

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