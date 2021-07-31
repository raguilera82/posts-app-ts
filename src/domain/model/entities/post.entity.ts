import { Author } from './author.entity';
import { Comment } from './comment.entity';
import { ContentVO } from '../vos/content.vo';
import { IdVO } from '../vos/id.vo';
import { TitleVO } from '../vos/title.vo';

export type PostType = {
    id: IdVO;
    title: TitleVO;
    content: ContentVO;
    author: Author;
    comments: Comment[];
}

export class Post {

    constructor(private post: PostType) {}

    get id(): IdVO {
        return this.post.id;
    }

    get title(): TitleVO {
        return this.post.title;
    }

    get content(): ContentVO {
        return this.post.content;
    }

    get author(): Author {
        return this.post.author;
    }

    get comments(): Comment[] {
        return this.post.comments;
    }

    addComment(comment: Comment): void {
        this.post.comments = [...this.post.comments, comment];
    }

}