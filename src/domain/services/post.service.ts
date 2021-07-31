import { Post } from './../model/entities/post.entity';
import { PostRepository } from './../repositories/post.repository';
import { Inject } from 'typedi';

export class PostService {

    constructor(@Inject('PostRepository') private postRepository: PostRepository) {}

    async create(post: Post): Promise<void> {
        return this.postRepository.save(post);
    }

}