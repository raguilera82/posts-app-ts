import { logger } from './../../../infrastructure/config/logger';
import { Author } from './../../../domain/model/entities/author.entity';
import { AuthorService } from './../../../domain/services/author.service';
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

    constructor(private postService: PostService, private authorService: AuthorService) {}

    async execute(request: AddCommentRequest): Promise<void> {

        const post: Post | null = await this.postService.getById(IdVO.createWithUUID(request.postId));
        if (!post) {
            throw new ExceptionWithCode(404, 'Post not found');
        }

        const author: Author | null = await this.authorService.getByNickname(NicknameVO.create(request.nicknameComment));
        if (!author) {
            throw new ExceptionWithCode(404, 'Author not found');
        }

        logger.debug(`Nickname author ${author.nickname.value}`);

        const commentData: CommentType = {
            id: IdVO.create(),
            content: ContentCommentVO.create(request.contentComment),
            nickname: author.nickname,
            timestamp: TimestampVO.create()
        };

        post.addComment(new Comment(commentData));

        await this.postService.addComment(post, new Comment(commentData));

    }

}

export type AddCommentRequest = {
    postId: string;
    nicknameComment: string;
    contentComment: string;
}