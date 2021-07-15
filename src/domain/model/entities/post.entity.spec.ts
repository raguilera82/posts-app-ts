import { v4 } from 'uuid';
import { ContentCommentVO } from '../vos/content-comment.vo';
import { ContentVO } from '../vos/content.vo';
import { IdVO } from '../vos/id.vo';
import { NameAuthorVO } from '../vos/name-author.vo';
import { NicknameAuthorVO } from '../vos/nickname-author.vo';
import { TimestampVO } from '../vos/timestamp.vo';
import { TitleVO } from '../vos/title.vo';
import { AuthorType, Author } from './author.entity';
import { CommentType, Comment } from './comment.entity';
import { PostType, Post } from './post.entity';

describe('Post', () => {
    it('should create post', () => {
        const idPost: IdVO = IdVO.create(v4());
        const titlePost: TitleVO = TitleVO.create('Mi titulo de posts');

        const idAuthor: IdVO = IdVO.create(v4());
        const nameAuthor = NameAuthorVO.create('Ruben Aguilera');
        const nicknameAuthor = NicknameAuthorVO.create('raguilera');
        const authorType: AuthorType = {
            id: idAuthor,
            name: nameAuthor,
            nickname: nicknameAuthor
        };
        const author = new Author(authorType);

        const content: ContentVO = 
                  ContentVO.create(`Lorem Ipsum is simply dummy text of the printing 
                  and typesetting industry.`);

        const commentType: CommentType = {
            content: ContentCommentVO.create('Mi comentario sobre el post'),
            nickname: NicknameAuthorVO.create('raguilera'),
            timestamp: TimestampVO.create()
        };
        const comment: Comment = new Comment(commentType);

        const postData: PostType = {
            id: idPost,
            title: titlePost,
            content,
            author: author,
            comments: []
        };
        const post = new Post(postData);
        post.addComment(comment);

        expect(idPost.value).toEqual(post.id);
        expect(titlePost.value).toEqual(post.title);
        expect(content.value).toEqual(post.content);
        
        expect(idAuthor.value).toEqual(post.author.id);
        expect(nameAuthor.value).toEqual(post.author.name);
        expect(nicknameAuthor.value).toEqual(post.author.nickname);

        expect(post.comments[0].content).toEqual(comment.content);
        expect(post.comments[0].nickname).toEqual(comment.nickname);
        expect(post.comments[0].timestamp).toEqual(comment.timestamp);
        
    });
        
});