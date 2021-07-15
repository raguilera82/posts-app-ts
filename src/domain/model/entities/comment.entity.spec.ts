import { ContentCommentVO } from '../vos/content-comment.vo';
import { NicknameAuthorVO } from '../vos/nickname-author.vo';
import { TimestampVO } from '../vos/timestamp.vo';
import { CommentType, Comment } from './comment.entity';

describe('Comment', () => {
    it ('should create a comment', () => {
        const nicknameAuthor = NicknameAuthorVO.create('raguilera');
        const contentComment = ContentCommentVO.create('Este es el contenido');
        const timestampComment = TimestampVO.create();

        const commentType: CommentType = {
            content: contentComment,
            nickname: nicknameAuthor,
            timestamp: timestampComment
        };
        const comment: Comment = new Comment(commentType);

        expect(comment.nickname).toEqual(nicknameAuthor.value);
        expect(comment.content).toEqual(contentComment.value);
        expect(comment.timestamp).toEqual(timestampComment.value);

    });
});