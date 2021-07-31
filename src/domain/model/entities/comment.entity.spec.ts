import { IdVO } from './../vos/id.vo';
import { ContentCommentVO } from '../vos/content-comment.vo';
import { NicknameAuthorVO } from '../vos/nickname-author.vo';
import { TimestampVO } from '../vos/timestamp.vo';
import { CommentType, Comment } from './comment.entity';

describe('Comment', () => {
    it ('should create a comment', () => {
        const idComment = IdVO.create();
        const nicknameAuthor = NicknameAuthorVO.create('raguilera');
        const contentComment = ContentCommentVO.create('Este es el contenido');
        const timestampComment = TimestampVO.create();

        const commentType: CommentType = {
            id: idComment,
            content: contentComment,
            nickname: nicknameAuthor,
            timestamp: timestampComment
        };
        const comment: Comment = new Comment(commentType);

        expect(comment.nickname.value).toEqual(nicknameAuthor.value);
        expect(comment.content.value).toEqual(contentComment.value);
        expect(comment.timestamp.value).toEqual(timestampComment.value);

    });
});