import { TimestampVO } from './../../domain/model/vos/timestamp.vo';
import { Comment, CommentType } from './../../domain/model/entities/comment.entity';
import { Author, AuthorType } from './../../domain/model/entities/author.entity';
import { PostType } from './../../domain/model/entities/post.entity';
import { Post } from '../../domain/model/entities/post.entity';
import { IdVO } from '../../domain/model/vos/id.vo';
import { PostRepository } from '../../domain/repositories/post.repository';
import { PostModel } from './post.schema';
import { ContentVO } from '../../domain/model/vos/content.vo';
import { TitleVO } from '../../domain/model/vos/title.vo';
import { NameAuthorVO } from '../../domain/model/vos/name-author.vo';
import { NicknameVO } from '../../domain/model/vos/nickname.vo';
import { ContentCommentVO } from '../../domain/model/vos/content-comment.vo';

export class PostRepositoryMongo implements PostRepository {

    async save(post: Post): Promise<void> {

        const newPost = {
            id: post.id.value,
            title: post.title.value,
            content: post.content.value,
            author: {
                id: post.author.id.value,
                name: post.author.name.value,
                nickname: post.author.nickname.value
            },
            comments: post.comments.map(c => {
                return {
                    id: c.id.value,
                    content: c.content.value,
                    nickname: c.nickname.value,
                    timestamp: c.timestamp.value
                }; 
            })
        };

        const postModel = new PostModel(newPost);
        await postModel.save();
    }
    
    getAll(): Promise<Post[]> {
        throw new Error('Method not implemented.');
    }
    
    async getById(id: IdVO): Promise<Post | null> {
        const postDB = await PostModel.findOne({id: id.value}).exec();
        if (!postDB) {
            return null;
        }

        const authorData: AuthorType = {
            id: IdVO.createWithUUID(postDB.author.id),
            name: NameAuthorVO.create(postDB.author.name),
            nickname: NicknameVO.create(postDB.author.nickname)
        };

        const author = new Author(authorData);

        const comments: Comment[] = postDB.comments.map((dbc:any) => {
            const commentData: CommentType = {
                content: ContentCommentVO.create(dbc.content),
                id: IdVO.createWithUUID(dbc.id),
                nickname: NicknameVO.create(dbc.nickname),
                timestamp: TimestampVO.create()
            };
            return new Comment(commentData);
        });

        const postData: PostType = {
            id: IdVO.createWithUUID(postDB.id),
            title: TitleVO.create(postDB.title),
            content: ContentVO.create(postDB.content),
            author,
            comments
        };

        return new Post(postData);
    }

    async addComment(post: Post): Promise<void> {
        await this.update(post);
    }

    async deleteComment(post: Post): Promise<void> {
        await this.update(post);
    }
    
    async delete(id: IdVO): Promise<void> {
        await PostModel.findOneAndRemove({id: id.value});
    }
    
    async update(post: Post): Promise<void> {
        await this.delete(post.id);
        await this.save(post);
    }

    async deleteAll(): Promise<void> {
        await PostModel.deleteMany({});
    }
}