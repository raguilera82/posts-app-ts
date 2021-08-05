import { logger } from './../../../infrastructure/config/logger';
import { ExceptionWithCode } from './../../../domain/model/exception-with-code';
import { Post } from './../../../domain/model/entities/post.entity';
import { IdVO } from '../../../domain/model/vos/id.vo';
import { PostService } from './../../../domain/services/post.service';
import { Service } from 'typedi';

@Service()
export class DeleteCommentUseCase {

    constructor(private postService: PostService) {}

    async execute(request: DeleteCommentRequest): Promise<void> {

        logger.debug(`Execute Delete Comment Use with ${JSON.stringify(request)}`);

        const post: Post | null = await this.postService.getById(IdVO.createWithUUID(request.idPost));
        if (!post) {
            throw new ExceptionWithCode(404, 'Post not found');
        }

        const idComment = IdVO.createWithUUID(request.idComment);
        post.deleteComment(idComment);
        logger.debug(`After delete comment memory ${JSON.stringify(post)}`);
        await this.postService.deleteComment(post, idComment);

    }

}

export type DeleteCommentRequest = {
    idPost: string;
    idComment: string;
}