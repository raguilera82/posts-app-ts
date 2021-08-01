import { NicknameVO } from './../../../domain/model/vos/nickname.vo';
import { Comment, CommentType } from './../../../domain/model/entities/comment.entity';
import { ExceptionWithCode } from './../../../domain/model/exception-with-code';
import { IdVO } from '../../../domain/model/vos/id.vo';
import { PostService } from './../../../domain/services/post.service';
import { ContentCommentVO } from '../../../domain/model/vos/content-comment.vo';
import { TimestampVO } from '../../../domain/model/vos/timestamp.vo';
import { Post } from '../../../domain/model/entities/post.entity';
import { Service } from 'typedi';

@Service()
export class AddCommentUseCase {

    constructor(private postService: PostService) {}

    async execute(request: AddCommentRequest) {

        const post: Post | null = await this.postService.getById(IdVO.createWithUUID(request.postId));
        if (!post) {
            throw new ExceptionWithCode(404, 'Post not found');
        }

        const commentData: CommentType = {
            id: IdVO.create(),
            content: ContentCommentVO.create(request.contentComment),
            nickname: NicknameVO.create(request.nicknameComment),
            timestamp: TimestampVO.create()
        };

        //post.addComment(new Comment(commentData));

        await this.postService.addComment(post, new Comment(commentData));

    }

}

export type AddCommentRequest = {
    postId: string;
    nicknameComment: string;
    contentComment: string;
}