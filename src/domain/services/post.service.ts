import { Comment } from './../model/entities/comment.entity';
import { IdVO } from './../model/vos/id.vo';
import { Post } from './../model/entities/post.entity';
import { PostRepository } from './../repositories/post.repository';
import { Inject, Service } from 'typedi';

@Service()
export class PostService {

    constructor(@Inject('PostRepository') private postRepository: PostRepository) {}

    async create(post: Post): Promise<void> {
        return this.postRepository.save(post);
    }

    async getById(postId: IdVO): Promise<Post | null> {
        return this.postRepository.getById(postId);
    }

    async addComment(post: Post, comment: Comment): Promise<void> {
        post.addComment(comment);
        return this.postRepository.addComment(post);
    }

    async deleteComment(post: Post, idComment: IdVO): Promise<void> {
        post.deleteComment(idComment);
        return this.postRepository.deleteComment(post);
    }

}