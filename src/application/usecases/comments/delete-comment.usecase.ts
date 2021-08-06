import { Role } from './../../../domain/model/vos/role.vo';
import { User } from './../../../domain/model/entities/user.entity';
import { IdVO } from './../../../domain/model/vos/id.vo';
import { AuthorService } from './../../../domain/services/author.service';
import { logger } from './../../../infrastructure/config/logger';
import { ExceptionWithCode } from './../../../domain/model/exception-with-code';
import { Post } from './../../../domain/model/entities/post.entity';
import { PostService } from './../../../domain/services/post.service';
import { Service } from 'typedi';

@Service()
export class DeleteCommentUseCase {

    constructor(private postService: PostService, private authorService: AuthorService) {}

    async execute(request: DeleteCommentRequest): Promise<void> {

        logger.info(`Execute Delete Comment Use with ${JSON.stringify(request)}`);

        const post: Post | null = await this.postService.getById(IdVO.createWithUUID(request.idPost));
        if (!post) {
            throw new ExceptionWithCode(404, 'Post not found');
        }

        const idComment = IdVO.createWithUUID(request.idComment);
        const comment = post.getCommentById(idComment);

        const author = await this.authorService.getById(IdVO.createWithUUID(request.user.id.value));
        logger.info(`${comment?.nickname.value} !== ${author?.nickname.value}`);

        if (comment?.nickname.value !== author?.nickname.value && request.user.role.value !== Role.ADMIN) {
            throw new ExceptionWithCode(403, 'Not allow delete this comment');
        }

        await this.postService.deleteComment(post, idComment);

    }

}

export type DeleteCommentRequest = {
    idPost: string;
    idComment: string;
    user: User;
}