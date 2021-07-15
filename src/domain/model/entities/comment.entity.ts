import { ContentCommentVO } from '../vos/content-comment.vo';
import { NicknameAuthorVO } from '../vos/nickname-author.vo';

export type CommentType = {
    nickname: NicknameAuthorVO;
    content: ContentCommentVO;
    timestamp: string;
}

export class Comment {

    constructor(private comment: CommentType) {}

    get nickname(): string {
        return this.comment.nickname.value;
    }

    get content(): string {
        return this.comment.content.value;
    }

    get timestamp(): string {
        return this.comment.timestamp;
    }
}