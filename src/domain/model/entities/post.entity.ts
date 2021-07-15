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

    get id(): string {
        return this.post.id.value;
    }

    get title(): string {
        return this.post.title.value;
    }

    get content(): string {
        return this.post.content.value;
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