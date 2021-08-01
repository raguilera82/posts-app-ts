import { Comment } from './../model/entities/comment.entity';
import { IdVO } from './../model/vos/id.vo';
import { Post } from './../model/entities/post.entity';

export interface PostRepository {

    save(post: Post): Promise<void>;

    getAll(): Promise<Post[]>;

    getById(id: IdVO): Promise<Post | null>;

    delete(id: IdVO): Promise<void>;

    update(post: Post): Promise<void>;

    addComment(post: Post, comment: Comment): Promise<void>;

}