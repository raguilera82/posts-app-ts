import { ContentCommentVO } from '../vos/content-comment.vo';
import { ContentVO } from '../vos/content.vo';
import { IdVO } from '../vos/id.vo';
import { NameAuthorVO } from '../vos/name-author.vo';
import { NicknameVO } from '../vos/nickname.vo';
import { TimestampVO } from '../vos/timestamp.vo';
import { TitleVO } from '../vos/title.vo';
import { AuthorType, Author } from './author.entity';
import { CommentType, Comment } from './comment.entity';
import { PostType, Post } from './post.entity';

describe('Post', () => {
    it('should create post', () => {
        const idPost: IdVO = IdVO.create();
        const titlePost: TitleVO = TitleVO.create('Mi titulo de posts');

        const idAuthor: IdVO = IdVO.create();
        const nameAuthor = NameAuthorVO.create('Ruben Aguilera');
        const nicknameAuthor = NicknameVO.create('raguilera');
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
            id: IdVO.create(),
            content: ContentCommentVO.create('Mi comentario sobre el post'),
            nickname: NicknameVO.create('raguilera'),
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

        expect(idPost.value).toEqual(post.id.value);
        expect(titlePost.value).toEqual(post.title.value);
        expect(content.value).toEqual(post.content.value);
        
        expect(idAuthor.value).toEqual(post.author.id.value);
        expect(nameAuthor.value).toEqual(post.author.name.value);
        expect(nicknameAuthor.value).toEqual(post.author.nickname.value);

        expect(post.comments[0].content.value).toEqual(comment.content.value);
        expect(post.comments[0].nickname.value).toEqual(comment.nickname.value);
        expect(post.comments[0].timestamp.value).toEqual(comment.timestamp.value);
        
    });
        
});